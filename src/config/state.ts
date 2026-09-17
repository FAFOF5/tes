
import { AppState } from '../types';
import { STORAGE_PREFIX, INITIAL_COMMUNITY_KEYS } from './constants';

const DEFAULT_STATE: AppState = {
  version: 14,
  settings: {
    model: 'gemini-1.5-flash-latest',
    theme: 'dark',
    reducedMotion: false
  },
  vault: {
    personalKey: '',
    communityPool: [...INITIAL_COMMUNITY_KEYS],
    activeKeyType: 'none'
  },
  profile: {
    tier: 'المستكشف المعرفي',
    totalHours: 12.5,
    streak: 3,
    lastActive: new Date().toISOString(),
    vark: { visual: 75, auditory: 60, reading: 70, kinesthetic: 85 },
    hbdi: { analyticalA: 80, sequentialB: 75, interpersonalC: 65, creativeD: 90 },
    ocean: { openness: 85, conscientiousness: 80, extraversion: 60, agreeableness: 75, neuroticism: 35 },
    iq: { fluidIqEst: 122, patternSpeedSec: 19, cattellAbstractScore: 86 },
    kolbStyle: 'تقاربي (Converger)',
    cliftonStrengths: ['الربط الإستراتيجي (Strategic)', 'المبتكر (Ideation)', 'المحقق (Achiever)'],
    msceitEqScore: 116,
    workingMemoryMin: 45,
    completedTests: []
  },
  workspaceNotes: [],
  chatHistory: []
};

export class StateManager {
  private static instance: StateManager;
  private state: AppState;

  private constructor() {
    this.state = this.load();
  }

  public static getInstance(): StateManager {
    if (!StateManager.instance) {
      StateManager.instance = new StateManager();
    }
    return StateManager.instance;
  }

  public get data(): AppState {
    return this.state;
  }

  public load(): AppState {
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + 'state');
      if (!raw) return DEFAULT_STATE;
      return { ...DEFAULT_STATE, ...JSON.parse(raw) };
    } catch {
      return DEFAULT_STATE;
    }
  }

  public save(): void {
    try {
      localStorage.setItem(STORAGE_PREFIX + 'state', JSON.stringify(this.state));
    } catch (e) {
      console.warn('Failed to save state:', e);
    }
  }

  public reset(): void {
    this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    this.save();
  }
}

export const State = StateManager.getInstance();
