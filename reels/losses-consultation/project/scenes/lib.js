// Shared EMULLAX look for the «losses & consultation» reel. Brand: brand/BRAND.md (navy → blue, cyan glow, Tajawal, English digits).
export const FD = 'Tajawal', FN = 'Inter', FE = 'Michroma';
export const UP = '#93F9FF', DN = '#3977D5', RED = '#FF4D5E', INK = '#FCFCFC', MUT = '#A9B6D3', ACC = '#57A1EF';

export function rrect(X, x, y, w, h, r) {
  X.beginPath(); X.moveTo(x + r, y); X.arcTo(x + w, y, x + w, y + h, r); X.arcTo(x + w, y + h, x, y + h, r);
  X.arcTo(x, y + h, x, y, r); X.arcTo(x, y, x + w, y, r); X.closePath();
}
// brand background + cinematic light: navy top → blue bottom, cyan corner glow, slow light beam, dust
export function bg(ctx, t, o = {}) {
  const { X, W, H } = ctx, dim = o.dim ?? 0;
  const ang = 172 * Math.PI / 180, dx = Math.sin(ang), dy = -Math.cos(ang), half = (Math.abs(W * dx) + Math.abs(H * dy)) / 2;
  let g = X.createLinearGradient(W / 2 - dx * half, H / 2 - dy * half, W / 2 + dx * half, H / 2 + dy * half);
  [[0, '#00051A'], [.30, '#00051A'], [.50, '#08163D'], [.72, '#1F4590'], [1, '#3D7EE1']].forEach(([p, c]) => g.addColorStop(p, c));
  X.fillStyle = g; X.fillRect(0, 0, W, H);
  X.save(); X.translate(40 * Math.sin(t * .21), H + 30 * Math.cos(t * .17)); X.scale(W * .8, H * .38);
  g = X.createRadialGradient(0, 0, 0, 0, 0, 1);
  g.addColorStop(0, '#93F9FF'); g.addColorStop(.38, 'rgba(87,161,239,.85)'); g.addColorStop(.75, 'rgba(61,126,225,0)');
  X.fillStyle = g; X.fillRect(-1, -1, 2, 2); X.restore();
  // soft volumetric beam from top-right
  X.save(); X.globalCompositeOperation = 'lighter'; X.translate(860 + 60 * Math.sin(t * .13), -120); X.rotate(.42 + .05 * Math.sin(t * .2));
  g = X.createLinearGradient(-160, 0, 160, 0); g.addColorStop(0, 'rgba(87,161,239,0)'); g.addColorStop(.5, 'rgba(87,161,239,.07)'); g.addColorStop(1, 'rgba(87,161,239,0)');
  X.fillStyle = g; X.fillRect(-160, 0, 320, 1700); X.restore();
  // dust motes
  X.save(); X.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 26; i++) { const h1 = ctx.hash01(i, 3), h2 = ctx.hash01(i, 7), h3 = ctx.hash01(i, 11);
    const x = (h1 * W + t * (8 + 14 * h2)) % W, y = (h2 * H * .8 - t * (10 + 18 * h3) + H) % (H * .8);
    X.fillStyle = `rgba(147,249,255,${.06 + .1 * h3})`; X.beginPath(); X.arc(x, y, 1.5 + 2.5 * h3, 0, 6.283); X.fill(); }
  X.restore();
  if (dim > 0) { X.fillStyle = `rgba(0,5,26,${dim})`; X.fillRect(0, 0, W, H); }
  if (o.red) { // danger tint (revenge / stop loss)
    X.save(); g = X.createRadialGradient(540, 960, 300, 540, 960, 1200); g.addColorStop(0, 'rgba(255,77,94,0)'); g.addColorStop(1, `rgba(255,40,60,${.35 * o.red})`);
    X.fillStyle = g; X.fillRect(0, 0, W, H); X.restore(); }
}
export function panel(ctx, x, y, w, h, a = 1, o = {}) {
  const { X } = ctx; if (a <= 0) return; X.save(); X.globalAlpha = a; X.fillStyle = o.fill || 'rgba(0,5,26,.84)';
  X.strokeStyle = o.stroke || 'rgba(87,161,239,.32)'; X.lineWidth = o.lw || 2;
  if (o.glow) { X.shadowColor = o.glow; X.shadowBlur = 40; }
  rrect(X, x, y, w, h, o.r ?? 28); X.fill(); X.shadowBlur = 0; X.stroke(); X.restore();
}
export function pill(ctx, x, y, ar, en, col, a, align = 'center', o = {}) {
  const { X } = ctx; if (a <= 0) return;
  const fs = o.size || 30, fe = Math.round(fs * .8);
  X.save(); X.globalAlpha = a;
  X.font = `700 ${fs}px ${FD}`; const wa = ar ? X.measureText(ar).width : 0;
  X.font = `800 ${fe}px ${FN}`; const we = en ? X.measureText(en).width * 1.06 : 0;
  const gap = ar && en ? 14 : 0, w = wa + we + gap + 36, h = fs * 1.6;
  let x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; x0 = Math.max(24, Math.min(1056 - w, x0));
  X.fillStyle = o.fill || 'rgba(0,5,26,.9)'; X.strokeStyle = col; X.lineWidth = 2; rrect(X, x0, y - h / 2, w, h, 14); X.fill(); X.stroke();
  if (ar) ctx.text(X, ar, x0 + w - 18, y + fs * .33, { family: FD, weight: 700, size: fs, color: o.ink || INK, align: 'right', dir: 'rtl' });
  if (en) ctx.text(X, en, x0 + 18, y + fe * .37, { family: FN, weight: 800, size: fe, color: col, align: 'left', dir: 'ltr', letterSpacing: 1 });
  X.restore(); return { x0, w };
}
// glitch text: RGB split + sliced offsets, deterministic per frame; amt 0..1
export function glitchText(ctx, t, str, x, y, o, amt) {
  const { X } = ctx, f = Math.floor(t * 30), base = { ...o, align: o.align || 'center' };
  if (amt > .02) {
    X.save(); X.globalCompositeOperation = 'lighter';
    const dx = 10 * amt * (ctx.hash01(f, 1) - .5) * 2 + 6 * amt;
    ctx.text(X, str, x - dx, y, { ...base, color: 'rgba(255,60,80,.75)' });
    ctx.text(X, str, x + dx, y + 2 * amt, { ...base, color: 'rgba(80,220,255,.75)' });
    X.restore();
  }
  ctx.text(X, str, x, y, base);
  if (amt > .15) { // horizontal slice jitter
    for (let k = 0; k < 3; k++) { if (ctx.hash01(f, k + 20) > amt) continue;
      const sy = y - (o.size || 80) * (.2 + .9 * ctx.hash01(f, k + 30)), sh = 6 + 18 * ctx.hash01(f, k + 40), off = (ctx.hash01(f, k + 50) - .5) * 60 * amt;
      X.save(); X.beginPath(); X.rect(0, sy, 1080, sh); X.clip(); X.translate(off, 0);
      X.fillStyle = 'rgba(0,5,26,1)'; X.fillRect(0, sy, 1080, sh); ctx.text(X, str, x, y, base); X.restore(); }
  }
}
// kinetic line: words rise out of the baseline one after another (RTL)
export function kinetic(ctx, t, str, x, y, t0, o = {}) {
  const { X, at } = ctx, size = o.size || 80;
  const L = ctx.text.layout(X, str, { family: o.family || FD, weight: o.weight || 900, size, maxWidth: o.maxWidth || 960, lineHeight: 1.25 });
  const out = o.tEnd ? 1 - at(t, o.tEnd, o.tEnd + .3) : 1; if (out <= 0) return L;
  ctx.text.drawLayout(X, L, x, y, { align: o.align || 'center', color: o.color || INK, perWord: (i, w) => {
    const q = at(t, t0 + i * (o.stagger ?? .09), t0 + .45 + i * (o.stagger ?? .09), 'expoOut');
    const hi = o.hi && o.hi.test(w.text);
    return { clipUp: 1, dy: (1 - q) * size * 1.1, alpha: q > 0 ? out * (o.alpha ?? 1) : 0, color: hi ? (o.hiColor || UP) : (o.color || INK),
             shadow: hi ? { blur: 26, color: o.hiColor || UP } : undefined }; } });
  return L;
}
// camera: zoom about a point (push-in), small handheld drift; returns restore fn
export function cam(ctx, z, cx = 540, cy = 960, shake = 0, t = 0) {
  const { X } = ctx; X.save();
  const f = Math.floor(t * 30), sx = shake ? (ctx.hash01(f, 91) - .5) * 2 * shake : 0, sy = shake ? (ctx.hash01(f, 92) - .5) * 2 * shake : 0;
  X.translate(cx + sx, cy + sy); X.scale(z, z); X.translate(-cx, -cy);
  return () => X.restore();
}
export function flash(ctx, k, col = 'rgba(255,60,80,') { if (k <= 0) return; const { X } = ctx; X.save(); X.fillStyle = col + (k * .55) + ')'; X.fillRect(0, 0, 1080, 1920); X.restore(); }
export function icon(ctx, kind, x, y, s, col, a = 1) { // simple line icons
  const { X } = ctx; if (a <= 0) return; X.save(); X.globalAlpha = a; X.translate(x, y); X.scale(s / 100, s / 100);
  X.strokeStyle = col; X.fillStyle = col; X.lineWidth = 8; X.lineCap = 'round'; X.lineJoin = 'round';
  const P = pts => { X.beginPath(); pts.forEach(([a, b], i) => i ? X.lineTo(a, b) : X.moveTo(a, b)); X.stroke(); };
  if (kind === 'check') P([[-30, 2], [-8, 24], [32, -22]]);
  else if (kind === 'x') { P([[-26, -26], [26, 26]]); P([[26, -26], [-26, 26]]); }
  else if (kind === 'enter') { P([[-40, 0], [24, 0]]); P([[4, -22], [26, 0], [4, 22]]); X.strokeRect(30, -40, 14, 80); }
  else if (kind === 'exit') { P([[-24, 0], [40, 0]]); P([[18, -22], [40, 0], [18, 22]]); X.strokeRect(-44, -40, 14, 80); }
  else if (kind === 'stop') { X.beginPath(); X.arc(0, 0, 42, 0, 6.283); X.stroke(); X.fillRect(-16, -20, 10, 40); X.fillRect(6, -20, 10, 40); }
  else if (kind === 'book') { rrect(X, -40, -44, 80, 88, 10); X.stroke(); P([[-20, -20], [22, -20]]); P([[-20, 0], [22, 0]]); P([[-20, 20], [8, 20]]); }
  else if (kind === 'shield') { X.beginPath(); X.moveTo(0, -46); X.lineTo(40, -30); X.lineTo(36, 10); X.quadraticCurveTo(26, 36, 0, 48); X.quadraticCurveTo(-26, 36, -36, 10); X.lineTo(-40, -30); X.closePath(); X.stroke(); P([[-16, 0], [-4, 14], [18, -12]]); }
  else if (kind === 'gauge') { X.beginPath(); X.arc(0, 12, 42, Math.PI, 0); X.stroke(); P([[0, 12], [-22, -14]]); }
  else if (kind === 'plan') { rrect(X, -38, -44, 76, 88, 10); X.stroke(); P([[-20, -16], [-12, -8], [2, -24]]); P([[10, -16], [24, -16]]); P([[-20, 14], [-12, 22], [2, 6]]); P([[10, 14], [24, 14]]); }
  else if (kind === 'comment') { X.beginPath(); X.arc(0, -4, 40, .35, 6.283 - .1); X.lineTo(36, 38); X.closePath(); X.stroke(); }
  else if (kind === 'clock') { X.beginPath(); X.arc(0, 0, 42, 0, 6.283); X.stroke(); P([[0, -24], [0, 0], [18, 10]]); }
  X.restore();
}
export { };
