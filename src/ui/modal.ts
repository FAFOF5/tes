export const Modal = {
  open(id: string): void {
    document.getElementById(id)?.classList.remove('hidden');
  },
  close(id: string): void {
    document.getElementById(id)?.classList.add('hidden');
  },
};
