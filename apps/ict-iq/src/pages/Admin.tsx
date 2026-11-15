import { useMemo, useState } from 'react';
import { jsPDF } from 'jspdf';
import type { Question, Difficulty, SectionId } from '../types';
import { getBank, getOverlay, upsertQuestion, deleteQuestion, resetBank, validate, SECTIONS, DEFAULT_POINTS, pts, BUILTIN } from '../lib/bank';
import { getHistory } from '../lib/session';
import { credit } from '../lib/scoring';
import { saveFile } from '../lib/save';
import CandleChart from '../components/CandleChart';
const TEMPLATE: Question = { id: 'NEW-01', section: 'structure', type: 'mcq', difficulty: 'medium', skills: ['structure'], concept: 'مفهوم جديد',
  question: 'نص السؤال؟', options: [{ id: 'a', text: 'خيار أ' }, { id: 'b', text: 'خيار ب' }, { id: 'c', text: 'خيار ج' }, { id: 'd', text: 'خيار د' }], answer: 'a', explanation: 'الشرح.' };
type Tab = 'questions' | 'results' | 'concepts';
export default function Admin() {
  const [tab, setTab] = useState<Tab>('questions'), [ver, setVer] = useState(0);
  const bank = useMemo(() => { void ver; return getBank(); }, [ver]), overlay = useMemo(() => { void ver; return getOverlay(); }, [ver]);
  const [sec, setSec] = useState<SectionId | 'all'>('all'), [diff, setDiff] = useState<Difficulty | 'all'>('all'), [q, setQ] = useState('');
  const [edit, setEdit] = useState<{ text: string; isNew: boolean } | null>(null), [msg, setMsg] = useState('');
  const hist = getHistory().filter(a => a.result);
  const list = bank.filter(x => (sec === 'all' || x.section === sec) && (diff === 'all' || x.difficulty === diff) && (!q || (x.id + x.question + x.concept).toLowerCase().includes(q.toLowerCase())));
  const parsed = useMemo(() => { if (!edit) return null; try { const v = JSON.parse(edit.text) as Question; return { q: v, errs: validate(v) }; } catch (e) { return { q: null, errs: ['JSON: ' + (e as Error).message] }; } }, [edit]);
  const save = () => { if (!parsed?.q || parsed.errs.length) return; if (edit!.isNew && bank.some(b => b.id === parsed.q!.id)) { setMsg('المعرّف مستخدم: ' + parsed.q.id); return; }
    upsertQuestion(parsed.q); setEdit(null); setMsg('تم الحفظ: ' + parsed.q.id); setVer(v => v + 1); };
  // most failed concepts across all saved attempts
  const fails = useMemo(() => { const m: Record<string, { concept: string; wrong: number; seen: number }> = {};
    hist.forEach(a => a.qids.forEach(id => { const qq = bank.find(b => b.id === id); if (!qq) return; const k = qq.concept, r = (m[k] ??= { concept: k, wrong: 0, seen: 0 }); r.seen++; if (credit(qq, a.answers[id]?.choice) < 1) r.wrong++; }));
    return Object.values(m).filter(r => r.wrong).sort((x, y) => y.wrong / y.seen - x.wrong / x.seen || y.wrong - x.wrong); }, [hist, bank]);
  const board = [...hist].filter(a => a.mode === 'challenge').sort((x, y) => y.result!.score - x.result!.score);
  const exportBank = () => { const blob = new Blob([JSON.stringify(bank, null, 2)], { type: 'application/json' }); saveFile('ict-iq-questions.json', blob); };
  const importBank = (f: File) => f.text().then(t => { try { const arr = JSON.parse(t) as Question[]; const bad = arr.map(x => [x.id, validate(x)] as const).filter(x => x[1].length);
    if (bad.length) { setMsg('ملف غير صالح: ' + bad.slice(0, 3).map(b => b[0] + ' (' + b[1].join(', ') + ')').join(' · ')); return; }
    arr.forEach(upsertQuestion); setMsg(`تم استيراد ${arr.length} سؤال`); setVer(v => v + 1); } catch (e) { setMsg('JSON: ' + (e as Error).message); } });
  const pdfReport = () => { const d = new jsPDF({ unit: 'pt', format: 'a4' }); let y = 50; const line = (t: string, s = 10, b = false) => { if (y > 800) { d.addPage(); y = 50; } d.setFont('helvetica', b ? 'bold' : 'normal'); d.setFontSize(s); d.text(t, 40, y); y += s + 6; };
    line('EMULLAX | ICT TRADING IQ — Admin Report', 16, true); line('Generated ' + new Date().toISOString().slice(0, 16).replace('T', ' ') + ' · local browser data only', 9); y += 8;
    line(`Question bank: ${bank.length} questions · Attempts: ${hist.length}`, 11, true);
    SECTIONS.forEach(s => line(`  ${s.en}: ${bank.filter(b => b.section === s.id).length}`));
    y += 8; line('Leaderboard (IQ Challenge)', 12, true); board.slice(0, 20).forEach((a, i) => line(`  ${i + 1}. ${a.name.replace(/[^\x20-\x7E]/g, '?')} — ${a.result!.score}/200 — ${a.result!.level} — ${a.size}Q — ${a.date.slice(0, 10)}`));
    if (!board.length) line('  No attempts yet.');
    y += 8; line('Most failed concepts (by question id)', 12, true);
    fails.slice(0, 25).forEach(f => { const ids = bank.filter(b => b.concept === f.concept).map(b => b.id).join(', '); line(`  ${ids}: wrong ${f.wrong}/${f.seen} (${Math.round(100 * f.wrong / f.seen)}%)`); });
    if (!fails.length) line('  No data yet.');
    saveFile('ict-iq-admin-report.pdf', d.output('blob')); };
  const T = (id: Tab, t: string) => <button className={'rounded-lg px-4 py-2 text-sm ' + (tab === id ? 'bg-cyan text-navy font-bold' : 'text-mut hover:text-ink')} onClick={() => setTab(id)}>{t}</button>;
  return (<div className="fade-in space-y-4">
    <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-2xl font-black">لوحة الإدارة</h2>
      <div className="card flex gap-1 p-1">{T('questions', 'الأسئلة')}{T('results', 'النتائج والمتصدرين')}{T('concepts', 'أكثر المفاهيم خطأ')}</div></div>
    <p className="text-xs text-mut">البيانات هنا (التعديلات والنتائج) محفوظة في هذا المتصفح فقط. لنشر التعديلات للكل: صدّر JSON واستبدل ملفات <span className="en">src/data/questions</span>.</p>
    {msg && <div className="card border-cyan/40 p-3 text-sm" onClick={() => setMsg('')}>{msg}</div>}
    {tab === 'questions' && !edit && <>
      <div className="card flex flex-wrap items-center gap-2 p-3">
        <input className="input flex-1 min-w-[160px]" placeholder="بحث بالنص أو المعرّف" value={q} onChange={e => setQ(e.target.value)} />
        <select className="input" value={sec} onChange={e => setSec(e.target.value as SectionId | 'all')}><option value="all">كل الأقسام</option>{SECTIONS.map(s => <option key={s.id} value={s.id}>{s.ar}</option>)}</select>
        <select className="input" value={diff} onChange={e => setDiff(e.target.value as Difficulty | 'all')}><option value="all">كل الصعوبات</option>{Object.keys(DEFAULT_POINTS).map(d => <option key={d} value={d}>{d}</option>)}</select>
        <button className="btn-primary !py-2" onClick={() => setEdit({ text: JSON.stringify(TEMPLATE, null, 2), isNew: true })}>+ سؤال جديد</button>
        <button className="btn-ghost !py-2" onClick={exportBank}>تصدير JSON</button>
        <label className="btn-ghost !py-2 cursor-pointer">استيراد JSON<input type="file" accept="application/json" hidden onChange={e => e.target.files?.[0] && importBank(e.target.files[0])} /></label>
        <button className="btn-ghost !py-2 text-down" onClick={() => { if (confirm('إرجاع بنك الأسئلة للأصل وحذف كل التعديلات؟')) { resetBank(); setVer(v => v + 1); setMsg('تم الإرجاع للأصل'); } }}>إرجاع للأصل</button>
      </div>
      <p className="text-sm text-mut">{list.length} من {bank.length} سؤال · معدّل {Object.keys(overlay.upserts).length} · محذوف {overlay.deleted.length}</p>
      <div className="space-y-2">{list.map(x => <div key={x.id} className="card flex flex-wrap items-center gap-3 p-3">
        <span className="en w-14 text-[11px] text-cyan">{x.id}</span>
        <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{x.question}</p><p className="text-xs text-mut">{SECTIONS.find(s => s.id === x.section)?.ar} · {x.type} · {x.difficulty} · {pts(x)} نقاط{x.chart ? ' · شارت' : ''}{overlay.upserts[x.id] ? ' · معدّل' : ''}</p></div>
        <button className="btn-ghost !px-3 !py-1.5 text-sm" onClick={() => setEdit({ text: JSON.stringify(x, null, 2), isNew: false })}>تعديل</button>
        <button className="btn-ghost !px-3 !py-1.5 text-sm text-down" onClick={() => { if (confirm('حذف ' + x.id + '؟')) { deleteQuestion(x.id); setVer(v => v + 1); } }}>حذف</button></div>)}</div>
    </>}
    {tab === 'questions' && edit && <div className="grid gap-4 lg:grid-cols-2">
      <div className="card p-3"><p className="mb-2 text-sm text-mut">حرّر السؤال بصيغة JSON — الصعوبة <span className="en">difficulty</span>، النقاط <span className="en">points</span>، والشارت <span className="en">chart</span> (شموع [open,high,low,close]، مستويات، مناطق، وأهداف قابلة للضغط <span className="en">targets</span> بنفس معرّف الخيار).</p>
        <textarea dir="ltr" className="input h-[520px] w-full font-mono text-xs" value={edit.text} onChange={e => setEdit({ ...edit, text: e.target.value })} spellCheck={false} />
        <div className="mt-2 flex flex-wrap gap-2">
          <button className="btn-ghost !py-1.5 text-sm" onClick={() => { try { const v = JSON.parse(edit.text); v.chart = v.chart ?? { title: 'Chart', tf: 'M15', candles: [[100, 102, 99, 101], [101, 104, 100, 103], [103, 104, 98, 99]], levels: [], zones: [], targets: [] }; setEdit({ ...edit, text: JSON.stringify(v, null, 2) }); } catch { /* invalid json */ } }}>+ إضافة شارت</button>
          {(['easy', 'medium', 'hard', 'expert'] as Difficulty[]).map(d => <button key={d} className="chip" onClick={() => { try { const v = JSON.parse(edit.text); v.difficulty = d; setEdit({ ...edit, text: JSON.stringify(v, null, 2) }); } catch { /* */ } }}>{d}</button>)}
        </div></div>
      <div className="card space-y-3 p-3"><b>معاينة</b>
        {parsed?.errs.length ? <div className="rounded-lg border border-down/40 p-2 text-sm text-down">أخطاء: {parsed.errs.join(' · ')}</div> : <div className="text-sm text-up">صالح ✓ · {parsed?.q && pts(parsed.q)} نقاط</div>}
        {parsed?.q && <><p className="font-bold">{parsed.q.question}</p>{parsed.q.chart && <CandleChart spec={parsed.q.chart} reveal={parsed.q.answer} />}
          <ul className="space-y-1 text-sm">{parsed.q.options?.map(o => <li key={o.id} className={o.id === parsed.q!.answer ? 'text-up' : ''}>{o.id}) {o.text}</li>)}</ul></>}
        <div className="flex gap-2"><button className="btn-primary" disabled={!!parsed?.errs.length} onClick={save}>حفظ</button><button className="btn-ghost" onClick={() => setEdit(null)}>إلغاء</button>
          {!edit.isNew && BUILTIN.some(b => b.id === parsed?.q?.id) && overlay.upserts[parsed!.q!.id] && <button className="btn-ghost text-sm" onClick={() => { const o = getOverlay(); delete o.upserts[parsed!.q!.id]; localStorage.setItem('iq.bank.overlay', JSON.stringify(o)); setEdit(null); setVer(v => v + 1); }}>إرجاع النسخة الأصلية</button>}</div></div>
    </div>}
    {tab === 'results' && <div className="space-y-4">
      <div className="flex flex-wrap gap-2"><button className="btn-primary !py-2" onClick={pdfReport}>تقرير PDF</button><span className="chip">محاولات {hist.length}</span>
        {hist.length > 0 && <span className="chip">متوسط {Math.round(hist.reduce((s, a) => s + a.result!.score, 0) / hist.length)} / 200</span>}</div>
      <div className="card overflow-x-auto p-3"><b>المتصدرين <span className="en text-[10px] text-mut">IQ CHALLENGE</span></b>
        {board.length ? <table className="mt-2 w-full text-sm"><thead className="text-mut"><tr><th className="p-2 text-right">#</th><th className="p-2 text-right">الاسم</th><th className="p-2">النتيجة</th><th className="p-2">المستوى</th><th className="p-2">الأسئلة</th><th className="p-2">التاريخ</th></tr></thead>
          <tbody>{board.map((a, i) => <tr key={a.id} className="border-t border-line"><td className="p-2 font-num">{i + 1}</td><td className="p-2">{a.name}</td><td className="p-2 text-center font-num font-bold">{a.result!.score}</td><td className="p-2 text-center en text-[10px]">{a.result!.level}</td><td className="p-2 text-center font-num">{a.size}</td><td className="p-2 text-center font-num">{a.date.slice(0, 10)}</td></tr>)}</tbody></table>
          : <p className="py-6 text-center text-sm text-mut">ما فيه نتائج IQ Challenge على هذا المتصفح للحين.</p>}</div>
      <div className="card overflow-x-auto p-3"><b>كل النتائج</b>{hist.length ? <table className="mt-2 w-full text-sm"><tbody>{[...hist].reverse().map(a => <tr key={a.id} className="border-t border-line"><td className="p-2">{a.name}</td><td className="p-2 font-num">{a.result!.score}</td><td className="p-2">{a.mode}</td><td className="p-2 font-num">{a.result!.correct}/{a.qids.length}</td><td className="p-2 font-num">{new Date(a.date).toLocaleString('en-GB')}</td></tr>)}</tbody></table> : <p className="py-6 text-center text-sm text-mut">لا توجد بيانات.</p>}</div>
    </div>}
    {tab === 'concepts' && <div className="card p-3"><b>أكثر المفاهيم خطأً</b>
      {fails.length ? <div className="mt-3 space-y-2">{fails.slice(0, 30).map(f => { const p = Math.round(100 * f.wrong / f.seen); return <div key={f.concept}><div className="mb-1 flex justify-between text-sm"><span>{f.concept}</span><span className="font-num text-mut">{f.wrong}/{f.seen} · {p}%</span></div>
        <div className="h-2 rounded bg-white/5"><div className="h-full rounded bg-down/80" style={{ width: p + '%' }} /></div></div>; })}</div>
        : <p className="py-6 text-center text-sm text-mut">تظهر هنا بعد أول اختبار مكتمل.</p>}</div>}
  </div>);
}
