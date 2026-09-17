'use strict';

import { Toast } from '../ui/toast.js';

export const Voice = {
    rec: null, active: false, baseText: '',
    init() {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) return null;
        const rec = new SR();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = 'ar-SA';
        rec.onresult = (e) => {
            let transcript = '';
            for (let i = e.resultIndex; i < e.results.length; i++) {
                transcript += e.results[i][0].transcript;
            }
            const ta = document.getElementById('courseNotesInput');
            if (ta) ta.value = this.baseText ? `${this.baseText}\n${transcript}` : transcript;
        };
        rec.onend = () => {
            if (this.active) {
                this.baseText = document.getElementById('courseNotesInput')?.value || '';
                try { rec.start(); } catch {}
            }
        };
        return rec;
    },
    toggle() { if (this.active) this.stop(); else this.start(); },
    start() {
        if (!this.rec) this.rec = this.init();
        if (!this.rec) { Toast.show('المتصفح لا يدعم الإملاء الصوتي'); return; }
        this.baseText = document.getElementById('courseNotesInput')?.value || '';
        this.active = true;
        try { this.rec.start(); } catch {}
        const btn = document.getElementById('dictationBtn');
        if (btn) btn.classList.add('recording-pulse');
        Toast.show('بدأ الإملاء الصوتي المستمر');
    },
    stop() {
        this.active = false;
        try { if (this.rec) this.rec.stop(); } catch {}
        const btn = document.getElementById('dictationBtn');
        if (btn) btn.classList.remove('recording-pulse');
        Toast.show('تم إيقاف التسجيل الصوتي');
    }
};
