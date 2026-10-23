// LIQUIDATIONS — shared look: black → EMULLAX navy, cyan glow, Tajawal/Michroma, English digits.
export const UP = '#93F9FF', ACC = '#57A1EF', ACC2 = '#3977D5', INK = '#FCFCFC', MUT = '#9AA4B8', RED = '#FF4D5E';
export function bg(ctx, t, glow = 1) { const { X, W, H } = ctx;
  let g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#020305'); g.addColorStop(.6, '#04070E'); g.addColorStop(1, '#00051A'); X.fillStyle = g; X.fillRect(0, 0, W, H);
  if (glow > 0) { X.save(); X.translate(20 * Math.sin(t * .2), H); X.scale(W * .75, H * .28); g = X.createRadialGradient(0, 0, 0, 0, 0, 1);
    g.addColorStop(0, `rgba(147,249,255,${.4 * glow})`); g.addColorStop(.45, `rgba(57,119,213,${.22 * glow})`); g.addColorStop(1, 'rgba(57,119,213,0)'); X.fillStyle = g; X.fillRect(-1, -1, 2, 2); X.restore(); } }
export function txt(ctx, t, str, y, t0, o = {}) { // kinetic Arabic line: words rise one by one; o.t1 fades out
  const { X, at } = ctx, size = o.size || 64, out = o.t1 ? 1 - at(t, o.t1, o.t1 + .3) : 1; if (out <= 0 || t < t0) return;
  const L = ctx.text.layout(X, str, { family: o.family || 'Tajawal', weight: o.weight || 900, size, maxWidth: o.maxWidth || 940, lineHeight: 1.3 });
  ctx.text.drawLayout(X, L, o.x || 540, y, { align: o.align || 'center', color: o.color || INK, perWord: (i, w) => { const q = at(t, t0 + i * (o.st ?? .08), t0 + .5 + i * (o.st ?? .08), 'expoOut');
    const hi = o.hi && o.hi.test(w); return { clipUp: 1, dy: (1 - q) * size, alpha: q > 0 ? out : 0, color: hi ? (o.hiColor || UP) : (o.color || INK), shadow: hi ? { blur: 26, color: (o.hiColor || UP) + '99' } : { blur: 16, color: 'rgba(0,0,0,.7)' } }; } });
  return L; }
export function seat(ctx, x, y, s, lit, col = UP) { const X = ctx.X; X.save(); X.translate(x, y); X.scale(s, s);
  X.lineWidth = 5; X.strokeStyle = lit > 0 ? col : 'rgba(154,164,184,.35)'; X.fillStyle = `rgba(147,249,255,${.12 * lit})`;
  if (lit > 0) { X.shadowColor = col; X.shadowBlur = 40 * lit; }
  X.beginPath(); X.roundRect(-46, -80, 92, 86, 16); X.fill(); X.stroke(); X.beginPath(); X.roundRect(-56, 10, 112, 30, 10); X.fill(); X.stroke();
  X.beginPath(); X.moveTo(-44, 40); X.lineTo(-44, 82); X.moveTo(44, 40); X.lineTo(44, 82); X.stroke(); X.restore(); }
export function candlesBG(ctx, t, a, y0 = 1150, h = 420, seed = 3) { const X = ctx.X; let r = seed * 77 + 1, p = 50; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  const cs = []; for (let i = 0; i < 40; i++) { const o = p, c = o + (rnd() - .45) * 6; cs.push([o, Math.max(o, c) + rnd() * 3, Math.min(o, c) - rnd() * 3, c]); p = c; }
  const lo = Math.min(...cs.map(c => c[2])), hi = Math.max(...cs.map(c => c[1])), Y = v => y0 + h - (v - lo) / (hi - lo) * h, n = Math.min(40, Math.floor(t * 5) + 10);
  X.save(); X.globalAlpha = a; for (let i = 0; i < n; i++) { const [o, hh, l, c] = cs[i], x = 30 + i * 26, up = c >= o; X.strokeStyle = X.fillStyle = up ? UP : ACC2;
    X.lineWidth = 2; X.beginPath(); X.moveTo(x, Y(hh)); X.lineTo(x, Y(l)); X.stroke(); X.fillRect(x - 8, Math.min(Y(o), Y(c)), 16, Math.max(2, Math.abs(Y(o) - Y(c)))); } X.restore(); }
export function smoke(ctx, t, a, cx = 540, cy = 1000, spread = 300) { const X = ctx.X; if (a <= 0) return; X.save();
  for (let i = 0; i < 26; i++) { const h1 = ctx.hash01(i, 1), h2 = ctx.hash01(i, 2), life = 4 + 2 * h1, ph = ((t + h2 * life) % life) / life;
    const x = cx + (h1 - .5) * spread + Math.sin(t * .6 + i) * 40 * ph, y = cy - ph * 900, r = 60 + 220 * ph;
    const g = X.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(120,130,150,${.16 * a * (1 - ph)})`); g.addColorStop(1, 'rgba(120,130,150,0)'); X.fillStyle = g; X.fillRect(x - r, y - r, 2 * r, 2 * r); }
  X.restore(); }
export function ash(ctx, t, a, cx = 540, cy = 1000) { const X = ctx.X; if (a <= 0) return; X.save();
  for (let i = 0; i < 70; i++) { const h1 = ctx.hash01(i, 5), h2 = ctx.hash01(i, 6), h3 = ctx.hash01(i, 7), life = 2.5 + 3 * h1, ph = ((t + h2 * life) % life) / life;
    const x = cx + (h3 - .5) * 500 + Math.sin(t * 2 + i) * 30, y = cy - ph * 1100, hot = h3 > .6;
    X.fillStyle = hot ? `rgba(255,${150 + 80 * h2 | 0},80,${a * (1 - ph)})` : `rgba(170,175,185,${.7 * a * (1 - ph)})`; X.fillRect(x, y, 2 + 3 * h1, 2 + 3 * h1); }
  X.restore(); }
export function note(ctx, str, a, y = 1500) { if (a <= 0) return; const L = ctx.text.layout(ctx.X, str, { family: 'Tajawal', weight: 700, size: 31, maxWidth: 900, lineHeight: 1.4 });
  ctx.text.drawLayout(ctx.X, L, 540, y, { align: 'center', color: '#A3ACBE', perWord: () => ({ alpha: a }) }); }
export function logoTitle(ctx, t, x, y, s, a, blur = 0) { const X = ctx.X; if (a <= 0) return; X.save(); X.globalAlpha = a; X.translate(x, y); X.scale(s, s); if (blur) X.filter = `blur(${blur}px)`;
  ctx.text(X, 'LIQUIDATIONS', 0, 0, { family: 'Michroma', size: 92, color: INK, dir: 'ltr', letterSpacing: 4, shadow: { blur: 40, color: 'rgba(147,249,255,.55)' } });
  ctx.text(X, 'By EMULLAX', 0, 74, { family: 'Michroma', size: 30, color: UP, dir: 'ltr', letterSpacing: 8 }); X.restore(); }
