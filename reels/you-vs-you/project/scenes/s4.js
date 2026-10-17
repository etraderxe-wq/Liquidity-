import { bg, big, flash, figure, UP, INK } from './lib.js';
MOTION.scene({ id: 's4', draw(t, lt, ctx) { const { X, at, E } = ctx; bg(ctx, t, { glow: 1.3 });
  big(ctx, t, 'THAT PERSON', 540, 700, 19.15, { size: 70, color: INK });
  big(ctx, t, 'IS', 540, 820, 19.7, { size: 60, color: INK });
  const k = E.springK(ctx.prog(t, 20.35, 21.0));
  if (t > 20.35) { X.save(); X.translate(540, 1040); X.scale(k, k);
    ctx.text(X, 'YOU.', 0, 0, { family: 'Michroma', size: 200, color: UP, dir: 'ltr', shadow: { blur: 50, color: 'rgba(147,249,255,.8)' } });
    X.scale(1, -1); X.globalAlpha = .18; ctx.text(X, 'YOU.', 0, -60, { family: 'Michroma', size: 200, color: UP, dir: 'ltr' }); X.restore(); }
  flash(ctx, t, 20.35, .45);
} });
