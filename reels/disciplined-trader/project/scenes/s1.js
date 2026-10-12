import { bg, candles, series, lineText, FD, FN } from './lib.js';
const S = series(3, 22, .06);
MOTION.scene({ id: 's1',
  draw(t, lt, ctx) {
    const { X, P, at, E } = ctx; bg(ctx, t);
    candles(ctx, S, { x: 60, y: 980, w: 960, h: 420 }, lt, .1, .16, { alpha: .26 });   // dim, behind text
    const k = E.springK(ctx.prog(lt, .25, 1.2));
    X.save(); X.translate(540, 640); X.scale(k, k);
    const g = X.createLinearGradient(-160, -300, 160, 40); g.addColorStop(0, P.hi); g.addColorStop(.55, P.acc); g.addColorStop(1, P.acc2);
    ctx.text(X, '5', 0, 150, { family: FN, weight: 900, size: 440, color: g, dir: 'ltr', alpha: Math.min(1, k * 1.5) });
    X.restore();
    lineText(ctx, lt, 'قواعد للمتداول المنضبط', 930, 1.1, { size: 82, weight: 900 });
    lineText(ctx, lt, 'خطتك أهم من حماسك', 1060, 2.4, { size: 66, weight: 700, color: P.hi });
  } });
