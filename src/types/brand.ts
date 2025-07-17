// Brand and design-related types
export interface BrandProfile {
  id: string;
  user_id: string;
  name: string;
  industry?: string;
  slogan?: string;
  logo_url?: string;
  colors: BrandColor[];
  typography: BrandTypography;
  voice_tone: BrandVoice;
  photography_style: string;
  iconography_style: string;
  usage_rules?: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface BrandColor {
  name: string;
  hex: string;
  usage: 'primary' | 'secondary' | 'accent' | 'neutral';
}

export interface BrandTypography {
  primary_font: FontDefinition;
  secondary_font: FontDefinition;
  accent_font?: FontDefinition;
}

export interface FontDefinition {
  family: string;
  weights: number[];
  sizes: {
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    h5: string;
    h6: string;
    body: string;
    caption: string;
  };
}

export interface BrandVoice {
  formal_informal: number; // 1-10 scale
  playful_serious: number;
  modern_classic: number;
  professional_casual: number;
}

export interface DesignStyle {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  thumbnail_url: string;
  ai_prompt_modifiers: string[];
}

export interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  category: 'warm' | 'cool' | 'neutral' | 'vibrant' | 'monochrome';
}

export interface FontPairing {
  id: string;
  name: string;
  headline_font: string;
  body_font: string;
  category: string;
}
