import { NextRequest, NextResponse } from 'next/server';
import { geminiAI } from '@/src/lib/gemini';
import { supabase } from '@/src/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { 
      brief, 
      aiModeId, 
      designStyleId, 
      brandProfileId, 
      targetPlatforms,
      userId 
    } = await request.json();

    // Validate required fields
    if (!brief || !aiModeId || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields: brief, aiModeId, userId' },
        { status: 400 }
      );
    }

    // Get brand information if provided
    let brandInfo = null;
    if (brandProfileId) {
      const { data: brand } = await supabase
        .from('brands')
        .select('*')
        .eq('id', brandProfileId)
        .eq('user_id', userId)
        .single();
      brandInfo = brand;
    }

    // Get AI mode information
    const { data: aiMode } = await supabase
      .from('ai_modes')
      .select('*')
      .eq('id', aiModeId)
      .single();

    if (!aiMode) {
      return NextResponse.json(
        { error: 'Invalid AI mode ID' },
        { status: 400 }
      );
    }

    // Get design style information if provided
    let designStyle = null;
    if (designStyleId) {
      const { data: style } = await supabase
        .from('design_styles')
        .select('*')
        .eq('id', designStyleId)
        .single();
      designStyle = style;
    }

    // Create a new project
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert({
        user_id: userId,
        brand_id: brandProfileId,
        ai_mode_id: aiModeId,
        design_style_id: designStyleId,
        name: `${aiMode.display_name} - ${new Date().toLocaleDateString()}`,
        brief: brief,
        target_platforms: targetPlatforms || [],
        status: 'generating'
      })
      .select()
      .single();

    if (projectError) {
      console.error('Error creating project:', projectError);
      return NextResponse.json(
        { error: 'Failed to create project' },
        { status: 500 }
      );
    }

    // Generate design suggestions using Gemini
    const suggestions = await geminiAI.generateDesignSuggestions(
      brief,
      aiMode.name,
      brandInfo
    );

    // Generate enhanced prompt for image generation
    const styleContext = designStyle ? designStyle.name : 'modern';
    const brandContext = brandInfo ? `${brandInfo.name} brand` : '';
    
    const enhancedPrompt = await geminiAI.enhanceImagePrompt(
      brief,
      styleContext,
      'professional',
      brandContext
    );

    // Generate copy variations
    const headlineVariations = await geminiAI.generateDesignCopy(
      'headline',
      brief,
      brandInfo?.voice_tone
    );

    const bodyVariations = await geminiAI.generateDesignCopy(
      'body',
      brief,
      brandInfo?.voice_tone
    );

    const ctaVariations = await geminiAI.generateDesignCopy(
      'cta',
      brief,
      brandInfo?.voice_tone
    );

    // Create initial design version with AI suggestions
    const designData = {
      suggestions,
      enhancedPrompt,
      copyVariations: {
        headlines: headlineVariations,
        body: bodyVariations,
        cta: ctaVariations
      },
      brandColors: brandInfo?.colors || [],
      brandFonts: brandInfo?.fonts || []
    };

    const { data: designVersion, error: versionError } = await supabase
      .from('design_versions')
      .insert({
        project_id: project.id,
        prompt_used: enhancedPrompt,
        generated_copy: designData.copyVariations,
        generation_metadata: {
          ai_suggestions: suggestions,
          brand_id: brandProfileId,
          style_id: designStyleId,
          timestamp: new Date().toISOString()
        }
      })
      .select()
      .single();

    if (versionError) {
      console.error('Error creating design version:', versionError);
      return NextResponse.json(
        { error: 'Failed to create design version' },
        { status: 500 }
      );
    }

    // Update project with current version
    await supabase
      .from('projects')
      .update({ 
        current_version_id: designVersion.id,
        status: 'completed'
      })
      .eq('id', project.id);

    return NextResponse.json({
      success: true,
      project: {
        ...project,
        current_version_id: designVersion.id
      },
      designVersion,
      aiSuggestions: suggestions,
      enhancedPrompt,
      copyVariations: designData.copyVariations
    });

  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error during AI generation' },
      { status: 500 }
    );
  }
}
