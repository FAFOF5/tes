'use strict';

import { Toast } from '../ui/toast.js';
import { State } from '../config/state.js';

export const Ambient = {
    ctx: null, node: null, playing: false,
    toggle() { if (this.playing) this.stop(); else this.start(); },
    start() {
        try {
            if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            if (this.ctx.state === 'suspended') this.ctx.resume();
            const bufSize = this.ctx.sampleRate * 2;
            const buffer = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
            const out = buffer.getChannelData(0);
            let last = 0;
            for (let i = 0; i < bufSize; i++) {
                const white = Math.random() * 2 - 1;
                out[i] = (last + 0.02 * white) / 1.02;
                last = out[i];
                out[i] *= 3.5;
            }
            this.node = this.ctx.createBufferSource();
            this.node.buffer = buffer;
            this.node.loop = true;
            const gain = this.ctx.createGain();
            gain.gain.value = 0.12;
            this.node.connect(gain);
            gain.connect(this.ctx.destination);
            this.node.start();
            this.playing = true;
            document.getElementById('ambientSoundText').textContent = 'إيقاف الضوضاء البنية';
            Toast.show('تم تشغيل صوت التركيز');
        } catch { Toast.show('انقر لتفعيل الصوت'); }
    },
    stop() {
        if (this.node) { try { this.node.stop(); } catch {} this.node = null; }
        this.playing = false;
        document.getElementById('ambientSoundText').textContent = 'تشغيل ضوضاء التركيز (Brown Noise)';
        Toast.show('تم إيقاف الصوت');
    }
};

export const Timer = {
    remaining: 45 * 60, total: 45 * 60, interval: null, running: false,
    setPreset(min) {
        this.stop();
        this.remaining = min * 60;
        this.total = min * 60;
        this.render();
        Toast.show(`تم ضبط المؤقت على ${min} دقيقة`);
    },
    applyCustom() {
        const v = parseInt(document.getElementById('customTimerInput').value, 10);
        if (v && v > 0 && v <= 300) { this.setPreset(v); }
        else Toast.show('أدخل رقماً بين 1 و 300');
    },
    toggle() { if (this.running) this.stop(); else this.start(); },
    start() {
        if (this.running) return;
        this.running = true;
        document.getElementById('timerStartBtn').innerHTML = '<i class="fa-solid fa-pause ml-1"></i> إيقاف';
        this.interval = setInterval(() => {
            if (this.remaining > 0) { this.remaining--; this.render(); }
            else this.complete();
        }, 1000);
    },
    stop() {
        this.running = false;
        if (this.interval) clearInterval(this.interval);
        this.interval = null;
        document.getElementById('timerStartBtn').innerHTML = '<i class="fa-solid fa-play ml-1"></i> استئناف';
    },
    reset() {
        this.stop();
        this.remaining = this.total;
        this.render();
        document.getElementById('timerStartBtn').innerHTML = '<i class="fa-solid fa-play ml-1"></i> بدء الجلسة';
    },
    complete() {
        this.stop();
        if (typeof confetti === 'function') confetti({ particleCount: 60 });
        Toast.show('أحسنت! اكتملت ركعة التركيز');
    },
    render() {
        const m = Math.floor(this.remaining / 60);
        const s = this.remaining % 60;
        document.getElementById('timerDisplay').textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        const circle = document.getElementById('timerProgressCircle');
        if (circle) circle.style.strokeDashoffset = 578 - (this.remaining / this.total) * 578;
    }
};
