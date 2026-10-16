// Content of the big trading screen (1024×576 canvas → texture). Fictional data only.
const UP = '#93F9FF', DN = '#3977D5', RED = '#FF4D5E', INK = '#FCFCFC', MUT = '#A9B6D3';
function bgScr(X) { const g = X.createLinearGradient(0, 0, 0, 576); g.addColorStop(0, '#020a26'); g.addColorStop(1, '#0b2257'); X.fillStyle = g; X.fillRect(0, 0, 1024, 576);
  X.strokeStyle = 'rgba(147,170,220,.08)'; X.lineWidth = 1; for (let y = 60; y < 576; y += 64) { X.beginPath(); X.moveTo(0, y); X.lineTo(1024, y); X.stroke(); } }
function candles(X, t, n, seed, x0, w, y0, h, o = {}) {
  let p = 50, r = seed * 9301 + 49297; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280, cs = [];
  for (let i = 0; i < n; i++) { const o_ = p, c = o_ + (rnd() - .5 + (o.drift || 0)) * 10; cs.push([o_, Math.max(o_, c) + rnd() * 4, Math.min(o_, c) - rnd() * 4, c]); p = c; }
  const lo = Math.min(...cs.map(c => c[2])), hi = Math.max(...cs.map(c => c[1])), Y = v => y0 + h - (v - lo) / (hi - lo) * h, st = w / n;
  const shown = o.reveal != null ? Math.floor(o.reveal * n) : n;
  cs.slice(0, shown).forEach(([a, b, l, c], i) => { const up = c >= a, col = o.red ? RED : up ? UP : DN, x = x0 + st * (i + .5);
    X.strokeStyle = col; X.lineWidth = 2; X.beginPath(); X.moveTo(x, Y(b)); X.lineTo(x, Y(l)); X.stroke(); X.fillStyle = col; X.fillRect(x - st * .3, Math.min(Y(a), Y(c)), st * .6, Math.max(2, Math.abs(Y(a) - Y(c)))); });
  return { Y, st, cs };
}
export function studioScreen(X, t, logo) {
  bgScr(X); candles(X, t, 40, 7, 40, 944, 150, 330, { drift: .08, reveal: Math.min(1, .6 + (t % 6) / 15) });
  X.fillStyle = 'rgba(0,5,26,.85)'; X.fillRect(0, 0, 1024, 92);
  X.fillStyle = RED; X.beginPath(); X.arc(46, 46, 11 + Math.sin(t * 6) * 2, 0, 6.283); X.fill();
  X.font = '800 30px Inter'; X.fillStyle = INK; X.textAlign = 'left'; X.fillText('LIVE', 68, 57);
  X.font = '400 30px Michroma'; X.fillStyle = UP; X.textAlign = 'right'; X.fillText('EMULLAX TV', 990, 58);
  X.fillStyle = 'rgba(0,5,26,.85)'; X.fillRect(0, 500, 1024, 76); X.font = '800 34px Tajawal'; X.fillStyle = INK; X.textAlign = 'center'; X.direction = 'rtl';
  X.fillText('بورصة أم علي · ضيف الحلقة: الأستاذ بوفهد', 512, 550); X.direction = 'ltr';
}
// hall: chart with the «liquidity» rectangle; k = 0 blue → 1 purple
export function hallScreen(X, t, k = 0, title = 'السيولة الذكية™') {
  bgScr(X); const c = candles(X, t, 32, 3, 40, 944, 110, 380, { drift: -.02 });
  const col = `rgb(${Math.round(57 + (150 - 57) * k)},${Math.round(119 + (60 - 119) * k)},${Math.round(213 + (220 - 213) * k)})`;
  X.globalAlpha = .38; X.fillStyle = col; X.fillRect(520, 260, 360, 110); X.globalAlpha = 1; X.strokeStyle = col; X.lineWidth = 5; X.strokeRect(520, 260, 360, 110);
  X.font = '800 30px Tajawal'; X.fillStyle = INK; X.textAlign = 'center'; X.direction = 'rtl'; X.fillText(k > .5 ? 'السيولة الذكية™' : 'السيولة', 700, 325); X.direction = 'ltr';
  X.fillStyle = 'rgba(0,5,26,.85)'; X.fillRect(0, 0, 1024, 80); X.font = '400 28px Michroma'; X.fillStyle = UP; X.textAlign = 'left'; X.fillText('BOFAHAD SMART METHOD', 30, 52);
}
// fictional demo account: equity drains, then ACCOUNT BLOWN
export function accountScreen(X, t, k) {
  bgScr(X); X.fillStyle = 'rgba(0,5,26,.9)'; X.fillRect(0, 0, 1024, 80);
  X.font = '400 26px Michroma'; X.fillStyle = MUT; X.textAlign = 'left'; X.fillText('DEMO ACCOUNT', 30, 52);
  X.font = '700 24px Tajawal'; X.textAlign = 'right'; X.direction = 'rtl'; X.fillText('حساب افتراضي — للتمثيل فقط', 994, 50); X.direction = 'ltr';
  candles(X, t, 30, 5, 40, 944, 120, 300, { drift: -.25, red: k > .3 });
  X.fillStyle = 'rgba(255,255,255,.08)'; X.fillRect(40, 450, 944, 26); X.fillStyle = k > .7 ? RED : UP; X.fillRect(40, 450, 944 * Math.max(0, 1 - k), 26);
  X.font = '800 26px Inter'; X.fillStyle = INK; X.textAlign = 'left'; X.fillText('EQUITY', 40, 510);
  if (k >= 1) { X.save(); X.translate(512, 300); X.rotate(-.08); X.fillStyle = 'rgba(40,0,8,.85)'; X.fillRect(-420, -80, 840, 160); X.strokeStyle = RED; X.lineWidth = 8; X.strokeRect(-420, -80, 840, 160);
    X.font = '400 70px Michroma'; X.fillStyle = RED; X.textAlign = 'center'; X.fillText('ACCOUNT BLOWN', 0, 26); X.restore(); }
}
