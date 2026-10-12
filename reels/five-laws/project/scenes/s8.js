import { bg, rrect, FD, FB, FN } from './lib.js';
// Cashback end card: 60% of the partner commission on the viewer's eligible trades (user's own offer).
function line(ctx, lt, str, y, t0, o = {}) {
  const { X, P, at } = ctx;
  const L = ctx.text.layout(X, str, { family: o.family || FD, weight: o.weight || 800, size: o.size || 52, maxWidth: o.maxWidth || 900, lineHeight: 1.4 });
  ctx.text.drawLayout(X, L, 540, y, { align: 'center', color: o.color || P.ink, perWord: i => { const q = at(lt, t0 + i * .06, t0 + .45 + i * .06, 'expoOut');
    return { clipUp: 1, dy: (1 - q) * 50, alpha: q > 0 ? 1 : 0 }; } });
}
MOTION.scene({ id: 's8',
  draw(t, lt, ctx) {
    const { X, P, at, E } = ctx; bg(ctx, t);
    const img = ctx.img('logo'), lk = at(lt, .1, .7, 'expoOut'), lw = 300, lh = lw * img.height / img.width;
    X.save(); X.globalAlpha = lk; X.drawImage(img, 540 - lw / 2, 200, lw, lh); X.restore();
    line(ctx, lt, 'كاش باك', 520, .4, { size: 110, weight: 900 });
    const k = E.springK(ctx.prog(lt, .7, 1.6)), n = Math.round(60 * at(lt, .7, 1.7, 'expoOut'));
    X.save(); X.translate(540, 740); X.scale(k, k);
    const g = X.createLinearGradient(-200, -200, 200, 40); g.addColorStop(0, P.hi); g.addColorStop(.55, P.acc); g.addColorStop(1, P.acc2);
    ctx.text(X, n + '%', 0, 80, { family: FN, weight: 900, size: 230, color: g, dir: 'ltr', alpha: Math.min(1, k * 1.5) });
    X.restore();
    line(ctx, lt, 'من عمولتي كشريك على تداولاتك المؤهلة في Exness', 880, 1.6, { size: 40, weight: 700, family: FB, maxWidth: 980 });
    // worked example: 10$ commission → 6$ to you
    const ex = at(lt, 2.4, 2.9, 'expoOut');
    if (ex > 0) {
      X.save(); X.globalAlpha = ex; X.translate(0, (1 - ex) * 40);
      [[760, 'عمولة الشريك', '10$', 'rgba(0,5,26,.85)', P.ink], [320, 'كاش باك لك', '6$', 'rgba(87,161,239,.22)', P.hi]].forEach(([x, a, b, f, c], i) => {
        const kk = at(lt, 2.4 + i * .45, 2.9 + i * .45, 'backOut'); X.save(); X.translate(x, 1035); X.scale(kk, kk);
        X.fillStyle = f; X.strokeStyle = i ? P.hi : 'rgba(87,161,239,.45)'; X.lineWidth = 3; rrect(X, -170, -80, 340, 160, 30); X.fill(); X.stroke();
        ctx.text(X, a, 0, -18, { family: FB, weight: 700, size: 38, color: P.mut });
        ctx.text(X, b, 0, 52, { family: FN, weight: 900, size: 64, color: c, dir: 'ltr' });
        X.restore();
      });
      const ak = at(lt, 2.8, 3.2, 'expoOut');
      if (ak > 0) { X.strokeStyle = P.hi; X.lineWidth = 8; X.lineCap = 'round'; X.beginPath(); X.moveTo(578, 1035); X.lineTo(578 - 76 * ak, 1035); X.stroke();
        X.fillStyle = P.hi; X.beginPath(); X.moveTo(492, 1035); X.lineTo(512, 1021); X.lineTo(512, 1049); X.closePath(); X.globalAlpha = ex * ak; X.fill(); }
      X.restore();
    }
    line(ctx, lt, 'لأنك تحت وكالتي، تستاهل تستفيد معاي', 1200, 3.5, { size: 44, weight: 800, color: P.hi, maxWidth: 1000 });
    const ck = at(lt, 4.3, 4.9, 'backOut');
    if (ck > 0) {
      const pulse = 1 + .03 * Math.sin(Math.max(0, lt - 5) * 4);
      X.save(); X.translate(540, 1320); X.scale(ck * pulse, ck * pulse);
      X.shadowColor = P.acc; X.shadowBlur = 36; const g2 = X.createLinearGradient(-300, -55, 300, 55); g2.addColorStop(0, P.hi); g2.addColorStop(.5, P.acc); g2.addColorStop(1, P.acc2);
      X.fillStyle = g2; rrect(X, -310, -55, 620, 110, 55); X.fill(); X.shadowBlur = 0;
      ctx.text(X, 'أرسل «كاش باك» بالخاص', 0, 18, { family: FD, weight: 900, size: 50, color: P.bg });
      X.restore();
    }
    line(ctx, lt, 'النسبة من عمولة الشريك، مو من إيداعك أو أرباحك. التداول ينطوي على مخاطر.', 1440, 5.0, { size: 28, weight: 600, family: FB, color: P.ink, maxWidth: 820 });
  } });
