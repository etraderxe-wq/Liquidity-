import { bg, subs, header, rrect, wordAt, FD } from './lib.js';
MOTION.scene({ id: 's5',
  setup(ctx) {
    const tb = wordAt(ctx, 'l5', /^باللوم/, -ctx.scene.start) + .3;   // break finishes before «شنو أقدر أغيّر؟» enters
    this.tb = tb;
    this.bits = ctx.particles2D({ count: 34, seed: 5, spawn: (i, r) => ({ x: r.range(330, 750), y: r.range(700, 860), vx: r.gauss() * 260, vy: r.range(-260, 60), r: r.range(3, 9), color: r.pick([ctx.P.mut, ctx.P.ink]), delay: tb + .15, life: r.range(.6, 1.1) }), gravity: 900, drag: .6 });
  },
  draw(t, lt, ctx) {
    const { X, P, at, E } = ctx; bg(ctx, t); header(ctx, t, lt, 4, 'المسؤولية');
    const tb = this.tb, ap = at(lt, tb - 1.3, tb - .8, 'expoOut');
    // «اللوم» appears, gets struck through and breaks apart
    if (ap > 0 && lt < tb + 1.0) {
      const br = at(lt, tb + .15, tb + .85, 'cubicIn');
      [-1, 1].forEach(side => {
        X.save(); X.beginPath(); side < 0 ? X.rect(0, 500, 540, 520) : X.rect(540, 500, 540, 520); X.clip();
        X.translate(540 + side * 140 * br, 860 + 220 * br * br); X.rotate(side * .35 * br);
        ctx.text(X, 'اللوم', 0, 0, { family: FD, weight: 900, size: 250, color: P.ink, alpha: ap * (1 - br) });
        X.restore();
      });
      const sk = at(lt, tb - .25, tb + .1, 'expoOut');
      if (sk > 0 && lt < tb + .3) { X.strokeStyle = P.acc; X.lineWidth = 14; X.lineCap = 'round'; X.globalAlpha = 1 - ctx.prog(lt, tb + .1, tb + .3);
        X.beginPath(); X.moveTo(860, 770); X.lineTo(860 - 640 * sk, 800); X.stroke(); X.globalAlpha = 1; }
      this.bits.draw(X, lt);
    }
    // the better question, then it becomes a «ابدأ» button
    const tq = wordAt(ctx, 'l5', /^شنو/, -ctx.scene.start - .1), tg = wordAt(ctx, 'l5', /^وابدأ/, -ctx.scene.start - .25);
    const mv = at(lt, tg, tg + .5, 'expoInOut');
    const L = ctx.text.layout(X, 'شنو أقدر أغيّر؟', { family: FD, weight: 900, size: 104 - 20 * mv });
    ctx.text.drawLayout(X, L, 540, 840 - 230 * mv, { align: 'center', color: P.ink, perWord: (i, w) => { const q = at(lt, tq + i * .18, tq + .5 + i * .18, 'expoOut');
      return { clipUp: 1, dy: (1 - q) * 110, alpha: q > 0 ? 1 : 0, color: w.text === 'أغيّر؟' ? P.acc : P.ink }; } });
    const bk = at(lt, tg + .3, tg + 1.0, 'backOut');
    if (bk > 0) {
      const press = lt > tg + 1.3 ? 1 - .1 * Math.sin(Math.min(1, ctx.prog(lt, tg + 1.3, tg + 1.6)) * 3.1416) : 1;
      X.save(); X.translate(540, 900); X.scale(bk * press, bk * press);
      X.shadowColor = 'rgba(87,161,239,.55)'; X.shadowBlur = 50;
      const g = X.createLinearGradient(-190, -70, 190, 70); g.addColorStop(0, P.hi); g.addColorStop(.5, P.acc); g.addColorStop(1, P.acc2);
      X.fillStyle = g; rrect(X, -190, -70, 380, 140, 70); X.fill(); X.shadowBlur = 0;
      ctx.text(X, 'ابدأ', 0, 24, { family: FD, weight: 900, size: 76, color: P.bg });
      X.restore();
      const rk = ctx.prog(lt, tg + 1.45, tg + 2.2);
      if (rk > 0 && rk < 1) { X.strokeStyle = P.hi; X.lineWidth = 6 * (1 - rk); X.globalAlpha = 1 - rk; rrect(X, 540 - 190 - 90 * rk, 900 - 70 - 90 * rk, 380 + 180 * rk, 140 + 180 * rk, 70 + 90 * rk); X.stroke(); X.globalAlpha = 1; }
    }
    subs(ctx, t, 'l5');
  } });
