import { State } from '../config/state';

export const Analytics = {
  getTotalHours(): number {
    return State.get.ledger.reduce((sum, item) => sum + item.hours, 0);
  },
};
