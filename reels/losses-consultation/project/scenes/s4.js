// TURN 25.3–32.2 s: «المشكلة الحقيقية» in chaos → a light sweep brings order → strategy alone = 1 of 4 pieces.
import { bg, glitchText, kinetic, panel, rrect, icon, FD, FN, FE, UP, RED, INK, MUT, ACC } from './lib.js';
MOTION.scene({ id: 's4',
  draw(t, lt, ctx) {
    const { X, at, E } = ctx;
    const calm = at(t, 27.4, 28.4, 'sineInOut');
    bg(ctx, t, { red: .55 * (1 - calm) });
    // chaos: tangled indicator lines that straighten as the sweep passes
    X.save(); X.globalAlpha = .75 * (1 - at(t, 28.2, 28.9));
    for (let k = 0; k < 9; k++) { X.strokeStyle = k % 3 === 0 ? RED : k % 3 === 1 ? 'rgba(87,161,239,.8)' : 'rgba(147,249,255,.6)'; X.lineWidth = 3; X.beginPath();
      for (let x = 0; x <= 1080; x += 12) { const n = ctx.noise2(x * .006 + k * 3, t * .9 + k, k) * 520 * (1 - calm), y = 700 + k * 60 + n; x ? X.lineTo(x, y) : X.moveTo(x, y); }
      X.stroke(); }
    X.restore();
    // light sweep
    const sw = at(t, 27.4, 28.4, 'sineInOut');
    if (sw > 0 && sw < 1) { const x = -300 + 1700 * sw, g = X.createLinearGradient(x - 220, 0, x + 220, 0);
      g.addColorStop(0, 'rgba(147,249,255,0)'); g.addColorStop(.5, 'rgba(147,249,255,.35)'); g.addColorStop(1, 'rgba(147,249,255,0)');
      X.save(); X.globalCompositeOperation = 'lighter'; X.fillStyle = g; X.fillRect(0, 0, 1080, 1920); X.restore(); }
    // «المشكلة الحقيقية»
    const pa = at(t, 25.45, 25.6) * (1 - at(t, 27.3, 27.6));
    if (pa > 0) { const s = 1.2 - .2 * E.expoOut(ctx.prog(t, 25.45, 26.1)), gl = Math.max(1 - at(t, 25.45, 26.0), .35 * (.5 + .5 * Math.sin(t * 20)) * at(t, 26.3, 26.4));
      X.save(); X.globalAlpha = pa; X.translate(540, 820); X.scale(s, s);
      ctx.text(X, 'وهنا تبدأ', 0, -150, { family: FD, weight: 800, size: 64, color: MUT });
      glitchText(ctx, t, 'المشكلة', 0, 0, { family: FD, weight: 900, size: 160, color: INK, shadow: { blur: 30, color: 'rgba(255,60,80,.6)' } }, gl);
      glitchText(ctx, t, 'الحقيقية', 0, 170, { family: FD, weight: 900, size: 160, color: RED, shadow: { blur: 30, color: 'rgba(255,60,80,.6)' } }, gl);
      X.restore(); }
    // «خلني أقولك شي»
    kinetic(ctx, t, 'خلني أقولك شي…', 540, 900, 27.8, { size: 76, color: INK, tEnd: 28.95 });
    // strategy alone is one piece of four
    kinetic(ctx, t, 'الاستراتيجية بروحها', 540, 330, 29.14, { size: 84, hi: /بروحها/ });
    const ne = at(t, 30.5, 30.9, 'expoOut');
    if (ne > 0) { ctx.text(X, '≠', 820, 462, { family: FN, weight: 800, size: 80, color: RED, dir: 'ltr', alpha: ne });
      kinetic(ctx, t, 'متداول ناجح', 500, 456, 30.55, { size: 70, color: INK }); }
    const SL = [['STRATEGY', 'الاستراتيجية'], ['TRADING PLAN', '?'], ['RISK', '?'], ['DISCIPLINE', '?']];
    SL.forEach(([en, ar], j) => {
      const k = at(t, 29.3 + j * .18, 29.75 + j * .18, 'backOut'); if (k <= 0) return;
      const cx = j % 2 ? 300 : 780, cy = j < 2 ? 760 : 1110, w = 400, h = 300, first = j === 0;
      X.save(); X.translate(cx, cy); X.scale(k, k);
      if (first) panel(ctx, -w / 2, -h / 2, w, h, 1, { stroke: UP, glow: 'rgba(147,249,255,.6)', fill: 'rgba(3,11,36,.95)' });
      else { X.strokeStyle = 'rgba(169,182,211,.5)'; X.lineWidth = 3; X.setLineDash([14, 12]); rrect(X, -w / 2, -h / 2, w, h, 28); X.stroke(); X.setLineDash([]); }
      ctx.text(X, first ? ar : '?', 0, first ? 10 : 40, { family: FD, weight: 900, size: first ? 52 : 120, color: first ? INK : 'rgba(169,182,211,.6)' });
      ctx.text(X, first ? en : '', 0, 80, { family: FE, size: 26, color: UP, dir: 'ltr', letterSpacing: 2 });
      X.restore();
    });
  } });
