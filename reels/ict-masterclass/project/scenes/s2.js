// 6–18 s · LIQUIDITY SWEEP: clear prior low → price walks down → wick below the low (slow motion + zoom) → closes back above → move up
import { bg, L, txt, en, cap, chart, hline, tag, ring, arrow, cam, UP, INK, MUT, GRN, RED, LIQ, WHITE } from './k.js';
import { SWEEP, SW } from './data.js';
const T0 = 6;
const RV = i => i < SW.sweep ? [T0 + .5 + i * .42, T0 + .9 + i * .42] : i === SW.sweep ? [T0 + 5.4, T0 + 7.6] : [T0 + 7.9 + (i - 12) * .4, T0 + 8.3 + (i - 12) * .4];
MOTION.scene({ id: 's2', draw(t, lt, ctx) { const { X, at, W } = ctx, Ly = L(ctx), b = Ly.chart; bg(ctx, t, .6);
  txt(ctx, t, 'سحب السيولة', Ly.title.x, Ly.title.y, T0 + .1, { size: Ly.P ? 76 : 70, align: Ly.title.align, w: Ly.title.w });
  en(ctx, t, 'LIQUIDITY SWEEP', Ly.sub.x, Ly.sub.y, T0 + .3, { size: 26, align: Ly.title.align, color: LIQ });
  const z = 1 + .22 * at(t, T0 + 5.2, T0 + 5.9, 'sineInOut') * (1 - at(t, T0 + 7.7, T0 + 8.4, 'sineInOut'));
  const st = b.w / 17, sx = b.x + st * (SW.sweep + .5), lo = 34, hi = 53, sy = b.y + b.h - (SW.level - lo) / (hi - lo) * b.h;
  const r = cam(ctx, z, sx, sy);
  const g = chart(ctx, t, { c: SWEEP, n: 17, box: b, lo, hi, rv: RV, glow: i => i === SW.sweep && t > T0 + 6.6,
    over: [(XI, Y) => { hline(ctx, t, XI(SW.low) - 10, b.x + b.w, Y(SW.level), LIQ, T0 + 2.4, { dash: [12, 8], glow: true }); tag(ctx, t, b.x + b.w - 10, Y(SW.level) + 40, 'SELL-SIDE LIQUIDITY (SSL)', LIQ, T0 + 2.8, { align: 'right', size: Ly.P ? 18 : 20 });
      // resting stops under the low
      for (let k = 0; k < 7; k++) { const a = at(t, T0 + 3 + k * .08, T0 + 3.3 + k * .08) * (1 - at(t, T0 + 6.4, T0 + 6.8)); if (a <= 0) continue; X.fillStyle = `rgba(255,138,76,${.8 * a})`; X.beginPath(); X.arc(XI(SW.low) + k * 34, Y(SW.level) + 22, 6, 0, 6.283); X.fill(); }
      tag(ctx, t, XI(SW.low), Y(SWEEP[SW.low][2]) - 30, 'PRIOR LOW', WHITE, T0 + 2.2, { size: 16, t1: T0 + 5 });
      ring(ctx, t, XI(SW.sweep), Y(SWEEP[SW.sweep][2]), LIQ, T0 + 6.4);
      arrow(ctx, XI(SW.sweep) + 20, Y(SWEEP[SW.sweep][2]) + 10, XI(SW.sweep + 3) + 10, Y(SWEEP[SW.sweep + 3][3]) - 30, at(t, T0 + 8.6, T0 + 9.4, 'expoOut'), GRN); }] });
  r();
  en(ctx, t, 'LIQUIDITY SWEEP', g.XI(SW.sweep), b.y + b.h + 60, T0 + 7.0, { size: Ly.P ? 30 : 30, color: LIQ, glow: 'rgba(255,138,76,.6)' });
  ctx.text(X, 'SLOW MOTION', b.x + 20, b.y + 30, { family: 'Inter', weight: 800, size: 20, color: MUT, dir: 'ltr', align: 'left', alpha: at(t, T0 + 5.4, T0 + 5.6) * (1 - at(t, T0 + 7.6, T0 + 7.8)) });
  cap(ctx, t, 'هني السعر سحب السيولة من أسفل القاع، لكنه ما أثبت للحين إن هيكل السوق تغيّر.', T0 + 8.6, T0 + 12, { hi: /سحب|السيولة|ما|أثبت/ });
} });
