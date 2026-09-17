export const Toast = {
  show(message: string): void {
    const toast = document.getElementById('toastNotification');
    const msgEl = document.getElementById('toastMessage');
    if (toast && msgEl) {
      msgEl.textContent = message;
      toast.classList.remove('opacity-0', 'translate-y-20');
      setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-20');
      }, 3000);
    }
  },
};
