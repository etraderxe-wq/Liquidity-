// S1 — studio: the intro of «الأستاذ بوفهد» · since 2018 / since March / this year · cricket silence.
import { buildSet, shoot, talk, speaking } from './sets.js';
import { pose, blinkAt } from './chars.js';
import { studioScreen } from './screen.js';
import { LINES, T } from './data.js';
const HM = [-.9, 2.45, 8.4], BM = [-.4, 2.45, 8.3];
const SH = [
  { t: 0, p: [0, 3.6, 17], l: [0, 2.6, 0], fov: 34, p2: [0, 3.0, 13], d: 1.6 },
  { t: 1.6, p: HM, l: [-1.7, 2.1, .2], fov: 21, fov2: 15, l2: [-1.7, 2.35, .2], d: 6.4 },
  { t: 8.05, p: [1.8, 2.8, 12], l: [3.0, 2.1, 0], fov: 28, p2: [1.3, 2.6, 10], l2: [1.8, 2.1, 0], d: 3.2 },
  { t: 11.35, p: HM, l: [-1.7, 2.2, .2], fov: 17 },
  { t: 13.3, p: BM, l: [1.7, 2.1, .2], fov: 19, fov2: 15, l2: [1.7, 2.3, .2], d: 4 },
  { t: 17.45, p: HM, l: [-1.7, 2.35, .2], fov: 13 },
  { t: 20.1, p: BM, l: [1.7, 2.35, .2], fov: 13 },
  { t: 21.55, p: HM, l: [-1.7, 2.3, .2], fov: 16, fov2: 11, d: .22, e: 'expoOut' },
  { t: 22.65, p: BM, l: [1.65, 2.25, .2], fov: 16, fov2: 11, d: .22, e: 'expoOut' },
  { t: 23.5, p: [0, 2.7, 13], l: [0, 2.5, 0], fov: 28, fov2: 24, d: 1.8 },
];
MOTION.scene({ id: 's1',
  setup(ctx) { this.set = buildSet(ctx, 'studio'); this.set.chars.stu.visible = false; },
  draw(t, lt, ctx) {
    const { at } = this.set ? ctx : ctx, s = this.set, { host, bo } = s.chars;
    studioScreen(s.screen.x, t); s.screen.tx.needsUpdate = true;
    shoot(ctx, s, t, SH);
    // bofahad walks in (8.4 → 10.9), spotlight follows
    const w = ctx.at(t, 8.4, 10.9, 'sineInOut'); bo.position.x = 5.6 - 3.9 * w; bo.rotation.y = -.3 - (1 - ctx.at(t, 10.4, 11.0)) * 1.2;
    s.spot.intensity = 30 * ctx.at(t, 8.2, 8.6); s.spot.target.position.set(bo.position.x, 1.5, bo.position.z);
    const walking = t > 8.4 && t < 10.9;
    const hl = speaking(LINES, 'H', t), bl = speaking(LINES, 'B', t);
    const silent = t > 23.4;
    pose(host, { talk: talk(hl, t), smile: .8, brow: hl ? .5 + .3 * Math.sin(t * 5) : (silent ? .9 * ctx.at(t, 24.1, 24.4) - .3 * (1 - ctx.at(t, 24.1, 24.4)) : .3),
      blink: blinkAt(t, 1), turn: t > 11 ? .3 : .1, look: [t > 11 ? 1 : 0, 0], bob: hl ? 1 : 0,
      armR: [-1.25, -.05, -1.2], armL: t > 7.6 && t < 10.5 ? [-.5, 1.3 * ctx.at(t, 7.6, 8.1), -.3] : hl ? [-.3 + .15 * Math.sin(t * 4), .25, -.8] : [0, 0, 0],
      nod: silent ? -.05 : 0 }, t);
    pose(bo, { talk: talk(bl, t), smile: silent ? 0 : .7, brow: silent ? 0 : .25, blink: blinkAt(t, 2), turn: walking ? .9 : (silent ? .2 * ctx.at(t, 23.6, 24.2) : 0),
      bob: walking ? 1 : 0, armR: walking ? [-.2, 2.2 + .3 * Math.sin(t * 8), -.5] : bl ? [-.6, .4 + .2 * Math.sin(t * 3), -1.0] : [0, 0, 0],
      armL: bl && t > 13.3 && t < 17.3 ? [-.9, .1, -1.4] : [0, 0, 0], lean: bl ? -.05 : 0, sway: walking ? .04 : 0 }, t);
    s.st.draw(ctx.X);
    // cricket silence card
    const ck = ctx.at(t, 23.45, 23.7) * (1 - ctx.at(t, 25.0, 25.3));
    if (ck > 0) ctx.text(ctx.X, '. . .', 540, 560, { family: 'Inter', weight: 900, size: 90, color: '#FCFCFC', dir: 'ltr', alpha: ck * (.5 + .5 * Math.sin(t * 6)) });
  } });
