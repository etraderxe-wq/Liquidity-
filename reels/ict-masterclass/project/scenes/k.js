// EMULLAX ICT MASTERCLASS — shared look + layout (works for 1080×1920 and 1920×1080).
// Colours: charcoal/black → EMULLAX navy, brand cyan/blue for titles & POI, green/red candles, white structure lines, red-orange liquidity.
export const UP = '#93F9FF', ACC = '#57A1EF', ACC2 = '#3977D5', INK = '#FCFCFC', MUT = '#9AA4B8', GRN = '#2EE6A6', RED = '#FF4D5E', LIQ = '#FF8A4C', WHITE = '#F2F4F8';
export function L(ctx) { const P = ctx.H > ctx.W;
  return P ? { P, chart: { x: 60, y: 560, w: 960, h: 700 }, title: { x: 540, y: 330, align: 'center', w: 940 }, sub: { x: 540, y: 430 }, cap: { x: 540, y: 1400, w: 900 }, side: null }
           : { P, chart: { x: 70, y: 170, w: 1120, h: 760 }, title: { x: 1850, y: 230, align: 'right', w: 600 }, sub: { x: 1850, y: 320 }, cap: { x: 1525, y: 640, w: 600 }, side: { x: 1240, w: 610 } }; }
export function bg(ctx, t, glow = 1) { const { X, W, H } = ctx;
  let g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#030406'); g.addColorStop(.6, '#07090E'); g.addColorStop(1, '#00051A'); X.fillStyle = g; X.fillRect(0, 0, W, H);
  X.save(); X.translate(0, H); X.scale(W * .7, H * .3); g = X.createRadialGradient(0, 0, 0, 0, 0, 1);
  g.addColorStop(0, `rgba(147,249,255,${.3 * glow})`); g.addColorStop(.45, `rgba(57,119,213,${.18 * glow})`); g.addColorStop(1, 'rgba(57,119,213,0)'); X.fillStyle = g; X.fillRect(-1, -1, 2, 2); X.restore();
  X.strokeStyle = 'rgba(255,255,255,.025)'; X.lineWidth = 1; for (let y = 80; y < H; y += 80) { X.beginPath(); X.moveTo(0, y); X.lineTo(W, y); X.stroke(); }
  const img = ctx.img('logo'), w = 120, h = w * img.height / img.width; X.globalAlpha = .9; X.drawImage(img, ctx.H > ctx.W ? 60 : 50, ctx.H > ctx.W ? 160 : 40, w, h); X.globalAlpha = 1;
  ctx.text(X, 'ICT MASTERCLASS', ctx.W - (ctx.H > ctx.W ? 60 : 50), ctx.H > ctx.W ? 200 : 75, { family: 'Michroma', size: 18, color: MUT, dir: 'ltr', align: 'right', letterSpacing: 3 }); }
export function txt(ctx, t, str, x, y, t0, o = {}) { const { X, at } = ctx, size = o.size || 60, out = o.t1 ? 1 - at(t, o.t1, o.t1 + .3) : 1; if (out <= 0 || t < t0) return;
  const Lt = ctx.text.layout(X, str, { family: o.family || 'Tajawal', weight: o.weight || 900, size, maxWidth: o.w || 940, lineHeight: 1.3 });
  ctx.text.drawLayout(X, Lt, x, y, { align: o.align || 'center', color: o.color || INK, perWord: (i, w) => { const q = at(t, t0 + i * (o.st ?? .06), t0 + .45 + i * (o.st ?? .06), 'expoOut'); const hi = o.hi && o.hi.test(w);
    return { clipUp: 1, dy: (1 - q) * size, alpha: q > 0 ? out : 0, color: hi ? (o.hiColor || UP) : (o.color || INK), shadow: hi ? { blur: 22, color: (o.hiColor || UP) + '99' } : undefined }; } }); return Lt; }
export function en(ctx, t, str, x, y, t0, o = {}) { const { X, at } = ctx, k = at(t, t0, t0 + .5, 'expoOut'), out = o.t1 ? 1 - at(t, o.t1, o.t1 + .3) : 1; if (k <= 0 || out <= 0) return;
  ctx.text(X, str, x, y + (1 - k) * 20, { family: 'Michroma', size: o.size || 34, color: o.color || UP, dir: 'ltr', align: o.align || 'center', alpha: k * out, letterSpacing: (o.ls ?? 3) + (1 - k) * 8, maxWidth: o.w, shadow: o.glow ? { blur: 24, color: o.glow } : undefined }); }
// caption card (on-screen VO text) — Gulf Arabic
export function cap(ctx, t, str, t0, t1, o = {}) { const { X, at } = ctx, Ly = L(ctx), a = at(t, t0, t0 + .35) * (1 - at(t, t1 - .3, t1)); if (a <= 0) return;
  const size = o.size || (Ly.P ? 44 : 40), Lt = ctx.text.layout(X, str, { family: 'Tajawal', weight: 800, size, maxWidth: Ly.cap.w, lineHeight: 1.4 }), h = Lt.lines.length * size * 1.4 + 50, w = Math.max(Lt.width, Ly.P ? 600 : 400) + 70;
  const cy = Ly.P ? Ly.cap.y : Ly.cap.y, x0 = Ly.cap.x - w / 2;
  X.save(); X.globalAlpha = a; X.fillStyle = 'rgba(6,9,16,.92)'; X.strokeStyle = 'rgba(147,249,255,.35)'; X.lineWidth = 2; X.beginPath(); X.roundRect(x0, cy - size * 1.05, w, h, 22); X.fill(); X.stroke();
  X.fillStyle = UP; X.fillRect(x0 + w - 8, cy - size * 1.05 + 16, 4, h - 32); X.restore();
  ctx.text.drawLayout(X, Lt, Ly.cap.x, cy, { align: 'center', color: INK, perWord: (i, wd) => ({ alpha: a, color: o.hi && o.hi.test(wd) ? UP : INK }) }); }
