import { bg, header, rrect, lineText, FD } from './lib.js';
const ITEMS = [['دخولي', 790], ['مخاطرتي', 540], ['التزامي', 290]];
function icon(X, i, x, y, col) {
  X.strokeStyle = col; X.fillStyle = col; X.lineWidth = 6; X.lineCap = 'round'; X.lineJoin = 'round';
  if (i === 0) { X.beginPath(); X.moveTo(x - 30, y + 22); X.lineTo(x + 30, y + 22); X.stroke(); X.beginPath(); X.moveTo(x - 22, y - 26); X.lineTo(x + 6, y + 6); X.stroke(); X.beginPath(); X.moveTo(x + 10, y - 10); X.lineTo(x + 8, y + 9); X.lineTo(x - 10, y + 8); X.stroke(); }
  if (i === 1) { X.beginPath(); X.moveTo(x, y - 34); X.lineTo(x + 28, y - 22); X.lineTo(x + 26, y + 6); X.quadraticCurveTo(x + 20, y + 26, x, y + 36); X.quadraticCurveTo(x - 20, y + 26, x - 26, y + 6); X.lineTo(x - 28, y - 22); X.closePath(); X.stroke(); }
  if (i === 2) { X.beginPath(); X.arc(x, y, 32, 0, 6.283); X.stroke(); X.beginPath(); X.moveTo(x - 14, y); X.lineTo(x - 3, y + 11); X.lineTo(x + 16, y - 12); X.stroke(); }
}
MOTION.scene({ id: 's5',
  draw(t, lt, ctx) {
    const { X, P, at } = ctx; bg(ctx, t); header(ctx, t, lt, 4, 'المسؤولية');
    lineText(ctx, lt, 'شنو أقدر أغيّر؟', 620, .8, { size: 100, weight: 900 });
    ITEMS.forEach(([s, x], i) => {
      const ta = 2.2 + i * 1.5, k = at(lt, ta, ta + .5, 'expoOut'), glow = Math.max(0, 1 - Math.abs(lt - (ta + .6)) / 1.0);
      if (k <= 0) return;
      X.save(); X.globalAlpha = k; X.translate(0, (1 - k) * 40);
      X.shadowColor = P.hi; X.shadowBlur = 40 * glow; X.fillStyle = 'rgba(0,5,26,.85)'; X.strokeStyle = glow > .05 ? P.hi : 'rgba(87,161,239,.45)'; X.lineWidth = 3;
      rrect(X, x - 115, 780, 230, 250, 34); X.fill(); X.stroke(); X.shadowBlur = 0;
      icon(X, i, x, 870, glow > .05 ? P.hi : P.acc);
      ctx.text(X, s, x, 985, { family: FD, weight: 800, size: 50, color: P.ink });
      X.restore();
      if (i < 2) { const d = at(lt, ta + 1.2, ta + 1.5); if (d > 0) { X.fillStyle = P.mut; X.globalAlpha = d; X.beginPath(); X.arc(x - 125, 905, 8, 0, 6.283); X.fill(); X.globalAlpha = 1; } }
    });
  } });
