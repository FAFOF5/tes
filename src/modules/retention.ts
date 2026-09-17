import { State } from '../config/state';

export const Retention = {
  saveSessionNote(text: string, retentionPercentage: number): void {
    State.get.course.notes.unshift({
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      text,
      retention: retentionPercentage,
    });
    State.save();
  },
};
