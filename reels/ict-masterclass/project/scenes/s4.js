// 30–42 s · structure shift: bearish lower highs → sweep of the last low → displacement CLOSES above the last lower high (MSS)
import { bg, L, txt, en, cap, chart, hline, tag, ring, arrow, cam, UP, INK, MUT, GRN, RED, LIQ, WHITE } from './k.js';
import { MSS, MS } from './data.js';
const T0 = 30, C = MSS.slice(0, 14);
const RV = i => i < MS.disp ? [T0 + .4 + i * .38, T0 + .75 + i * .38] : i === MS.disp ? [T0 + 5.2, T0 + 7.0] : [T0 + 7.2, T0 + 7.6];
MOTION.scene({ id: 's4', draw(t, lt, ctx) { const { X, at } = ctx, Ly = L(ctx), b = Ly.chart; bg(ctx, t, .6);
  txt(ctx, t, 'تحوّل الهيكل', Ly.title.x, Ly.title.y, T0 + .1, { size: Ly.P ? 76 : 70, align: Ly.title.align, w: Ly.title.w });
  en(ctx, t, 'BULLISH MSS', Ly.sub.x, Ly.sub.y, T0 + .3, { size: 26, align: Ly.title.align, color: GRN });
  const lo = 43, hi = 63, st = b.w / 16, lhY = b.y + b.h - (MSS[MS.lh][1] - lo) / (hi - lo) * b.h, dx = b.x + st * (MS.disp + .5);
  const z = 1 + .2 * at(t, T0 + 5.0, T0 + 5.7, 'sineInOut') * (1 - at(t, T0 + 7.4, T0 + 8.1, 'sineInOut')), r = cam(ctx, z, dx, lhY);
  chart(ctx, t, { c: C, n: 16, box: b, lo, hi, rv: RV, glow: i => i === MS.disp && t > T0 + 6.4,
    over: [(XI, Y) => {
      // bearish structure lines (white): LH → LL
      const pts = [[0, MSS[0][1]], [2, MSS[2][1]], [4, MSS[4][2]], [MS.lh, MSS[MS.lh][1]], [MS.prevLow, MSS[MS.prevLow][2]]]; const k = at(t, T0 + 3.0, T0 + 4.2);
      X.save(); X.strokeStyle = 'rgba(242,244,248,.75)'; X.lineWidth = 2.5; X.setLineDash([2, 0]); X.beginPath(); pts.forEach(([i, p], j) => { if (j / (pts.length - 1) > k + .001) return; j ? X.lineTo(XI(i), Y(p)) : X.moveTo(XI(i), Y(p)); }); X.stroke(); X.restore();
      tag(ctx, t, XI(MS.lh), Y(MSS[MS.lh][1]) - 34, 'LOWER HIGH', WHITE, T0 + 3.6, { size: 16 });
      hline(ctx, t, XI(MS.lh) - 10, b.x + b.w, Y(MSS[MS.lh][1]), WHITE, T0 + 4.0, { w: 3 });
      ring(ctx, t, XI(MS.sweep), Y(MSS[MS.sweep][2]), LIQ, T0 + 4.2); tag(ctx, t, XI(MS.sweep), Y(MSS[MS.sweep][2]) + 44, 'SWEEP', LIQ, T0 + 4.3, { size: 16 });
      tag(ctx, t, XI(MS.disp) - 30, Y(MSS[MS.disp][3]) - 10, 'DISPLACEMENT', GRN, T0 + 6.6, { align: 'right', size: 16 });
      ring(ctx, t, XI(MS.disp), Y(MSS[MS.lh][1]), GRN, T0 + 6.9);
      tag(ctx, t, b.x + b.w - 10, Y(MSS[MS.lh][1]) + 40, 'CLOSE ABOVE = MSS', GRN, T0 + 7.2, { align: 'right', size: Ly.P ? 18 : 20 }); }] });
  r();
  en(ctx, t, 'BULLISH MARKET STRUCTURE SHIFT / MSS', Ly.P ? 540 : b.x + b.w / 2, b.y + b.h + 60, T0 + 7.4, { size: Ly.P ? 22 : 26, color: GRN, glow: 'rgba(46,230,166,.5)' });
  cap(ctx, t, 'بعد سحب السيولة، السعر صعد وكسر القمة الهيكلية بإغلاق واضح واندفاع قوي، وهني نبدأ نراقب تحوّل الهيكل.', T0 + 7.6, T0 + 10.3, { hi: /بإغلاق|واضح|واندفاع|تحوّل/ });
  cap(ctx, t, 'كسر مع الاتجاه السابق = BOS · كسر عكس الهيكل الهابط = MSS / CHoCH', T0 + 10.3, T0 + 12, { size: Ly.P ? 38 : 34 });
} });
