// PROBLEM 4–16.4 s: XAUUSD chart · liquidity, order block, FVG · «يعرف يحلل… بس ما يعرف يتحكم بنفسه» ·
// buys inside the FVG before any confirmation → price keeps falling → stop loss hit → then the real sweep happens.
// Times are absolute (voice-synced).
import { bg, cam, kinetic, pill, flash, icon, panel, FD, FN, FE, UP, DN, RED, INK, MUT, ACC } from './lib.js';
import { chart } from './chart.js';
const C = [[46,47,39.6,41],[41,44,38.2,43.5],[43.5,44.2,38.3,39.5],[39.5,47,39.2,46.5],[46.5,50,45.8,49.4],[49.4,60,49.1,59.2],[59.2,63,55.5,62.4],
  [62.4,68,61.5,67.2],[67.2,70.5,65.5,66.2],[66.2,69,64,68.4],[68.4,69.2,62.5,63.2],[63.2,65,60.2,61],[61,62.4,57.3,58],[58,60.5,56.4,59.6],
  [59.6,60,54.4,55],[55,56.3,51.2,51.8],[51.8,52.4,46.5,47.2],[47.2,48,41.5,42.3],[42.3,43.4,36.4,40.8]];
// sanity: FVG = high[4] < low[6]; sweep candle 18 trades below the equal lows (38.2) and closes back above
if (!(C[4][1] < C[6][2] && C[18][2] < 38.2 && C[18][3] > 38.2 && C[16][2] < 49)) throw new Error('s2 candle logic');
const RV = i => i < 14 ? 4.3 + i * .19 : [11.4, 14.2, 14.6, 15.25, 15.6][i - 14];
const HIT = 14.82;
MOTION.scene({ id: 's2',
  draw(t, lt, ctx) {
    const { X, at, E } = ctx;
    bg(ctx, t, { red: at(t, HIT, HIT + .1) * (1 - at(t, 15.3, 16)) + .35 * at(t, 8.6, 9) * (1 - at(t, 10.8, 11.3)) });
    // symbol header
    const hk = at(t, 4.2, 4.7);
    ctx.text(X, 'XAUUSD', 1000, 205, { family: FE, size: 34, color: UP, dir: 'ltr', align: 'right', alpha: hk, letterSpacing: 3 });
    ctx.text(X, 'M15 · مثال توضيحي', 80, 205, { family: FD, weight: 700, size: 28, color: MUT, align: 'left', alpha: hk });
    // camera: slow drift, push to the entry, punch on the stop, pull back
    const push = at(t, 12.9, 14.6, 'sineInOut') * (1 - at(t, 15.1, 15.9, 'expoInOut'));
    const z = 1 + .03 * at(t, 4, 12, 'sineInOut') + .22 * push + .04 * (1 - at(t, HIT, HIT + .5)) * (t > HIT ? 1 : 0);
    const shake = t > HIT ? 12 * (1 - at(t, HIT, HIT + .5)) : 0;
    const r = cam(ctx, z, 700, 1000, shake, t);
    const box = { x: 70, y: 560, w: 940, h: 760 };
    const g = chart(ctx, t, t, { c: C, n: 22, box, lo: 34, hi: 73, rv: RV, grow: .28,
      dim: () => .45 + .55 * at(t, 6.6, 7.1),
      color: (i, up) => (i === 15 || i === 16) && t > HIT - .2 ? RED : up ? UP : DN,
      anns: [
        { type: 'hline', i0: 0, p: 38.2, col: UP, dash: [10, 8], t: 7.15, ar: 'سيولة', en: 'LIQUIDITY', lx: 860, ly: 40, size: 26 },
        { type: 'rect', under: 1, i0: 2, p0: 39.5, p1: 43.5, fill: 'rgba(57,119,213,.2)', col: ACC, t: 7.6, ar: 'أوردر بلوك', en: 'ORDER BLOCK', lx: 1000 },
        { type: 'rect', under: 1, i0: 5, p0: 50, p1: 55.5, fill: 'rgba(147,249,255,.12)', col: UP, t: 8.0, ar: 'فجوة سعرية', en: 'FVG', lx: 1000,
          pulse: tt => at(tt, 11.75, 12.1) * (1 - at(tt, 13.4, 13.8)) * (.6 + .4 * Math.sin(tt * 9)) },
        { type: 'hline', i0: 14, p: 55, col: INK, w: 3, t: 12.95, en: 'ENTRY', lx: 520, ly: -34, tEnd: 15.3 },
        { type: 'hline', i0: 14, p: 49, col: RED, dash: [12, 8], t: 13.1, ar: 'الستوب', en: 'SL', lx: 520, ly: 36, tEnd: 15.6 },
        { type: 'arrow', i: 14, p: 54.4, dir: 'up', col: UP, t: 12.95, en: 'BUY', tEnd: 14.4 },
        { type: 'sweep', i: 18, p: 36.4, col: UP, t: 15.85, ar: 'السحب الحقيقي', en: 'SWEEP', ly: 70 },
      ] });
    // «يشوف فرصة» tag
    const op = at(t, 11.8, 12.2, 'backOut') * (1 - at(t, 12.85, 13.1));
    if (op > 0) pill(ctx, g.XI(14), g.Y(60.5), 'فرصة؟', 'SETUP', UP, op, 'center', { size: 30 });
    if (t > HIT) { const x = g.XI(16), y = g.Y(49);
      X.save(); X.strokeStyle = RED; X.lineWidth = 5; X.globalAlpha = 1 - at(t, HIT + .2, HIT + 1.1);
      X.beginPath(); X.arc(x, y, 20 + 80 * at(t, HIT, HIT + .9, 'expoOut'), 0, 6.283); X.stroke(); X.restore(); }
    r();
    flash(ctx, t > HIT ? 1 - at(t, HIT, HIT + .25) : 0);
    // ---- top band (y 260–500) ----
    // 1) question
    kinetic(ctx, t, 'تدري شنو المشكلة؟', 540, 360, 4.16, { size: 96, tEnd: 6.85, hi: /المشكلة/ });
    kinetic(ctx, t, 'اللي يعاني منها أغلب المتداولين', 540, 470, 5.37, { size: 58, color: MUT, tEnd: 6.85, hi: /المتداولين/, weight: 800 });
    // 2) analysis ✓ / self-control ✗
    const rows = [[7.11, 'يعرف يحلل السوق', 'ANALYSIS', 'check', UP], [8.55, 'ما يعرف يتحكم بنفسه', 'SELF-CONTROL', 'x', RED]];
    rows.forEach(([t0, ar, en, ic, col], j) => {
      const k = at(t, t0, t0 + .45, 'expoOut') * (1 - at(t, 11.1, 11.45)); if (k <= 0) return;
      const y = 300 + j * 112; X.save(); X.globalAlpha = k; X.translate((1 - k) * 60, 0);
      panel(ctx, 110, y - 46, 860, 92, 1, { stroke: col, r: 22 });
      icon(ctx, ic, 912, y, 52, col);
      ctx.text(X, ar, 860, y + 16, { family: FD, weight: 900, size: 46, color: INK, align: 'right' });
      ctx.text(X, en, 140, y + 12, { family: FN, weight: 800, size: 28, color: col, align: 'left', dir: 'ltr', letterSpacing: 2 });
      X.restore();
    });
    // heartbeat line under the rows while he says «وقت التداول»
    const hb = at(t, 9.0, 9.4) * (1 - at(t, 11.1, 11.45));
    if (hb > 0) { X.save(); X.globalAlpha = hb; X.strokeStyle = RED; X.lineWidth = 4; X.shadowColor = RED; X.shadowBlur = 14; X.beginPath();
      const head = 120 + 840 * ((t - 9.0) / 1.2 % 1);
      for (let x = 120; x <= 960; x += 4) { const ph = ((x - 120) / 210) % 1, d = Math.abs(x - head);
        let y = 0; if (ph > .4 && ph < .46) y = -46; else if (ph >= .46 && ph < .52) y = 34; else if (ph >= .52 && ph < .56) y = -12;
        const a = d < 300 ? 1 : .25; X.globalAlpha = hb * a; x === 120 ? X.moveTo(x, 520 + y) : X.lineTo(x, 520 + y); }
      X.stroke(); X.restore(); }
    // 3) entering before confirmation
    const nc = at(t, 13.05, 13.45, 'expoOut') * (1 - at(t, 14.7, 14.9));
    if (nc > 0) { X.save(); X.globalAlpha = nc; X.translate(540, 360); X.scale(.9 + .1 * nc, .9 + .1 * nc);
      ctx.text(X, 'دخول قبل التأكيد', 0, 0, { family: FD, weight: 900, size: 84, color: INK });
      ctx.text(X, 'NO CONFIRMATION', 0, 70, { family: FE, size: 34, color: RED, dir: 'ltr', letterSpacing: 4 }); X.restore(); }
    // 4) stop loss stamp
    const st = E.springK(ctx.prog(t, HIT, HIT + .6)) * (1 - at(t, 16.0, 16.3));
    if (t > HIT && st > 0) { X.save(); X.translate(540, 380); X.rotate(-.06); X.scale(st, st);
      X.strokeStyle = RED; X.lineWidth = 7; X.shadowColor = RED; X.shadowBlur = 30; X.strokeRect(-330, -80, 660, 150); X.shadowBlur = 0;
      ctx.text(X, 'STOP LOSS', 0, 22, { family: FE, size: 76, color: RED, dir: 'ltr', letterSpacing: 4 }); X.restore(); }
  } });
