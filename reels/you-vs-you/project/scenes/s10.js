// no shortcut · no lucky break · it's all on you · logo
import { bg, big, strike, flash, UP, ACC, INK, MUT } from './lib.js';
MOTION.scene({ id: 's10', draw(t, lt, ctx) { const { X, at, E } = ctx; bg(ctx, t, { glow: 1 });
  const a1 = 1 - at(t, 64.1, 64.35);
  if (a1 > 0) { X.save(); X.globalAlpha = a1;
    // path: long honest road vs crossed shortcut
    const A = [220, 1150], B = [860, 650], k = at(t, 59.8, 61.0);
    X.setLineDash([16, 14]); X.strokeStyle = 'rgba(147,249,255,.55)'; X.lineWidth = 5; X.beginPath(); X.moveTo(...A); X.lineTo(A[0] + (B[0] - A[0]) * k, A[1] + (B[1] - A[1]) * k); X.stroke(); X.setLineDash([]);
    ctx.drawPath(X, [[220, 1150], [420, 1180], [560, 1030], [700, 1060], [760, 880], [860, 650]], at(t, 60.0, 61.3), { width: 7, color: ACC });
    strike(ctx, t, 470, 610, 860, 60.9, '#FCFCFC'); strike(ctx, t, 610, 470, 960, 61.0, '#FCFCFC');
    X.fillStyle = UP; X.beginPath(); X.arc(...B, 16, 0, 6.283); X.fill(); X.fillStyle = INK; X.beginPath(); X.arc(...A, 12, 0, 6.283); X.fill();
    big(ctx, t, 'NO MAGICAL SHORTCUT', 540, 450, 59.75, { size: 52, t1: 61.4 });
    big(ctx, t, 'NO LUCKY BREAK', 540, 450, 61.55, { size: 66, color: UP });
    X.restore(); }
  const k = E.springK(ctx.prog(t, 64.3, 64.9)), o = 1 - at(t, 65.7, 66.0);
  if (t > 64.3 && o > 0) { X.save(); X.globalAlpha = o; X.translate(540, 900); X.scale(k, k);
    ctx.text(X, "IT'S ALL", 0, -40, { family: 'Michroma', size: 96, color: INK, dir: 'ltr' });
    ctx.text(X, 'ON YOU.', 0, 110, { family: 'Michroma', size: 130, color: UP, dir: 'ltr', shadow: { blur: 50, color: 'rgba(147,249,255,.8)' } }); X.restore(); }
  flash(ctx, t, 64.3, .4);
  const lk = at(t, 65.9, 66.7, 'expoOut');
  if (lk > 0) { const img = ctx.img('logo'), w = 460, h = w * img.height / img.width; X.save(); X.globalAlpha = lk; X.drawImage(img, 540 - w / 2, 820 - h / 2 + (1 - lk) * 30, w, h); X.restore();
    ctx.text(X, '@emullax', 540, 820 + h / 2 + 90, { family: 'Inter', weight: 800, size: 44, color: INK, dir: 'ltr', alpha: at(t, 66.3, 66.8) }); }
} });
