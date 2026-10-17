// no one owes you anything — stamps
import { bg, big, flash, UP, INK, MUT } from './lib.js';
function stamp(ctx, t, t0, lines, y, t1) { const { X, at, E } = ctx; const k = E.springK(ctx.prog(t, t0, t0 + .5)), o = 1 - at(t, t1, t1 + .25); if (t < t0 || o <= 0) return;
  X.save(); X.globalAlpha = o; X.translate(540, y); X.rotate(-.05); X.scale(1.6 - .6 * Math.min(k, 1), 1.6 - .6 * Math.min(k, 1));
  const w = 900, h = 80 + lines.length * 96; X.strokeStyle = UP; X.lineWidth = 7; X.shadowColor = UP; X.shadowBlur = 24; X.beginPath(); X.roundRect(-w / 2, -h / 2, w, h, 22); X.stroke(); X.shadowBlur = 0;
  lines.forEach((l, i) => ctx.text(X, l, 0, -h / 2 + 100 + i * 96, { family: 'Michroma', size: 64, color: i === lines.length - 1 ? UP : INK, dir: 'ltr', maxWidth: 840 })); X.restore(); }
MOTION.scene({ id: 's9', draw(t, lt, ctx) { const { X, at } = ctx; bg(ctx, t, { glow: .7 });
  big(ctx, t, "LET'S GET ONE THING", 540, 560, 50.8, { size: 46, t1: 52.9 });
  big(ctx, t, 'STRAIGHT.', 540, 680, 51.5, { size: 90, color: UP, t1: 52.9 });
  stamp(ctx, t, 53.0, ['NO ONE', 'OWES YOU', 'ANYTHING.'], 820, 55.0);
  stamp(ctx, t, 55.1, ['LIFE', "DOESN'T OWE YOU", 'SUCCESS.'], 820, 57.0);
  big(ctx, t, 'NO ONE WILL HAND YOU', 540, 700, 57.2, { size: 48 });
  big(ctx, t, 'YOUR DREAMS', 540, 840, 58.1, { size: 92, color: UP, glow: 'rgba(147,249,255,.55)' });
  flash(ctx, t, 53.0, .3); flash(ctx, t, 55.1, .3);
} });
