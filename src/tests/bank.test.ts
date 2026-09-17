import { describe, it, expect } from 'vitest';
import { QuestionBank } from '../src/modules/bank';

describe('QuestionBank', () => {
  it('should generate 100 comprehensive questions', () => {
    const questions = QuestionBank.getComprehensive();
    expect(questions.length).toBe(100);
  });
});
