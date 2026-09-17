import { State } from '../config/state';

export const Courses = {
  addProgress(hours: number): void {
    const c = State.get.course;
    c.completedHours = Math.min(c.totalHours, c.completedHours + hours);
    State.save();
  },
};
