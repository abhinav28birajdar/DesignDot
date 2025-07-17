// Project and design generation types
export interface Project {
  id: string;
  user_id: string;
  brand_id?: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  target_platform: string;
  dimensions: ProjectDimensions;
  brief: string;
  selected_style_id: string;
  current_layout_json_url?: string;
  thumbnail_url?: string;
  assets: ProjectAsset[];
  created_at: string;
  updated_at: string;
}

export type ProjectStatus = 'draft' | 'generating' | 'completed' | 'archived';

export interface ProjectDimensions {
  width: number;
  height: number;
  unit: 'px' | 'mm' | 'in';
}

export interface ProjectAsset {
  id: string;
  project_id: string;
  type: AssetType;
  url: string;
  metadata: AssetMetadata;
  created_at: string;
}

export type AssetType = 'image' | 'svg' | 'json_layout' | 'font' | 'icon';

export interface AssetMetadata {
  filename: string;
  size: number;
  mime_type: string;
  dimensions?: {
    width: number;
    height: number;
  };
  alt_text?: string;
  tags?: string[];
}

export interface ProjectVersion {
  id: string;
  project_id: string;
  layout_json_url: string;
  asset_urls: string[];
  notes?: string;
  created_at: string;
}

export interface DesignElement {
  id: string;
  type: ElementType;
  position: {
    x: number;
    y: number;
  };
  dimensions: {
    width: number;
    height: number;
  };
  rotation?: number;
  z_index: number;
  style: ElementStyle;
  content?: any;
}

export type ElementType = 'text' | 'image' | 'shape' | 'icon' | 'background';

export interface ElementStyle {
  background_color?: string;
  border_color?: string;
  border_width?: number;
  border_radius?: number;
  opacity?: number;
  shadow?: ShadowStyle;
  font_family?: string;
  font_size?: number;
  font_weight?: number;
  color?: string;
  text_align?: 'left' | 'center' | 'right' | 'justify';
  line_height?: number;
}

export interface ShadowStyle {
  x: number;
  y: number;
  blur: number;
  color: string;
}

export interface DesignLayout {
  id: string;
  elements: DesignElement[];
  canvas: {
    width: number;
    height: number;
    background_color: string;
  };
  grid?: {
    enabled: boolean;
    columns: number;
    rows: number;
    gap: number;
  };
  guides?: GuidelineSet;
}

export interface GuidelineSet {
  rule_of_thirds: boolean;
  golden_ratio: boolean;
  safe_zones: boolean;
  custom_guides: CustomGuide[];
}

export interface CustomGuide {
  id: string;
  type: 'horizontal' | 'vertical';
  position: number;
  color: string;
}
