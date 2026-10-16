// REVENGE 16.4–25.3 s: bigger lot after every loss (tickets) · REVENGE TRADING / OVERLEVERAGE / NO DISCIPLINE ·
// 3–4 losses → strategy hopping. Absolute times.
import { bg, cam, glitchText, kinetic, panel, rrect, flash, icon, FD, FN, FE, UP, RED, INK, MUT } from './lib.js';
const TK = [[16.65, '0.10'], [17.35, '0.25'], [18.05, '0.50'], [18.75, '1.00']];
const WORDS = [[16.7, 'REVENGE TRADING'], [18.0, 'OVERLEVERAGE'], [19.25, 'NO DISCIPLINE']];
const STR = ['STRATEGY A', 'STRATEGY B', 'STRATEGY C', 'STRATEGY D'];
MOTION.scene({ id: 's3',
  draw(t, lt, ctx) {
    const { X, at, E } = ctx;
    const tension = at(t, 16.4, 19.5);
    bg(ctx, t, { red: .25 + .55 * tension * (1 - at(t, 24.8, 25.4)) });
    // falling red candles in the background
    X.save(); X.globalAlpha = .22 * (1 - at(t, 20, 20.6));
    for (let i = 0; i < 24; i++) { const x = 60 + i * 41, base = 640 + i * 22 + 10 * Math.sin(i * 1.7), h = 40 + 50 * ctx.hash01(i, 5), k = at(t, 16.4 + i * .06, 16.7 + i * .06);
      X.fillStyle = RED; X.fillRect(x, base, 22, h * k); X.fillRect(x + 10, base - 14, 2, h * k + 28); }
    X.restore();
    // ---- top band: glitch words ----
    WORDS.forEach(([t0, w], j) => {
      const nx = WORDS[j + 1] ? WORDS[j + 1][0] : 20.1, a = at(t, t0, t0 + .12) * (1 - at(t, nx - .1, nx)); if (a <= 0) return;
      const s = 1.18 - .18 * E.expoOut(ctx.prog(t, t0, t0 + .5));
      X.save(); X.globalAlpha = a; X.translate(540, 380); X.scale(s, s);
      glitchText(ctx, t, w, 0, 0, { family: FE, size: w.length > 13 ? 60 : 70, color: j === 1 ? RED : INK, dir: 'ltr', letterSpacing: 3,
        shadow: { blur: 28, color: 'rgba(255,60,80,.6)' } }, 1 - at(t, t0, t0 + .55));
      X.restore();
    });
    // ---- tickets: each new trade bigger, each one a loss ----
    const tkOut = at(t, 19.9, 20.3);
    TK.forEach(([t0, lot], j) => {
      const k = at(t, t0, t0 + .35, 'expoOut'); if (k <= 0 || tkOut >= 1) return;
      const later = TK.filter(([tt]) => t >= tt).length - 1 - j;        // how many newer tickets sit on top
      const y = 900 - later * 70 + (1 - k) * 0, sc = (1 - later * .07) * (.9 + .1 * k), x = 540 + (1 - k) * 600;
      const lk = at(t, t0 + .4, t0 + .6, 'backOut');
      X.save(); X.globalAlpha = (1 - later * .22) * (1 - tkOut); X.translate(x, y); X.scale(sc, sc); X.rotate((j % 2 ? 1 : -1) * .02 * later);
      panel(ctx, -390, -150, 780, 300, 1, { stroke: lk > 0 ? RED : 'rgba(87,161,239,.4)', fill: 'rgba(3,11,36,.96)', r: 26 });
      ctx.text(X, 'BUY  XAUUSD', -350, -78, { family: FN, weight: 800, size: 36, color: MUT, dir: 'ltr', align: 'left', letterSpacing: 2 });
      ctx.text(X, 'صفقة ' + (j + 1), 350, -78, { family: FD, weight: 800, size: 36, color: MUT, align: 'right' });
      ctx.text(X, 'LOT', -350, 52, { family: FE, size: 34, color: INK, dir: 'ltr', align: 'left' });
      ctx.text(X, lot, -200, 70, { family: FN, weight: 900, size: 92 + j * 22, color: j > 1 ? RED : INK, dir: 'ltr', align: 'left' });
      if (lk > 0) { X.save(); X.translate(240, 30); X.rotate(-.14); X.scale(lk, lk); X.strokeStyle = RED; X.lineWidth = 6; rrect(X, -120, -52, 240, 104, 16); X.stroke();
        ctx.text(X, 'LOSS', 0, 20, { family: FE, size: 52, color: RED, dir: 'ltr' }); X.restore(); }
      X.restore();
    });
    // red pulse on each loss
    TK.forEach(([t0]) => flash(ctx, .5 * (t > t0 + .4 ? 1 - at(t, t0 + .4, t0 + .65) : 0)));
    // ---- 3 or 4 losses ----
    kinetic(ctx, t, 'بعد 3 أو 4 خسارات', 540, 380, 20.2, { size: 84, hi: /3|4/, hiColor: RED, tEnd: 21.85 });
    const boxA = at(t, 20.2, 20.4) * (1 - at(t, 21.85, 22.1));
    if (boxA > 0) for (let j = 0; j < 4; j++) {
      const k = at(t, 20.35 + j * .32, 20.6 + j * .32, 'backOut'), x = 765 - j * 165, y = 860;
      X.save(); X.globalAlpha = boxA; panel(ctx, x - 70, y - 70, 140, 140, 1, { stroke: k > 0 ? RED : 'rgba(87,161,239,.3)', r: 24 });
      if (k > 0) icon(ctx, 'x', x, y, 80 * k, RED);
      ctx.text(X, String(j + 1), x, y + 120, { family: FN, weight: 800, size: 34, color: MUT, dir: 'ltr' }); X.restore();
    }
    // ---- strategy hopping ----
    kinetic(ctx, t, 'يغيّر استراتيجيته بالكامل', 540, 380, 22.0, { size: 80, hi: /بالكامل/, hiColor: RED, tEnd: 25.0 });
    const sa = at(t, 22.0, 22.3) * (1 - at(t, 24.9, 25.25));
    if (sa > 0) STR.forEach((s, j) => {
      const t0 = 22.25 + j * .62, k = at(t, t0, t0 + .35, 'expoOut'); if (k <= 0) return;
      const done = t > t0 + .5, ang = (j - 1.5) * .09 * at(t, t0, t0 + .4), x = 540 + (j - 1.5) * 150 * at(t, 24.3, 24.8, 'expoOut');
      X.save(); X.globalAlpha = sa * (done && j < 3 ? .55 : 1); X.translate(x, 900 + (1 - k) * 300); X.rotate(ang);
      panel(ctx, -230, -280, 460, 560, 1, { stroke: done ? RED : UP, fill: 'rgba(3,11,36,.97)', r: 30 });
      ctx.text(X, s, 0, -170, { family: FE, size: 34, color: INK, dir: 'ltr' });
      for (let q = 0; q < 6; q++) { const h = 40 + 70 * ctx.hash01(j, q); X.fillStyle = q % 2 ? 'rgba(87,161,239,.6)' : 'rgba(147,249,255,.6)'; X.fillRect(-150 + q * 55, 120 - h, 30, h); }
      if (done) { const q = at(t, t0 + .5, t0 + .7); X.strokeStyle = RED; X.lineWidth = 10; X.lineCap = 'round';
        X.beginPath(); X.moveTo(-170, -200); X.lineTo(-170 + 340 * q, -200 + 400 * q); X.stroke(); }
      X.restore();
    });
  } });
