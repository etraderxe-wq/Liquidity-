// the relentless version: bright, rising, a clean uptrend behind it
import { bg, big, figure, flash, UP, ACC, ACC2, INK } from './lib.js';
const W = [[31.6, 'RELENTLESS'], [33.2, 'UNSTOPPABLE'], [35.4, 'GREATNESS']];
MOTION.scene({ id: 's6', draw(t, lt, ctx) { const { X, at } = ctx; bg(ctx, t, { glow: 1.2 });
  // rising candles
  for (let i = 0; i < 18; i++) { const k = at(t, 29.6 + i * .2, 29.9 + i * .2); if (k <= 0) continue;
    const x = 90 + i * 52, base = 1250 - i * 26, h = (40 + 50 * ctx.hash01(i, 4)) * k, up = i % 4 !== 2; X.globalAlpha = .45;
    X.fillStyle = up ? UP : ACC2; X.fillRect(x, base - h, 26, h); X.fillRect(x + 12, base - h - 18, 2, h + 36); X.globalAlpha = 1; }
  figure(ctx, 540, 1080, 1.15, UP, at(t, 29.6, 30.3), 40);
  big(ctx, t, 'VERSION B', 540, 330, 29.5, { size: 34, color: UP, spacing: 8 });
  W.forEach(([t0, w], i) => big(ctx, t, w, 540, 470 + i * 110, t0, { size: i === 2 ? 80 : 64, color: i === 2 ? UP : INK, glow: i === 2 ? 'rgba(147,249,255,.6)' : null, rise: -40 }));
  flash(ctx, t, 35.4, .2);
} });
