
export const APP_VERSION = '14.0.0';
export const STORAGE_PREFIX = 'meeraj_v14_';

export const DEFAULT_MODELS = [
  { id: 'gemini-1.5-flash-latest', name: 'Gemini 1.5 Flash (سريع، موصى به)' },
  { id: 'gemini-1.5-pro-latest', name: 'Gemini 1.5 Pro (أعمق وأشمل)' },
  { id: 'gemini-2.0-flash-exp', name: 'Gemini 2.0 Flash (تجريبي)' }
];

export const INITIAL_COMMUNITY_KEYS: string[] = [
  'AIzaSyCommunitySharedFallbackKey_DemoPool1',
  'AIzaSyCommunitySharedFallbackKey_DemoPool2'
];

export const TIERS = [
  { name: 'المستكشف المعرفي', minHours: 0 },
  { name: 'الباحث المتمكن', minHours: 50 },
  { name: 'العالم التراكمي', minHours: 150 },
  { name: 'الحكيم المعرفي', minHours: 300 }
];
