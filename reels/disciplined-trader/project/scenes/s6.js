import { bg, header, rrect, marker, FD } from './lib.js';
const STEPS = [['سجّل', 790, 1180], ['راجع', 540, 1040], ['عدّل', 290, 900]];
function icon(X, i, x, y, col) {
  X.strokeStyle = col; X.fillStyle = col; X.lineWidth = 6; X.lineCap = 'round'; X.lineJoin = 'round';
  if (i === 0) { rrect(X, x - 26, y - 34, 52, 68, 8); X.stroke(); [-14, 0, 14].forEach(d => { X.beginPath(); X.moveTo(x - 12, y + d); X.lineTo(x + 14, y + d); X.stroke(); }); X.beginPath(); X.moveTo(x - 26, y - 34); X.lineTo(x - 26, y + 34); X.lineWidth = 10; X.stroke(); }
  if (i === 1) { X.beginPath(); X.arc(x - 6, y - 6, 24, 0, 6.283); X.stroke(); X.beginPath(); X.moveTo(x + 11, y + 11); X.lineTo(x + 32, y + 32); X.lineWidth = 9; X.stroke(); }
  if (i === 2) { [-18, 0, 18].forEach((d, j) => { X.beginPath(); X.moveTo(x - 30, y + d); X.lineTo(x + 30, y + d); X.lineWidth = 5; X.stroke(); X.beginPath(); X.arc(x + [-12, 14, -2][j], y + d, 8, 0, 6.283); X.fill(); }); }
}
MOTION.scene({ id: 's6',
  draw(t, lt, ctx) {
    const { X, P, at, E } = ctx; bg(ctx, t); header(ctx, t, lt, 5, 'التطوّر');
    STEPS.forEach(([s, x, top], i) => {
      const ta = 1.0 + i * 1.2, k = at(lt, ta, ta + .6, 'expoOut'); if (k <= 0) return;
      const h = (1290 - top) * k;
      X.fillStyle = 'rgba(0,5,26,.85)'; X.strokeStyle = 'rgba(87,161,239,.45)'; X.lineWidth = 2; rrect(X, x - 120, 1290 - h, 240, h, 18); X.fill(); X.stroke();
      X.fillStyle = P.hi; rrect(X, x - 120, 1290 - h, 240, 10, 5); X.fill();
      const a = at(lt, ta + .35, ta + .8, 'expoOut');
      X.save(); X.globalAlpha = a; X.translate(0, (1 - a) * 30);
      icon(X, i, x, top - 140, P.hi);
      ctx.text(X, s, x, top - 40, { family: FD, weight: 900, size: 62, color: P.ink });
      X.restore();
    });
    marker(ctx, lt, 'لا تكرّر نفس الغلط', 1420, 5.0, { size: 62 });
  } });
