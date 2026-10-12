// Shared look for «5 قوانين قاسية للنجاح» — EMULLAX brand (#00051A bg, #57A1EF accent).
export const FD = 'Tajawal', FB = 'Tajawal', FN = 'Inter';   // Cairo's bundled build draws final ي dotless

export function rrect(X, x, y, w, h, r) {
  X.beginPath(); X.moveTo(x + r, y); X.arcTo(x + w, y, x + w, y + h, r); X.arcTo(x + w, y + h, x, y + h, r);
  X.arcTo(x, y + h, x, y, r); X.arcTo(x, y, x + w, y, r); X.closePath();
}

// background (brand rule, brand/BRAND.md): navy #00051A on top → blue #3D7EE1 at the bottom,
// cyan #93F9FF glow in the bottom-left corner; slow drift + faint dot texture
export function bg(ctx, t) {
  const { X, W, H } = ctx;
  const ang = 172 * Math.PI / 180, dx = Math.sin(ang), dy = -Math.cos(ang), half = (Math.abs(W * dx) + Math.abs(H * dy)) / 2;
  let g = X.createLinearGradient(W / 2 - dx * half, H / 2 - dy * half, W / 2 + dx * half, H / 2 + dy * half);
  [[0, '#00051A'], [.30, '#00051A'], [.50, '#08163D'], [.72, '#1F4590'], [1, '#3D7EE1']].forEach(([o, c]) => g.addColorStop(o, c));
  X.fillStyle = g; X.fillRect(0, 0, W, H);
  const gx = 40 * Math.sin(t * .21), gy = 30 * Math.cos(t * .17);
  X.save(); X.translate(gx, H + gy); X.scale(W * .8, H * .38);
  g = X.createRadialGradient(0, 0, 0, 0, 0, 1);
  g.addColorStop(0, '#93F9FF'); g.addColorStop(.38, 'rgba(87,161,239,.85)'); g.addColorStop(.75, 'rgba(61,126,225,0)');
  X.fillStyle = g; X.fillRect(-1, -1, 2, 2); X.restore();
  X.fillStyle = 'rgba(147,170,220,.06)';
  const off = (t * 6) % 60;
  for (let y = -60 + off; y < H * .55; y += 60) for (let x = 30; x < W; x += 60) X.fillRect(x, y, 2.4, 2.4);
}

// law header: gradient number badge (right) + title rising word by word, accent underline
export function header(ctx, t, lt, n, title) {
  const { X, E, at, P } = ctx;
  const k = E.springK(ctx.prog(lt, .05, .9));
  X.save(); X.translate(912, 288); X.scale(k, k); X.rotate((1 - Math.min(k, 1)) * -.4);
  const g = X.createLinearGradient(-60, -60, 60, 60); g.addColorStop(0, P.hi); g.addColorStop(.5, P.acc); g.addColorStop(1, P.acc2);
  X.fillStyle = g; rrect(X, -60, -60, 120, 120, 30); X.fill();
  ctx.text(X, String(n), 0, 27, { family: FN, weight: 900, size: 80, color: P.bg, dir: 'ltr' });
  X.restore();
  const L = ctx.text.layout(X, title, { family: FD, weight: 900, size: 94 });
  ctx.text.drawLayout(X, L, 826, 322, { align: 'right', color: P.ink, perWord: i => {
    const q = at(lt, .2 + i * .12, .75 + i * .12, 'expoOut'); return { clipUp: 1, dy: (1 - q) * 110, alpha: q > 0 ? 1 : 0 }; } });
  const w = Math.min(L.width, 680), u = at(lt, .55, 1.15, 'expoInOut');
  if (u > 0) { X.strokeStyle = P.acc; X.lineWidth = 8; X.lineCap = 'round'; X.beginPath(); X.moveTo(826, 362); X.lineTo(826 - w * u, 362); X.stroke(); }
}

// kinetic subtitle: one short phrase at a time, spoken words light up, current word in accent
export function subs(ctx, t, id, o = {}) {
  const { X, P, at } = ctx;
  const words = ctx.wordsOf(id); if (!words || !words.length) return;
  const chunks = []; let cur = [];
  words.forEach((w, i) => { cur.push(i); if (/[.؟?…:،]$/.test(w.w) || cur.length >= 5) { chunks.push(cur); cur = []; } });
  if (cur.length) chunks.push(cur);
  const endAll = words[words.length - 1].e + .45;
  let ci = -1; chunks.forEach((c, j) => { if (t >= words[c[0]].s - .12) ci = j; });
  if (ci < 0 || t > endAll) return;
  const c = chunks[ci], s0 = words[c[0]].s - .12, nextS = ci + 1 < chunks.length ? words[chunks[ci + 1][0]].s - .12 : endAll;
  const inK = at(t, s0, s0 + .28, 'expoOut'), outK = 1 - at(t, nextS - .14, nextS, 'quadIn');
  const str = c.map(i => words[i].w).join(' ');
  const L = ctx.text.layout(X, str, { family: FB, weight: 700, size: o.size || 56, maxWidth: 800, lineHeight: 1.45 });
  const y = (o.y || 1430) - (L.lines.length - 1) * (o.size || 56) * 1.45;
  X.save(); X.globalAlpha = .78 * inK * outK; X.fillStyle = 'rgba(0,5,26,.82)';
  rrect(X, 540 - L.width / 2 - 34, y - (o.size || 56) * 1.1, L.width + 68, L.lines.length * (o.size || 56) * 1.45 + 30, 26); X.fill(); X.restore();
  ctx.text.drawLayout(X, L, 540, y, { align: 'center', color: P.ink, perWord: (k) => {
    const w = words[c[k]], spoken = t >= w.s, active = t >= w.s && t < w.e + .08;
    return { alpha: (spoken ? 1 : .32) * inK * outK, dy: (1 - inK) * 18, color: active ? P.hi : P.ink }; } });
}

