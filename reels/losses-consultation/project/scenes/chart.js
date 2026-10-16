// Candle chart drawn from data (no images). Candles form wick → body at their reveal time rv(i).
import { pill, UP, DN, RED, INK } from './lib.js';
export function chart(ctx, t, lt, cfg) {
  const { X, at, E } = ctx, cs = cfg.c, n = cfg.n ?? cs.length, b = cfg.box;
  const lo = cfg.lo, hi = cfg.hi, step = b.w / n, XI = i => b.x + step * (i + .5), Y = p => b.y + b.h - (p - lo) / (hi - lo) * b.h;
  if (cfg.grid !== false) { X.strokeStyle = 'rgba(147,170,220,.07)'; X.lineWidth = 1;
    for (let k = 0; k <= 6; k++) { const y = b.y + b.h * k / 6; X.beginPath(); X.moveTo(b.x, y); X.lineTo(b.x + b.w, y); X.stroke(); } }
  const anns = cfg.anns || [];
  for (const a of anns.filter(a => a.under)) ann(a);
  cs.forEach((c, i) => {
    const t0 = cfg.rv(i), k = at(lt, t0, t0 + (cfg.grow || .3), 'cubicOut'); if (k <= 0) return;
    const [o, h, l, cl] = c, up = cl >= o, x = XI(i), mid = Y(o);
    const col = cfg.color ? cfg.color(i, up) : (up ? UP : DN);
    const wk = Math.min(1, k * 1.6), bk = E.cubicOut(Math.max(0, (k - .2) / .8)), y2 = mid + (Y(cl) - mid) * bk;
    X.globalAlpha = cfg.dim ? cfg.dim(i, lt) : 1;
    X.strokeStyle = up ? col : (cfg.color ? col : '#6FA3F2'); X.lineWidth = Math.max(2, step * .1);
    X.beginPath(); X.moveTo(x, mid + (Y(h) - mid) * wk); X.lineTo(x, mid + (Y(l) - mid) * wk); X.stroke();
    if (cfg.glow && cfg.glow(i)) { X.shadowColor = col; X.shadowBlur = 22; }
    X.fillStyle = col; X.fillRect(x - step * .32, Math.min(mid, y2), step * .64, Math.max(2, Math.abs(y2 - mid))); X.shadowBlur = 0;
    X.globalAlpha = 1;
  });
  for (const a of anns.filter(a => !a.under)) ann(a);
  function ann(a) {
    const k = at(lt, a.t, a.t + (a.d || .55), 'expoOut'), out = a.tEnd ? 1 - at(lt, a.tEnd, a.tEnd + .35) : 1; if (k <= 0 || out <= 0) return;
    X.save(); X.globalAlpha = out;
    const tagA = at(lt, a.t + .2, a.t + .6) * out;
    if (a.type === 'hline') {
      const x0 = XI(a.i0) - step / 2, x1 = a.i1 != null ? XI(a.i1) + step / 2 : b.x + b.w, y = Y(a.p);
      X.strokeStyle = a.col; X.lineWidth = a.w || 3; if (a.dash) X.setLineDash(a.dash);
      if (a.glowLine) { X.shadowColor = a.col; X.shadowBlur = 18; }
      X.beginPath(); X.moveTo(x0, y); X.lineTo(x0 + (x1 - x0) * k, y); X.stroke(); X.setLineDash([]); X.shadowBlur = 0;
      if (a.ar || a.en) pill(ctx, a.lx ?? (x0 + x1) / 2, y + (a.ly ?? -36), a.ar, a.en, a.col, tagA, a.align || 'center', { size: a.size || 28 });
    } else if (a.type === 'rect') {
      const x0 = XI(a.i0) - step / 2, x1 = a.i1 != null ? XI(a.i1) + step / 2 : b.x + b.w, y0 = Y(a.p1), y1 = Y(a.p0);
      X.globalAlpha = out * k; X.fillStyle = a.fill; X.fillRect(x0, y0, (x1 - x0) * k, y1 - y0);
      X.strokeStyle = a.col; X.lineWidth = a.w || 2.5; if (a.dash) X.setLineDash(a.dash); X.strokeRect(x0, y0, (x1 - x0) * k, y1 - y0); X.setLineDash([]);
      if (a.pulse) { const q = a.pulse(lt); if (q > 0) { X.shadowColor = a.col; X.shadowBlur = 40 * q; X.lineWidth = 4; X.strokeRect(x0, y0, x1 - x0, y1 - y0); X.shadowBlur = 0; } }
      X.globalAlpha = out;
      if (a.ar || a.en) pill(ctx, a.lx ?? x1 - 8, a.lyAbs ?? (y0 + y1) / 2 + (a.ly || 0), a.ar, a.en, a.col, tagA, a.align || 'right', { size: a.size || 26 });
    } else if (a.type === 'sweep') {
      const x = XI(a.i), y = Y(a.p), r = 16 + 44 * at(lt, a.t, a.t + .8, 'expoOut');
      X.strokeStyle = a.col; X.lineWidth = 4; X.globalAlpha = out * Math.max(.35, 1 - at(lt, a.t + .3, a.t + 1.1));
      X.beginPath(); X.arc(x, y, r, 0, 6.283); X.stroke(); X.globalAlpha = out; X.fillStyle = a.col; X.beginPath(); X.arc(x, y, 8, 0, 6.283); X.fill();
      if (a.ar || a.en) pill(ctx, a.lx ?? x, y + (a.ly ?? 74), a.ar, a.en, a.col, tagA, a.align || 'center', { size: a.size || 26 });
    } else if (a.type === 'arrow') {
      const x = XI(a.i), y = Y(a.p), dir = a.dir === 'up' ? 1 : -1, len = 80 * k, y0 = y + dir * (36 + len);
      X.strokeStyle = a.col; X.fillStyle = a.col; X.lineWidth = 9; X.lineCap = 'round'; X.shadowColor = a.col; X.shadowBlur = 16;
      X.beginPath(); X.moveTo(x, y0); X.lineTo(x, y + dir * 36); X.stroke();
      X.beginPath(); X.moveTo(x, y + dir * 14); X.lineTo(x - 20, y + dir * 44); X.lineTo(x + 20, y + dir * 44); X.closePath(); X.fill(); X.shadowBlur = 0;
      if (a.ar || a.en) pill(ctx, a.lx ?? x, y0 + dir * 38, a.ar, a.en, a.col, tagA, a.align || 'center', { size: a.size || 28 });
    }
    X.restore();
  }
  return { XI, Y, step };
}
