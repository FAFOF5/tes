import { VarkScores, OceanScores } from '../types';

export class ScoringEngine {
  public static calculateVarkPercentages(raw: Record<string, number>): VarkScores {
    const total = (raw.visual || 0) + (raw.auditory || 0) + (raw.reading || 0) + (raw.kinesthetic || 0) || 1;
    return {
      visual: Math.round(((raw.visual || 0) / total) * 100),
      auditory: Math.round(((raw.auditory || 0) / total) * 100),
      reading: Math.round(((raw.reading || 0) / total) * 100),
      kinesthetic: Math.round(((raw.kinesthetic || 0) / total) * 100),
    };
  }

  public static getDominantVark(vark: VarkScores): string {
    const sorted = Object.entries(vark).sort((a, b) => b[1] - a[1]);
    const map: Record<string, string> = {
      visual: 'بصري',
      auditory: 'سمعي',
      reading: 'تدويني',
      kinesthetic: 'تطبيقي حركي',
    };
    return map[sorted[0][0]] || 'متوازن';
  }
}
