// S4 — studio: final advice · «299 دينار» · «بس إنت أمس مصفّر حسابك!» · «الحساب شخصي… والعلم مؤسسي!» → laughter + freeze frame.
import { buildSet, shoot, talk, speaking } from './sets.js';
import { pose, blinkAt } from './chars.js';
import { studioScreen } from './screen.js';
import { LINES, T } from './data.js';
const FRZ = T.b9.e + .12;
const HM = [-.9, 2.45, 8.4], BM = [-.4, 2.45, 8.3];
const SH = [
  { t: 59.0, p: [0, 3.6, 17], l: [0, 2.6, 0], fov: 32, p2: [0, 3.0, 13.5], d: 1.2 },
  { t: 59.5, p: HM, l: [-1.7, 2.2, .2], fov: 18, fov2: 15, d: 2.8 },
  { t: 62.35, p: BM, l: [1.7, 2.1, .2], fov: 21, fov2: 14, l2: [1.7, 2.35, .2], d: 6.8 },
  { t: 69.2, p: [1.0, 2.3, .6], l: [2.6, 1.9, 5.2], fov: 24, fov2: 19, d: 2.5 },
  { t: 71.95, p: BM, l: [1.68, 2.2, .2], fov: 16, fov2: 13.5, d: 2.8 },
];
MOTION.scene({ id: 's4',
  setup(ctx) { this.set = buildSet(ctx, 'studio'); },
  draw(t0, lt, ctx) {
    this.set.chars.bo.rotation.y = -.3;
    const t = Math.min(t0, FRZ), s = this.set, { host, bo, stu } = s.chars, at = ctx.at;
    studioScreen(s.screen.x, t); s.screen.tx.needsUpdate = true;
    shoot(ctx, s, t, SH);
    s.spot.intensity = 30; s.spot.target.position.set(1.7, 1.5, .2);
    const hl = speaking(LINES, 'H', t), bl = speaking(LINES, 'B', t), sl = speaking(LINES, 'S', t);
    stu.position.y = -1.2 + 1.2 * at(t, 69.0, 69.45, 'backOut');
    pose(host, { talk: talk(hl, t), smile: .7, brow: t > 69.4 ? .8 : .4, blink: blinkAt(t, 8), turn: .3, armR: [-1.25, -.05, -1.2], armL: hl ? [-.3, .25, -.8] : [0, 0, 0] }, t);
    const glasses = at(t, 72.05, 72.35) * (1 - at(t, 72.6, 72.9));
    pose(bo, { talk: talk(bl, t), smile: t > 69.4 && t < 72 ? .1 : .8, brow: t > 69.4 && t < 72 ? -.4 : .35, blink: blinkAt(t, 9),
      turn: t > 69.4 && t < 72 ? .5 : 0,
      armR: glasses > 0 ? [-2.5 * glasses, .1, -2.6 * glasses] : bl && t < 69.3 ? [-.5, 1.5 + .4 * Math.sin(t * 3.4), -.6] : [0, 0, 0],
      armL: bl && t < 69.3 ? [-.9, .3, -1.3] : [0, 0, 0], glassesUp: glasses, lean: bl ? -.05 : 0, nod: t > 73.3 ? .06 : 0 }, t);
    pose(stu, { talk: talk(sl, t), brow: -.5, blink: blinkAt(t, 10), armR: t > 69.4 ? [-1.5, .1, 0] : [0, 0, 0], armL: [0, 0, 0] }, t);
    s.aud.children.forEach((h, i) => { h.position.y = (i < 9 ? .7 : .95) + (t0 > FRZ ? .06 * Math.abs(Math.sin(t0 * 14 + i)) : 0); });
    const X = ctx.X, fz = t0 > FRZ ? 1 : 0;
    if (fz) { const k = at(t0, FRZ, FRZ + .35, 'expoOut'); X.save(); X.translate(540, 900); X.scale(1 + .06 * k, 1 + .06 * k); X.translate(-540, -900);
      s.st.draw(X, { filter: `saturate(${1 - .65 * k}) contrast(1.08)` }); X.restore();
      X.save(); X.globalAlpha = .7 * (1 - at(t0, FRZ, FRZ + .25)); X.fillStyle = '#fff'; X.fillRect(0, 0, 1080, 1920); X.restore();
    } else s.st.draw(X);
    // price tag pop: «299 دينار»
    const pk = ctx.E.springK(ctx.prog(t, 66.3, 67.0)) * (1 - at(t, 69.0, 69.25));
    if (pk > 0) { X.save(); X.translate(540, 560); X.rotate(-.06); X.scale(pk, pk);
      const g = X.createLinearGradient(-300, 0, 300, 0); g.addColorStop(0, '#93F9FF'); g.addColorStop(1, '#3977D5'); X.fillStyle = g;
      X.beginPath(); X.roundRect(-300, -95, 600, 190, 34); X.fill();
      ctx.text(X, '299 دينار', 0, 30, { family: 'Tajawal', weight: 900, size: 104, color: '#00051A' });
      ctx.text(X, 'سجّل الحين!!', 0, 140, { family: 'Tajawal', weight: 900, size: 46, color: '#FCFCFC', shadow: { blur: 16, color: '#000' } }); X.restore(); }
  } });
