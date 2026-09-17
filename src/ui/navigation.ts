export const Navigation = {
  switchTab(tabId: string): void {
    document.querySelectorAll('.tab-content').forEach((el) => el.classList.add('hidden'));
    document.getElementById(`tab-${tabId}`)?.classList.remove('hidden');
  },
};
