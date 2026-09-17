'use strict';

export const Storage = {
    PREFIX: 'meeraj_v13_',
    isAvailable() {
        try {
            const k = '__t__';
            localStorage.setItem(k, '1');
            localStorage.removeItem(k);
            return true;
        } catch { return false; }
    },
    get(key, fallback = null) {
        try {
            const raw = localStorage.getItem(this.PREFIX + key);
            if (raw === null) return fallback;
            return JSON.parse(raw);
        } catch { return fallback; }
    },
    set(key, value) {
        try {
            localStorage.setItem(this.PREFIX + key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.warn('Storage.set فشل:', e);
            return false;
        }
    },
    remove(key) {
        try { localStorage.removeItem(this.PREFIX + key); } catch {}
    },
    clearAll() {
        try {
            Object.keys(localStorage)
                .filter(k => k.startsWith(this.PREFIX))
                .forEach(k => localStorage.removeItem(k));
        } catch {}
    },
    exportAll() {
        const out = {};
        try {
            Object.keys(localStorage)
                .filter(k => k.startsWith(this.PREFIX))
                .forEach(k => {
                    out[k.replace(this.PREFIX, '')] = JSON.parse(localStorage.getItem(k));
                });
        } catch {}
        return out;
    },
    importAll(obj) {
        if (!obj || typeof obj !== 'object') throw new Error('صيغة غير صحيحة');
        Object.entries(obj).forEach(([k, v]) => this.set(k, v));
    }
};

const DEFAULT_STATE = {
    version: 13,
    settings: {
        apiKey: '',
        model: 'gemini-1.5-flash-latest',
        theme: 'dark',
        reducedMotion: false
    },
    profile: {
        tier: 'المستكشف المعرفي',
        totalHours: 0,
        streak: 0,
        lastActive: null,
        vark: null,
        ocean: null,
        capacity: 45,
        chrono: 'النمط الصباحي (Lark)',
        friction: 'تسويف طلب المثالية',
        completedQuiz: false
    },
    course: {
        title: 'هندسة الذكاء الاصطناعي',
        totalHours: 66,
        completedHours: 0,
        dailyHours: 2,
        restWeekends: true,
        startDate: new Date().toISOString().split('T')[0],
        notes: [],
        retentionStats: { high: 0, mid: 0, low: 0, zero: 0 }
    },
    ledger: [],
    chat: [],
    quizHistory: []
};

const deepMerge = (base, override) => {
    if (Array.isArray(base)) return Array.isArray(override) ? override : base;
    if (typeof base !== 'object' || base === null) return override ?? base;
    const out = { ...base };
    for (const k of Object.keys(override || {})) {
        out[k] = deepMerge(base[k], override[k]);
    }
    return out;
};

export const State = {
    _data: null,
    load() {
        const saved = Storage.get('state', null);
        this._data = saved ? deepMerge(DEFAULT_STATE, saved) : JSON.parse(JSON.stringify(DEFAULT_STATE));
        return this._data;
    },
    save() {
        Storage.set('state', this._data);
    },
    get data() { return this._data; },
    get settings() { return this._data.settings; },
    get profile() { return this._data.profile; },
    get course() { return this._data.course; },
    get ledger() { return this._data.ledger; },
    get chat() { return this._data.chat; },
    reset() {
        this._data = JSON.parse(JSON.stringify(DEFAULT_STATE));
        this.save();
    }
};
