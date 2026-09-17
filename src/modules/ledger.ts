import { State } from '../config/state';
import { LedgerEntry } from '../types';

export const Ledger = {
  addEntry(entry: Omit<LedgerEntry, 'id'>): void {
    const newEntry: LedgerEntry = { ...entry, id: 'leg_' + Date.now() };
    State.get.ledger.unshift(newEntry);
    State.save();
  },
};
