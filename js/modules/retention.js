'use strict';

import { State } from '../config/state.js';
import { Toast } from '../ui/toast.js';

export const Retention = {
    current: 85,
    set(pct, label) {
        this.current = pct;
        const el = document.getElementById('retentionGaugeText');
        if (el) {
            el.textContent = `${pct}% (${label})`;
            el.className = pct >= 75 ? 'text-xl font-mono font-black text-emerald-400' :
                           pct >= 50 ? 'text-xl font-mono font-black text-amber-400' :
                           'text-xl font-mono font-black text-rose-400';
        }
        Toast.show(`تم تحديد نسبة الثبات: ${label}`);
    },
    saveNote() {
        const text = document.getElementById('courseNotesInput')?.value.trim();
        if (!text) { Toast.show('اكتب ملاحظة أولاً'); return; }
        State.course.notes.unshift({ id: Date.now(), date: new Date().toISOString().split('T')[0], text, retention: this.current });
        State.save();
        document.getElementById('courseNotesInput').value = '';
        Toast.show('تم حفظ الملاحظة وتقييم الثبات بنجاح!');
    },
    renderStats() {
        const stats = State.course.retentionStats || { high: 12, mid: 2, low: 1, zero: 0 };
        const box = document.getElementById('retentionStats');
        if (box) {
            box.innerHTML = `
                <div class="flex justify-between text-slate-300"><span>مرتفع الثبات:</span><span class="text-brand-400 font-bold">${stats.high} جلسة</span></div>
                <div class="flex justify-between text-slate-300"><span>متوسط الثبات:</span><span class="text-amber-400 font-bold">${stats.mid} جلسة</span></div>
            `;
        }
    }
};