// marker highlight: accent bar sweeps right→left behind dark text
export function marker(ctx, t, str, y, t0, o = {}) {
  const { X, P, at } = ctx;
  const size = o.size || 68, L = ctx.text.layout(X, str, { family: FD, weight: 800, size });
  const k = at(t, t0, t0 + .45, 'expoOut'), a = at(t, t0 - .1, t0 + .15);
  if (a <= 0) return;
  const w = L.width + 56, h = size * 1.35, x0 = 540 + w / 2;
  X.save(); X.globalAlpha = a;
  X.fillStyle = P.acc; rrect(X, x0 - w * k, y - size * 1.0, w * k, h, 16); X.fill();
  ctx.text.drawLayout(X, L, 540, y, { align: 'center', color: k > .55 ? P.bg : P.ink, perWord: () => ({ alpha: a }) });
  X.restore();
}

export function wordIdx(ctx, id, re) { return ctx.wordsOf(id).findIndex(w => re.test(w.w)); }
export function wordAt(ctx, id, re, d = 0) { const i = wordIdx(ctx, id, re); return i < 0 ? 0 : ctx.wordsOf(id)[i].s + d; }

// illustrative candles (no prices, no axis): deterministic series, each candle forms
// wick-then-body from its open price
export function series(seed, n, drift = 0) {
  let x = seed * 9301 + 49297, p = 50; const rnd = () => (x = (x * 9301 + 49297) % 233280) / 233280, out = [];
  for (let i = 0; i < n; i++) { const o = p, c = o + (rnd() - .5 + drift) * 9, h = Math.max(o, c) + rnd() * 4, l = Math.min(o, c) - rnd() * 4; out.push({ o, c, h, l }); p = c; }
  return out;
}
export function candles(ctx, s, box, lt, t0, per, o = {}) {
  const { X, P, at } = ctx; const lo = Math.min(...s.map(c => c.l)), hi = Math.max(...s.map(c => c.h));
  const Y = v => box.y + box.h - (v - lo) / (hi - lo) * box.h, step = box.w / s.length;
  s.forEach((c, i) => {
    const k = at(lt, t0 + i * per, t0 + i * per + (o.grow || .35), 'cubicOut'); if (k <= 0) return;
    const up = c.c >= c.o, col = up ? (o.up || P.hi) : (o.down || P.acc2);   // charts read left→right
    const xx = box.x + step * (i + .5);
    X.globalAlpha = (o.alpha ?? 1) * (o.dimAt ? o.dimAt(i) : 1);
    X.strokeStyle = col; X.lineWidth = Math.max(2, step * .08);
    const wk = Math.min(1, k * 1.6), mid = Y(c.o);
    X.beginPath(); X.moveTo(xx, mid + (Y(c.h) - mid) * wk); X.lineTo(xx, mid + (Y(c.l) - mid) * wk); X.stroke();
    const bk = ctx.E.cubicOut(Math.max(0, (k - .2) / .8)), y1 = Y(c.o), y2 = y1 + (Y(c.c) - y1) * bk;
    X.fillStyle = col; X.fillRect(xx - step * .32, Math.min(y1, y2), step * .64, Math.max(2, Math.abs(y2 - y1)));
  });
  X.globalAlpha = 1;
  return { Y, step, lo, hi };
}
export function panel(ctx, x, y, w, h, a = 1) {
  const { X } = ctx; X.save(); X.globalAlpha = a; X.fillStyle = 'rgba(0,5,26,.82)'; X.strokeStyle = 'rgba(87,161,239,.28)'; X.lineWidth = 2;
  rrect(X, x, y, w, h, 30); X.fill(); X.stroke(); X.restore();
}
export function lineText(ctx, t, str, y, t0, o = {}) {   // approved on-screen line, rises word by word
  const { X, P, at } = ctx;
  const L = ctx.text.layout(X, str, { family: FD, weight: o.weight || 800, size: o.size || 64, maxWidth: o.maxWidth || 1000, lineHeight: 1.35 });
  ctx.text.drawLayout(X, L, 540, y, { align: 'center', color: o.color || P.ink, perWord: (i, w) => { const q = at(t, t0 + i * .1, t0 + .5 + i * .1, 'expoOut');
    return { clipUp: 1, dy: (1 - q) * (o.size || 64) * 1.2, alpha: q > 0 ? (o.alpha ?? 1) : 0, color: o.hiWord && o.hiWord.test(w.text) ? P.hi : (o.color || P.ink) }; } });
}
