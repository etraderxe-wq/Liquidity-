// 08 CLOSING — DON'T TRADE THE NEWS. UNDERSTAND THE IMPACT.
import { frame, candles, series, UP, INK, MUT } from './kit.js';
MOTION.scene({ id: 's8', draw(t, lt, ctx) { const { X, at, E } = ctx; frame(ctx, t, lt, 8);
  X.save(); X.globalAlpha = .22; candles(ctx, lt, series(88, 46, 1, .2, 1.3), { x: 40, y: 1180, w: 1000, h: 330 }, 0, 3.0, { grid: false, color: up => up ? UP : '#3977D5' }); X.restore();
  const k1 = at(lt, .3, 1.0, 'expoOut'), k2 = at(lt, 1.0, 1.7, 'expoOut');
  ctx.text(X, "DON'T TRADE THE NEWS.", 540, 400, { family: 'Michroma', size: 42, color: INK, dir: 'ltr', alpha: k1, letterSpacing: 2 + (1 - k1) * 10 });
  ctx.text(X, 'UNDERSTAND THE IMPACT.', 540, 470, { family: 'Michroma', size: 42, color: UP, dir: 'ltr', alpha: k2, letterSpacing: 2 + (1 - k2) * 10, shadow: { blur: 30, color: 'rgba(147,249,255,.6)' } });
  const a3 = at(lt, 2.6, 3.2), a4 = at(lt, 4.0, 4.6);
  ctx.text(X, 'المتداول المحترف مو اللي يدخل مع كل خبر…', 540, 600, { family: 'Tajawal', weight: 800, size: 42, color: '#DDE3EE', alpha: a3 });
  const L = ctx.text.layout(X, 'المتداول المحترف هو اللي يفهم شلون الخبر يغيّر حركة السيولة والسعر.', { family: 'Tajawal', weight: 900, size: 46, maxWidth: 900, lineHeight: 1.35 });
  ctx.text.drawLayout(X, L, 540, 680, { align: 'center', color: INK, perWord: (i, w) => ({ alpha: a4, color: /السيولة|والسعر/.test(w) ? UP : INK }) });
  // logo with light sweep
  const lk = at(lt, 5.6, 6.6, 'expoOut'), img = ctx.img('logo'), w = 420, h = w * img.height / img.width;
  if (lk > 0) { const g = X.createRadialGradient(540, 1000, 0, 540, 1000, 420); g.addColorStop(0, `rgba(57,119,213,${.4 * lk})`); g.addColorStop(1, 'rgba(57,119,213,0)'); X.fillStyle = g; X.fillRect(0, 600, 1080, 800);
    X.save(); X.globalAlpha = lk; X.filter = `blur(${(1 - lk) * 10}px)`; X.drawImage(img, 540 - w / 2, 1000 - h / 2, w, h); X.restore(); }
  ctx.text(X, 'LIQUIDITY GROUP', 540, 1000 + h / 2 + 80, { family: 'Michroma', size: 34, color: INK, dir: 'ltr', letterSpacing: 6, alpha: at(lt, 6.8, 7.3) });
  ctx.text(X, 'تحليل • تعليم • إدارة مخاطر', 540, 1000 + h / 2 + 150, { family: 'Tajawal', weight: 800, size: 40, color: UP, alpha: at(lt, 7.4, 7.9) });
  ctx.text(X, 'تابع @EMULLAX للمزيد من التحليلات', 540, 1000 + h / 2 + 225, { family: 'Tajawal', weight: 700, size: 34, color: '#DDE3EE', alpha: at(lt, 8.4, 8.9) });
  X.fillStyle = `rgba(0,0,0,${at(lt, 11.2, 12)})`; X.fillRect(0, 0, 1080, 1920);
} });
