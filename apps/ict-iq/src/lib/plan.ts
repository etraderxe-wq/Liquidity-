import type { Result, Dim } from './scoring';
import { DIMS } from './scoring';
// 30-day plan built from the trader's actual weak dimensions (no fixed template ordering).
const LESSONS: Record<Dim, string[]> = {
  structure: ['ارسم Swing Highs/Lows على H1 يومياً وحدد الهيكل الداخلي والخارجي', 'فرّق بين BOS (استمرار) وCHoCH/MSS (تغيّر) على 10 أمثلة تاريخية', 'تدرب على شرط الإغلاق بالجسم مقابل الذيل'],
  liquidity: ['حدد BSL/SSL والقمم والقيعان المتساوية قبل افتتاح كل جلسة', 'سجّل 10 حالات Sweep وقارنها بـ 10 حالات BOS', 'تدرب على تحديد Draw on Liquidity على Daily وH4'],
  fvg_ob: ['حدد FVG بتعريف الثلاث شموع على 20 مثال وضع CE (50%)', 'قارن OB صالح (مع Displacement) بآخر غير صالح', 'افهم الفرق بين Breaker وMitigation Block'],
  mtf: ['طبق Top-Down: Weekly → Daily → H4 → M15 قبل كل يوم تداول', 'اكتب الـ Daily Bias والهدف (سيولة HTF) قبل فتح الشارت الصغير', 'لا تدخل على LTF ضد الـ HTF بدون سبب مكتوب'],
  psychology: ['سجّل حالتك النفسية قبل وبعد كل صفقة في الجورنال', 'قاعدة: توقف بعد خسارتين متتاليتين في نفس اليوم', 'راجع أي صفقة انتقامية واكتب سببها'],
  risk: ['احسب حجم اللوت لكل صفقة بنسبة مخاطرة ثابتة (مثلاً 0.5–1%)', 'حدد حد خسارة يومي وأسبوعي والتزم به', 'لا تدخل صفقة R:R فيها أقل من 1:2 إلا بسبب واضح'],
  practical: ['حلّل يومياً شارت واحد كامل: سيولة → سحب → MSS → POI → خطة', 'أعد اختبار 20 سيناريو على شارتات تاريخية (Backtest) بدون معرفة النتيجة', 'سجّل خطة الدخول/الوقف/الهدف قبل حركة السعر وقيّمها بعدين'],
  knowledge: ['راجع المفاهيم اللي غلطت فيها بالترتيب من الأصعب للأسهل', 'اكتب تعريف كل مفهوم بكلامك مع مثال شارت', 'أعد الاختبار في Practice Mode للتأكد من الفهم'] };
export function weakDims(r: Result) { return DIMS.filter(d => r.dims[d.id] >= 0).sort((a, b) => r.dims[a.id] - r.dims[b.id]); }
export function strongDims(r: Result) { return [...weakDims(r)].reverse().filter(d => r.dims[d.id] >= 70); }
export function buildPlan(r: Result): { week: number; title: string; items: string[] }[] {
  const weak = weakDims(r).filter(d => d.id !== 'knowledge').slice(0, 4);
  const concepts = [...new Set(r.missedConcepts.map(m => m.concept))];
  const weeks = weak.map((d, i) => ({ week: i + 1, title: `${d.ar} (${r.dims[d.id]}%)`, items: LESSONS[d.id] }));
  while (weeks.length < 4) weeks.push({ week: weeks.length + 1, title: 'تطبيق عملي ومراجعة', items: LESSONS.practical });
  weeks.push({ week: 5, title: 'الأيام 29–30: مراجعة وإعادة الاختبار', items: [concepts.length ? 'راجع المفاهيم: ' + concepts.slice(0, 8).join('، ') : 'راجع أصعب الأسئلة', 'أعد الاختبار بوضع IQ Challenge وقارن النتيجة'] });
  return weeks;
}
