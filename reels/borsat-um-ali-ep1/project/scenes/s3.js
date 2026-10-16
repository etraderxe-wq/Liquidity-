// S3 — hall: «أدير الملايين» · «سحبت نفسي من السوق قبل الأخبار» → fictional demo account: ACCOUNT BLOWN · red candles · sweat.
import { buildSet, shoot, talk, speaking } from './sets.js';
import { pose, blinkAt } from './chars.js';
import { hallScreen, accountScreen } from './screen.js';
import { LINES } from './data.js';
const BLOWN = 57.0;
const SH = [
  { t: 44.2, p: [-.3, 2.45, 8.2], l: [2, 2.15, 1], fov: 18, fov2: 15, d: 3 },
  { t: 47.45, p: [-.9, 1.0, 6.6], l: [-2, 2.6, -1.6], fov: 26, fov2: 21, d: 3.4 },
  { t: 51.0, p: [-.3, 2.45, 8.2], l: [2, 2.35, 1], fov: 12 },
  { t: 52.45, p: [-1.0, 2.5, 7.2], l: [-2, 2.35, -1.6], fov: 13, fov2: 11, d: 3.3 },
  { t: 55.85, p: [0, 3.4, 11], l: [0, 3.5, -4.6], fov: 34, fov2: 30, d: 1.6 },
  { t: 57.45, p: [-1.0, 2.5, 7.2], l: [-2, 2.4, -1.6], fov: 12, fov2: 9.5, d: 1.8, shake: .05 },
];
MOTION.scene({ id: 's3',
  setup(ctx) { this.set = buildSet(ctx, 'hall'); this.set.crowd.forEach(c => c.visible = false); },
  draw(t, lt, ctx) {
    const s = this.set, { bo, stu } = s.chars, at = ctx.at;
    if (t < 55.7) hallScreen(s.screen.x, t, 1); else accountScreen(s.screen.x, t, Math.min(1, at(t, 55.9, BLOWN)));
    s.screen.tx.needsUpdate = true;
    shoot(ctx, s, t, SH);
    const sl = speaking(LINES, 'S', t), bl = speaking(LINES, 'B', t), panic = at(t, BLOWN + .2, BLOWN + 1.0);
    pose(stu, { talk: talk(sl, t), brow: sl ? .5 : (t > BLOWN ? .9 : .1), blink: blinkAt(t, 6), turn: t > 55.8 ? -.5 : -.1, look: t > 55.8 ? [-1, .3] : [0, 0],
      armR: [-.5, .15, -1.1], armL: [-.6, .1, -1.0] }, t);
    pose(bo, { talk: talk(bl, t), smile: .8 * (1 - panic), brow: panic ? .9 * panic : .3, blink: blinkAt(t, 7),
      turn: t > 54.3 && t < 55.8 ? -.6 : .3 * (1 - panic) + .5 * Math.sin(t * 9) * panic * .3,
      armR: bl && t < 51 ? [-.3, 1.6 + .2 * Math.sin(t * 2), -.3] : panic ? [-1.2, .2, -2.2] : [0, 0, 0],
      armL: bl && t < 51 ? [-.3, 1.6 + .2 * Math.sin(t * 2 + 1), -.3] : [0, 0, 0],
      sweat: panic, red: panic * .8, sway: panic * .05, lean: bl && t < 51 ? -.08 : 0 }, t);
    s.st.draw(ctx.X);
    // red alarm pulse
    const X = ctx.X, bk = ctx.E.springK(ctx.prog(t, BLOWN, BLOWN + .5));
    if (t > BLOWN) { X.save(); X.translate(540, 470 + (t < BLOWN + .4 ? (ctx.hash01(Math.floor(t * 30), 3) - .5) * 20 : 0)); X.rotate(-.07); X.scale(bk, bk);
      X.fillStyle = 'rgba(30,0,8,.9)'; X.strokeStyle = '#FF4D5E'; X.lineWidth = 9; X.beginPath(); X.roundRect(-430, -110, 860, 220, 26); X.fill(); X.stroke();
      ctx.text(X, 'ACCOUNT BLOWN', 0, 22, { family: 'Michroma', size: 64, color: '#FF4D5E', dir: 'ltr', shadow: { blur: 24, color: 'rgba(255,77,94,.7)' } });
      ctx.text(X, 'حساب افتراضي', 0, 82, { family: 'Tajawal', weight: 800, size: 30, color: '#FCFCFC' }); X.restore(); }
    if (panic > 0) { X.save(); X.globalAlpha = .18 * panic * (.5 + .5 * Math.sin(t * 10)); X.fillStyle = '#FF4D5E'; X.fillRect(0, 0, 1080, 1920); X.restore(); }
  } });
