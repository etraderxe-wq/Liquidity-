// 05 NASDAQ — falling index, AI chip, the AI-spending question
import { frame, title, line, card, candles, series, takeaway, UP, INK, MUT, RED, GRN } from './kit.js';
function chip(ctx, x, y, s, a, t) { const X = ctx.X; X.save(); X.globalAlpha = a; X.translate(x, y); X.scale(s, s); X.strokeStyle = UP; X.lineWidth = 4;
  X.shadowColor = UP; X.shadowBlur = 20 * (.6 + .4 * Math.sin(t * 3)); X.beginPath(); X.roundRect(-60, -60, 120, 120, 14); X.stroke(); X.shadowBlur = 0;
  for (let i = -2; i <= 2; i++) for (const [dx, dy] of [[i * 22, -78], [i * 22, 78], [-78, i * 22], [78, i * 22]]) { X.beginPath(); X.moveTo(dx * .82, dy * .82); X.lineTo(dx, dy); X.stroke(); }
  ctx.text(X, 'AI', 0, 18, { family: 'Michroma', size: 44, color: UP, dir: 'ltr' }); X.restore(); }
MOTION.scene({ id: 's5', draw(t, lt, ctx) { const { X, at } = ctx; frame(ctx, t, lt, 5);
  title(ctx, lt, 'شنو اللي ضرب ناسداك؟', 360, .1, { size: 80, hi: /ناسداك/, hiColor: RED });
  card(ctx, 70, 420, 940, 330, at(lt, .4, .8), { stroke: 'rgba(255,77,94,.4)' });
  candles(ctx, lt, series(77, 36, -1, .5, 1.1), { x: 100, y: 460, w: 640, h: 260 }, .5, 2.6, { tag: true, tagColor: RED });
  ctx.text(X, 'NASDAQ COMPOSITE', 120, 455, { family: 'Michroma', size: 18, color: INK, dir: 'ltr', align: 'left', alpha: at(lt, .5, .9) });
  const n = -2.6 * at(lt, 2.0, 3.2, 'expoOut'); ctx.text(X, '−' + Math.abs(n).toFixed(2) + '%', 885, 720, { family: 'Inter', weight: 900, size: 54, color: RED, dir: 'ltr', alpha: at(lt, 2, 2.3) });
  chip(ctx, 885, 570, .9, at(lt, 1.0, 1.5), lt);
  line(ctx, lt, 'أسهم التكنولوجيا والذكاء الاصطناعي تعرضت لضغوط بيعية قوية.', 830, 3.4, { size: 36 });
  const qk = at(lt, 5.0, 5.5, 'expoOut'); card(ctx, 70, 880, 940, 200, qk, { stroke: UP, bar: UP });
  ctx.text(X, 'المستثمرون بدوا يسألون:', 980, 935, { family: 'Tajawal', weight: 700, size: 30, color: MUT, align: 'right', alpha: qk });
  const L = ctx.text.layout(X, 'هل الإنفاق الضخم على AI قاعد يحقق عوائد تبرر تقييمات الشركات؟', { family: 'Tajawal', weight: 900, size: 40, maxWidth: 880, lineHeight: 1.3 });
  ctx.text.drawLayout(X, L, 980, 1000, { align: 'right', color: INK, perWord: () => ({ alpha: qk }) });
  line(ctx, lt, 'ومع مخاوف التضخم والفائدة، زادت الضغوط على الأسهم.', 1140, 7.2, { size: 34, color: MUT });
  takeaway(ctx, lt, 'السوق مو بس يقيّم الأرباح الحالية… يقيّم المستقبل أيضاً.', 9.2, 1190);
} });
