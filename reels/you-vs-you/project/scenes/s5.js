// the easy-way-out version: dim, sinking words
import { bg, big, figure, UP, INK, MUT } from './lib.js';
const W = [[25.5, 'PROCRASTINATES'], [26.85, 'DOUBTS'], [27.9, 'HIDES FROM'], [28.35, 'DISCOMFORT']];
MOTION.scene({ id: 's5', draw(t, lt, ctx) { const { X, at } = ctx; bg(ctx, t, { glow: .25 });
  const f = at(t, 21.2, 21.9); figure(ctx, 540, 1080, 1.15, '#4A5060', f, 0);
  big(ctx, t, 'VERSION A', 540, 330, 21.2, { size: 34, color: MUT, spacing: 8 });
  big(ctx, t, 'THE EASY WAY OUT', 540, 450, 22.6, { size: 56, color: '#A3AAB8' });
  W.forEach(([t0, w], i) => { const sink = at(t, 28.6, 29.4) * 50;
    big(ctx, t, w, 540, 620 + i * 90 + sink, t0, { size: 50, color: '#6D7485', spacing: 3 }); });
} });
