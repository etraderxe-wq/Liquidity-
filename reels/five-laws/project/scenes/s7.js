import { bg, subs, rrect, FD, FB, FN } from './lib.js';
const LAWS = ['الانضباط', 'التركيز', 'الاستمرارية', 'المسؤولية', 'النمو'];
MOTION.scene({ id: 's7',
  draw(t, lt, ctx) {
    const { X, P, at, E, kf } = ctx; bg(ctx, t);
    const endK = at(lt, 7.3, 7.8, 'expoInOut');
    X.save(); X.globalAlpha = 1 - endK;
    const sel = kf(lt, [[1.5, 0], [2.0, 1, 'cubicInOut'], [2.4, 2, 'cubicInOut'], [2.8, 3, 'cubicInOut'], [3.2, 4, 'cubicInOut'], [3.8, 2, 'expoInOut']]);
    const settled = at(lt, 3.8, 4.2);
    const fy = 420 + sel * 112;
    if (lt > 1.4) { X.strokeStyle = P.hi; X.lineWidth = 5; X.shadowColor = P.acc; X.shadowBlur = 24 * settled; rrect(X, 214, fy - 58, 652, 108, 30); X.stroke(); X.shadowBlur = 0; }
    LAWS.forEach((s, i) => {
      const y = 420 + i * 112, k = at(lt, .15 + i * .15, .6 + i * .15, 'expoOut'); if (k <= 0) return;
      const dim = i === 2 ? 1 : 1 - .6 * settled;
      X.save(); X.globalAlpha = k * dim * (1 - endK); X.translate((1 - k) * 80, 0);
      X.fillStyle = i === 2 && settled > 0 ? `rgba(87,161,239,${.18 * settled})` : P.card; X.strokeStyle = 'rgba(87,161,239,.22)'; X.lineWidth = 2;
      rrect(X, 230, y - 46, 620, 92, 26); X.fill(); X.stroke();
      X.fillStyle = P.acc; X.beginPath(); X.arc(800, y, 30, 0, 6.283); X.fill();
      ctx.text(X, String(i + 1), 800, y + 14, { family: FN, weight: 900, size: 38, color: P.bg, dir: 'ltr' });
      ctx.text(X, s, 745, y + 17, { family: FD, weight: 800, size: 50, color: P.ink, align: 'right' });
      X.restore();
    });
    const L = ctx.text.layout(X, 'أي قانون تحتاج تطبّقه اليوم؟', { family: FD, weight: 900, size: 68, maxWidth: 820, lineHeight: 1.3 });
    ctx.text.drawLayout(X, L, 540, 1060, { align: 'center', color: P.ink, perWord: (i, w) => { const q = at(lt, 4.3 + i * .12, 4.8 + i * .12, 'expoOut');
      return { clipUp: 1, dy: (1 - q) * 80, alpha: q > 0 ? 1 - endK : 0, color: w.text === 'اليوم؟' ? P.acc : P.ink }; } });
    const sv = at(lt, 5.3, 5.8, 'expoOut');
    if (sv > 0) { X.globalAlpha = sv * (1 - endK);
      ctx.text(X, 'احفظ الفيديو وارجع له', 510, 1240, { family: FB, weight: 700, size: 42, color: P.mut });
      X.save(); X.translate(760, 1222); X.fillStyle = P.acc; X.beginPath(); X.moveTo(-16, -26); X.lineTo(16, -26); X.lineTo(16, 26); X.lineTo(0, 12); X.lineTo(-16, 26); X.closePath(); X.fill(); X.restore(); }
    X.restore();
    if (lt < 7.4) subs(ctx, t, 'l7');
    // end card: logo + handle
    if (endK > 0) {
      const lk = at(lt, 7.6, 8.4, 'backOut'), img = ctx.img('logo'), w = 460, h = w * img.height / img.width;
      X.save(); X.globalAlpha = Math.min(1, lk); X.translate(540, 840); X.scale(.85 + .15 * lk, .85 + .15 * lk); X.drawImage(img, -w / 2, -h / 2, w, h); X.restore();
      const hk = at(lt, 8.1, 8.6, 'expoOut');
      ctx.text(X, '@emullax', 540, 1110, { family: FN, weight: 700, size: 52, color: P.acc, dir: 'ltr', alpha: hk });
    }
  } });
