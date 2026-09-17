export function $<T extends HTMLElement>(selector: string): T | null {
  return document.querySelector<T>(selector);
}

export function $$<T extends HTMLElement>(selector: string): NodeListOf<T> {
  return document.querySelectorAll<T>(selector);
}

export function addClass(el: HTMLElement | null, ...classes: string[]): void {
  el?.classList.add(...classes);
}

export function removeClass(el: HTMLElement | null, ...classes: string[]): void {
  el?.classList.remove(...classes);
}
