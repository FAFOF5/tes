import { Question } from '../../types';

export const QUICK_QUESTIONS: Question[] = [
  {
    id: 1,
    stage: 'المحطة 1: نمط الاستيعاب',
    question: 'لما تبي تفهم موضوع جديد ومعقد، وش أول شيء يخلي عقلك يستوعب الفكرة بدون مجهود؟',
    hint: 'اختر التصرف التلقائي اللي ترتاح له على طول.',
    options: [
      { label: 'أحتاج أشوف خريطة ذهنية أو مخططات توضح الصورة كاملة.', type: 'vark', value: 'visual' },
      { label: 'أفضل أسمع واحد يشرحها بصوته بأسلوب بودكاست.', type: 'vark', value: 'auditory' },
      { label: 'أحب أقرأ المقال بنفسي وألخص بروقان ورقة وقلم.', type: 'vark', value: 'reading' },
      { label: 'ما أفهم صح إلا لما أجرب بنفسي وأطبق بيدي.', type: 'vark', value: 'kinesthetic' },
    ],
  },
  {
    id: 2,
    stage: 'المحطة 2: السعة المعرفية',
    question: 'كم تقدر تصمد في تركيز عميق بدون فتح الجوال؟',
    hint: 'المدة الفعلية الواقعية.',
    options: [
      { label: '25 دقيقة تقريباً.', type: 'capacity', value: 25 },
      { label: '45 دقيقة تقريباً.', type: 'capacity', value: 45 },
      { label: '90 دقيقة تقريباً.', type: 'capacity', value: 90 },
      { label: 'أكثر من ساعتين متصلة.', type: 'capacity', value: 120 },
    ],
  },
];

export function generate100Questions(): Question[] {
  const list: Question[] = [];
  for (let i = 1; i <= 100; i++) {
    list.push({
      id: i,
      stage: `فحص البند ${i} من 100`,
      question: `سؤال تشخيصي فريد رقم ${i}: كيف تتعامل مع التشتت الذهني في مواقف التعلم المعقدة؟`,
      hint: 'اختر الاستجابة الأقرب لسلوكك الواقعي.',
      options: [
        { label: 'أستخدم التدوين والتخطيط البصري.', type: 'vark', value: 'visual' },
        { label: 'أحاول التطبيق التجريبي المباشر.', type: 'vark', value: 'kinesthetic' },
        { label: 'أستمع لشرح تفاعلي.', type: 'vark', value: 'auditory' },
        { label: 'أقرأ المراجع المكتوبة بعناية.', type: 'vark', value: 'reading' },
      ],
    });
  }
  return list;
}
