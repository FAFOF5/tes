import { Question, QuestionOption } from '../types';
import { QuestionBank } from './bank';
import { ScoringEngine } from './scoring';
import { State } from '../config/state';
import { Toast } from '../ui/toast';

export class QuizController {
  private questions: Question[] = [];
  private currentIndex = 0;
  private rawVark: Record<string, number> = { visual: 0, auditory: 0, reading: 0, kinesthetic: 0 };

  public start(mode: 'quick' | 'comprehensive'): void {
    this.questions = mode === 'quick' ? QuestionBank.getQuick() : QuestionBank.getComprehensive();
    this.currentIndex = 0;
    this.rawVark = { visual: 0, auditory: 0, reading: 0, kinesthetic: 0 };
    this.renderCurrentQuestion();
  }

  public answer(option: QuestionOption): void {
    if (option.type === 'vark' && typeof option.value === 'string') {
      this.rawVark[option.value] = (this.rawVark[option.value] || 0) + 1;
    }

    this.currentIndex++;
    if (this.currentIndex < this.questions.length) {
      this.renderCurrentQuestion();
    } else {
      this.finish();
    }
  }

  private renderCurrentQuestion(): void {
    const q = this.questions[this.currentIndex];
    const qText = document.getElementById('questionText');
    if (qText) qText.textContent = q.question;
  }

  private finish(): void {
    const finalVark = ScoringEngine.calculateVarkPercentages(this.rawVark);
    State.get.profile.vark = finalVark;
    State.get.profile.completedQuiz = true;
    State.save();
    Toast.show('تم إتمام الاختبار بنجاح!');
  }
}

export const Quiz = new QuizController();
