'use strict';

import { State } from '../config/state.js';
import { Toast } from '../ui/toast.js';

export const Ledger = {
    add(e) {
        if (e) e.preventDefault();
        const cat = document.getElementById('ledgerCategory')?.value || 'عام';
        const hours = parseFloat(document.getElementById('ledgerHours')?.value) || 1;
        const insight = document.getElementById('ledgerInsight')?.value || '';
        State.ledger.unshift({ date: new Date().toISOString().split('T')[0], cat, hours, insight, rating: '5' });
        State.save();
        this.render();
        Toast.show('تم توثيق الجلسة بالسجل');
    },
    render() {
        const tbody = document.getElementById('ledgerHistoryTableBody');
        if (!tbody) return;
        tbody.innerHTML = '';
        State.ledger.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="p-2 font-mono text-slate-400">${item.date}</td>
                <td class="p-2 font-semibold text-slate-200">${item.cat}</td>
                <td class="p-2 text-brand-400 font-bold">${item.hours}h</td>
                <td class="p-2 text-slate-300 max-w-xs truncate">${item.insight}</td>
                <td class="p-2 text-amber-400">★★★★★</td>
            `;
            tbody.appendChild(tr);
        });
    },
    clearAll() {
        State.ledger = [];
        State.save();
        this.render();
        Toast.show('تم مسح السجل');
    }
};

export const Analytics = {
    renderCharts() {
        const ctxW = document.getElementById('weeklyHoursChart');
        if (ctxW) {
            new Chart(ctxW.getContext('2d'), {
                type: 'bar',
                data: { labels: ['الأحد', ' الإثنين', 'الثلاثاء', ' الأربعاء', 'الخميس', ' الجمعة', 'السبت'], datasets: [{ data: [3, 4, 2, 5, 3, 1, 4], backgroundColor: '#10b981' }] },
                options: { responsive: true, maintainAspectRatio: false }
            });
        }
    },
    renderSkillsGrid() {},
    computeStreak() {},
    updateTier() {}
};
