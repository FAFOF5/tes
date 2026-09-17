
import { State } from '../config/state';

export class BlueprintGenerator {
  public static generateExhaustiveReport(): {
    oceanAnalysis: string;
    iqAnalysis: string;
    hbdiAnalysis: string;
    strengthsAnalysis: string;
    frictionFixes: string;
    studyStrategy: string;
  } {
    const p = State.data.profile;

    const oceanAnalysis = `
      <p>• <strong>الانفتاح المعرفي والتجريب (Openness): ${p.ocean.openness}%</strong> — تمتاز بعقل استكشافي يميل للنظريات المفاهيمية المعقدة ورؤية الصورة الكلية دون التقيد بالمسارات الروتينية التقليدية.</p>
      <p>• <strong>الانضباط وإرادة الإنجاز (Conscientiousness): ${p.ocean.conscientiousness}%</strong> — تمتلك قدرة عالية على ضبط الذات والالتزام بخطط التعلم الموزونة مع حاجتك لفواصل مرنة لمنع الإرهاق.</p>
      <p>• <strong>الاستقرار الانفعالي (Neuroticism): ${p.ocean.neuroticism}%</strong> — قدرة ممتازة على التكيف مع ضغوطات التأخر والتراجع دون الوقوع في جلد الذات المفرط.</p>
    `;

    const iqAnalysis = `
      <p>• <strong>درجة الذكاء السائل المقدرة (Fluid IQ Estimation): ${p.iq.fluidIqEst} (مستوى متتقدم)</strong> — قدرة فائقة على استنباط الأنماط والروابط التجريدية الهندسية بدون نصوص لغوية.</p>
      <p>• <strong>سرعة المعالجة البصرية (Pattern Speed): ${p.iq.patternSpeedSec} ثانية/مصفوفة</strong> — استجابة حركية سريعة في التعرف على الثغرات التناظرية.</p>
      <p>• <strong>سعة الذاكرة العاملة (Working Memory): ~${p.workingMemoryMin} دقيقة</strong> — المدة المثالية لشوط التركيز الصافي بدون تشتت رقمي.</p>
    `;

    const hbdiAnalysis = `
      <p>• <strong>الربع D (النمط الإبداعي الاستبصاري - ${p.hbdi.creativeD}%):</strong> الهيمنة العظمى لعقلك تتمثل في الربط الفريد بين المفاهيم المتباعدة وابتكار حلول برمجية ومفهومية من الفراغ.</p>
      <p>• <strong>الربع A (النمط التحليلي المنطقي - ${p.hbdi.analyticalA}%):</strong> قدرة نقدية عالية في تشريح الأرقام والثغرات الإجرائية.</p>
      <p>• <strong>النمط الاستيعابي التكاملي (Kolb Inventory):</strong> تعتمد على النمط <strong>${p.kolbStyle}</strong>، حيث تحول المفاهيم النظرية فورياً إلى تجارب تطبيقية بيدك.</p>
    `;

    const strengthsAnalysis = `
      <p>• <strong>المهارات الفطرية السائدة (CliftonStrengths):</strong> ${p.cliftonStrengths.join(' ، ')}.</p>
      <p>• <strong>الذكاء العاطفي والاجتماعي (MSCEIT Score: ${p.msceitEqScore}):</strong> القدرة على إدارة المشاعر الذاتية وتوجيهها لتسهيل التفكير الصافي.</p>
    `;

    const frictionFixes = `
      <p>• <strong>ثغرة تسويف طلب المثالية (Perfectionist Procrastination):</strong> تأجيل البدء حتى تكتمل جميع الظروف والمصادر. <em>العلاج: الالتزام بقاعدة (إنجاز خفيف ناضج خير من تخطيط كامل مؤجل).</em></p>
      <p>• <strong>ثغرة التشتت لكثرة المراجع:</strong> جمع عشرات الكتب في نفس الوقت. <em>العلاج: إغلاق جميع التبويبات والتركيز على مرجع واحد حتى إنهاء 66 ساعة.</em></p>
    `;

    const studyStrategy = `
      <p>1. <strong>التقسيم إلى مكعبات معرفية (Chunking):</strong> قسم الكتاب الضخم إلى أجزاء بحجم 20 صفحة لكل شوط ${p.workingMemoryMin} دقيقة.</p>
      <p>2. <strong>الشرح الذاتي التفاعلي (Feynman Technique):</strong> استخدم المايكرفون لإملاء واستبصار المفاهيم بكلماتك التلقائية.</p>
      <p>3. <strong>الخرائط البصرية الرقمية:</strong> حوّل الفصل المعقد إلى رسم راداري أو مخطط كتل تناظري.</p>
    `;

    return { oceanAnalysis, iqAnalysis, hbdiAnalysis, strengthsAnalysis, frictionFixes, studyStrategy };
  }
}