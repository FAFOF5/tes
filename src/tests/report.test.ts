import { describe, it, expect } from 'vitest';
import { ReportGenerator } from '../src/modules/report';

describe('ReportGenerator', () => {
  it('should return report sections', () => {
    const sections = ReportGenerator.getSections();
    expect(sections.length).toBeGreaterThan(0);
  });
});
