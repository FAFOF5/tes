'use strict';

export const Toast = {
    timer: null,
    show(msg) {
        const el = document.getElementById('toastNotification');
        if (!el) return;
        const msgEl = document.getElementById('toastMessage');
        if (msgEl) msgEl.textContent = msg;
        el.classList.remove('translate-y-20', 'opacity-0');

        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            el.classList.add('translate-y-20', 'opacity-0');
        }, 3000);
    }
};
