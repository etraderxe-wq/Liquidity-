// 52–61.5 s · ICT entry sequence: sweep → displacement → MSS → POI (FVG) → retracement → entry idea → SL / TP (conditional, not a signal)
import { bg, L, txt, en, cap, chart, hline, tag, ring, arrow, UP, ACC, INK, MUT, GRN, RED, LIQ, WHITE } from './k.js';
import { MSS, MS } from './data.js';
const T0 = 52, STEPS = ['Liquidity Sweep', 'Displacement', 'MSS / CHoCH', 'POI (FVG / OB)', 'Retracement', 'Entry', 'Stop Loss · Take Profit'];
const RV = i => i <= MS.fvgB ? [T0 - 1, T0 - .99] : [T0 + 3.4 + (i - 14) * .6, T0 + 3.9 + (i - 14) * .6];
MOTION.scene({ id: 's6', draw(t, lt, ctx) { const { X, at, W } = ctx, Ly = L(ctx); bg(ctx, t, .6);
  txt(ctx, t, 'كيف نبحث عن الدخول؟', Ly.title.x, Ly.P ? 300 : Ly.title.y, T0 + .1, { size: Ly.P ? 70 : 54, align: Ly.title.align, w: Ly.P ? Ly.title.w : 640 });
  // steps
  STEPS.forEach((s, i) => { const t0 = T0 + .5 + i * .9, a = at(t, t0, t0 + .35, 'expoOut'); if (a <= 0) return; const cur = t < T0 + .5 + (i + 1) * .9;
    const x = Ly.P ? (i < 4 ? 550 : 70) : 1270, y = Ly.P ? 370 + (i % 4) * 64 : 330 + i * 72, w = Ly.P ? 460 : 580;
    X.save(); X.globalAlpha = a * (cur ? 1 : .7); X.fillStyle = cur ? 'rgba(57,119,213,.35)' : 'rgba(6,9,16,.9)'; X.strokeStyle = cur ? UP : 'rgba(147,249,255,.3)'; X.lineWidth = 2; X.beginPath(); X.roundRect(x, y, w, 54, 14); X.fill(); X.stroke(); X.restore();
    ctx.text(X, (i + 1) + '. ' + s, x + 14, y + 35, { family: 'Inter', weight: 800, size: Ly.P ? 22 : 24, color: cur ? INK : '#C9D1DC', dir: 'ltr', align: 'left', alpha: a, maxWidth: w - 24 }); });
  const b = Ly.P ? { x: 60, y: 660, w: 960, h: 640 } : Ly.chart, lo = 43, hi = 63;
  chart(ctx, t, { c: MSS, n: 21, box: b, lo, hi, rv: RV, dim: i => i < 9 ? .55 : 1,
    under: [(XI, Y) => { const a = at(t, T0 + 2.2, T0 + 2.8); if (a <= 0) return; const y0 = Y(MSS[MS.fvgB][2]), y1 = Y(MSS[MS.fvgA][1]);
      X.save(); X.globalAlpha = a; X.fillStyle = 'rgba(57,119,213,.22)'; X.strokeStyle = ACC; X.lineWidth = 2; X.fillRect(XI(MS.fvgA), y0, b.x + b.w - XI(MS.fvgA), y1 - y0); X.strokeRect(XI(MS.fvgA), y0, b.x + b.w - XI(MS.fvgA), y1 - y0); X.restore(); }],
    over: [(XI, Y) => { tag(ctx, t, b.x + b.w - 10, (Y(MSS[MS.fvgB][2]) + Y(MSS[MS.fvgA][1])) / 2, 'POI · FVG', UP, T0 + 2.5, { align: 'right', size: 18 });
      tag(ctx, t, XI(MS.sweep), Y(MSS[MS.sweep][2]) + 42, 'SWEEP', LIQ, T0 + .6, { size: 15 }); hline(ctx, t, XI(MS.lh) - 10, XI(MS.disp + 1), Y(MSS[MS.lh][1]), WHITE, T0 + 1.6);
      tag(ctx, t, XI(MS.lh), Y(MSS[MS.lh][1]) - 32, 'MSS', GRN, T0 + 1.7, { size: 15 });
      ring(ctx, t, XI(MS.retrace), Y(MSS[MS.retrace][2]), UP, T0 + 4.6);
      // plan levels (illustrative)
      const e = (MSS[MS.fvgB][2] + MSS[MS.fvgA][1]) / 2, sl = MSS[MS.sweep][2] - .6, tp = MS.bsl;
      hline(ctx, t, XI(MS.retrace), b.x + b.w, Y(e), INK, T0 + 5.4); tag(ctx, t, XI(MS.retrace) - 10, Y(e), 'ENTRY IDEA', INK, T0 + 5.5, { align: 'right', size: 14 });
      hline(ctx, t, XI(MS.retrace), b.x + b.w, Y(sl), RED, T0 + 6.2, { dash: [10, 8] }); tag(ctx, t, XI(MS.retrace) - 10, Y(sl), 'SL', RED, T0 + 6.3, { align: 'right', size: 14 });
      hline(ctx, t, XI(MS.retrace), b.x + b.w, Y(tp), GRN, T0 + 6.6, { dash: [10, 8] }); tag(ctx, t, XI(MS.retrace) - 10, Y(tp), 'TP · BSL', GRN, T0 + 6.7, { align: 'right', size: 14 }); }] });
  cap(ctx, t, 'هذي فرصة مشروطة بتأكيدات وسياق… مو إشارة دخول مضمونة.', T0 + 7.0, T0 + 9.5, { hi: /مشروطة|مو|مضمونة\./ });
} });
