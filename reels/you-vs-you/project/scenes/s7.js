// which version wins → the most important battle → YOU VS YOU clash
import { bg, big, figure, flash, UP, INK, MUT } from './lib.js';
MOTION.scene({ id: 's7', draw(t, lt, ctx) { const { X, at, E } = ctx; bg(ctx, t, { glow: .8 });
  const split = 1 - at(t, 44.5, 44.8);
  if (split > 0) { X.save(); X.globalAlpha = split; figure(ctx, 300, 1100, .95, '#4A5060', 1, 0); figure(ctx, 780, 1100, .95, UP, 1, 36);
    X.strokeStyle = 'rgba(147,249,255,.5)'; X.lineWidth = 2; X.beginPath(); X.moveTo(540, 820); X.lineTo(540, 1260); X.stroke(); X.restore(); }
  big(ctx, t, 'WHICH VERSION', 540, 450, 38.0, { size: 64, t1: 41.0 });
  big(ctx, t, 'WILL WIN TODAY?', 540, 560, 39.4, { size: 64, color: UP, glow: 'rgba(147,249,255,.5)', t1: 41.0 });
  big(ctx, t, 'THE MOST IMPORTANT', 540, 450, 41.3, { size: 50, t1: 44.5 });
  big(ctx, t, 'BATTLE', 540, 580, 42.2, { size: 110, color: UP, glow: 'rgba(147,249,255,.5)', t1: 44.5 });
  // clash
  const c = at(t, 44.75, 45.15, 'expoIn'), sh = t > 45.15 && t < 45.5 ? (ctx.hash01(Math.floor(t * 30), 1) - .5) * 24 : 0;
  if (t > 44.75) { ctx.text(X, 'YOU', -300 + 640 * c + sh, 870, { family: 'Michroma', size: 150, color: '#7A8194', dir: 'ltr' });
    ctx.text(X, 'YOU', 1380 - 640 * c + sh, 1170, { family: 'Michroma', size: 150, color: UP, dir: 'ltr', shadow: { blur: 40, color: 'rgba(147,249,255,.7)' } });
    const v = E.springK(ctx.prog(t, 45.15, 45.7)); X.save(); X.translate(540, 1000); X.scale(v, v); ctx.text(X, 'VS', 0, 30, { family: 'Michroma', size: 90, color: INK, dir: 'ltr' }); X.restore(); }
  flash(ctx, t, 45.15, .5);
} });
