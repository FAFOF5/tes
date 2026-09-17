'use strict';

import { State } from '../config/state.js';
import { Toast } from '../ui/toast.js';
import { UI } from '../ui/navigation.js';

export const AI = {
    isSending: false,

    get hasKey() {
        return !!(State.settings.apiKey && State.settings.apiKey.trim().length > 20);
    },

    updateStatus() {
        const el = document.getElementById('aiStatusText');
        if (!el) return;
        if (this.hasKey) {
            el.textContent = `جاهز • ${State.settings.model}`;
            el.className = 'text-[10px] sm:text-xs text-emerald-400';
        } else {
            el.textContent = 'غير مُهيّأ — اضغط على زر الإعدادات لإدخال مفتاح API.';
            el.className = 'text-[10px] sm:text-xs text-slate-400';
        }
    },

    systemPrompt() {
        const p = State.profile;
        const v = p.vark || {};
        return `أنت "مرشد البصيرة المعرفية" في منصة مِعراج. أجب بأسلوب مشجع وعميق.
نمط المستفيد: VARK (بصري: ${v.visual || 0}%، سمعي: ${v.auditory || 0}%، تطبيقي: ${v.kinesthetic || 0}%)، السعة الذهنية: ${p.capacity || 45} دقيقة، الإيقاع البيولوجي: ${p.chrono || 'غير محدد'}.`;
    },

    async send(text) {
        text = (text || '').trim();
        if (!text || this.isSending) return;

        if (!this.hasKey) {
            Toast.show('يرجى إدخال مفتاح API من الإعدادات أولاً');
            UI.openSettings();
            return;
        }

        this.append('user', text);
        State.chat.push({ sender: 'user', text, ts: Date.now() });
        State.save();

        this.isSending = true;
        const loadingId = this.appendLoading();

        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(State.settings.model)}:generateContent?key=${encodeURIComponent(State.settings.apiKey)}`;
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ role: 'user', parts: [{ text }] }],
                    systemInstruction: { parts: [{ text: this.systemPrompt() }] }
                })
            });

            this.removeLoading(loadingId);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const data = await res.json();
            const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'لم يصل رد من النموذج';

            this.append('ai', reply);
            State.chat.push({ sender: 'ai', text: reply, ts: Date.now() });
            State.save();
        } catch (err) {
            this.removeLoading(loadingId);
            this.append('ai', `⚠️ تعذر الاتصال: ${err.message}`);
        } finally {
            this.isSending = false;
        }
    },

    append(sender, text) {
        const win = document.getElementById('aiChatWindow');
        const div = document.createElement('div');
        div.className = 'flex gap-2.5 sm:gap-3' + (sender === 'user' ? ' justify-end' : '');
        div.innerHTML = sender === 'user' ?
            `<div class="chat-bubble-user p-3 sm:p-4 text-xs sm:text-sm max-w-[85%]">${text}</div>` :
            `<div class="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0"><i class="fa-solid fa-sparkles"></i></div>
             <div class="chat-bubble-ai p-3 sm:p-4 text-xs sm:text-sm max-w-[85%]">${text}</div>`;
        win.appendChild(div);
        win.scrollTop = win.scrollHeight;
    },

    appendLoading() {
        const win = document.getElementById('aiChatWindow');
        const id = 'ld_' + Date.now();
        const div = document.createElement('div');
        div.id = id;
        div.className = 'flex gap-2.5 sm:gap-3';
        div.innerHTML = `<div class="chat-bubble-ai p-3 text-xs text-amber-400">جاري التفكير...</div>`;
        win.appendChild(div);
        return id;
    },

    removeLoading(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    },

    clearChat() {
        State.chat = [];
        State.save();
        document.getElementById('aiChatWindow').innerHTML = `<div class="chat-bubble-ai p-3 text-xs">تم تنظيف المحادثة.</div>`;
        Toast.show('تم مسح المحادثة');
    },

    sendPreset(text) {
        document.getElementById('aiChatInput').value = text;
        this.send(text);
    },

    async testKey() {
        const box = document.getElementById('aiTestResult');
        box.classList.remove('hidden');
        box.textContent = 'جاري الاختبار...';
        const key = document.getElementById('apiKeyInput').value.trim();
        try {
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${key}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: 'اختبار' }] }] })
            });
            if (!res.ok) throw new Error();
            box.className = 'text-[11px] text-center text-emerald-400';
            box.textContent = '✓ المفتاح يعمل بشكل صحيح';
        } catch {
            box.className = 'text-[11px] text-center text-red-400';
            box.textContent = '✗ فشل المفتاح';
        }
    },

    goToChatWithContext() {
        UI.switchTab('ai-assistant');
        this.append('ai', `تم تحميل وثيقة تشخيصك. كيف يمكنني إلهامك اليوم؟`);
    }
};
