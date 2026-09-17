'use strict';

import { State } from '../config/state.js';
import { Toast } from '../ui/toast.js';
import { UI } from '../ui/navigation.js';

export const Scoring = {
    tally: null,
    init() {
        this.tally = {
            vark: { visual: 0, auditory: 0, reading: 0, kinesthetic: 0 },
            ocean: { openness: 0, conscientiousness: 0, extraversion: 0, agreeableness: 0, stability: 0 },
            capacity: [], chrono: [], friction: [], meta: []
        };
    },
    record(answer) {
        if (!this.tally) this.init();
        const { type, value } = answer || {};
        if (!type) return;

        if (type === 'vark') {
            if (this.tally.vark[value] !== undefined) this.tally.vark[value]++;
        } else if (type === 'ocean_o') {
            this.tally.ocean.openness += (value === 'high' ? 2 : value === 'low' ? -2 : 0);
        } else if (type === 'ocean_c') {
            this.tally.ocean.conscientiousness += (value === 'high' ? 2 : value === 'low' ? -2 : 0);
        } else if (type === 'ocean_e') {
            this.tally.ocean.extraversion += (value === 'extrovert' ? 2 : value === 'introvert' ? -2 : 0);
        } else if (type === 'ocean_a') {
            this.tally.ocean.agreeableness += (value === 'high' ? 2 : value === 'low' ? -2 : 0);
        } else if (type === 'ocean_n') {
            this.tally.ocean.stability += (value === 'high' ? -2 : value === 'low' ? 2 : 0);
        } else if (type === 'capacity') {
            this.tally.capacity.push(Number(value) || 45);
        } else if (type === 'chrono') {
            this.tally.chrono.push(value);
        } else if (type === 'friction') {
            this.tally.friction.push(value);
        }
    },
    compute() {
        if (!this.tally) this.init();
        const v = this.tally.vark;
        const sum = Object.values(v).reduce((a, b) => a + b, 0) || 1;
        const vark = {
            visual: Math.round((v.visual / sum) * 100),
            auditory: Math.round((v.auditory / sum) * 100),
            reading: Math.round((v.reading / sum) * 100),
            kinesthetic: Math.round((v.kinesthetic / sum) * 100)
        };
        const norm = (val) => Math.round(((Math.max(-20, Math.min(20, val)) + 20) / 40) * 100);
        const ocean = {
            openness: norm(this.tally.ocean.openness),
            conscientiousness: norm(this.tally.ocean.conscientiousness),
            extraversion: norm(this.tally.ocean.extraversion),
            agreeableness: norm(this.tally.ocean.agreeableness),
            stability: norm(this.tally.ocean.stability)
        };
        const cap = this.tally.capacity.length ? this.tally.capacity[Math.floor(this.tally.capacity.length / 2)] : 45;
        const mostFreq = (arr, fallback) => {
            if (!arr.length) return fallback;
            const map = {}; arr.forEach(x => map[x] = (map[x] || 0) + 1);
            return Object.keys(map).sort((a, b) => map[b] - map[a])[0];
        };
        return { vark, ocean, capacity: cap, chrono: mostFreq(this.tally.chrono, 'النمط الصباحي (Lark)'), friction: mostFreq(this.tally.friction, 'تسويف طلب المثالية') };
    },
    dominantVark(vark) {
        if (!vark) return '—';
        const sorted = Object.entries(vark).sort((a, b) => b[1] - a[1]);
        const labels = { visual: 'بصري', auditory: 'سمعي', reading: 'تدويني', kinesthetic: 'تطبيقي حركي' };
        if (sorted[1] && (sorted[0][1] - sorted[1][1]) <= 10) {
            return `${labels[sorted[0][0]]} + ${labels[sorted[1][0]]} (نمط مزدوج)`;
        }
        return labels[sorted[0][0]];
    }
};

