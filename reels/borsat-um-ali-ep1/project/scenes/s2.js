// S2 — training hall: «شنو الفرق بين استراتيجيتك والـ ICT؟» · «أنا مغير لون المستطيل!» → zoom on the rectangle (blue → purple) → applause.
import { buildSet, shoot, talk, speaking } from './sets.js';
import { pose, blinkAt } from './chars.js';
import { hallScreen } from './screen.js';
import { LINES } from './data.js';
const RECT = [1.3, 3.41, -4.58];
const SH = [
  { t: 25.0, p: [2.5, 3.7, 14], l: [-.5, 2.7, -1.5], fov: 32, p2: [2, 3.3, 12], d: 1.6 },
  { t: 26.0, p: [-.3, 2.45, 8.2], l: [2, 2.1, 1], fov: 18, fov2: 15, l2: [2, 2.3, 1], d: 4 },
  { t: 30.3, p: [-.4, 2.7, 7.6], l: [-1.6, 2.7, -1.6], fov: 26, fov2: 20, d: 6.5 },
  { t: 37.1, p: [-.3, 2.45, 8.2], l: [2, 2.35, 1], fov: 12 },
  { t: 38.75, p: [-1.0, 2.5, 7.2], l: [-2, 2.35, -1.6], fov: 13, fov2: 11, d: 2.6 },
  { t: 41.35, p: [.6, 3.45, 3.5], l: RECT, fov: 34, fov2: 17, d: .45, e: 'expoOut' },
  { t: 43.0, p: [0, 3.2, 13], l: [0, 2.3, 0], fov: 30, fov2: 27, d: 1.6 },
];
MOTION.scene({ id: 's2',
  setup(ctx) { this.set = buildSet(ctx, 'hall'); },
  draw(t, lt, ctx) {
    const s = this.set, { bo, stu } = s.chars, at = ctx.at;
    hallScreen(s.screen.x, t, at(t, 41.9, 42.5, 'sineInOut')); s.screen.tx.needsUpdate = true;
    shoot(ctx, s, t, SH);
    const sl = speaking(LINES, 'S', t), bl = speaking(LINES, 'B', t), clap = t > 42.3;
    pose(stu, { talk: talk(sl, t), brow: t > 37 && t < 41.3 ? -.6 : .2, blink: blinkAt(t, 3), turn: -.1, tilt: t > 37 && t < 38.6 ? .2 : 0,
      armR: t > 25.5 && t < 27.3 ? [0, 2.5 * at(t, 25.5, 25.8, 'backOut'), -.2] : clap ? [-1.3, -.55 + .25 * Math.sin(t * 22), -.6] : [0, 0, 0],
      armL: clap ? [-1.3, -.55 + .25 * Math.sin(t * 22 + 3), -.6] : [-.6, .1, -1.0] }, t);
    pose(bo, { talk: talk(bl, t), smile: .75, brow: bl ? .3 + .2 * Math.sin(t * 3) : .15, blink: blinkAt(t, 4), turn: bl ? .35 : .1,
      armR: bl ? [-.4, 1.2 + .3 * Math.sin(t * 2.6), -.6] : clap ? [0, 2.4, -.3] : [0, 0, 0],
      armL: bl && t > 33 ? [-.9, .3, -1.2] : [0, 0, 0], lean: bl ? -.04 : 0, nod: clap ? .1 * Math.sin(t * 4) : 0 }, t);
    s.crowd.forEach((c, i) => pose(c, { blink: blinkAt(t, 5 + i), armR: clap ? [-1.3, -.55 + .25 * Math.sin(t * 20 + i), -.6] : [0, 0, 0], armL: clap ? [-1.3, -.55 + .25 * Math.sin(t * 20 + i + 3), -.6] : [0, 0, 0] }, t));
    s.st.draw(ctx.X);
  } });
