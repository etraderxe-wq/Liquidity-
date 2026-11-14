// 0–6 s · intro: logo over moving candles · question · thesis
import { bg, L, txt, en, UP, INK, MUT, GRN, RED } from './k.js';
MOTION.scene({ id: 's1', draw(t, lt, ctx) { const { X, at, W, H } = ctx, Ly = L(ctx); bg(ctx, t, .7);
  // drifting candles band
  X.save(); X.globalAlpha = .22; let p = 50; for (let i = 0; i < 46; i++) { const r1 = ctx.hash01(i, 1), r2 = ctx.hash01(i, 2), o = p, c = o + (r1 - .45) * 8; p = c;
    const x = ((i * 44 + t * 40) % (W + 80)) - 40, y = H * .62 - (c - 50) * 6, up = c >= o; X.fillStyle = X.strokeStyle = up ? GRN : RED;
    X.fillRect(x, Math.min(y, H * .62 - (o - 50) * 6), 18, Math.max(3, Math.abs(c - o) * 6)); X.fillRect(x + 8, y - 18 * r2, 2, 36 + 20 * r2); } X.restore();
  const lk = at(t, .1, 1.0, 'expoOut'), img = ctx.img('logo'), lw = Ly.P ? 380 : 360, lh = lw * img.height / img.width;
  X.save(); X.globalAlpha = lk * (1 - at(t, 1.8, 2.2)); X.drawImage(img, W / 2 - lw / 2, H * (Ly.P ? .36 : .38) - lh / 2, lw, lh); X.restore();
  en(ctx, t, 'LIQUIDITY SWEEP  vs  BOS  vs  MSS', W / 2, H * (Ly.P ? .36 : .38) + lh / 2 + 70, .6, { size: Ly.P ? 28 : 30, t1: 2.0 });
  txt(ctx, t, 'هل كل اختراق للقمة أو القاع يعتبر كسر هيكل؟', W / 2, H * (Ly.P ? .33 : .36), 2.2, { size: Ly.P ? 66 : 64, w: Ly.P ? 940 : 1500, hi: /كسر|هيكل؟/, t1: 5.7 });
  txt(ctx, t, 'الفرق بين سحب السيولة وكسر الهيكل هو اللي يحدد فهمك لحركة السوق.', W / 2, H * (Ly.P ? .5 : .56), 3.6, { size: Ly.P ? 44 : 44, weight: 800, color: '#DDE3EE', w: Ly.P ? 900 : 1400, hi: /سحب|السيولة|وكسر|الهيكل/, t1: 5.7 });
} });