export const QuickQuiz = {
    questions: [
        {
            stage: 'المحطة 1: نمط الاستيعاب',
            question: 'لما تبي تفهم موضوع جديد ومعقد، وش أول شيء يخلي عقلك يستوعب الفكرة بدون مجهود؟',
            hint: 'اختر التصرف التلقائي اللي ترتاح له على طول.',
            options: [
                { label: 'أحتاج أشوف خريطة ذهنية أو مخططات توضح الصورة كاملة.', type: 'vark', value: 'visual' },
                { label: 'أفضل أسمع واحد يشرحها بصوته بأسلوب بودكاست.', type: 'vark', value: 'auditory' },
                { label: 'أحب أقرأ المقال بنفسي وألخص بروقان ورقة وقلم.', type: 'vark', value: 'reading' },
                { label: 'ما أفهم صح إلا لما أجرب بنفسي وأطبق بيدي.', type: 'vark', value: 'kinesthetic' }
            ]
        },
        {
            stage: 'المحطة 2: تثبيت المعلومات',
            question: 'لما تخلص من دورة أو كتاب، وش الطريقة اللي تخلي المعلومات تثبت؟',
            hint: 'فكر في الطريقة الأقرب لذهنك في التذكر.',
            options: [
                { label: 'أتذكر الشكليات والألوان والأشكال البصرية.', type: 'vark', value: 'visual' },
                { label: 'أتذكر الجمل والنبرات والأصوات.', type: 'vark', value: 'auditory' },
                { label: 'أتذكر الكلمات والملاحظات المكتوبة بيدي.', type: 'vark', value: 'reading' },
                { label: 'أتذكر التجربة والخطوات العملية.', type: 'vark', value: 'kinesthetic' }
            ]
        },
        {
            stage: 'المحطة 3: الانضباط والتخطيط',
            question: 'كيف تحب ترتيب جدولك لما تبدأ هدفاً يستمر لأشهر؟',
            hint: 'نقيس مستوى المرونة أو الصرامة المطلوبة.',
            options: [
                { label: 'جدول صارم بالدقيقة، وما يرتاح بالي إلا لما أخلص.', type: 'ocean_c', value: 'high' },
                { label: 'خطوط عريضة مرنة أتحرك فيها حسب طاقتي.', type: 'ocean_c', value: 'med' },
                { label: 'أعتمد على الحماس اللحظي.', type: 'ocean_c', value: 'low' }
            ]
        },
        {
            stage: 'المحطة 4: التكيف مع الضغوط',
            question: 'إذا مر أسبوع زحمة وشفت نفسك متأخراً، وش ردة فعلك؟',
            hint: 'نضبط خوارزمية استعادة التعثر.',
            options: [
                { label: 'أتوتر بشدة وأضغط نفسي لأعوّض.', type: 'ocean_n', value: 'high' },
                { label: 'أعيد ترتيب أوراقي بهدوء وأعدّل الخطة.', type: 'ocean_n', value: 'low' },
                { label: 'أشعر بإحباط مؤقت ثم أستعيد توازني.', type: 'ocean_n', value: 'med' }
            ]
        },
        {
            stage: 'المحطة 5: السعة المعرفية',
            question: 'كم تقدر تصمد في تركيز عميق بدون فتح الجوال؟',
            hint: 'المدة الفعلية الواقعية، لا المثالية.',
            options: [
                { label: '25 دقيقة تقريباً.', type: 'capacity', value: 25 },
                { label: '45 دقيقة تقريباً.', type: 'capacity', value: 45 },
                { label: '90 دقيقة تقريباً.', type: 'capacity', value: 90 },
                { label: 'أكثر من ساعتين متصلة.', type: 'capacity', value: 120 }
            ]
        },
        {
            stage: 'المحطة 6: ذروة النشاط',
            question: 'متى عقلك في أوج صفائه لاستيعاب المفاهيم الصعبة؟',
            hint: 'مهم لتوزيع ساعات التعلم.',
            options: [
                { label: 'الصبح بدري مع أول القهوة.', type: 'chrono', value: 'النمط الصباحي (Lark)' },
                { label: 'الظهيرة وبعد العصر.', type: 'chrono', value: 'ذروة منتصف النهار (Third Bird)' },
                { label: 'الليل في الهدوء التام.', type: 'chrono', value: 'النمط المسائي (Owl)' }
            ]
        },
        {
            stage: 'المحطة 7: ما وراء المعرفة',
            question: 'وانت تدرس ولاحظت إنك ما فهمت جزئية، وش تسوي؟',
            hint: 'قياس قدرتك على توجيه عقلك ذاتياً.',
            options: [
                { label: 'أتوقف وأشرحها لنفسي أو أبحث عن شرح بديل.', type: 'meta', value: 'high' },
                { label: 'أستمر وأقول يمكن تتضح لاحقاً.', type: 'meta', value: 'med' },
                { label: 'أتجاوزها أو أصكر الكتاب مؤقتاً.', type: 'meta', value: 'low' }
            ]
        },
        {
            stage: 'المحطة 8: الثغرة السلوكية',
            question: 'وش أكبر فخ يخليك تسحب على هدف بديت فيه بحماس؟',
            hint: 'نحدد الفخ لتحميك منه تلقائياً.',
            options: [
                { label: 'طلب المثالية — أنتظر ظروفاً مثالية ثم أؤجل.', type: 'friction', value: 'تسويف طلب المثالية' },
                { label: 'التشتت وكثرة المصادر — أجمع ولا أكمل.', type: 'friction', value: 'التشتت وكثرة المصادر' },
                { label: 'انخفاض الشغف السريع — أمل وأبحث عن جديد.', type: 'friction', value: 'انخفاض الشغف السريع' }
            ]
        },
        {
            stage: 'المحطة 9: الشغف والمهارات',
            question: 'لو عندك فرصة تحترف مجالاً جديداً، وش يشدك أكثر؟',
            hint: 'نربط بنيتك النفسية بالمهارات الأنسب.',
            options: [
                { label: 'الذكاء الاصطناعي والأمن السيبراني.', type: 'skill', value: 'tech' },
                { label: 'القيادة والتفكير الإستراتيجية.', type: 'skill', value: 'management' },
                { label: 'الفلسفة وعلم النفس وتحليل السلوك.', type: 'skill', value: 'humanities' }
            ]
        }
    ]
};

