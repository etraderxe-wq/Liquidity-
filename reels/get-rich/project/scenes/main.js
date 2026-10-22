// GET RICH OR DIE TRYING — XAUUSD chart world (EMULLAX blue on black/charcoal), slow push-ins on the strong lines.
import { bg, big, flash, UP, ACC, ACC2, INK, MUT } from './lib.js';
// illustrative gold chart (no price axis): calm rise, sharp drop + recovery, then a strong run
function series() { let p = 50, r = 7, out = []; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  const drift = i => i < 18 ? .25 : i < 26 ? -.9 : i < 34 ? .5 : 1.0;
  for (let i = 0; i < 60; i++) { const o = p, c = o + (rnd() - .5) * 5 + drift(i) * 2.2; out.push([o, Math.max(o, c) + rnd() * 2.5, Math.min(o, c) - rnd() * 2.5, c]); p = c; } return out; }
const C = series(), LO = Math.min(...C.map(c => c[2])), HI = Math.max(...C.map(c => c[1]));
function chart(ctx, t, a) { const { X } = ctx, n = Math.min(C.length, Math.floor(8 + t * 4.6)), x0 = 60, w = 960, y0 = 560, h = 560, st = w / 44;
  const off = Math.max(0, n - 44), vis = C.slice(off, n), lo = Math.min(...vis.map(c => c[2])) - 4, hi = Math.max(...vis.map(c => c[1])) + 4, Y = v => y0 + h - (v - lo) / (hi - lo) * h;
  X.save(); X.globalAlpha = a;
  for (let k = 0; k <= 5; k++) { X.strokeStyle = 'rgba(147,170,220,.06)'; X.beginPath(); X.moveTo(x0, y0 + h * k / 5); X.lineTo(x0 + w, y0 + h * k / 5); X.stroke(); }
  for (let i = off; i < n; i++) { const [o, hi, lo, c] = C[i], up = c >= o, x = x0 + (i - off + .5) * st, col = up ? UP : ACC2;
    X.strokeStyle = up ? UP : '#6FA3F2'; X.lineWidth = 2; X.beginPath(); X.moveTo(x, Y(hi)); X.lineTo(x, Y(lo)); X.stroke();
    X.fillStyle = col; X.fillRect(x - st * .3, Math.min(Y(o), Y(c)), st * .6, Math.max(2, Math.abs(Y(o) - Y(c)))); }
  const last = C[n - 1], ly = Y(last[3]); X.setLineDash([8, 8]); X.strokeStyle = 'rgba(147,249,255,.7)'; X.beginPath(); X.moveTo(x0, ly); X.lineTo(x0 + w, ly); X.stroke(); X.setLineDash([]);
  X.fillStyle = 'rgba(0,5,26,.9)'; X.strokeStyle = UP; X.lineWidth = 2; X.beginPath(); X.roundRect(x0 + w - 150, ly - 22, 150, 44, 10); X.fill(); X.stroke();
  ctx.text(X, 'XAUUSD', x0 + w - 75, ly + 9, { family: 'Inter', weight: 800, size: 24, color: UP, dir: 'ltr' });
  X.restore(); }
MOTION.scene({ id: 'main', draw(t, lt, ctx) { const { X, at } = ctx; bg(ctx, t, { glow: .8 + .4 * at(t, 6.5, 8.5) });
  // slow push-in that intensifies on the strong lines
  const z = 1 + .05 * at(t, 0, 2, 'sineOut') + .04 * at(t, 3.4, 4.6, 'sineInOut') + .06 * at(t, 6.5, 8.2, 'sineInOut') - .1 * at(t, 8.2, 9.2, 'sineInOut');
  X.save(); X.translate(540, 820); X.scale(z, z); X.translate(-540, -820);
  chart(ctx, t, .35 + .4 * at(t, 8.2, 9.0));
  X.restore();
  // English key lines (original words), top band
  big(ctx, t, 'GET RICH', 540, 300, .05, { size: 96, color: INK, t1: 1.45 });
  big(ctx, t, 'OR DIE TRYING', 540, 410, .55, { size: 54, color: UP, glow: 'rgba(147,249,255,.55)', t1: 1.45 });
  big(ctx, t, 'GET RICH', 540, 330, 2.6, { size: 80, color: UP, glow: 'rgba(147,249,255,.55)', t1: 5.0 });
  big(ctx, t, 'OR', 540, 420, 3.5, { size: 40, color: MUT, t1: 5.0 });
  big(ctx, t, 'DIE IN THE PROCESS', 540, 500, 3.8, { size: 52, color: '#9AA3B6', t1: 5.0 });
  big(ctx, t, 'DOING WHAT', 540, 330, 6.6, { size: 70, color: INK, t1: 8.3 });
  big(ctx, t, 'I WANTED TO DO', 540, 430, 7.2, { size: 70, color: UP, glow: 'rgba(147,249,255,.6)', t1: 8.3 });
  big(ctx, t, 'XAUUSD', 540, 300, 8.5, { size: 64, color: UP, spacing: 10 });
  flash(ctx, t, 0.05, .2); flash(ctx, t, 2.6, .15); flash(ctx, t, 7.2, .15);
} });
