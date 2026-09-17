
export type TestCategory = 'cognitive' | 'learning' | 'personality';

export interface VarkScores {
  visual: number;
  auditory: number;
  reading: number;
  kinesthetic: number;
}

export interface HbdiScores {
  analyticalA: number;
  sequentialB: number;
  interpersonalC: number;
  creativeD: number;
}

export interface OceanScores {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

export interface IqScores {
  fluidIqEst: number;
  patternSpeedSec: number;
  cattellAbstractScore: number;
}

export interface QuestionOption {
  label: string;
  type?: string;
  val?: string | number;
  score?: Record<string, number>;
}

export interface PsychometricQuestion {
  id: string;
  q: string;
  matrix?: string[];
  hint?: string;
  options: QuestionOption[];
}

export interface PsychometricBattery {
  id: string;
  category: TestCategory;
  title: string;
  desc: string;
  icon: string;
  color: 'cyan' | 'brand' | 'amber' | 'purple';
  questions: PsychometricQuestion[];
}

export interface ApiVaultState {
  personalKey: string;
  communityPool: string[];
  activeKeyType: 'personal' | 'community' | 'none';
}

export interface UserProfile {
  tier: string;
  totalHours: number;
  streak: number;
  lastActive: string | null;
  vark: VarkScores;
  hbdi: HbdiScores;
  ocean: OceanScores;
  iq: IqScores;
  kolbStyle: string;
  cliftonStrengths: string[];
  msceitEqScore: number;
  workingMemoryMin: number;
  completedTests: string[];
}

export interface AppSettings {
  model: string;
  theme: 'dark' | 'light';
  reducedMotion: boolean;
}

export interface AppState {
  version: number;
  settings: AppSettings;
  vault: ApiVaultState;
  profile: UserProfile;
  workspaceNotes: string[];
  chatHistory: Array<{ sender: 'user' | 'ai'; text: string; ts: number }>;
}

