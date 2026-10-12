import { bg, subs, FD, FN } from './lib.js';
import { D } from './data.js';
import { UP, DN } from './chart.js';
MOTION.scene({ id: 's1',
  setup(ctx) { const r = ctx.rng('rain'); this.drops = Array.from({ length: 140 }, () => ({ x: r.range(-200, 1180), y: r.range(0, 1920), l: r.range(30, 80), v: r.range(1400, 2200) })); },
  draw(t, lt, ctx) {
    const { X, at, E } = ctx; bg(ctx, t);
    // storm light from above
    const g = X.createRadialGradient(540, -100, 0, 540, -100, 1100); g.addColorStop(0, 'rgba(147,249,255,.22)'); g.addColorStop(1, 'rgba(147,249,255,0)'); X.fillStyle = g; X.fillRect(0, 0, 1080, 1920);
    X.save(); X.globalAlpha = .12; X.fillStyle = '#93F9FF';
    for (let k = -3; k <= 3; k++) { X.beginPath(); X.moveTo(540 + k * 20, -50); X.lineTo(540 + k * 170 - 60, 1500); X.lineTo(540 + k * 170 + 60, 1500); X.closePath(); X.fill(); }
    X.restore();
    // rain
    X.strokeStyle = 'rgba(200,225,255,.25)'; X.lineWidth = 2;
    for (const d of this.drops) { const y = (d.y + lt * d.v) % 2000 - 80, x = d.x + (y * .18); X.beginPath(); X.moveTo(x, y); X.lineTo(x + d.l * .18, y + d.l); X.stroke(); }
    // London skyline → turns into a candle chart
    const sky = 1 - at(lt, 4.2, 5.4, 'cubicInOut'), base = 1250;
    if (sky > 0) {
      X.save(); X.globalAlpha = sky; X.fillStyle = '#020818'; X.strokeStyle = 'rgba(147,249,255,.55)'; X.lineWidth = 2;
      X.beginPath(); X.moveTo(0, base);
      const towers = [[40, 1080], [90, 1040], [130, 1090], [190, 1000], [240, 1060], [300, 980], [350, 1050], [420, 1010], [480, 1070], [540, 990], [600, 1060], [650, 1020], [700, 1080]];
      for (const [x, y] of towers) { X.lineTo(x - 22, base - (base - y) * .7); X.lineTo(x - 22, y + 30); X.lineTo(x, y - 30); X.lineTo(x + 22, y + 30); X.lineTo(x + 22, base - (base - y) * .7); }
      X.lineTo(760, base); X.lineTo(760, 700); X.lineTo(780, 680); X.lineTo(810, 560); X.lineTo(840, 680); X.lineTo(860, 700); X.lineTo(860, base); X.lineTo(1080, base); X.lineTo(1080, 1920); X.lineTo(0, 1920); X.closePath(); X.fill(); X.stroke();
      X.fillStyle = 'rgba(147,249,255,.85)'; X.beginPath(); X.arc(810, 760, 30, 0, 6.283); X.fill(); X.fillStyle = '#020818'; X.fillRect(808, 738, 4, 24); X.fillRect(808, 758, 18, 4);
      X.restore();
    }
    const ch = at(lt, 4.6, 5.6), cs = D.bull.c.slice(0, 24);
    if (ch > 0) {
      const lo = 96, hi = 117, Y = p => 1260 - (p - lo) / (hi - lo) * 520, st = 960 / cs.length;
      cs.forEach((c, i) => { const k = at(lt, 4.6 + i * .1, 4.95 + i * .1, 'cubicOut'); if (k <= 0) return;
        const [o, h, l, cl] = c, x = 60 + st * (i + .5), m = Y(o), y2 = m + (Y(cl) - m) * k; X.globalAlpha = ch * .9;
        X.strokeStyle = cl >= o ? UP : '#6FA3F2'; X.lineWidth = 3; X.beginPath(); X.moveTo(x, m + (Y(h) - m) * k); X.lineTo(x, m + (Y(l) - m) * k); X.stroke();
        X.fillStyle = cl >= o ? UP : DN; X.fillRect(x - st * .3, Math.min(m, y2), st * .6, Math.max(2, Math.abs(y2 - m))); });
      X.globalAlpha = 1;
    }
    const a1 = at(lt, .6, 1.4, 'expoOut');
    X.save(); X.shadowColor = '#93F9FF'; X.shadowBlur = 30 * a1;
    ctx.text(X, 'LONDON OPEN MODEL', 540, 380, { family: FN, weight: 900, size: 66, color: '#FCFCFC', dir: 'ltr', letterSpacing: 6, alpha: a1 }); X.restore();
    ctx.text(X, 'نموذج افتتاح لندن', 540, 452, { family: FD, weight: 700, size: 40, color: '#93F9FF', alpha: at(lt, 1.2, 1.8) });
    const L = ctx.text.layout(X, 'شلون تصيد فرص افتتاح لندن؟', { family: FD, weight: 900, size: 74, maxWidth: 940 });
    ctx.text.drawLayout(X, L, 540, 590, { align: 'center', color: '#FCFCFC', perWord: (i, w) => { const q = at(lt, 2.6 + i * .15, 3.1 + i * .15, 'expoOut'); return { clipUp: 1, dy: (1 - q) * 90, alpha: q > 0 ? 1 : 0, color: w.text === 'لندن؟' ? '#93F9FF' : '#FCFCFC' }; } });
    subs(ctx, t, 'l1');
  } });
