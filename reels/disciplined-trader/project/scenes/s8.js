import { bg, FD, FN } from './lib.js';
MOTION.scene({ id: 's8',
  draw(t, lt, ctx) {
    const { X, P, at } = ctx; bg(ctx, t);
    const img = ctx.img('logo'), k = at(lt, .3, 1.3, 'cubicOut'), w = 560, h = w * img.height / img.width;
    X.save(); X.globalAlpha = k; X.translate(540, 760); X.scale(.94 + .06 * k, .94 + .06 * k); X.drawImage(img, -w / 2, -h / 2, w, h); X.restore();
    ctx.text(X, '@emullax', 540, 1070, { family: FN, weight: 700, size: 56, color: P.hi, dir: 'ltr', alpha: at(lt, 1.1, 1.6) });
    ctx.text(X, 'التداول ينطوي على مخاطر. المحتوى تعليمي.', 540, 1190, { family: FD, weight: 600, size: 42, color: P.ink, alpha: at(lt, 1.6, 2.1) });
  } });
