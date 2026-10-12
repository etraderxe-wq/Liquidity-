import { bg, subs, FD, FN } from './lib.js';
MOTION.scene({ id: 's1',
  setup(ctx) {
    this.sparks = ctx.particles2D({ count: 46, seed: 11, spawn: (i, r) => { const a = r() * 6.283, v = r.range(380, 900);
      return { x: 540, y: 700, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: r.range(3, 8), color: r.pick([ctx.P.acc, ctx.P.hi, ctx.P.ink]), delay: 2.45, life: r.range(.5, .9) }; }, drag: 2.2 });
  },
  draw(t, lt, ctx) {
    const { X, P, at } = ctx; bg(ctx, t);
    const hit = 2.45, sh = lt > hit ? 16 * (1 - ctx.prog(lt, hit, hit + .45)) : 0;
    X.save(); X.translate(sh * ctx.noise1(lt * 40, 1), sh * ctx.noise1(lt * 40, 2));
    // «ناطر؟» pops in, then shrinks away upward
    const a = at(lt, .05, .55, 'backOut'), out = at(lt, 1.85, 2.3, 'expoIn');
    if (out < 1) { X.save(); const s = (.5 + .5 * a) * (1 - .55 * out); X.translate(540, 860 - 300 * out); X.scale(s, s); X.rotate(-.06 * (1 - a));
      ctx.text(X, 'ناطر؟', 0, 95, { family: FD, weight: 900, size: 290, color: P.ink, alpha: Math.min(1, a * 1.5) * (1 - out) }); X.restore(); }
    // «5» slams in
    const s5 = at(lt, 2.1, hit, 'expoIn');
    if (lt > 2.1) {
      const sc = 2.8 - 1.8 * s5 + .04 * Math.sin(lt * 2) * (lt > hit ? 1 : 0);
      X.save(); X.translate(540, 700); X.scale(sc, sc);
      const g = X.createLinearGradient(-200, -320, 200, 60); g.addColorStop(0, P.hi); g.addColorStop(.55, P.acc); g.addColorStop(1, P.acc2);
      ctx.text(X, '5', 0, 190, { family: FN, weight: 900, size: 560, color: g, dir: 'ltr', alpha: Math.min(1, s5 * 2) });
      X.restore();
    }
    const rk = ctx.prog(lt, hit, hit + .7);
    if (rk > 0 && rk < 1) { X.strokeStyle = P.acc; X.globalAlpha = 1 - rk; X.lineWidth = 14 * (1 - rk);
      X.beginPath(); X.arc(540, 620, 140 + 560 * ctx.E.expoOut(rk), 0, 6.283); X.stroke(); X.globalAlpha = 1; }
    this.sparks.draw(X, lt);
    // title rises word by word
    const L = ctx.text.layout(X, 'قوانين قاسية للنجاح', { family: FD, weight: 900, size: 98 });
    ctx.text.drawLayout(X, L, 540, 1130, { align: 'center', color: P.ink, perWord: (i, w) => {
      const q = at(lt, 2.75 + i * .2, 3.3 + i * .2, 'expoOut'); return { clipUp: 1, dy: (1 - q) * 130, alpha: q > 0 ? 1 : 0, color: w.text === 'قاسية' ? P.acc : P.ink }; } });
    const u = at(lt, 3.5, 4.1, 'expoInOut');
    if (u > 0) { X.strokeStyle = P.hi; X.lineWidth = 7; X.lineCap = 'round'; X.beginPath(); X.moveTo(540 + 260 * u, 1180); X.lineTo(540 - 260 * u, 1180); X.stroke(); }
    X.restore();
    const fl = 1 - ctx.prog(lt, hit, hit + .22);
    if (lt > hit && fl > 0) { X.fillStyle = `rgba(147,249,255,${.22 * fl})`; X.fillRect(0, 0, ctx.W, ctx.H); }
    subs(ctx, t, 'l1');
  } });
