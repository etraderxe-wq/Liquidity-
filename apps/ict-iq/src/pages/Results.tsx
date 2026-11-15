import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { getBank, SECTIONS } from '../lib/bank';
import { DIMS, LEVELS, credit, levelOf } from '../lib/scoring';
import { getHistory } from '../lib/session';
import { buildPlan, weakDims, strongDims } from '../lib/plan';
import { certId, downloadCertificate, shareCertificate } from '../lib/certificate';
import CandleChart from '../components/CandleChart';
export default function Results() {
  const { id } = useParams(), hist = getHistory(), a = hist.find(x => x.id === id), bank = useMemo(getBank, []);
  const [review, setReview] = useState(false), [busy, setBusy] = useState('');
  if (!a?.result) return <div className="card p-6">النتيجة غير موجودة. <Link className="text-cyan" to="/history">نتائجي</Link></div>;
  const r = a.result, lv = levelOf(r.score), practice = a.mode === 'practice';
  const radar = DIMS.filter(d => d.id !== 'knowledge' && r.dims[d.id] >= 0).map(d => ({ k: d.en, v: r.dims[d.id] }));
  const trend = hist.filter(x => x.result && x.mode === 'challenge').map((x, i) => ({ n: i + 1, score: x.result!.score, date: x.date.slice(5, 10) }));
  const weak = weakDims(r).filter(d => r.dims[d.id] < 60).slice(0, 3), strong = strongDims(r).slice(0, 3), plan = buildPlan(r);
  const missed = Object.entries(r.missedConcepts.reduce<Record<string, number>>((m, x) => (m[x.concept] = (m[x.concept] || 0) + 1, m), {})).sort((x, y) => y[1] - x[1]);
  const cert = { name: a.name, score: r.score, level: lv[1], date: a.date.slice(0, 10), certId: certId(a.id, a.name, r.score) };
  const bar = (v: number) => <div className="h-2 w-full overflow-hidden rounded bg-white/5"><div className="h-full rounded bg-gradient-to-l from-cyan to-royal" style={{ width: `${Math.max(0, v)}%` }} /></div>;
  return (<div className="fade-in space-y-5">
    <section className="card relative overflow-hidden p-6 text-center sm:p-10">
      <p className="en text-xs text-cyan">OVERALL TRADING IQ SCORE</p>
      <div className="mt-3 font-num text-7xl font-extrabold sm:text-8xl" dir="ltr">{r.score}<span className="text-3xl text-mut"> / 200</span></div>
      <p className="mt-2 en text-sm text-cyan">{lv[1].toUpperCase()}</p><p className="text-mut">{lv[2]}</p>
      <div className="mx-auto mt-5 flex max-w-xl flex-wrap justify-center gap-2 text-xs"><span className="chip">الدقة الموزونة {r.accuracy}%</span><span className="chip">صحيحة {r.correct} / {a.qids.length}</span>
        <span className="chip">مُجاب {r.answered}</span><span className="chip">إضافة سرعة القرار +{r.speedBonus}</span><span className="chip">{practice ? 'Practice Mode' : 'IQ Challenge'}</span></div>
      <div className="mx-auto mt-6 flex max-w-3xl overflow-hidden rounded-lg text-[10px]">{[...LEVELS].reverse().map(([min, en], i, arr) => { const max = i < arr.length - 1 ? arr[i + 1][0] : 201;
        return <div key={en} className={'flex-1 border-l border-navy px-1 py-2 ' + (r.score >= min && r.score < max ? 'bg-cyan text-navy font-bold' : 'bg-white/5 text-mut')} style={{ flexGrow: max - min }}>{en}<br />{min}–{max - 1}</div>; })}</div>
    </section>
    <section className="grid gap-5 lg:grid-cols-2">
      <div className="card p-4"><h3 className="mb-2 font-extrabold">خريطة المهارات <span className="en text-[10px] text-mut">RADAR</span></h3>
        <div className="h-72" dir="ltr"><ResponsiveContainer><RadarChart data={radar} outerRadius="72%"><PolarGrid stroke="rgba(147,170,220,.2)" /><PolarAngleAxis dataKey="k" tick={{ fill: '#9AA4B8', fontSize: 10 }} />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} /><Radar dataKey="v" stroke="#93F9FF" fill="#3977D5" fillOpacity={.45} /></RadarChart></ResponsiveContainer></div></div>
      <div className="card space-y-3 p-4"><h3 className="font-extrabold">التقييم حسب المجال</h3>
        {DIMS.map(d => r.dims[d.id] >= 0 && <div key={d.id}><div className="mb-1 flex justify-between text-sm"><span>{d.ar} <span className="en text-[9px] text-mut">{d.en}</span></span><b className="font-num">{r.dims[d.id]}%</b></div>{bar(r.dims[d.id])}</div>)}</div>
    </section>
    <section className="grid gap-5 lg:grid-cols-2">
      <div className="card p-4"><h3 className="mb-3 font-extrabold">حسب القسم</h3><div className="space-y-2">{SECTIONS.filter(s => r.sections[s.id] >= 0).map(s =>
        <div key={s.id}><div className="mb-1 flex justify-between text-sm"><span>{s.ar}</span><b className="font-num">{r.sections[s.id]}%</b></div>{bar(r.sections[s.id])}</div>)}</div></div>
      <div className="card p-4"><h3 className="mb-2 font-extrabold">تطوّر نتائجك <span className="en text-[10px] text-mut">PERFORMANCE</span></h3>
        {trend.length > 1 ? <div className="h-64" dir="ltr"><ResponsiveContainer><LineChart data={trend}><CartesianGrid stroke="rgba(147,170,220,.1)" /><XAxis dataKey="date" tick={{ fill: '#9AA4B8', fontSize: 11 }} />
          <YAxis domain={[0, 200]} tick={{ fill: '#9AA4B8', fontSize: 11 }} /><Tooltip contentStyle={{ background: '#0A0F1C', border: '1px solid #1d2840' }} /><Line type="monotone" dataKey="score" stroke="#93F9FF" strokeWidth={2.5} dot={{ r: 4 }} /></LineChart></ResponsiveContainer></div>
          : <p className="py-10 text-center text-sm text-mut">يظهر الرسم بعد محاولتين أو أكثر بوضع IQ Challenge على هذا الجهاز.</p>}</div>
    </section>
    <section className="grid gap-5 lg:grid-cols-2">
      <div className="card p-4"><h3 className="mb-2 font-extrabold text-up">وين تتفوّق</h3>{strong.length ? <ul className="space-y-1 text-sm">{strong.map(d => <li key={d.id}>• {d.ar}: {r.dims[d.id]}%</li>)}</ul> : <p className="text-sm text-mut">ما فيه مجال وصل 70% للحين.</p>}</div>
      <div className="card p-4"><h3 className="mb-2 font-extrabold text-down">الفجوات المعرفية</h3>{weak.length ? <ul className="space-y-1 text-sm">{weak.map(d => <li key={d.id}>• {d.ar}: {r.dims[d.id]}%</li>)}</ul> : <p className="text-sm text-mut">ما فيه مجال تحت 60%.</p>}</div>
    </section>
    <section className="card p-4"><h3 className="mb-2 font-extrabold">المفاهيم اللي تحتاج مراجعة</h3>
      {missed.length ? <div className="flex flex-wrap gap-2">{missed.map(([c, n]) => <span key={c} className="chip !text-ink">{c}{n > 1 ? ` ×${n}` : ''}</span>)}</div> : <p className="text-sm text-mut">ما فيه أخطاء 👏</p>}</section>
    <section className="card p-4"><h3 className="mb-3 font-extrabold">خطة تعليمية مقترحة · 30 يوم</h3><div className="grid gap-3 md:grid-cols-2">{plan.map(w =>
      <div key={w.week} className="rounded-xl border border-line p-3"><b className="text-cyan">{w.week <= 4 ? `الأسبوع ${w.week}: ` : ''}{w.title}</b><ul className="mt-1 space-y-1 text-sm text-ink/90">{w.items.map(i => <li key={i}>• {i}</li>)}</ul></div>)}</div></section>
    <section className="card flex flex-wrap items-center justify-between gap-3 p-4">
      <div><b>شهادة الإنجاز</b><p className="text-sm text-mut">{practice ? 'الشهادة متاحة لنتائج وضع IQ Challenge فقط.' : `رقم الشهادة ${cert.certId}`}</p></div>
      {!practice && <div className="flex flex-wrap gap-2"><button className="btn-primary" disabled={!!busy} onClick={async () => { setBusy('pdf'); await downloadCertificate(cert, 'pdf'); setBusy(''); }}>تحميل PDF</button>
        <button className="btn-ghost" disabled={!!busy} onClick={async () => { setBusy('png'); await downloadCertificate(cert, 'png'); setBusy(''); }}>صورة PNG</button>
        <button className="btn-ghost" disabled={!!busy} onClick={async () => { setBusy('s'); if (!(await shareCertificate(cert).catch(() => false))) await downloadCertificate(cert, 'png'); setBusy(''); }}>مشاركة</button></div>}</section>
    <section className="card p-4"><button className="btn-ghost w-full" onClick={() => setReview(v => !v)}>{review ? 'إخفاء مراجعة الإجابات' : 'مراجعة الإجابات والشرح'}</button>
      {review && <div className="mt-4 space-y-4">{a.qids.map((qid, i) => { const q = bank.find(x => x.id === qid); if (!q) return null; const ch = a.answers[qid]?.choice, c = credit(q, ch);
        return <div key={qid} className={'rounded-xl border p-4 ' + (c === 1 ? 'border-up/40' : c > 0 ? 'border-liq/40' : 'border-down/40')}>
          <p className="text-xs text-mut">{i + 1} · {q.concept} · {q.difficulty}</p><p className="mt-1 font-bold">{q.question}</p>
          {q.chart && <div className="mt-2"><CandleChart spec={q.chart} selected={ch} reveal={q.answer} /></div>}
          <p className="mt-2 text-sm">إجابتك: <b>{q.options.find(o => o.id === ch)?.text ?? '—'}</b></p>
          {c < 1 && <p className="text-sm text-up">الأفضل: <b>{q.options.find(o => o.id === q.answer)?.text}</b></p>}
          <p className="mt-2 text-sm text-ink/80">{q.explanation}</p></div>; })}</div>}</section>
    <div className="flex flex-wrap justify-center gap-2"><Link className="btn-primary" to="/">اختبار جديد</Link><Link className="btn-ghost" to="/history">كل نتائجي</Link></div>
  </div>);
}
