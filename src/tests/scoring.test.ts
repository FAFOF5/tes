import { describe, it, expect } from 'vitest';
import { ScoringEngine } from '../src/modules/scoring';

describe('ScoringEngine', () => {
  it('should calculate correct VARK percentages', () => {
    const raw = { visual: 10, auditory: 10, reading: 10, kinesthetic: 10 };
    const res = ScoringEngine.calculateVarkPercentages(raw);
    expect(res.visual).toBe(25);
    expect(res.auditory).toBe(25);
  });
});
