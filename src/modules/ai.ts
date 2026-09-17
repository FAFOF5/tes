
import { State } from '../config/state';
import { ApiVaultEngine } from './vault';

export class AiEngine {
  public static async sendMessage(prompt: string): Promise<string> {
    const apiKey = ApiVaultEngine.getActiveKey();
    if (!apiKey) {
      return "⚠️ لا يوجد مفتاح API نشط. يرجى فتح 'خزانة المفاتيح' أعلى الصفحة لإدخال مفتاح شخصي أو استخدام المجمع العام.";
    }

    const profile = State.data.profile;
    const model = State.data.settings.model || 'gemini-1.5-flash-latest';

    const systemInstructionText = `
      أنت "مرشد البصيرة المعرفية" في منصة مِعراج. تقرأ التقرير النفسي والذهني الكامل للمستفيد:
      - الذكاء السائل المقدر: ${profile.iq.fluidIqEst}
      - نمط السيطرة الدماغية HBDI: الربع الإبداعي D (${profile.hbdi.creativeD}%) والتحليلي A (${profile.hbdi.analyticalA}%)
      - نمط VARK: حركي (${profile.vark.kinesthetic}%) وبصري (${profile.vark.visual}%)
      - السعة الذهنية: ${profile.workingMemoryMin} دقيقة
      - نقاط القوة: ${profile.cliftonStrengths.join(', ')}
      أجب بعمق ورزانة وتشجيع، وقدم حلولاً مخصصة تناسب نمطه الذهني فقط.
    `;

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemInstructionText }] }
        })
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "لم يتم استلام رد من النموذج.";
    } catch (err: any) {
      return `تعذر الاتصال بالذكاء الاصطناعي: ${err.message || 'خطأ في الشبكة'}.`;
    }
  }
}
