
import { PsychometricBattery } from '../types';

export const PSYCHOMETRIC_BATTERIES: PsychometricBattery[] = [
  {
    id: 'raven',
    category: 'cognitive',
    title: "اختبار ريفن للمصفوفات المتتابعة (Raven's Matrices)",
    desc: "المعيار العالمي لقياس الذكاء السائل (Fluid Intelligence) والقدرة على الاستنباط البصري.",
    icon: 'fa-cubes-stacked',
    color: 'cyan',
    questions: [
      {
        id: 'raven_1',
        q: "اختر الشكل المكمل للنمط الهندسي لتكتمل مصفوفة العلاقات التجريدية:",
        matrix: ['⬛', '🟦', '🟨', '❓'],
        hint: "لاحظ التتابع بالألوان والاتجاهات الحركة الزاوية.",
        options: [
          { label: "🟩 مربع أخضر بزاوية 90 درجة", score: { fluidIq: 15 } },
          { label: "🟥 مربع أحمر مظلل", score: { fluidIq: 5 } },
          { label: "🟪 مربع بنفسجي مع خطوط قطريّة", score: { fluidIq: 10 } },
          { label: "⚪ دائرة بيضاء فارغة", score: { fluidIq: 0 } }
        ]
      }
    ]
  },
  {
    id: 'cattell',
    category: 'cognitive',
    title: "اختبار كاتل للذكاء الحر ثقافياً (Cattell Culture Fair)",
    desc: "قياس المنطق التجريدي الصافي بشكل حيادي تماماً لا يتأثر بالتعليم أو اللغة.",
    icon: 'fa-shapes',
    color: 'cyan',
    questions: [
      {
        id: 'cattell_1',
        q: "حدد الشكل الشاذ الذي لا ينتمي للمجموعة الهندسية التجريدية التالية:",
        matrix: ['▲', '▲', '▼', '▲'],
        hint: "ركز على الاتجاهات والمماثلة التناظرية.",
        options: [
          { label: "▼ المثلث المعكوس للأسفل", score: { abstractScore: 20 } },
          { label: "▲ المثلث الأول القائم", score: { abstractScore: 0 } },
          { label: "▲ المثلث الثاني العادي", score: { abstractScore: 0 } }
        ]
      }
    ]
  },
  {
    id: 'vark',
    category: 'learning',
    title: "مقياس VARK 2.0 لأنماط الاستيعاب المعرفي",
    desc: "تحديد كيفية استقبال الدماغ للمعرفة (بصري، سمعي، تدويني، أو حركي).",
    icon: 'fa-eye',
    color: 'brand',
    questions: [
      {
        id: 'vark_1',
        q: "عندما تتطرق لموضوع تقني جديد ومعقد جداً، كيف تستوعبه بلمح البصر؟",
        hint: "اختر التصرف الأسرع لذهنك.",
        options: [
          { label: "أرسم خريطة ذهنية ومخطط كتل توضيحي", type: 'vark', val: 'visual' },
          { label: "أستمع لبودكاست أو شرح صوتب تفاعلي", type: 'vark', val: 'auditory' },
          { label: "أقرأ التوثيق والمقال المكتوب وألخصه بيدي", type: 'vark', val: 'reading' },
          { label: "أفتح البيئة البرمجية وأجرب بيدي خطوة بخطوة", type: 'vark', val: 'kinesthetic' }
        ]
      }
    ]
  },
  {
    id: 'hbdi',
    category: 'learning',
    title: "مقياس هيرمان للسيطرة الدماغية (HBDI - Herrmann)",
    desc: "تقسيم تفضيلات التفكير لمعالجة البيانات إلى 4 أرباع (تحليلي A، تنظيمي B، اجتماعي C، إبداعي D).",
    icon: 'fa-brain-circuit',
    color: 'brand',
    questions: [
      {
        id: 'hbdi_1',
        q: "عند البدء في مشروع تعليمي كبير، ما هو الربع الذهني الأكثر هيمنة على أسلوبك؟",
        hint: "اختر طريقة تفكيرك التلقائية.",
        options: [
          { label: "الربع A (التحليلي): دراسة الأرقام، البيانات، والجدوى النقدية", type: 'hbdi', val: 'analyticalA' },
          { label: "الربع B (التنظيمي): الخطط الصارمة، المواعيد، وإدارة الجداول", type: 'hbdi', val: 'sequentialB' },
          { label: "الربع C (المشاعري): النقاش الحواري والتفاعل الإنساني", type: 'hbdi', val: 'interpersonalC' },
          { label: "الربع D (الإبداعي): ابتكار رؤية فريدة وتجريب أفكار خارج الصندوق", type: 'hbdi', val: 'creativeD' }
        ]
      }
    ]
  },
  {
    id: 'kolb',
    category: 'learning',
    title: "مقياس كولب لدورة التعلم (Kolb Inventory)",
    desc: "تصنيف كيفية تحويل التجارب إلى معرفة (استيعابي، تقاربي، تباعدي، تكيفي).",
    icon: 'fa-rotate',
    color: 'brand',
    questions: [
      {
        id: 'kolb_1',
        q: "كيف تحول تجربة واقعية مررت بها إلى درس مستفاد في ذاكرتك؟",
        hint: "طريقة معالجة التجربة.",
        options: [
          { label: "بالتأمل والتفكر العميق من زوايا متعددة (تباعدي)", val: 'تباعدي (Diverger)' },
          { label: "بتحويل التجربة إلى نموذج ونظرية عامة (استيعابي)", val: 'استيعابي (Assimilator)' },
          { label: "باختبار حلول عملية وتطبيق المبدأ فورياً (تقاربي)", val: 'تقاربي (Converger)' }
        ]
      }
    ]
  },
  {
    id: 'big5',
    category: 'personality',
    title: "اختبار العوامل الخمسة الكبرى للشخصية (Big Five / OCEAN)",
    desc: "المعيار الذهبي المعتمد أكاديمياً لقياس أبعاد الشخصية الرئيسية.",
    icon: 'fa-compass',
    color: 'amber',
    questions: [
      {
        id: 'big5_1',
        q: "ما هو تصرفك عند مواجهة تغيرات غير متوقعة في جدول عملك؟",
        hint: "قياس الاستقرار والانفتاح.",
        options: [
          { label: "أتقبل الأمر بشغف وأبحث عن الفرص الجديدة (انفتاح مرتفع)", val: 'openness' },
          { label: "أشعر بضغط مؤقت ثم أعيد التنظيم بصارم (انضباط مرتفع)", val: 'conscientiousness' }
        ]
      }
    ]
  },
  {
    id: 'clifton',
    category: 'personality',
    title: "مقياس كليفتون لنقاط القوة الفطرية (CliftonStrengths)",
    desc: "اكتشاف المهارات الفطرية الأكثر تميزاً لدى الفرد وكيفية توجيهها للتطوير الذاتي.",
    icon: 'fa-wand-magic-sparkles',
    color: 'amber',
    questions: [
      {
        id: 'clifton_1',
        q: "ما هي القوة الفطرية التي تشعر أنها تمنحك تفوقاً بقلة مجهود؟",
        hint: "الموهبة الذاتية.",
        options: [
          { label: "القدرة على ربط المفاهيم المتباعدة واستبصار الأنماط", val: 'الربط الإستراتيجي (Strategic)' },
          { label: "توليد أفكار جديدة وإيجاد حلول غير تقليدية", val: 'المبتكر (Ideation)' },
          { label: "الإصرار وتفتيت المهام الصعبة وتنفيدها بصرامة", val: 'المحقق (Achiever)' }
        ]
      }
    ]
  },
  {
    id: 'msceit',
    category: 'personality',
    title: "مقياس الذكاء العاطفي والاجتماعي (MSCEIT)",
    desc: "قياس القدرة على فهم واستخدام العواطف لتسهيل التفكير والتكيف.",
    icon: 'fa-heart-pulse',
    color: 'amber',
    questions: [
      {
        id: 'msceit_1',
        q: "أثناء عملك الجماعي، إذا لاحظت توتراً مكتوماً بين زملاء الفريق، كيف تتصرف؟",
        hint: "إدراك المشاعر واستخدامها.",
        options: [
          { label: "أستوعب سبب التوتر وأفتح حواراً ينزع الفتيل بدبلوماسية", val: 120 },
          { label: "أركز على إنجاز المهام البرمجية وأتجاهل المشاعر المكتومة", val: 100 }
        ]
      }
    ]
  }
];

export function getMasterImperialBattery(): PsychometricBattery {
  let combinedQuestions: PsychometricBattery['questions'] = [];
  PSYCHOMETRIC_BATTERIES.forEach(b => {
    combinedQuestions = combinedQuestions.concat(b.questions);
  });

  return {
    id: 'master_imperial',
    category: 'personality',
    title: 'الاختبار النهائي الإمبراطوري الجامع (المخطط الشامل 1000 أسطر)',
    desc: 'فحص مجمع يضم جميع الاختبارات السيكومترية لإنتاج وثيقة البصيرة الشخصية الممتدة.',
    icon: 'fa-crown',
    color: 'amber',
    questions: combinedQuestions
  };
}