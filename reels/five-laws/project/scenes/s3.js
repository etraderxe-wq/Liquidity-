import { bg, subs, header, rrect, wordAt, FD } from './lib.js';
MOTION.scene({ id: 's3',
  setup(ctx) {
    const r = ctx.rng('dist'); this.items = [];
    for (let i = 0; i < 12; i++) this.items.push({ x: r.range(170, 910), y: r.range(480, 1130), kind: i % 3, s: r.range(.75, 1.1), d: r.range(.2, 1.6), rot: r.range(-.15, .15) });
  },
  drawItem(ctx, it) {
    const { X, P } = ctx;
    if (it.kind === 0) { // notification bubble
      X.fillStyle = 'rgba(3,11,36,.95)'; X.strokeStyle = 'rgba(140,154,184,.45)'; X.lineWidth = 2; rrect(X, -95, -34, 190, 68, 22); X.fill(); X.stroke();
      X.fillStyle = P.mut; X.beginPath(); X.arc(58, 0, 18, 0, 6.283); X.fill();
      X.fillStyle = 'rgba(252,252,252,.55)'; rrect(X, -70, -14, 100, 10, 5); X.fill(); X.fillStyle = 'rgba(140,154,184,.5)'; rrect(X, -70, 6, 70, 9, 4); X.fill();
      X.fillStyle = P.acc; X.beginPath(); X.arc(92, -32, 12, 0, 6.283); X.fill();
    } else if (it.kind === 1) { // bell
      X.strokeStyle = P.mut; X.lineWidth = 6; X.lineJoin = 'round'; X.beginPath(); X.moveTo(-30, 22); X.lineTo(-24, 14); X.quadraticCurveTo(-26, -30, 0, -32);
      X.quadraticCurveTo(26, -30, 24, 14); X.lineTo(30, 22); X.closePath(); X.stroke(); X.beginPath(); X.arc(0, 30, 8, 0, 3.1416); X.stroke();
    } else { // small scattered goal
      X.strokeStyle = 'rgba(140,154,184,.7)'; X.lineWidth = 5; [34, 20].forEach(r => { X.beginPath(); X.arc(0, 0, r, 0, 6.283); X.stroke(); });
      X.fillStyle = P.mut; X.beginPath(); X.arc(0, 0, 7, 0, 6.283); X.fill();
    }
  },
  draw(t, lt, ctx) {
    const { X, P, at, E } = ctx; bg(ctx, t); header(ctx, t, lt, 2, 'التركيز');
    const tFocus = wordAt(ctx, 'l3', /^حدد/, -ctx.scene.start - .15), fly = ctx.prog(lt, tFocus - .3, tFocus + .5);
    this.items.forEach((it, i) => {
      const k = at(lt, .5 + it.d * .7, .9 + it.d * .7, 'backOut'); if (k <= 0 || fly >= 1) return;
      const dx = it.x - 540, dy = it.y - 800, m = Math.hypot(dx, dy) || 1, f = E.expoIn(fly) * 900;
      const x = it.x + 26 * ctx.noise1(lt * .6, i) + dx / m * f, y = it.y + 26 * ctx.noise1(lt * .6, i + 40) + dy / m * f;
      X.save(); X.globalAlpha = Math.min(1, k) * (1 - fly); X.translate(x, y); X.rotate(it.rot + .08 * Math.sin(lt * 1.3 + i)); X.scale(it.s * k, it.s * k);
      this.drawItem(ctx, it); X.restore();
    });
    // one clear goal in the centre
    const g = at(lt, tFocus + .2, tFocus + 1.0, 'backOut');
    if (g > 0) {
      X.save(); X.translate(540, 800); X.scale(g, g);
      [[220, P.acc, 14], [160, P.ink, 12], [100, P.acc, 12]].forEach(([r, c, w]) => { X.strokeStyle = c; X.lineWidth = w; X.beginPath(); X.arc(0, 0, r, 0, 6.283); X.stroke(); });
      X.fillStyle = P.hi; X.beginPath(); X.arc(0, 0, 42, 0, 6.283); X.fill();
      X.restore();
      const ak = at(lt, tFocus + 1.0, tFocus + 1.4, 'expoIn');
      if (ak > 0) {
        const x = 930 - 390 * ak, y = 470 + 330 * ak;
        X.strokeStyle = P.ink; X.lineWidth = 10; X.lineCap = 'round'; X.beginPath(); X.moveTo(930, 470); X.lineTo(x, y); X.stroke();
        X.save(); X.translate(x, y); X.rotate(Math.atan2(330, -390)); X.fillStyle = P.ink; X.beginPath(); X.moveTo(18, 0); X.lineTo(-26, -18); X.lineTo(-26, 18); X.fill(); X.restore();
        const rk = ctx.prog(lt, tFocus + 1.4, tFocus + 2.0);
        if (rk > 0 && rk < 1) { X.strokeStyle = P.hi; X.globalAlpha = 1 - rk; X.lineWidth = 8; X.beginPath(); X.arc(540, 800, 60 + 260 * rk, 0, 6.283); X.stroke(); X.globalAlpha = 1; }
      }
      const L = ctx.text.layout(X, 'حدد هدفك', { family: FD, weight: 900, size: 92 });
      ctx.text.drawLayout(X, L, 540, 1215, { align: 'center', color: P.ink, perWord: (i, w) => { const q = at(lt, tFocus + 1.5 + i * .15, tFocus + 2 + i * .15, 'expoOut');
        return { clipUp: 1, dy: (1 - q) * 100, alpha: q > 0 ? 1 : 0, color: w.text === 'هدفك' ? P.acc : P.ink }; } });
    }
    subs(ctx, t, 'l3');
  } });
