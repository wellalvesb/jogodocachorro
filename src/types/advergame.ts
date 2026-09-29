export type StageId = 'briefing' | 'design' | 'dev' | 'qa' | 'launch';

export interface PipelineStage {
  id: StageId;
  stepNumber: number;
  title: string;
  subtitle: string;
  summary: string;
  marketingFocus: string;
  creativeTasks: string[];
  technicalTasks: string[];
  deliverables: string[];
  browserTips: string[];
  iconName: string;
}

export interface BrandBriefing {
  brandName: string;
  slogan: string;
  themeColor: string; // hex or color identifier
  themeAccent: string;
  productName: string;
  productType: string;
  ctaType: string;
  ctaTitle: string;
  ctaCode: string;
  ctaLink: string;
  difficulty: 'facil' | 'equilibrado' | 'dificil';
  targetAudience: string;
}

export type GameState = 'IDLE' | 'PLAYING' | 'PAUSED' | 'GAMEOVER' | 'VICTORY';

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  itemsCollected: number;
  brand: string;
  date: string;
}

export interface ChecklistItem {
  id: string;
  stageId: StageId;
  label: string;
  category: 'Briefing' | '3D & Arte' | 'Código' | 'Polimento' | 'Marketing';
  description: string;
  completed: boolean;
}
