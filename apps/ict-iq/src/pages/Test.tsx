import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { getBank, SECTIONS } from '../lib/bank';
import { credit, scoreAttempt, type Attempt } from '../lib/scoring';
import { getCurrent, setCurrent, clearCurrent, pushHistory } from '../lib/session';
import CandleChart from '../components/CandleChart';
const TYPE: Record<string, string> = { mcq: 'Multiple Choice', tf: 'True / False', chart: 'Chart Analysis', scenario: 'Scenario Decision', analytical: 'Advanced Analytical' };
const DIFF: Record<string, string> = { easy: 'Easy', medium: 'Medium', hard: 'Hard', expert: 'Expert' };
export default function Test() {
  const nav = useNavigate(), bank = useMemo(getBank, []);
  const [a, setA] = useState<Attempt | null>(getCurrent()), [now, setNow] = useState(Date.now()), [checked, setChecked] = useState(false), [showGrid, setShowGrid] = useState(false);
  const shownAt = useRef(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  useEffect(() => { shownAt.current = Date.now(); setChecked(false); }, [a?.cur]);
  const remain = a ? Math.max(0, a.limitSec - Math.floor((now - a.startedAt) / 1000)) : 0;
  useEffect(() => { if (a && !a.finishedAt && remain === 0) finish(a); }, [remain]); // time is up → submit
  if (!a || a.finishedAt) return <Navigate to="/" replace />;
  const q = bank.find(x => x.id === a.qids[a.cur]);
  if (!q) return <div className="card p-6">السؤال غير موجود في البنك (ربما حُذف من لوحة الإدارة). <button className="btn-ghost" onClick={() => go(1)}>التالي</button></div>;
  const rec = a.answers[q.id], answeredN = a.qids.filter(id => a.answers[id]?.choice).length, practice = a.mode === 'practice', locked = practice && checked;
  function upd(n: Attempt) { setA(n); setCurrent(n); }
  function choose(id: string) { if (locked || !a) return; const prevMs = a.answers[q!.id]?.ms ?? 0;
    upd({ ...a, answers: { ...a.answers, [q!.id]: { qid: q!.id, choice: id, ms: prevMs + (Date.now() - shownAt.current), flagged: a.answers[q!.id]?.flagged } } }); shownAt.current = Date.now(); }
  function go(d: number) { if (!a) return; const cur = Math.min(a.qids.length - 1, Math.max(0, a.cur + d)); upd({ ...a, cur }); }
  function jump(i: number) { if (!a) return; upd({ ...a, cur: i }); setShowGrid(false); }
  function flag() { if (!a) return; const r = a.answers[q!.id] || { qid: q!.id, ms: 0 }; upd({ ...a, answers: { ...a.answers, [q!.id]: { ...r, flagged: !r.flagged } } }); }
  function finish(x: Attempt) { const done = { ...x, finishedAt: Date.now() }; done.result = scoreAttempt(done, bank); pushHistory(done); clearCurrent(); nav('/results/' + done.id); }
  const mm = String(Math.floor(remain / 60)).padStart(2, '0'), ss = String(remain % 60).padStart(2, '0'), opts = a.order[q.id].map(id => q.options.find(o => o.id === id)!).filter(Boolean);
  const sec = SECTIONS.find(s => s.id === q.section)!, isLast = a.cur === a.qids.length - 1;
  const optCls = (id: string) => { const base = 'card w-full p-4 text-right transition '; if (locked) { if (id === q.answer) return base + '!border-up bg-up/10'; if (q.partial?.[id]) return base + '!border-liq/70'; if (id === rec?.choice) return base + '!border-down bg-down/10'; return base + 'opacity-60'; }
    return base + (rec?.choice === id ? '!border-cyan bg-royal/20 ring-1 ring-cyan/60' : 'hover:border-cyan/40'); };
  return (<div className="fade-in space-y-4">
    <div className="card sticky top-2 z-20 flex flex-wrap items-center justify-between gap-3 p-3">
      <div className="flex items-center gap-3 text-sm"><b className="font-num">{a.cur + 1}<span className="text-mut"> / {a.qids.length}</span></b><span className="text-mut">· أجبت {answeredN} · باقي {a.qids.length - answeredN}</span></div>
      <div className="flex items-center gap-2"><span className={'font-num text-lg font-extrabold ' + (remain < 120 ? 'text-down' : 'text-cyan')} dir="ltr">{mm}:{ss}</span>
        <button className="btn-ghost !px-3 !py-1.5 text-sm" onClick={() => setShowGrid(v => !v)}>كل الأسئلة</button></div>
      <div className="h-1 w-full overflow-hidden rounded bg-white/5"><div className="h-full bg-gradient-to-l from-cyan to-royal" style={{ width: `${100 * answeredN / a.qids.length}%` }} /></div>
    </div>
    {showGrid && <div className="card grid grid-cols-8 gap-2 p-3 sm:grid-cols-12">{a.qids.map((id, i) => { const r = a.answers[id];
      return <button key={id} onClick={() => jump(i)} className={'rounded-lg border py-1.5 font-num text-xs ' + (i === a.cur ? 'border-cyan text-cyan' : r?.flagged ? 'border-liq text-liq' : r?.choice ? 'border-royal bg-royal/20' : 'border-line text-mut')}>{i + 1}</button>; })}</div>}
    <article className="card space-y-4 p-4 sm:p-6">
      <div className="flex flex-wrap gap-2 text-xs"><span className="chip">{sec.ar}</span><span className="chip en !text-[10px]">{TYPE[q.type]}</span><span className="chip en !text-[10px]">{DIFF[q.difficulty]}</span></div>
      <h2 className="text-xl font-extrabold leading-relaxed sm:text-2xl">{q.question}</h2>
      {q.chart && <CandleChart spec={q.chart} selected={rec?.choice} onPick={q.chart.targets ? choose : undefined} reveal={locked ? q.answer : undefined} />}
      {q.chart?.targets && <p className="text-xs text-mut">اضغط على المنطقة في الشارت أو اختر من القائمة.</p>}
      <div className="grid gap-2">{opts.map(o => <button key={o.id} data-opt={o.id} onClick={() => choose(o.id)} className={optCls(o.id)}>
        <span className="flex items-start gap-3">{q.chart?.targets && <span className="en mt-0.5 text-[11px] text-cyan">{o.id.toUpperCase()}</span>}<span className="font-bold leading-relaxed">{o.text}</span></span></button>)}</div>
      {practice && !locked && <button className="btn-ghost w-full" disabled={!rec?.choice} onClick={() => setChecked(true)}>تحقّق من الإجابة</button>}
      {locked && <div className={'rounded-xl border p-4 text-sm leading-relaxed ' + (credit(q, rec?.choice) === 1 ? 'border-up/50 bg-up/5' : credit(q, rec?.choice) > 0 ? 'border-liq/50 bg-liq/5' : 'border-down/50 bg-down/5')}>
        <b>{credit(q, rec?.choice) === 1 ? 'إجابة صحيحة ✓' : credit(q, rec?.choice) > 0 ? 'إجابة مقبولة لكنها ليست الأفضل' : 'إجابة غير صحيحة'}</b><p className="mt-1 text-ink/90">{q.explanation}</p></div>}
    </article>
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex gap-2"><button className="btn-ghost" onClick={() => go(-1)} disabled={a.cur === 0}>السابق</button><button className="btn-ghost" onClick={flag}>{rec?.flagged ? 'إلغاء العلامة' : 'علّم للرجوع'}</button></div>
      <div className="flex gap-2">{!isLast && !rec?.choice && <button className="btn-ghost" onClick={() => go(1)}>تخطّي</button>}
        {isLast ? <button className="btn-primary" onClick={() => { if (answeredN < a.qids.length && !confirm(`باقي ${a.qids.length - answeredN} سؤال بدون إجابة. تسلّم الاختبار؟`)) return; finish(a); }}>إنهاء وعرض النتيجة</button>
          : <button className="btn-primary" onClick={() => go(1)}>التالي</button>}</div></div>
    {!isLast && <button className="mx-auto block text-xs text-mut underline" onClick={() => { if (confirm(`تسلّم الاختبار الحين؟ (أجبت ${answeredN} من ${a.qids.length})`)) finish(a); }}>تسليم الاختبار الآن</button>}
  </div>);
}
