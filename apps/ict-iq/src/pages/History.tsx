import { Link } from 'react-router-dom';
import { getHistory, deleteAttempt } from '../lib/session';
import { useState } from 'react';
export default function History() {
  const [h, setH] = useState(getHistory().slice().reverse());
  if (!h.length) return <div className="card p-8 text-center text-mut">ما فيه نتائج محفوظة على هذا الجهاز للحين. <Link to="/" className="text-cyan">ابدأ اختبار</Link></div>;
  const best = Math.max(...h.map(x => x.result?.score ?? 0));
  return (<div className="fade-in space-y-3"><h2 className="text-2xl font-black">نتائجي السابقة</h2>
    {h.map((a, i) => { const prev = h[i + 1]?.result?.score, d = prev != null && a.result ? a.result.score - prev : null;
      return <div key={a.id} className="card flex flex-wrap items-center justify-between gap-3 p-4">
        <div><b className="font-num text-2xl" dir="ltr">{a.result?.score ?? '—'}<span className="text-sm text-mut"> /200</span></b>
          {d != null && <span className={'mr-2 font-num text-sm ' + (d >= 0 ? 'text-up' : 'text-down')} dir="ltr">{d >= 0 ? '+' : ''}{d}</span>}
          {a.result?.score === best && <span className="chip mr-2 !text-cyan">الأفضل</span>}
          <p className="text-sm text-mut">{a.name} · {a.result?.level} · {a.size} سؤال · {a.mode === 'practice' ? 'Practice' : 'IQ Challenge'} · {new Date(a.date).toLocaleString('en-GB')}</p></div>
        <div className="flex gap-2"><Link className="btn-ghost !py-2" to={'/results/' + a.id}>التقرير</Link><button className="btn-ghost !py-2 text-down" onClick={() => { if (confirm('حذف هذه النتيجة؟')) { deleteAttempt(a.id); setH(getHistory().slice().reverse()); } }}>حذف</button></div></div>; })}</div>);
}
