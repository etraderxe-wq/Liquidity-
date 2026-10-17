import { bg, big, flash, UP, INK, MUT } from './lib.js';
MOTION.scene({ id: 's1', draw(t, lt, ctx) { const { X, at } = ctx; bg(ctx, t, { glow: at(t, 1.3, 2.5) });
  // cold open: flicker
  const fl = t < 1.25 ? (Math.floor(t * 30) % 7 === 3 ? .4 : 1) : 0;
  if (fl) big(ctx, t, 'THEY KNOW YOUR FEARS.', 540, 860, .1, { size: 46, color: INK, t1: 1.15, spacing: 6 });
  // title card in the silence
  const k = at(t, 1.5, 2.3, 'expoOut'), w = 300 * k;
  if (k > 0) { X.save(); X.strokeStyle = UP; X.lineWidth = 3; X.globalAlpha = .7; X.beginPath(); X.moveTo(540, 700 - w); X.lineTo(540, 1060 + w); X.stroke(); X.restore(); }
  big(ctx, t, 'YOU', 330, 900, 1.6, { size: 120, color: '#5A6070', rise: 0 });
  big(ctx, t, 'YOU', 760, 900, 1.8, { size: 120, color: INK, glow: 'rgba(147,249,255,.6)', rise: 0 });
  big(ctx, t, 'VS', 540, 1010, 2.2, { size: 54, color: UP, rise: 0 });
  ctx.text(X, 'إنت ضد إنت', 540, 1150, { family: 'Tajawal', weight: 900, size: 64, color: INK, alpha: at(t, 2.5, 3.0) * (1 - at(t, 3.55, 3.75)) });
  flash(ctx, t, 1.6, .25);
} });
