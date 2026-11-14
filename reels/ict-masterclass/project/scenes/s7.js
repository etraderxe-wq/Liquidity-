// 61.5–65 s · closing
import { bg, txt, en, UP, INK } from './k.js';
MOTION.scene({ id: 's7', draw(t, lt, ctx) { const { X, at, W, H } = ctx, P = H > W, T0 = 61.5; bg(ctx, t, 1);
  txt(ctx, t, 'السوق ما يتحرك عشوائياً…', W / 2, H * (P ? .3 : .3), T0 + .1, { size: P ? 64 : 64, w: P ? 940 : 1600, t1: T0 + 2.0 });
  txt(ctx, t, 'تعلّم تقرأ اللي يصير ورا الشموع.', W / 2, H * (P ? .37 : .42), T0 + .7, { size: P ? 56 : 56, w: P ? 940 : 1600, hi: /ورا|الشموع\./, t1: T0 + 2.0 });
  const k = at(t, T0 + 2.0, T0 + 2.6, 'expoOut'), img = ctx.img('logo'), w = P ? 420 : 400, h = w * img.height / img.width;
  if (k > 0) { X.save(); X.globalAlpha = k; X.filter = `blur(${(1 - k) * 10}px)`; X.drawImage(img, W / 2 - w / 2, H * .42 - h / 2, w, h); X.restore(); }
  en(ctx, t, 'TRADE WITH DISCIPLINE.', W / 2, H * .42 + h / 2 + 80, T0 + 2.4, { size: P ? 34 : 38, ls: 6, glow: 'rgba(147,249,255,.5)' });
  X.fillStyle = `rgba(0,0,0,${at(t, T0 + 3.2, T0 + 3.5)})`; X.fillRect(0, 0, W, H);
} });
