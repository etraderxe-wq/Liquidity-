// EMULLAX market stories kit — dark (black → navy) institutional look, EMULLAX blue/cyan for brand & titles,
// red = down, green = up, gold tint only to tag the gold asset. All text live, RTL, English digits.
export const UP = '#93F9FF', ACC = '#57A1EF', ACC2 = '#3977D5', INK = '#FCFCFC', MUT = '#9AA4B8', RED = '#FF4D5E', GRN = '#2EE6A6', GOLD = '#E3B95C';
export function rr(X, x, y, w, h, r) { X.beginPath(); X.roundRect(x, y, w, h, r); }
export function frame(ctx, t, lt, n, total = 8) {
  const { X, W, H, at } = ctx;
  let g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#030407'); g.addColorStop(.6, '#05070D'); g.addColorStop(1, '#00051A'); X.fillStyle = g; X.fillRect(0, 0, W, H);
  X.save(); X.translate(0, H); X.scale(W * .7, H * .26); g = X.createRadialGradient(0, 0, 0, 0, 0, 1);
  g.addColorStop(0, 'rgba(147,249,255,.35)'); g.addColorStop(.45, 'rgba(57,119,213,.2)'); g.addColorStop(1, 'rgba(57,119,213,0)'); X.fillStyle = g; X.fillRect(-1, -1, 2, 2); X.restore();
  X.strokeStyle = 'rgba(255,255,255,.028)'; X.lineWidth = 1; for (let y = 160; y < H; y += 80) { X.beginPath(); X.moveTo(0, y); X.lineTo(W, y); X.stroke(); }
  // header: logo (small, fixed) + series tag + story number
  const img = ctx.img('logo'), w = 150, h = w * img.height / img.width; X.drawImage(img, 70, 150 - h / 2 + 18, w, h);
  ctx.text(X, 'MARKET STORY · 22–23 OCT 2026', 1010, 160, { family: 'Michroma', size: 18, color: MUT, dir: 'ltr', align: 'right', letterSpacing: 2 });
  ctx.text(X, String(n).padStart(2, '0') + ' / ' + String(total).padStart(2, '0'), 1010, 196, { family: 'Michroma', size: 22, color: UP, dir: 'ltr', align: 'right' });
  // progress bar
  X.fillStyle = 'rgba(255,255,255,.08)'; X.fillRect(70, 236, 940, 3); X.fillStyle = UP; X.fillRect(70, 236, 940 * Math.min(1, lt / ctx.scene.dur), 3);
}
export function title(ctx, lt, str, y, t0 = .15, o = {}) {
  const { X, at } = ctx, size = o.size || 74;
  const L = ctx.text.layout(X, str, { family: 'Tajawal', weight: 900, size, maxWidth: o.maxWidth || 940, lineHeight: 1.25 });
  ctx.text.drawLayout(X, L, o.x || 1010, y, { align: o.align || 'right', color: INK, perWord: (i, w) => { const q = at(lt, t0 + i * .09, t0 + .55 + i * .09, 'expoOut');
    const hi = o.hi && o.hi.test(w); return { clipUp: 1, dy: (1 - q) * size, alpha: q > 0 ? 1 : 0, color: hi ? (o.hiColor || UP) : INK, shadow: hi ? { blur: 24, color: (o.hiColor || UP) + '88' } : undefined }; } });
  return L;
}
export function line(ctx, lt, str, y, t0, o = {}) {
  const { X, at } = ctx, k = at(lt, t0, t0 + .5, 'expoOut'); if (k <= 0) return;
  ctx.text(X, str, (o.x || 1010) + (1 - k) * 40, y, { family: 'Tajawal', weight: o.weight || 700, size: o.size || 44, color: o.color || INK, align: o.align || 'right', alpha: k * (o.alpha ?? 1), maxWidth: o.maxWidth || 940, dir: o.dir });
}
export function card(ctx, x, y, w, h, a = 1, o = {}) { const X = ctx.X; if (a <= 0) return; X.save(); X.globalAlpha = a;
  X.fillStyle = o.fill || 'rgba(8,12,22,.92)'; X.strokeStyle = o.stroke || 'rgba(87,161,239,.28)'; X.lineWidth = 2; if (o.glow) { X.shadowColor = o.glow; X.shadowBlur = 30; }
  rr(X, x, y, w, h, o.r ?? 22); X.fill(); X.shadowBlur = 0; X.stroke(); if (o.bar) { X.fillStyle = o.bar; rr(X, x + w - 8, y + 14, 6, h - 28, 3); X.fill(); } X.restore(); }
