import { State } from '../config/state';

export function toggleTheme(): void {
  const current = State.get.settings.theme;
  const next = current === 'dark' ? 'light' : 'dark';
  State.get.settings.theme = next;
  State.save();
  document.documentElement.classList.toggle('dark', next === 'dark');
}
