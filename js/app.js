'use strict';

import { State } from './config/state.js';
import { Toast } from './ui/toast.js';
import { UI, Data, Shortcuts } from './ui/navigation.js';
import { Quiz, Scoring, RadarChart } from './modules/quiz.js';
import { AI } from './modules/ai.js';
import { Timer, Ambient } from './modules/timer.js';
import { Voice } from './modules/voice.js';
import { Retention } from './modules/retention.js';
import { Courses } from './modules/courses.js';
import { Ledger, Analytics } from './modules/ledger.js';

// ربط الكائنات بالنطاق العام (Window) لضمان عمل أحداث onclick في HTML بسلاسة
window.State = State;
window.Toast = Toast;
window.UI = UI;
window.Data = Data;
window.Quiz = Quiz;
window.Scoring = Scoring;
window.RadarChart = RadarChart;
window.AI = AI;
window.Timer = Timer;
window.Ambient = Ambient;
window.Voice = Voice;
window.Retention = Retention;
window.Courses = Courses;
window.Ledger = Ledger;
window.Analytics = Analytics;

document.addEventListener('DOMContentLoaded', () => {
    // 1. تحميل الحالة المركزية
    State.load();
    UI.applyTheme(State.settings.theme);

    // 2. ربط أزرار التنقل
    document.querySelectorAll('.nav-tab').forEach(btn => {
        btn.addEventListener('click', () => UI.switchTab(btn.dataset.tab));
    });

    // 3. ربط النماذج
    const aiForm = document.getElementById('aiChatForm');
    if (aiForm) aiForm.addEventListener('submit', (e) => { e.preventDefault(); AI.send(document.getElementById('aiChatInput')?.value); });

    const courseForm = document.getElementById('courseForm');
    if (courseForm) courseForm.addEventListener('submit', (e) => Courses.calculate(e));

    const ledgerForm = document.getElementById('ledgerForm');
    if (ledgerForm) ledgerForm.addEventListener('submit', (e) => Ledger.add(e));

    // 4. تهيئة واجهة المستخدم والإحصائيات
    Courses.updateDisplay();
    Ledger.render();
    UI.updateHeaderStats();
    Shortcuts.init();

    console.log('%cمنصة مِعراج v13 | تم الإقلاع بنجاح من الوحدات المعيارية ES6 Modules', 'color: #10b981; font-weight: bold; font-size: 14px;');
});