export function tri(ctx, x, y, s, up, col, a = 1) { const X = ctx.X; X.save(); X.globalAlpha = a; X.fillStyle = col; X.beginPath();
  if (up) { X.moveTo(x, y - s); X.lineTo(x + s, y + s * .7); X.lineTo(x - s, y + s * .7); } else { X.moveTo(x, y + s); X.lineTo(x + s, y - s * .7); X.lineTo(x - s, y - s * .7); } X.closePath(); X.fill(); X.restore(); }
// deterministic candles with a story: flat-ish start then a directional leg (dir: -1 down, +1 up)
export function series(seed, n, dir, legFrom = .45, vol = 1) {
  let r = seed * 7919 + 13, p = 100; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280, out = [];
  for (let i = 0; i < n; i++) { const leg = i / n > legFrom, o = p, c = o + (rnd() - .5) * 2.2 * vol + (leg ? dir * 1.6 * vol : dir * .1); out.push([o, Math.max(o, c) + rnd() * .9 * vol, Math.min(o, c) - rnd() * .9 * vol, c]); p = c; }
  return out;
}
export function candles(ctx, lt, cs, box, t0, dur, o = {}) {
  const { X, at } = ctx, n = cs.length, lo = Math.min(...cs.map(c => c[2])), hi = Math.max(...cs.map(c => c[1])), pad = (hi - lo) * .08;
  const Y = v => box.y + box.h - (v - lo + pad) / (hi - lo + 2 * pad) * box.h, st = box.w / n;
  if (o.grid !== false) { X.strokeStyle = 'rgba(255,255,255,.05)'; X.lineWidth = 1; for (let k = 1; k < 4; k++) { const y = box.y + box.h * k / 4; X.beginPath(); X.moveTo(box.x, y); X.lineTo(box.x + box.w, y); X.stroke(); } }
  let last = null;
  cs.forEach((c, i) => { const k = at(lt, t0 + dur * i / n, t0 + dur * i / n + .25, 'cubicOut'); if (k <= 0) return; const [op, h, l, cl] = c, up = cl >= op, col = o.color ? o.color(up) : up ? GRN : RED, x = box.x + st * (i + .5);
    X.globalAlpha = k; X.strokeStyle = col; X.lineWidth = Math.max(1.5, st * .12); X.beginPath(); X.moveTo(x, Y(h)); X.lineTo(x, Y(l)); X.stroke();
    X.fillStyle = col; X.fillRect(x - st * .32, Math.min(Y(op), Y(cl)), st * .64, Math.max(2, Math.abs(Y(op) - Y(cl)))); X.globalAlpha = 1; last = [x, Y(cl)]; });
  if (last && o.tag) { X.setLineDash([6, 6]); X.strokeStyle = o.tagColor || UP; X.globalAlpha = .7; X.beginPath(); X.moveTo(box.x, last[1]); X.lineTo(box.x + box.w, last[1]); X.stroke(); X.setLineDash([]); X.globalAlpha = 1; }
  return { Y, last };
}
export function arrow(ctx, x0, y0, x1, y1, k, col = UP) { if (k <= 0) return; const X = ctx.X, x = x0 + (x1 - x0) * k, y = y0 + (y1 - y0) * k, a = Math.atan2(y1 - y0, x1 - x0);
  X.save(); X.strokeStyle = col; X.fillStyle = col; X.lineWidth = 5; X.lineCap = 'round'; X.beginPath(); X.moveTo(x0, y0); X.lineTo(x, y); X.stroke();
  X.translate(x, y); X.rotate(a); X.beginPath(); X.moveTo(6, 0); X.lineTo(-14, -11); X.lineTo(-14, 11); X.closePath(); X.fill(); X.restore(); }
// takeaway box at the bottom of a story
export function takeaway(ctx, lt, str, t0, y = 1300) { const { X, at } = ctx, k = at(lt, t0, t0 + .6, 'expoOut'); if (k <= 0) return;
  const L = ctx.text.layout(X, str, { family: 'Tajawal', weight: 900, size: 46, maxWidth: 860, lineHeight: 1.35 }), h = L.lines.length * 62 + 92;
  card(ctx, 70, y - (1 - k) * 30, 940, h, k, { stroke: UP, glow: 'rgba(147,249,255,.25)', bar: UP });
  ctx.text(X, 'الخلاصة', 980, y + 52 - (1 - k) * 30, { family: 'Tajawal', weight: 800, size: 30, color: UP, align: 'right', alpha: k });
  ctx.text.drawLayout(X, L, 980, y + 112 - (1 - k) * 30, { align: 'right', color: INK, perWord: () => ({ alpha: k }) }); }
export function note(ctx, str, a = 1) { ctx.text(ctx.X, str, 540, 1505, { family: 'Tajawal', weight: 600, size: 26, color: '#7D879C', alpha: a }); }