// realistic candle formation: price walks o→l→h→c (bull) or o→h→l→c (bear); slow-motion = longer reveal window
export function chart(ctx, t, cfg) { const { X, at } = ctx, cs = cfg.c, n = cfg.n || cs.length, b = cfg.box, lo = cfg.lo, hi = cfg.hi, st = b.w / n;
  const XI = i => b.x + st * (i + .5), Y = p => b.y + b.h - (p - lo) / (hi - lo) * b.h;
  if (cfg.grid !== false) { X.strokeStyle = 'rgba(255,255,255,.05)'; X.lineWidth = 1; for (let k = 1; k < 5; k++) { const y = b.y + b.h * k / 5; X.beginPath(); X.moveTo(b.x, y); X.lineTo(b.x + b.w, y); X.stroke(); } }
  (cfg.under || []).forEach(f => f(XI, Y, st));
  cs.forEach((c, i) => { const [t0, t1] = cfg.rv(i); if (t < t0) return; const k = Math.min(1, (t - t0) / (t1 - t0)), [o, h, l, cl] = c, up = cl >= o;
    const path = up ? [o, l, h, cl] : [o, h, l, cl], seg = k * 3, si = Math.min(2, Math.floor(seg)), f = seg - si, p = k >= 1 ? cl : path[si] + (path[si + 1] - path[si]) * f;
    let hh = o, ll = o; for (let j = 0; j <= si; j++) { hh = Math.max(hh, path[j], j === si ? p : path[j + 1]); ll = Math.min(ll, path[j], j === si ? p : path[j + 1]); }
    const col = p >= o ? GRN : RED, x = XI(i), bw = st * .62; X.globalAlpha = cfg.dim ? cfg.dim(i) : 1;
    X.strokeStyle = col; X.lineWidth = Math.max(2, st * .1); X.beginPath(); X.moveTo(x, Y(hh)); X.lineTo(x, Y(ll)); X.stroke();
    X.fillStyle = col; if (cfg.glow && cfg.glow(i)) { X.shadowColor = col; X.shadowBlur = 24; } X.fillRect(x - bw / 2, Math.min(Y(o), Y(p)), bw, Math.max(2, Math.abs(Y(o) - Y(p)))); X.shadowBlur = 0; X.globalAlpha = 1; });
  (cfg.over || []).forEach(f => f(XI, Y, st)); return { XI, Y, st }; }
export function hline(ctx, t, x0, x1, y, col, t0, o = {}) { const { X, at } = ctx, k = at(t, t0, t0 + .6, 'expoOut'); if (k <= 0) return; X.save(); X.strokeStyle = col; X.lineWidth = o.w || 3;
  if (o.dash) X.setLineDash(o.dash); if (o.glow) { X.shadowColor = col; X.shadowBlur = 16; } X.beginPath(); X.moveTo(x0, y); X.lineTo(x0 + (x1 - x0) * k, y); X.stroke(); X.restore(); }
export function tag(ctx, t, x, y, str, col, t0, o = {}) { const { X, at } = ctx, a = at(t, t0, t0 + .4) * (o.t1 ? 1 - at(t, o.t1, o.t1 + .3) : 1); if (a <= 0) return; const fs = o.size || 24;
  X.font = `400 ${fs}px Michroma`; const w = X.measureText(str).width + 34; let x0 = o.align === 'right' ? x - w : o.align === 'left' ? x : x - w / 2; x0 = Math.max(10, Math.min(ctx.W - 10 - w, x0));
  X.save(); X.globalAlpha = a; X.fillStyle = 'rgba(6,9,16,.92)'; X.strokeStyle = col; X.lineWidth = 2; X.beginPath(); X.roundRect(x0, y - fs, w, fs * 2, 10); X.fill(); X.stroke(); X.restore();
  ctx.text(X, str, x0 + w / 2, y + fs * .38, { family: 'Michroma', size: fs, color: col, dir: 'ltr', alpha: a }); }
export function ring(ctx, t, x, y, col, t0) { const { X, at } = ctx; if (t < t0) return; const k = at(t, t0, t0 + .9, 'expoOut'), p = .5 + .5 * Math.sin((t - t0) * 6);
  X.save(); X.strokeStyle = col; X.lineWidth = 4; X.shadowColor = col; X.shadowBlur = 24; X.globalAlpha = .5 + .5 * p; X.beginPath(); X.arc(x, y, 18 + 26 * k, 0, 6.283); X.stroke(); X.restore(); }
export function arrow(ctx, x0, y0, x1, y1, k, col) { if (k <= 0) return; const X = ctx.X, x = x0 + (x1 - x0) * k, y = y0 + (y1 - y0) * k, a = Math.atan2(y1 - y0, x1 - x0);
  X.save(); X.strokeStyle = col; X.fillStyle = col; X.lineWidth = 6; X.lineCap = 'round'; X.shadowColor = col; X.shadowBlur = 14; X.beginPath(); X.moveTo(x0, y0); X.lineTo(x, y); X.stroke();
  X.translate(x, y); X.rotate(a); X.beginPath(); X.moveTo(8, 0); X.lineTo(-16, -13); X.lineTo(-16, 13); X.closePath(); X.fill(); X.restore(); }
// camera: zoom around a point (chart-space), slow push
export function cam(ctx, z, cx, cy) { const X = ctx.X; X.save(); X.translate(cx, cy); X.scale(z, z); X.translate(-cx, -cy); return () => X.restore(); }
