import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBank, SECTIONS } from '../lib/bank';
import { buildAttempt, type Mode } from '../lib/scoring';
import { getCurrent, setCurrent, clearCurrent, getHistory } from '../lib/session';
import { load, save } from '../lib/storage';
export default function Home() {
  const nav = useNavigate(), cur = getCurrent(), bank = getBank(), hist = getHistory();
  const [name, setName] = useState(load('iq.name', '')), [size, setSize] = useState<20 | 100>(20), [mode, setMode] = useState<Mode>('challenge');
  const start = () => { save('iq.name', name); const a = buildAttempt(bank, size, mode, name.trim() || 'Trader'); setCurrent(a); nav('/test'); };
  const opt = (on: boolean) => 'card cursor-pointer p-4 text-right transition ' + (on ? '!border-cyan/70 bg-royal/10' : 'hover:border-cyan/30');
  return (<div className="fade-in space-y-8">
    <section className="pt-6 text-center">
      <p className="en text-xs text-cyan">EMULLAX | ICT TRADING IQ</p>
      <h1 className="mt-3 text-4xl font-black leading-tight sm:text-6xl">قِس ذكاءك في<br /><span className="bg-gradient-to-l from-cyan to-royal bg-clip-text text-transparent">منظومة ICT</span></h1>
      <p className="mx-auto mt-4 max-w-2xl text-mut">اختبار احترافي يقيس فهمك للهيكل والسيولة والـ FVG والأوردر بلوك والوقت، وقدرتك على قراءة الشارت واتخاذ القرار وإدارة المخاطر — مو مجرد حفظ تعريفات.</p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">{SECTIONS.map(s => <span key={s.id} className="chip">{s.ar}</span>)}</div>
    </section>
    {cur && !cur.finishedAt && <div className="card flex flex-wrap items-center justify-between gap-3 p-4">
      <div><b>عندك اختبار ما خلّص</b><p className="text-sm text-mut">{Object.keys(cur.answers).filter(k => cur.answers[k].choice).length} / {cur.qids.length} سؤال · تم الحفظ تلقائياً</p></div>
      <div className="flex gap-2"><button className="btn-primary" onClick={() => nav('/test')}>كمّل الاختبار</button><button className="btn-ghost" onClick={() => { clearCurrent(); nav(0); }}>إلغاء</button></div></div>}
    <section className="card space-y-6 p-5 sm:p-8">
      <label className="block"><span className="mb-2 block text-sm text-mut">اسمك (يظهر على الشهادة)</span><input className="w-full" value={name} onChange={e => setName(e.target.value)} placeholder="مثال: Ebrahim" maxLength={40} /></label>
      <div><p className="mb-2 text-sm text-mut">نوع الاختبار</p><div className="grid gap-3 sm:grid-cols-2">
        <button className={opt(size === 20)} onClick={() => setSize(20)}><b className="text-lg">اختبار سريع · 20 سؤال</b><p className="text-sm text-mut">سؤالين من كل قسم (سهل/متوسط + صعب/خبير) · 25 دقيقة</p></button>
        <button className={opt(size === 100)} onClick={() => setSize(100)}><b className="text-lg">اختبار شامل · 100 سؤال</b><p className="text-sm text-mut">كل الأقسام العشرة · 110 دقائق</p></button></div></div>
      <div><p className="mb-2 text-sm text-mut">الوضع</p><div className="grid gap-3 sm:grid-cols-2">
        <button className={opt(mode === 'challenge')} onClick={() => setMode('challenge')}><b className="text-lg">IQ Challenge</b><p className="text-sm text-mut">بدون مساعدة · الإجابات والشرح بعد ما تخلّص · يحسب التقييم والشهادة</p></button>
        <button className={opt(mode === 'practice')} onClick={() => setMode('practice')}><b className="text-lg">Practice Mode</b><p className="text-sm text-mut">شرح الإجابة مباشرة بعد كل سؤال · للتعلّم</p></button></div></div>
      <button className="btn-primary w-full text-lg" onClick={start} disabled={!bank.length}>ابدأ الاختبار</button>
      <p className="text-center text-xs text-mut">بنك الأسئلة الحالي: {bank.length} سؤال · الترتيب والخيارات عشوائية كل مرة{hist.length ? ` · محاولاتك السابقة: ${hist.length}` : ''}</p>
    </section>
    <section className="grid gap-3 text-sm sm:grid-cols-3">
      {[['5 أنواع أسئلة', 'اختيار من متعدد، صح/خطأ، تحليل شارت تفاعلي، سيناريو قرار، أسئلة تحليلية متقدمة'], ['تقييم من 200', 'يعتمد على صحة الإجابة ووزن الصعوبة وجودة القرار؛ السرعة إضافة بسيطة ما تحسب بدون إجابة صحيحة'], ['تقرير وخطة 30 يوم', 'نقاط القوة والضعف، المفاهيم اللي تحتاج مراجعة، وشهادة PDF']].map(([t, d]) =>
        <div key={t} className="card p-4"><b className="text-cyan">{t}</b><p className="mt-1 text-mut">{d}</p></div>)}</section>
  </div>);
}
