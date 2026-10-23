// 5 — the rules, one per beat (firm rhythm)
import { bg, txt, UP, RED, INK } from './k.js';
const R = [['أبي الجادين فقط.', /الجادين/, UP], ['التزام بوقت الحضور.', /بوقت/, UP], ['التزام بتسليم الهوم ورك.', /بتسليم/, UP], ['غيابين = استبعاد من الدورة.', /غيابين|استبعاد/, RED]];
MOTION.scene({ id: 's5', draw(t, lt, ctx) { const { X, at, E } = ctx; bg(ctx, t, .5); const s0 = ctx.scene.start, step = 2.1;
  R.forEach(([s, hi, col], i) => { const t0 = s0 + .2 + i * step, k = E.springK(ctx.prog(t, t0, t0 + .5)); if (t < t0 || t > t0 + step - .05) return;
    const out = 1 - at(t, t0 + step - .3, t0 + step - .05);
    ctx.text(X, String(i + 1).padStart(2, '0') + ' / 04', 540, 700, { family: 'Michroma', size: 26, color: col, dir: 'ltr', alpha: out });
    X.save(); X.globalAlpha = out; X.fillStyle = col; X.fillRect(540 - 260 * Math.min(1, k), 990, 520 * Math.min(1, k), 4); X.restore();
    X.save(); X.translate(540, 900); X.scale(.9 + .1 * Math.min(k, 1.05), .9 + .1 * Math.min(k, 1.05)); X.translate(-540, -900);
    txt(ctx, t, s, 900, t0, { size: 72, hi, hiColor: col, st: .05, t1: t0 + step - .3 }); X.restore(); });
} });
