import { bg, big, figure, UP, ACC, INK, MUT } from './lib.js';
MOTION.scene({ id: 's2', draw(t, lt, ctx) { const { X, at } = ctx; bg(ctx, t, { glow: .6 + .4 * at(t, 4, 7) });
  // sunrise over a horizon
  const r = at(t, 3.9, 7.5, 'sineOut'), cy = 1130 - 260 * r;
  const g = X.createRadialGradient(540, cy, 0, 540, cy, 360); g.addColorStop(0, 'rgba(147,249,255,.75)'); g.addColorStop(.25, 'rgba(87,161,239,.35)'); g.addColorStop(1, 'rgba(57,119,213,0)');
  X.save(); X.beginPath(); X.rect(0, 0, 1080, 1130); X.clip(); X.fillStyle = g; X.fillRect(0, 0, 1080, 1920); X.fillStyle = 'rgba(232,254,255,.9)'; X.beginPath(); X.arc(540, cy, 70, 0, 6.283); X.fill(); X.restore();
  X.strokeStyle = 'rgba(147,249,255,.6)'; X.lineWidth = 2; X.beginPath(); X.moveTo(60, 1130); X.lineTo(1020, 1130); X.stroke();
  big(ctx, t, 'EVERY MORNING', 540, 420, 3.95, { size: 64, t1: 6.6 });
  // one person waiting
  const f = at(t, 6.9, 7.6, 'expoOut'); if (f > 0) figure(ctx, 540, 1000, 1, UP, f, 30);
  big(ctx, t, 'ONE PERSON', 540, 420, 6.9, { size: 72, color: UP, glow: 'rgba(147,249,255,.5)' });
  big(ctx, t, 'WAITING TO CHALLENGE YOU', 540, 520, 7.8, { size: 36, color: INK, spacing: 3 });
} });
