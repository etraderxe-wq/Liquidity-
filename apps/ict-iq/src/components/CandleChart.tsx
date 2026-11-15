import { useMemo, useState } from 'react';
import type { ChartSpec } from '../types';
// TradingView-style SVG candlestick chart: price axis, levels (BSL/SSL/EQ…), zones (FVG/OB/premium…), labels and clickable answer targets.
const KIND: Record<string, string> = { bsl: '#FF8A4C', ssl: '#FF8A4C', level: '#F2F4F8', eq: '#93F9FF', entry: '#FCFCFC', sl: '#FF4D5E', tp: '#2EE6A6' };
const ZONE: Record<string, [string, string]> = { fvg: ['rgba(147,249,255,.14)', '#93F9FF'], ob: ['rgba(87,161,239,.18)', '#57A1EF'], premium: ['rgba(255,77,94,.07)', 'rgba(255,77,94,.5)'],
  discount: ['rgba(46,230,166,.07)', 'rgba(46,230,166,.5)'], poi: ['rgba(57,119,213,.22)', '#57A1EF'], breaker: ['rgba(255,138,76,.14)', '#FF8A4C'] };
export default function CandleChart({ spec, selected, onPick, reveal }: { spec: ChartSpec; selected?: string; onPick?: (id: string) => void; reveal?: string }) {
  const [hover, setHover] = useState<string>();
  const W = 760, H = 420, padR = 64, padT = 28, padB = 24;
  const n = spec.candles.length + 3;
  const { lo, hi } = useMemo(() => { const ps = spec.candles.flatMap(c => [c[1], c[2]]).concat((spec.levels || []).map(l => l.price), (spec.zones || []).flatMap(z => [z.from, z.to]), (spec.targets || []).flatMap(t => [t.from, t.to]));
    const a = Math.min(...ps), b = Math.max(...ps), m = (b - a) * .08; return { lo: a - m, hi: b + m }; }, [spec]);
  const st = (W - padR) / n, X = (i: number) => st * (i + .5), Y = (p: number) => padT + (H - padT - padB) * (1 - (p - lo) / (hi - lo));
  const ticks = Array.from({ length: 6 }, (_, k) => lo + (hi - lo) * k / 5);
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-line bg-[#060911]" dir="ltr">
      <div className="absolute left-3 top-2 z-10 flex gap-2 text-[11px] text-mut"><span className="font-num font-bold text-ink/80">ICT·SIM</span>{spec.tf && <span className="font-num">{spec.tf}</span>}{spec.title && <span>{spec.title}</span>}</div>
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full select-none" role="img" aria-label="candlestick chart">
        {ticks.map((p, k) => <g key={k}><line x1={0} x2={W - padR} y1={Y(p)} y2={Y(p)} stroke="rgba(255,255,255,.05)" /><text x={W - padR + 8} y={Y(p) + 4} fill="#6B7488" fontSize={11} fontFamily="Inter">{p.toFixed(1)}</text></g>)}
        {(spec.zones || []).filter(z => reveal || !(spec.targets || []).some(t => Math.abs(t.from - z.from) < 1e-6 && Math.abs(t.to - z.to) < 1e-6)).map((z, k) => { const [f, s] = ZONE[z.kind] || ZONE.poi; const x0 = X(z.i0) - st / 2, x1 = z.i1 != null ? X(z.i1) + st / 2 : W - padR;
          return <g key={k}><rect x={x0} y={Y(Math.max(z.from, z.to))} width={x1 - x0} height={Math.abs(Y(z.from) - Y(z.to))} fill={f} stroke={s} strokeWidth={1} />
            <text x={x1 - 6} y={Y(Math.max(z.from, z.to)) + 14} textAnchor="end" fill={s} fontSize={11} fontFamily="Inter" fontWeight={700}>{z.label}</text></g>; })}
        {spec.candles.map((c, i) => { const [o, h, l, cl] = c, up = cl >= o, col = up ? '#2EE6A6' : '#FF4D5E', x = X(i), bw = st * .62;
          return <g key={i}><line x1={x} x2={x} y1={Y(h)} y2={Y(l)} stroke={col} strokeWidth={1.6} /><rect x={x - bw / 2} y={Y(Math.max(o, cl))} width={bw} height={Math.max(1.5, Math.abs(Y(o) - Y(cl)))} fill={col} rx={1} /></g>; })}
        {(spec.levels || []).map((l, k) => <g key={k}><line x1={0} x2={W - padR} y1={Y(l.price)} y2={Y(l.price)} stroke={KIND[l.kind]} strokeWidth={1.4} strokeDasharray={l.kind === 'level' || l.kind === 'entry' ? '' : '7 5'} />
          <rect x={W - padR} y={Y(l.price) - 9} width={padR} height={18} fill={KIND[l.kind]} /><text x={W - padR + 4} y={Y(l.price) + 4} fill="#05070C" fontSize={10} fontFamily="Inter" fontWeight={800}>{l.label}</text></g>)}
        {(spec.labels || []).map((b, k) => <text key={k} x={X(b.i)} y={Y(b.price)} textAnchor="middle" fill="#F2F4F8" fontSize={12} fontFamily="Inter" fontWeight={700}>{b.text}</text>)}
        {(spec.targets || []).map(t => { const x0 = X(t.i0) - st / 2, x1 = X(t.i1) + st / 2, on = selected === t.id, rv = reveal === t.id, hv = hover === t.id;
          return <g key={t.id} data-target={t.id} className="cursor-pointer" onClick={() => onPick?.(t.id)} onMouseEnter={() => setHover(t.id)} onMouseLeave={() => setHover(undefined)}>
            <rect x={x0} y={Y(Math.max(t.from, t.to))} width={x1 - x0} height={Math.abs(Y(t.from) - Y(t.to))} rx={6}
              fill={rv ? 'rgba(46,230,166,.25)' : on ? 'rgba(147,249,255,.25)' : hv ? 'rgba(147,249,255,.12)' : 'rgba(147,249,255,.03)'} stroke={rv ? '#2EE6A6' : on ? '#93F9FF' : 'rgba(147,249,255,.45)'} strokeWidth={on || rv ? 2 : 1} strokeDasharray={on || rv ? '' : '4 4'} />
            <text x={x0 + 6} y={Y(Math.max(t.from, t.to)) - 5} fill={on ? '#93F9FF' : '#9AA4B8'} fontSize={11} fontFamily="Inter" fontWeight={800}>{t.id.toUpperCase()}</text></g>; })}
      </svg>
    </div>);
}
