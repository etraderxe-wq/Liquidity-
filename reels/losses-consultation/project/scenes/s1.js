// HOOK 0–4 s: long setup → stop hunted (red) → «مو كل خسارة تعني إن تحليلك غلط!» (glitch + zoom) → price runs to the target anyway.
import { bg, cam, glitchText, flash, pill, FD, FN, UP, RED, INK } from './lib.js';
import { chart } from './chart.js';
const C = [[40,43,39,42.5],[42.5,46,42,45.5],[45.5,46.5,43,44],[44,49,43.5,48.5],[48.5,52,48,51],[51,51.8,47,47.8],[47.8,48.5,45.2,46],
           [46,46.4,41.2,45.6],[45.6,52,45.2,51.5],[51.5,57,51,56.4],[56.4,62,56,61.5]];
const SL = 42.6, TP = 60, HIT = 1.18;
const RV = i => i < 7 ? i * .12 : i === 7 ? .98 : 2.3 + (i - 8) * .38;
MOTION.scene({ id: 's1',
  draw(t, lt, ctx) {
    const { X, at, E } = ctx;
    bg(ctx, t, { red: at(lt, HIT - .05, HIT + .1) * (1 - at(lt, 1.9, 2.6)) });
    const z = 1 + .14 * at(lt, 0, 4, 'sineInOut') + .05 * E.expoOut(ctx.prog(lt, HIT, HIT + .5)) * (1 - at(lt, 1.6, 2.4));
    const shake = 14 * (1 - at(lt, HIT, HIT + .45)) * (lt >= HIT ? 1 : 0);
    const r = cam(ctx, z, 540, 1000, shake, t);
    const box = { x: 90, y: 720, w: 900, h: 560 };
    const g = chart(ctx, t, lt, { c: C, box, lo: 37, hi: 64, rv: RV, grow: .22,
      color: (i, up) => i === 7 && lt > HIT ? RED : up ? UP : '#3977D5',
      anns: [
        { type: 'hline', i0: 6, p: TP, col: UP, dash: [12, 8], t: .7, ar: 'الهدف', en: 'TP', lx: 640 },
        { type: 'hline', i0: 6, p: SL, col: RED, dash: [12, 8], t: .8, ar: 'وقف الخسارة', en: 'SL', lx: 300, ly: 40 },
        { type: 'arrow', i: 6, p: 45.2, dir: 'up', col: UP, t: .75, en: 'BUY', tEnd: 1.6 },
      ] });
    // stop-loss hit marker
    const hk = at(lt, HIT, HIT + .35, 'backOut');
    if (hk > 0) { const x = g.XI(7), y = g.Y(SL);
      X.save(); X.strokeStyle = RED; X.lineWidth = 5; X.globalAlpha = 1 - at(lt, HIT + .2, HIT + 1);
      X.beginPath(); X.arc(x, y, 20 + 70 * at(lt, HIT, HIT + .8, 'expoOut'), 0, 6.283); X.stroke(); X.restore();
      pill(ctx, x, y + 92, 'ضرب الستوب', 'STOP LOSS HIT', RED, hk * (1 - at(lt, 2.2, 2.6)), 'center', { size: 30 }); }
    // the analysis was right: price reaches the target after the stop
    const okP = [g.XI(9), g.Y(TP)];
    r();
    const ok = at(lt, 3.3, 3.65, 'backOut');
    if (ok > 0) pill(ctx, 540, 660, 'والسعر راح للهدف', 'ANALYSIS ✓', UP, ok, 'center', { size: 32 });
    flash(ctx, (1 - at(lt, HIT, HIT + .25)) * (lt >= HIT ? 1 : 0));
    // headline
    const k1 = at(lt, 1.45, 1.75, 'expoOut'), gl = 1 - at(lt, 1.45, 2.3);
    if (k1 > 0) {
      X.save(); const s = 1.25 - .25 * E.expoOut(ctx.prog(lt, 1.45, 1.9)); X.translate(540, 430); X.scale(s, s); X.globalAlpha = k1;
      glitchText(ctx, t, 'مو كل خسارة', 0, -40, { family: FD, weight: 900, size: 104, color: INK }, gl);
      glitchText(ctx, t, 'تعني إن تحليلك غلط!', 0, 92, { family: FD, weight: 900, size: 92, color: UP, shadow: { blur: 30, color: 'rgba(147,249,255,.55)' } }, gl * .8);
      X.restore();
    }
  } });
