export interface AIProvider {
  name: 'openai' | 'claude' | 'leonardo';
  apiKey: string;
  baseUrl?: string;
}

export interface AIContentGenerationRequest {
  prompt: string;
  provider: AIProvider['name'];
  contentType: 'blog_post' | 'product_description' | 'social_media' | 'email';
  tone?: 'professional' | 'casual' | 'friendly' | 'formal';
  length?: 'short' | 'medium' | 'long';
  keywords?: string[];
  targetAudience?: string;
}

export interface AIContentGenerationResponse {
  content: string;
  provider: AIProvider['name'];
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  metadata?: {
    model: string;
    temperature: number;
    maxTokens: number;
  };
}

export interface ImageGenerationRequest {
  prompt: string;
  provider: 'leonardo' | 'openai';
  size?: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792';
  style?: string;
  aspectRatio?: '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
  quality?: 'standard' | 'hd';
}

export interface ImageGenerationResponse {
  imageUrl: string;
  provider: string;
  generationId: string;
  metadata?: {
    model: string;
    size: string;
    style?: string;
  };
}

export interface AIServiceConfig {
  openai: {
    apiKey?: string;
    baseUrl?: string;
    defaultModel: string;
  };
  claude: {
    apiKey?: string;
    baseUrl?: string;
    defaultModel: string;
  };
  leonardo: {
    apiKey?: string;
    baseUrl?: string;
  };
}

export interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  prompt: string;
  contentType: AIContentGenerationRequest['contentType'];
  variables: {
    name: string;
    description: string;
    required: boolean;
    defaultValue?: string;
  }[];
}

export interface AIGenerationHistory {
  id: string;
  userId: string;
  siteId: string;
  request: AIContentGenerationRequest | ImageGenerationRequest;
  response: AIContentGenerationResponse | ImageGenerationResponse;
  createdAt: Date;
  cost?: number;
} 