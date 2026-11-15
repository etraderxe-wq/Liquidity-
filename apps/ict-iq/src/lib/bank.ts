import type { Question, SectionId, Difficulty } from '../types';
import { load, save } from './storage';
// All built-in questions: one JSON file per section (editable). Admin edits are stored as an overlay in localStorage.
const files = import.meta.glob('../data/questions/*.json', { eager: true, import: 'default' }) as Record<string, Question[]>;
export const BUILTIN: Question[] = Object.values(files).flat();
export const SECTIONS: { id: SectionId; en: string; ar: string }[] = [
  { id: 'structure', en: 'Market Structure', ar: 'هيكل السوق' }, { id: 'liquidity', en: 'Liquidity', ar: 'السيولة' },
  { id: 'fvg', en: 'Fair Value Gap', ar: 'فجوات القيمة العادلة' }, { id: 'orderblocks', en: 'Order Blocks', ar: 'الأوردر بلوك' },
  { id: 'premium', en: 'Premium & Discount', ar: 'البريميوم والديسكاونت' }, { id: 'time', en: 'ICT Time & Sessions', ar: 'الوقت والجلسات' },
  { id: 'advanced', en: 'Advanced ICT', ar: 'مفاهيم متقدمة' }, { id: 'mtf', en: 'Multi-Timeframe', ar: 'تعدد الفريمات' },
  { id: 'risk', en: 'Risk & Psychology', ar: 'المخاطر والنفسية' }, { id: 'scenarios', en: 'Practical Scenarios', ar: 'سيناريوهات عملية' }];
export const DEFAULT_POINTS: Record<Difficulty, number> = { easy: 1, medium: 2, hard: 3, expert: 4 };
export const pts = (q: Question) => q.points ?? DEFAULT_POINTS[q.difficulty];
interface Overlay { upserts: Record<string, Question>; deleted: string[] }
const KEY = 'iq.bank.overlay';
export function getOverlay(): Overlay { return load<Overlay>(KEY, { upserts: {}, deleted: [] }); }
export function setOverlay(o: Overlay) { save(KEY, o); }
export function getBank(): Question[] {
  const o = getOverlay(), byId = new Map(BUILTIN.map(q => [q.id, q]));
  Object.values(o.upserts).forEach(q => byId.set(q.id, q));
  o.deleted.forEach(id => byId.delete(id));
  return [...byId.values()];
}
export function upsertQuestion(q: Question) { const o = getOverlay(); o.upserts[q.id] = q; o.deleted = o.deleted.filter(d => d !== q.id); setOverlay(o); }
export function deleteQuestion(id: string) { const o = getOverlay(); delete o.upserts[id]; if (!o.deleted.includes(id)) o.deleted.push(id); setOverlay(o); }
export function resetBank() { setOverlay({ upserts: {}, deleted: [] }); }
// validation used by tests and by the admin editor
export function validate(q: Question): string[] {
  const e: string[] = [];
  if (!q.id) e.push('id'); if (!SECTIONS.some(s => s.id === q.section)) e.push('section');
  if (!q.options?.length || q.options.length < 2) e.push('options'); if (!q.options?.some(o => o.id === q.answer)) e.push('answer not in options');
  if (new Set(q.options?.map(o => o.id)).size !== q.options?.length) e.push('duplicate option ids');
  Object.keys(q.partial || {}).forEach(k => { if (!q.options.some(o => o.id === k) || k === q.answer) e.push('partial ' + k); if ((q.partial![k] ?? 0) > .6) e.push('partial too high ' + k); });
  if (q.chart) { const n = q.chart.candles.length; if (!n) e.push('chart candles');
    q.chart.candles.forEach((c, i) => { const [o, h, l, cl] = c; if (h < Math.max(o, cl) || l > Math.min(o, cl)) e.push('candle ' + i); });
    (q.chart.targets || []).forEach(t => { if (!q.options.some(o => o.id === t.id)) e.push('target ' + t.id); if (t.i0 >= n + 6) e.push('target range ' + t.id); }); }
  if (!q.explanation) e.push('explanation');
  return e;
}
