// AI and generation-related types
import { DesignLayout, AssetType } from './project';

export interface AIGenerationRequest {
  brief: string;
  brand_profile_id?: string;
  design_style_id: string;
  target_platform: string;
  dimensions: {
    width: number;
    height: number;
  };
  content_type: AIContentType;
  additional_parameters?: AIParameters;
}

export type AIContentType = 'branding' | 'ui_ux' | 'social_media' | 'print' | 'web_banner' | 'logo' | 'business_card';

export interface AIParameters {
  color_preferences?: string[];
  style_intensity?: number; // 1-10
  text_amount?: 'minimal' | 'moderate' | 'extensive';
  image_style?: 'photography' | 'illustration' | 'abstract' | 'mixed';
  layout_preference?: 'symmetrical' | 'asymmetrical' | 'grid_based' | 'free_form';
}

export interface AIGenerationResponse {
  job_id: string;
  status: AIJobStatus;
  estimated_completion_time?: number; // seconds
  result?: AIGenerationResult;
  error?: string;
}

export type AIJobStatus = 'queued' | 'processing' | 'completed' | 'failed';

export interface AIGenerationResult {
  layout: DesignLayout;
  generated_assets: GeneratedAsset[];
  suggestions: AISuggestion[];
  brand_alignment_score: number; // 0-100
}

export interface GeneratedAsset {
  id: string;
  type: AssetType;
  url: string;
  prompt_used: string;
  alternatives?: string[]; // URLs to alternative versions
}

export interface AISuggestion {
  id: string;
  type: SuggestionType;
  title: string;
  description: string;
  preview_url?: string;
  apply_data: any; // Data needed to apply the suggestion
  confidence_score: number; // 0-100
}

export type SuggestionType = 
  | 'copy_alternative' 
  | 'image_alternative' 
  | 'color_adjustment' 
  | 'font_pairing' 
  | 'layout_adjustment' 
  | 'element_style';

export interface AIProgress {
  job_id: string;
  stage: AIProcessingStage;
  progress_percentage: number;
  current_task: string;
  estimated_remaining_time?: number; // seconds
}

export type AIProcessingStage = 
  | 'analyzing_brief'
  | 'generating_copy'
  | 'creating_images'
  | 'composing_layout'
  | 'applying_brand_guidelines'
  | 'generating_alternatives'
  | 'finalizing';

export interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  template: string;
  variables: PromptVariable[];
}

export interface PromptVariable {
  name: string;
  type: 'text' | 'select' | 'number' | 'color';
  description: string;
  required: boolean;
  default_value?: any;
  options?: string[]; // for select type
}
