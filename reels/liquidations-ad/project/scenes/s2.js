// 2 — LIQUIDATIONS rises out of the smoke and ash; candles drift behind.
import { bg, txt, smoke, ash, candlesBG, logoTitle, UP } from './k.js';
MOTION.scene({ id: 's2', draw(t, lt, ctx) { const { X, at } = ctx; bg(ctx, t, at(lt, 1, 3));
  candlesBG(ctx, lt, .25 * at(lt, 1.0, 2.5), 1100, 380);
  smoke(ctx, t, 1 - at(lt, 1.5, 4), 540, 1100, 400); ash(ctx, t, 1 - at(lt, 1.0, 3), 540, 1100);
  const k = at(lt, .4, 2.2, 'sineOut'); logoTitle(ctx, t, 540, 640, 1.1 - .1 * k, k, (1 - k) * 16);
  txt(ctx, t, 'الحين… نبدأ مرحلة يديدة.', 900, ctx.scene.start + 3.0, { size: 70, hi: /يديدة/ });
  txt(ctx, t, 'شهر كامل من التدريب والتطبيق والالتزام.', 1010, ctx.scene.start + 5.0, { size: 50, weight: 800, hi: /التدريب|والتطبيق|والالتزام/ });
} });
