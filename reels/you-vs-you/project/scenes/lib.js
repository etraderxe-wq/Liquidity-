// YOU VS YOU — black / charcoal base with EMULLAX accents (#3977D5 · #57A1EF · #93F9FF), Michroma + Inter for English, Tajawal for Arabic.
export const UP = '#93F9FF', ACC = '#57A1EF', ACC2 = '#3977D5', INK = '#FCFCFC', MUT = '#8C94A8', CH = '#14161C';
export function bg(ctx, t, o = {}) {
  const { X, W, H } = ctx;
  let g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#050608'); g.addColorStop(.55, '#0C0E13'); g.addColorStop(1, '#00051A'); X.fillStyle = g; X.fillRect(0, 0, W, H);
  const k = o.glow ?? 1;
  X.save(); X.translate(30 * Math.sin(t * .2), H); X.scale(W * .75, H * .3);
  g = X.createRadialGradient(0, 0, 0, 0, 0, 1); g.addColorStop(0, `rgba(147,249,255,${.55 * k})`); g.addColorStop(.4, `rgba(57,119,213,${.35 * k})`); g.addColorStop(1, 'rgba(57,119,213,0)');
  X.fillStyle = g; X.fillRect(-1, -1, 2, 2); X.restore();
  // fine grid + drifting dust
  X.strokeStyle = 'rgba(255,255,255,.025)'; X.lineWidth = 1;
  for (let x = 60; x < W; x += 120) { X.beginPath(); X.moveTo(x, 0); X.lineTo(x, H); X.stroke(); }
  X.save(); X.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 22; i++) { const a = ctx.hash01(i, 1), b = ctx.hash01(i, 2), c = ctx.hash01(i, 3);
    X.fillStyle = `rgba(147,249,255,${.05 + .08 * c})`; X.beginPath(); X.arc((a * W + t * 9 * (b + .3)) % W, (b * H - t * 14 * (c + .3) + H * 2) % H, 1.5 + 2 * c, 0, 6.283); X.fill(); }
  X.restore();
}
// big English line: letters/words rise with blur-in; o: {size, family, color, glow, spacing, t1 (out)}
export function big(ctx, t, str, x, y, t0, o = {}) {
  const { X, at } = ctx, out = o.t1 ? 1 - at(t, o.t1, o.t1 + .25) : 1, k = at(t, t0, t0 + (o.d || .5), 'expoOut');
  if (k <= 0 || out <= 0) return;
  X.save(); X.globalAlpha = k * out; X.translate(x, y + (1 - k) * (o.rise ?? 40)); const s = (o.scale0 ?? 1.08) + (1 - (o.scale0 ?? 1.08)) * k; X.scale(s, s);
  if (k < 1 && o.blur !== false) X.filter = `blur(${(1 - k) * 10}px)`;
  ctx.text(X, str, 0, 0, { family: o.family || 'Michroma', weight: o.weight || 400, size: o.size || 80, color: o.color || INK, dir: 'ltr', letterSpacing: (o.spacing ?? 4) + (1 - k) * 10, maxWidth: o.maxWidth || 960,
    shadow: o.glow ? { blur: 34, color: o.glow } : undefined });
  X.restore();
}
export function strike(ctx, t, x0, x1, y, t0, col = UP) { const { X, at } = ctx, k = at(t, t0, t0 + .3, 'expoOut'); if (k <= 0) return;
  X.save(); X.strokeStyle = col; X.lineWidth = 8; X.lineCap = 'round'; X.shadowColor = col; X.shadowBlur = 14; X.beginPath(); X.moveTo(x0, y); X.lineTo(x0 + (x1 - x0) * k, y); X.stroke(); X.restore(); }
export function flash(ctx, t, t0, a = .35) { const k = ctx.at(t, t0, t0 + .3); if (k <= 0 || k >= 1) return; const X = ctx.X; X.save(); X.globalAlpha = a * (1 - k); X.fillStyle = '#E8FEFF'; X.fillRect(0, 0, 1080, 1920); X.restore(); }
export function figure(ctx, x, y, s, col, a = 1, glow = 0) {   // abstract glowing silhouette (no real person)
  const X = ctx.X; X.save(); X.globalAlpha = a; X.translate(x, y); X.scale(s, s); X.strokeStyle = col; X.lineWidth = 6; if (glow) { X.shadowColor = col; X.shadowBlur = glow; }
  X.beginPath(); X.arc(0, -150, 46, 0, 6.283); X.stroke();
  X.beginPath(); X.moveTo(-95, 120); X.quadraticCurveTo(-100, -70, 0, -78); X.quadraticCurveTo(100, -70, 95, 120); X.stroke(); X.restore(); }