export const RadarChart = {
    instance: null,
    render(result) {
        const canvas = document.getElementById('deepRadarChart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (this.instance) this.instance.destroy();

        const v = result.vark || {};
        const o = result.ocean || {};

        this.instance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['بصري', 'سمعي', 'تدوين', 'تطبيقي', 'الانفتاح', 'الانضباط', 'الاستقرار'],
                datasets: [{
                    label: 'بنيتك',
                    data: [v.visual || 0, v.auditory || 0, v.reading || 0, v.kinesthetic || 0, o.openness || 0, o.conscientiousness || 0, o.stability || 0],
                    backgroundColor: 'rgba(16, 185, 129, 0.25)',
                    borderColor: '#10b981',
                    borderWidth: 2,
                    pointBackgroundColor: '#f59e0b'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: { color: '#cbd5e1', font: { family: 'Cairo', size: 11 } },
                        ticks: { display: false }
                    }
                },
                plugins: { legend: { display: false } }
            }
        });
    }
};

export const Quiz = {
    state: { mode: 'quick', questions: [], index: 0, answers: [], startTime: 0, fastCount: 0 },
    start(mode) {
        this.state.mode = mode;
        this.state.questions = QuickQuiz.questions;
        this.state.index = 0;
        this.state.fastCount = 0;
        Scoring.init();

        document.getElementById('quizIntro').classList.add('hidden');
        document.getElementById('quizResults').classList.add('hidden');
        document.getElementById('quizContainer').classList.remove('hidden');

        this.render();
    },
    render() {
        const q = this.state.questions[this.state.index];
        if (!q) return;
        this.state.startTime = Date.now();

        document.getElementById('quizStageName').textContent = q.stage;
        document.getElementById('quizStepText').textContent = `البند ${this.state.index + 1} من ${this.state.questions.length}`;
        document.getElementById('quizProgressBar').style.width = `${((this.state.index + 1) / this.state.questions.length) * 100}%`;
        document.getElementById('questionText').textContent = q.question;
        document.getElementById('questionHint').textContent = q.hint || '';
        document.getElementById('prevQuestionBtn').disabled = this.state.index === 0;

        const container = document.getElementById('optionsContainer');
        container.innerHTML = '';
        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'w-full p-3.5 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-brand-500 hover:bg-brand-500/10 text-right text-xs sm:text-sm text-slate-200 transition-all flex items-center justify-between touch-tap';
            btn.onclick = () => this.select(opt);
            btn.innerHTML = `<span>${opt.label}</span><i class="fa-solid fa-chevron-left text-xs"></i>`;
            container.appendChild(btn);
        });
    },
    select(opt) {
        if (Date.now() - this.state.startTime < 600) this.state.fastCount++;
        Scoring.record(opt);

        if (opt.type === 'capacity') State.profile.capacity = Number(opt.value);
        if (opt.type === 'chrono') State.profile.chrono = opt.value;
        if (opt.type === 'friction') State.profile.friction = opt.value;

        this.state.index++;
        if (this.state.index < this.state.questions.length) this.render();
        else this.finish();
    },
    prev() {
        if (this.state.index > 0) { this.state.index--; this.render(); }
    },
    cancel() {
        document.getElementById('quizContainer').classList.add('hidden');
        document.getElementById('quizIntro').classList.remove('hidden');
    },
    finish() {
        const res = Scoring.compute();
        State.profile.vark = res.vark;
        State.profile.ocean = res.ocean;
        State.profile.capacity = res.capacity;
        State.profile.chrono = res.chrono;
        State.profile.friction = res.friction;
        State.profile.completedQuiz = true;
        State.save();

        document.getElementById('quizContainer').classList.add('hidden');
        document.getElementById('quizResults').classList.remove('hidden');
        document.getElementById('resVarkSummary').textContent = Scoring.dominantVark(res.vark);
        document.getElementById('resCapacitySummary').textContent = `جلسة مثالية ~${res.capacity} دقيقة`;
        document.getElementById('resChronoSummary').textContent = res.chrono;
        document.getElementById('resFrictionSummary').textContent = res.friction;

        RadarChart.render(res);
        if (typeof confetti === 'function') confetti({ particleCount: 80, spread: 70 });
        Toast.show('تم توليد وثيقة البصيرة المعرفية بنجاح!');
    }
};
