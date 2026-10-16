// TRADING PLAN 32.2–38 s: clean chart · متى تدخل (entry) · متى تطلع (exit) · والأهم متى توقف التداول (stop trading).
import { bg, kinetic, panel, icon, pill, FD, FN, FE, UP, DN, RED, INK, MUT, ACC } from './lib.js';
import { chart } from './chart.js';
const C = [[40,42,39,41.5],[41.5,44,41,43.6],[43.6,44.2,41.8,42.4],[42.4,46,42,45.5],[45.5,48,45,47.4],[47.4,47.9,44.6,45.2],[45.2,46,43.9,45.6],
  [45.6,49,45.3,48.6],[48.6,51.5,48.2,51],[51,52,49.4,49.9],[49.9,53.5,49.6,53.1],[53.1,56,52.8,55.5],[55.5,57.4,54.6,57],[57,57.6,55.2,55.8]];
const RV = i => 32.35 + i * .13;
const STEPS = [[32.52, 'متى تدخل', 'ENTRY', 'enter', UP], [34.52, 'متى تطلع', 'EXIT', 'exit', ACC], [35.76, 'متى توقف التداول', 'STOP TRADING', 'stop', RED]];
MOTION.scene({ id: 's5',
  draw(t, lt, ctx) {
    const { X, at, E } = ctx;
    bg(ctx, t);
    ctx.text(X, 'TRADING PLAN', 540, 232, { family: FE, size: 40, color: UP, dir: 'ltr', letterSpacing: 6, alpha: at(t, 32.3, 32.7), shadow: { blur: 24, color: 'rgba(147,249,255,.5)' } });
    kinetic(ctx, t, 'خطة التداول', 540, 330, 32.35, { size: 80 });
    const stopK = at(t, 35.8, 36.3);
    X.save(); X.globalAlpha = 1 - .55 * stopK;
    const z = 1 + .05 * at(t, 32.2, 38, 'sineInOut');
    X.translate(540, 700); X.scale(z, z); X.translate(-540, -700);
    chart(ctx, t, t, { c: C, n: 16, box: { x: 90, y: 430, w: 900, h: 520 }, lo: 37, hi: 60, rv: RV, grow: .25,
      anns: [{ type: 'arrow', i: 6, p: 43.9, dir: 'up', col: UP, t: 32.6, en: 'ENTRY' },
             { type: 'hline', i0: 6, p: 42.6, col: RED, dash: [10, 8], t: 33.0, en: 'SL', lx: 860, ly: 30 },
             { type: 'hline', i0: 6, p: 57, col: ACC, dash: [10, 8], t: 34.55, ar: 'الخروج', en: 'EXIT', lx: 300 }] });
    X.restore();
    // pause overlay on the chart
    if (stopK > 0) { const s = E.springK(ctx.prog(t, 35.8, 36.6)); X.save(); X.translate(540, 690); X.scale(s, s);
      X.fillStyle = 'rgba(0,5,26,.8)'; X.beginPath(); X.arc(0, 0, 120, 0, 6.283); X.fill();
      X.shadowColor = RED; X.shadowBlur = 30; icon(ctx, 'stop', 0, 0, 200, RED); X.restore(); }
    STEPS.forEach(([t0, ar, en, ic, col], j) => {
      const k = at(t, t0, t0 + .45, 'expoOut'); if (k <= 0) return;
      const y = 1040 + j * 118, main = j === 2, act = t >= t0 && (j === 2 || t < STEPS[j + 1][0]);
      X.save(); X.globalAlpha = k * (act ? 1 : .6); X.translate((1 - k) * 80, 0);
      panel(ctx, 100, y - 50, 880, 100, 1, { stroke: act ? col : 'rgba(87,161,239,.3)', glow: act ? col : null, r: 24 });
      icon(ctx, ic, 920, y, 54, col);
      ctx.text(X, ar, 862, y + 16, { family: FD, weight: 900, size: 46, color: INK, align: 'right' });
      ctx.text(X, en, 132, y + 12, { family: FN, weight: 800, size: 28, color: col, align: 'left', dir: 'ltr', letterSpacing: 2 });
      if (main) pill(ctx, 540, y - 58, 'الأهم', null, RED, at(t, 35.76, 36.1), 'center', { size: 26, fill: 'rgba(40,5,15,.95)' });
      X.restore();
    });
  } });
