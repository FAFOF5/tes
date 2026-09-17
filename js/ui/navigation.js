'use strict';

import { State, Storage } from '../config/state.js';
import { Toast } from './toast.js';

export const UI = {
    switchTab(tabId) {
        document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.nav-tab').forEach(el => {
            el.classList.remove('bg-brand-600', 'text-slate-950', 'font-bold');
            el.classList.add('text-slate-300');
        });

        const section = document.getElementById('tab-' + tabId);
        if (section) {
            section.classList.remove('hidden');
            section.classList.add('fade-in');
        }

        const btn = document.querySelector(`.nav-tab[data-tab="${tabId}"]`);
        if (btn) {
            btn.classList.add('bg-brand-600', 'text-slate-950', 'font-bold');
            btn.classList.remove('text-slate-300');
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (tabId === 'analytics' && window.Analytics) {
            window.Analytics.renderCharts();
            window.Analytics.renderSkillsGrid();
        }
        if (tabId === 'courses' && window.Courses) {
            window.Courses.updateDisplay();
            if (window.Retention) window.Retention.renderStats();
        }
        if (tabId === 'ai-assistant' && window.AI) {
            window.AI.updateStatus();
        }
    },

    openSettings() {
        const modal = document.getElementById('settingsModal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.getElementById('apiKeyInput').value = State.settings.apiKey || '';
        document.getElementById('modelSelect').value = State.settings.model || 'gemini-1.5-flash-latest';
        document.getElementById('aiTestResult').classList.add('hidden');
        setTimeout(() => document.getElementById('apiKeyInput').focus(), 100);
    },

    closeSettings() {
        const modal = document.getElementById('settingsModal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    },

    toggleKeyVisibility() {
        const input = document.getElementById('apiKeyInput');
        const icon = document.getElementById('keyEyeIcon');
        if (input.type === 'password') {
            input.type = 'text';
            icon.className = 'fa-solid fa-eye-slash';
        } else {
            input.type = 'password';
            icon.className = 'fa-solid fa-eye';
        }
    },

    saveApiKey() {
        const key = document.getElementById('apiKeyInput').value.trim();
        const model = document.getElementById('modelSelect').value;

        if (key && key.length < 20) {
            Toast.show('المفتاح يبدو قصيراً جداً');
            return;
        }

        State.settings.apiKey = key;
        State.settings.model = model;
        State.save();

        if (window.AI) window.AI.updateStatus();
        Toast.show(key ? 'تم حفظ المفتاح بنجاح' : 'تم مسح المفتاح');
        setTimeout(() => this.closeSettings(), 600);
    },

    toggleTheme() {
        const next = State.settings.theme === 'dark' ? 'light' : 'dark';
        State.settings.theme = next;
        State.save();
        this.applyTheme(next);
    },

    applyTheme(theme) {
        if (theme === 'light') {
            document.body.classList.add('light-mode');
            document.documentElement.classList.remove('dark');
        } else {
            document.body.classList.remove('light-mode');
            document.documentElement.classList.add('dark');
        }
    },

    updateHeaderStats() {
        const p = State.profile;
        const map = [
            ['navTier', p.tier],
            ['mobileNavTier', p.tier.split(' ')[0]],
            ['navStreak', p.streak + ' يوم'],
            ['navTotalHours', p.totalHours.toFixed(1) + ' ساعة'],
            ['mobileNavHours', p.totalHours.toFixed(1) + 'h']
        ];
        map.forEach(([id, val]) => {
            const el = document.getElementById(id);
            if (el) el.textContent = val;
        });
    },

    goToAIChatWithContext() {
        if (window.AI) window.AI.goToChatWithContext();
    }
};

export const Data = {
    exportAll() {
        try {
            const payload = {
                version: 13,
                exportedAt: new Date().toISOString(),
                data: Storage.exportAll()
            };
            const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `meeraj-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            Toast.show('تم تصدير البيانات');
        } catch (e) {
            Toast.show('فشل التصدير');
        }
    },

    importFrom(file) {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const payload = JSON.parse(e.target.result);
                if (!payload.data) throw new Error('ملف غير صالح');
                Storage.importAll(payload.data);
                State.load();
                Toast.show('تم الاستيراد — سيُعاد التحميل');
                setTimeout(() => location.reload(), 800);
            } catch (err) {
                Toast.show('فشل الاستيراد: ' + err.message);
            }
        };
        reader.readAsText(file);
    },

    resetAll() {
        if (!confirm('سيتم مسح جميع بياناتك نهائياً. متأكد؟')) return;
        if (!confirm('تأكيد أخير: لا يمكن التراجع.')) return;
        Storage.clearAll();
        Toast.show('تم المسح — سيُعاد التحميل');
        setTimeout(() => location.reload(), 800);
    }
};

export const Shortcuts = {
    init() {
        document.addEventListener('keydown', (e) => {
            const tag = (e.target.tagName || '').toLowerCase();
            const isField = tag === 'input' || tag === 'textarea' || tag === 'select';

            if (e.key === 'Escape') {
                const modal = document.getElementById('settingsModal');
                if (modal && !modal.classList.contains('hidden')) {
                    UI.closeSettings();
                    return;
                }
            }

            if (e.key === ' ' && !isField) {
                const onLedger = !document.getElementById('tab-ledger').classList.contains('hidden');
                if (onLedger && window.Timer) {
                    e.preventDefault();
                    window.Timer.toggle();
                }
            }
        });
    }
};
