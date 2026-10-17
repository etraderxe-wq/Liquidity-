// happiness · success · legacy — three rising pillars
import { bg, big, UP, ACC, ACC2, INK } from './lib.js';
const P = [[47.9, 'HAPPINESS', 260, 380], [48.8, 'SUCCESS', 540, 500], [49.8, 'LEGACY', 820, 620]];
MOTION.scene({ id: 's8', draw(t, lt, ctx) { const { X, at } = ctx; bg(ctx, t, { glow: 1 });
  big(ctx, t, 'A BATTLE THAT SHAPES', 540, 400, 46.7, { size: 44 });
  P.forEach(([t0, w, x, h]) => { const k = at(t, t0 - .3, t0 + .5, 'expoOut'); if (k <= 0) return;
    const g = X.createLinearGradient(0, 1250 - h, 0, 1250); g.addColorStop(0, UP); g.addColorStop(1, 'rgba(57,119,213,.15)');
    X.fillStyle = g; X.shadowColor = UP; X.shadowBlur = 24 * k; X.fillRect(x - 70, 1250 - h * k, 140, h * k); X.shadowBlur = 0;
    big(ctx, t, w, x, 1250 - h * k - 40, t0, { size: 32, color: INK, spacing: 2 }); });
} });
