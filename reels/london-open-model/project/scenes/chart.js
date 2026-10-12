// Animated candle chart + ICT annotations (EMULLAX blue). Everything is drawn from data.js; nothing is an image.
import { bg, rrect, FD, FN } from './lib.js';
export const UP = '#93F9FF', DN = '#3977D5', SLC = '#FF5C6C';
const W = 1080;
function tagPill(ctx, x, y, ar, en, col, a, align = 'center') {
  const { X } = ctx; if (a <= 0) return;
  X.save(); X.globalAlpha = a;
  X.font = `700 30px ${FD}`; const wa = ar ? X.measureText(ar).width : 0;
  X.font = `800 24px ${FN}`; const we = en ? X.measureText(en).width : 0;
  const gap = ar && en ? 14 : 0, w = wa + we + gap + 36, h = 48;
  let x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
  x0 = Math.max(24, Math.min(W - 24 - w, x0));
  X.fillStyle = 'rgba(0,5,26,.88)'; X.strokeStyle = col; X.lineWidth = 2; rrect(X, x0, y - h / 2, w, h, 14); X.fill(); X.stroke();
  if (ar) ctx.text(X, ar, x0 + w - 18, y + 10, { family: FD, weight: 700, size: 30, color: '#FCFCFC', align: 'right', dir: 'rtl' });
  if (en) ctx.text(X, en, x0 + 18, y + 9, { family: FN, weight: 800, size: 24, color: col, align: 'left', dir: 'ltr' });
  X.restore();
}
export function drawChart(ctx, t, lt, cfg) {
  const { X, at, E } = ctx, cs = cfg.c, n = cs.length, b = cfg.box;
  const lo = cfg.lo ?? Math.min(...cs.map(c => c[2])) - 1.5, hi = cfg.hi ?? Math.max(...cs.map(c => c[1])) + 1.5;
  const step = b.w / n, XI = i => b.x + step * (i + .5), Y = p => b.y + b.h - (p - lo) / (hi - lo) * b.h;
  const z = 1 + (cfg.push || .035) * at(lt, 0, ctx.scene.dur, 'sineInOut');
  X.save(); X.translate(540, b.y + b.h / 2); X.scale(z, z); X.translate(-540, -(b.y + b.h / 2));
  // faint grid
  X.strokeStyle = 'rgba(147,170,220,.07)'; X.lineWidth = 1;
  for (let k = 0; k <= 6; k++) { const y = b.y + b.h * k / 6; X.beginPath(); X.moveTo(b.x, y); X.lineTo(b.x + b.w, y); X.stroke(); }
  // zones under candles
  for (const a of cfg.anns.filter(a => a.under)) drawAnn(a);
  // candles
  cs.forEach((c, i) => {
    const t0 = cfg.rv(i), k = at(lt, t0, t0 + .32, 'cubicOut'); if (k <= 0) return;
    const [o, h, l, cl] = c, up = cl >= o, col = up ? UP : DN, x = XI(i), mid = Y(o);
    const wk = Math.min(1, k * 1.6), bk = E.cubicOut(Math.max(0, (k - .2) / .8)), y2 = mid + (Y(cl) - mid) * bk;
    const dim = cfg.dim ? cfg.dim(i, lt) : 1; X.globalAlpha = dim;
    X.strokeStyle = up ? UP : '#6FA3F2'; X.lineWidth = Math.max(2, step * .1);
    X.beginPath(); X.moveTo(x, mid + (Y(h) - mid) * wk); X.lineTo(x, mid + (Y(l) - mid) * wk); X.stroke();
    X.fillStyle = col; X.fillRect(x - step * .32, Math.min(mid, y2), step * .64, Math.max(2, Math.abs(y2 - mid)));
    if (!up) { X.strokeStyle = '#6FA3F2'; X.lineWidth = 1.5; X.strokeRect(x - step * .32, Math.min(mid, y2), step * .64, Math.max(2, Math.abs(y2 - mid))); }
    X.globalAlpha = 1;
  });
  for (const a of cfg.anns.filter(a => !a.under)) drawAnn(a);
  X.restore();
  function drawAnn(a) {
    const k = at(lt, a.t, a.t + (a.d || .6), 'expoOut'), out = a.tEnd ? 1 - at(lt, a.tEnd, a.tEnd + .4) : 1; if (k <= 0 || out <= 0) return;
    X.save(); X.globalAlpha = out;
    const le = a.keep ? 1e9 : (a.lblEnd ?? a.t + 2.8), lblA = 1 - at(lt, le, le + .45);
    const tag = (x, y, ar, en, col, al, align) => tagPill(ctx, x, y, ar, en, col, al * lblA, align);
    if (a.type === 'hline') {
      const x0 = XI(a.i0) - step / 2, x1 = a.i1 != null ? XI(a.i1) + step / 2 : b.x + b.w, y = Y(a.p);
      X.strokeStyle = a.col; X.lineWidth = a.w || 3; if (a.dash) X.setLineDash(a.dash);
      X.beginPath(); X.moveTo(x0, y); X.lineTo(x0 + (x1 - x0) * k, y); X.stroke(); X.setLineDash([]);
      if (a.ar || a.en) tag(a.lx ?? (x0 + x1) / 2, y + (a.ly ?? -36), a.ar, a.en, a.col, at(lt, a.t + .25, a.t + .7) * out, a.align || 'center');
    } else if (a.type === 'rect') {
      const x0 = XI(a.i0) - step / 2, x1 = a.i1 != null ? XI(a.i1) + step / 2 : b.x + b.w, y0 = Y(a.p1), y1 = Y(a.p0);
      X.globalAlpha = out * k; X.fillStyle = a.fill; X.fillRect(x0, y0, (x1 - x0), y1 - y0);
      X.strokeStyle = a.col; X.lineWidth = a.w || 3; if (a.dash) X.setLineDash(a.dash); X.strokeRect(x0, y0, (x1 - x0), y1 - y0); X.setLineDash([]);
      if (a.glow) { X.shadowColor = a.col; X.shadowBlur = 24 * (.6 + .4 * Math.sin(lt * 4)); X.strokeRect(x0, y0, x1 - x0, y1 - y0); X.shadowBlur = 0; }
      X.globalAlpha = out;
      if (a.ar || a.en) tag(a.lx ?? x1 + 8, a.lyAbs ?? (y0 + y1) / 2 + (a.ly || 0), a.ar, a.en, a.col, at(lt, a.t + .25, a.t + .7) * out, a.align || 'left');
    } else if (a.type === 'sweep') {
      const x = XI(a.i), y = Y(a.p), r = 18 + 50 * at(lt, a.t, a.t + .9, 'expoOut');
      X.strokeStyle = a.col; X.lineWidth = 4; X.globalAlpha = out * Math.max(.35, 1 - at(lt, a.t + .3, a.t + 1.2));
      X.beginPath(); X.arc(x, y, r, 0, 6.283); X.stroke(); X.globalAlpha = out;
      X.fillStyle = a.col; X.beginPath(); X.arc(x, y, 9, 0, 6.283); X.fill();
      tag(a.lx ?? x, y + (a.ly ?? 78), a.ar, a.en, a.col, at(lt, a.t + .2, a.t + .6) * out, a.align || 'center');
    } else if (a.type === 'arrow') {
      const x = XI(a.i), y = Y(a.p), dir = a.dir === 'up' ? 1 : -1, len = 90 * k, y0 = y + dir * (40 + len);
      X.strokeStyle = a.col; X.fillStyle = a.col; X.lineWidth = 9; X.lineCap = 'round';
      X.beginPath(); X.moveTo(x, y0); X.lineTo(x, y + dir * 40); X.stroke();
      X.beginPath(); X.moveTo(x, y + dir * 18); X.lineTo(x - 20, y + dir * 48); X.lineTo(x + 20, y + dir * 48); X.closePath(); X.fill();
      tag(x, y0 + dir * 40, a.ar, a.en, a.col, at(lt, a.t + .2, a.t + .6) * out);
    } else if (a.type === 'vline') {
      const x = XI(a.i) - step / 2; X.strokeStyle = a.col; X.lineWidth = 2; X.setLineDash([8, 10]);
      X.beginPath(); X.moveTo(x, b.y - 10); X.lineTo(x, b.y - 10 + (b.h + 20) * k); X.stroke(); X.setLineDash([]);
      X.fillStyle = 'rgba(147,249,255,.05)'; X.globalAlpha = out * k; X.fillRect(x, b.y - 10, b.x + b.w - x, b.h + 20); X.globalAlpha = out;
      tag(a.lx ?? x, b.y - 46, a.ar, a.en, a.col, at(lt, a.t + .2, a.t + .6) * out, a.align || 'center');
    } else if (a.type === 'rr') {
      const x0 = XI(a.i0) - step / 2, x1 = b.x + b.w, ye = Y(a.entry), ys = Y(a.sl), yt = Y(a.tp), w = (x1 - x0) * k;
      X.globalAlpha = out * .9; X.fillStyle = 'rgba(147,249,255,.14)'; X.fillRect(x0, Math.min(ye, yt), w, Math.abs(yt - ye));
      X.fillStyle = 'rgba(255,92,108,.16)'; X.fillRect(x0, Math.min(ye, ys), w, Math.abs(ys - ye)); X.globalAlpha = out;
      [[ye, '#FCFCFC', 'الدخول', 'ENTRY', a.t], [ys, SLC, 'وقف الخسارة', 'SL', a.t + .5], [yt, UP, 'الهدف 1:2', 'TP', a.t + 1.0]].forEach(([y, col, ar, en, tt]) => {
        const q = at(lt, tt, tt + .5, 'expoOut'); if (q <= 0) return;
        X.strokeStyle = col; X.lineWidth = 3; X.setLineDash(col === '#FCFCFC' ? [] : [12, 8]); X.beginPath(); X.moveTo(x0, y); X.lineTo(x0 + (x1 - x0) * q, y); X.stroke(); X.setLineDash([]);
        tagPill(ctx, a.lx ?? 120, y, ar, en, col, q * out, 'left');
      });
      const q = at(lt, a.t + 1.6, a.t + 2.1); if (q > 0) tagPill(ctx, a.nx ?? 540, a.ny ?? b.y - 34, 'مثال توضيحي — مو ضمان', '1:2 RR', UP, q * out);
    } else if (a.type === 'pulse') {
      const y = Y(a.p); X.strokeStyle = a.col; X.lineWidth = 6; X.globalAlpha = out * (.4 + .6 * Math.abs(Math.sin((lt - a.t) * 5)));
      X.beginPath(); X.moveTo(b.x, y); X.lineTo(b.x + b.w, y); X.stroke();
    } else if (a.type === 'stops') {     // resting stops above highs / below lows
      const y = Y(a.p) + (a.dir === 'up' ? -26 : 26);
      for (let j = 0; j < a.nDots; j++) { const q = at(lt, a.t + j * .05, a.t + j * .05 + .3, 'backOut'); if (q <= 0) continue;
        X.fillStyle = a.col; X.globalAlpha = out * q; X.beginPath(); X.arc(XI(a.i0) + j * (step * (a.i1 - a.i0) / a.nDots), y + Math.sin(j * 1.7) * 6, 7 * q, 0, 6.283); X.fill(); }
      X.globalAlpha = out; tag(a.lx ?? 540, y + (a.dir === 'up' ? -54 : 54), a.ar, a.en, a.col, at(lt, a.t + .4, a.t + .9) * out);
    }
    X.restore();
  }
  return { XI, Y, step };
}
export function sceneTitle(ctx, lt, en, ar, col = '#93F9FF') {
  const { at } = ctx, k = at(lt, .1, .7, 'expoOut');
  ctx.text(ctx.X, en, 540, 300, { family: FN, weight: 900, size: 44, color: col, dir: 'ltr', letterSpacing: 4, alpha: k });
  const L = ctx.text.layout(ctx.X, ar, { family: FD, weight: 900, size: 70 });
  ctx.text.drawLayout(ctx.X, L, 540, 392, { align: 'center', color: '#FCFCFC', perWord: i => { const q = at(lt, .3 + i * .1, .8 + i * .1, 'expoOut'); return { clipUp: 1, dy: (1 - q) * 80, alpha: q > 0 ? 1 : 0 }; } });
}
export { bg };
