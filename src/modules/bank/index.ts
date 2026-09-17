import { QUICK_QUESTIONS, generate100Questions } from './questions';

export const QuestionBank = {
  getQuick() {
    return QUICK_QUESTIONS;
  },
  getComprehensive() {
    return generate100Questions();
  },
};
