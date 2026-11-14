// 18–30 s · applied example from the reference chart: first low → $ low taken by a wick → price back up → strong expansion
import { bg, L, txt, en, cap, chart, hline, tag, ring, arrow, cam, UP, INK, MUT, GRN, RED, LIQ, WHITE } from './k.js';
import { REF, RF } from './ref.js';
const T0 = 18;
const RV = i => i < RF.sweep ? [T0 + .4 + i * .38, T0 + .75 + i * .38] : i === RF.sweep ? [T0 + 4.0, T0 + 6.4] : [T0 + 6.7 + (i - RF.sweep - 1) * .35, T0 + 7.05 + (i - RF.sweep - 1) * .35];
MOTION.scene({ id: 's3', draw(t, lt, ctx) { const { X, at } = ctx, Ly = L(ctx), b = Ly.chart; bg(ctx, t, .6);
  txt(ctx, t, 'تطبيق على الشارت', Ly.title.x, Ly.title.y, T0 + .1, { size: Ly.P ? 72 : 66, align: Ly.title.align, w: Ly.title.w });
  en(ctx, t, 'REAL CHART EXAMPLE', Ly.sub.x, Ly.sub.y, T0 + .3, { size: 24, align: Ly.title.align });
  const lo = 42, hi = 66, st = b.w / 16, sx = b.x + st * (RF.sweep + .5), sy = b.y + b.h - (RF.level - lo) / (hi - lo) * b.h;
  const z = 1 + .3 * at(t, T0 + 3.8, T0 + 4.6, 'sineInOut') * (1 - at(t, T0 + 6.5, T0 + 7.2, 'sineInOut')), r = cam(ctx, z, sx, sy);
  const g = chart(ctx, t, { c: REF, n: 16, box: b, lo, hi, rv: RV, glow: i => i === RF.sweep && t > T0 + 5.2,
    over: [(XI, Y) => { tag(ctx, t, XI(RF.low1), Y(REF[RF.low1][2]) + 34, 'LOW', WHITE, T0 + 2.2, { size: 16 });
      hline(ctx, t, XI(RF.low1) - 10, b.x + b.w, Y(RF.level), LIQ, T0 + 2.6, { dash: [12, 8], glow: true });
      const da = at(t, T0 + 3.0, T0 + 3.4); if (da > 0) ctx.text(X, '$', XI(RF.sweep), Y(RF.level) + 60, { family: 'Inter', weight: 900, size: 44, color: LIQ, dir: 'ltr', alpha: da, shadow: { blur: 20, color: LIQ } });
      ring(ctx, t, XI(RF.sweep), Y(REF[RF.sweep][2]), LIQ, T0 + 5.0);
      arrow(ctx, XI(RF.sweep) + 30, Y(REF[RF.sweep][3]), XI(RF.sweep + 4), Y(REF[RF.sweep + 4][3]) - 20, at(t, T0 + 7.2, T0 + 8.4, 'expoOut'), GRN); }] });
  r();
  en(ctx, t, 'SELL-SIDE LIQUIDITY SWEEP', Ly.P ? 540 : b.x + b.w / 2, b.y + b.h + 60, T0 + 5.2, { size: Ly.P ? 26 : 28, color: LIQ, glow: 'rgba(255,138,76,.6)' });
  ctx.text(X, 'SLOW MOTION · ZOOM', b.x + 20, b.y + 30, { family: 'Inter', weight: 800, size: 20, color: MUT, dir: 'ltr', align: 'left', alpha: at(t, T0 + 4, T0 + 4.2) * (1 - at(t, T0 + 6.4, T0 + 6.6)) });
  cap(ctx, t, 'لاحظ هني السعر نزل تحت القاع السابق، أخذ السيولة اللي تحته، وبعدها رجع بقوة للأعلى. هذا سحب سيولة، مو كسر هيكل.', T0 + 7.0, T0 + 12, { hi: /سحب|سيولة،?|مو|كسر|هيكل\./ });
} });
