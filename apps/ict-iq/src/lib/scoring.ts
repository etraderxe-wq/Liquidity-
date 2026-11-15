import type { Question, Skill, SectionId } from '../types';
import { pts } from './bank';
export type Mode = 'practice' | 'challenge';
export interface AnswerRec { qid: string; choice?: string; ms: number; flagged?: boolean }
export interface Attempt {
  id: string; name: string; date: string; mode: Mode; size: 20 | 100; qids: string[]; order: Record<string, string[]>;
  answers: Record<string, AnswerRec>; startedAt: number; finishedAt?: number; limitSec: number; cur: number; result?: Result;
}
export interface Result { score: number; level: string; accuracy: number; answered: number; correct: number; speedBonus: number;
  dims: Record<Dim, number>; sections: Record<SectionId, number>; missedConcepts: { concept: string; section: SectionId; qid: string }[] }
export type Dim = 'structure' | 'liquidity' | 'fvg_ob' | 'mtf' | 'psychology' | 'risk' | 'practical' | 'knowledge';
export const DIMS: { id: Dim; en: string; ar: string }[] = [
  { id: 'structure', en: 'Market Structure', ar: 'هيكل السوق' }, { id: 'liquidity', en: 'Liquidity', ar: 'السيولة' }, { id: 'fvg_ob', en: 'FVG & Order Blocks', ar: 'FVG والأوردر بلوك' },
  { id: 'mtf', en: 'Multi-Timeframe', ar: 'تعدد الفريمات' }, { id: 'psychology', en: 'Trading Psychology', ar: 'نفسية التداول' }, { id: 'risk', en: 'Risk Management', ar: 'إدارة المخاطر' },
  { id: 'practical', en: 'Practical Analysis', ar: 'التحليل العملي' }, { id: 'knowledge', en: 'ICT Knowledge', ar: 'معرفة ICT' }];
export const LEVELS: [number, string, string][] = [[190, 'Elite Market Analyst', 'محلل سوق نخبة'], [170, 'ICT Specialist', 'متخصص ICT'], [140, 'Advanced Trader', 'متداول متقدم'],
  [100, 'Intermediate Trader', 'متداول متوسط'], [60, 'Developing Trader', 'متداول في طور التطوير'], [0, 'Beginner', 'مبتدئ']];
export const levelOf = (s: number) => LEVELS.find(l => s >= l[0])!;
// credit for one answer: 1 = best, partial value for an acceptable-but-weaker choice, 0 otherwise
export const credit = (q: Question, choice?: string) => !choice ? 0 : choice === q.answer ? 1 : (q.partial?.[choice] ?? 0);
const DIM_OF: Partial<Record<Skill, Dim>> = { structure: 'structure', liquidity: 'liquidity', fvg_ob: 'fvg_ob', premium: 'fvg_ob', mtf: 'mtf', psychology: 'psychology', risk: 'risk', practical: 'practical', chart: 'practical', decision: 'practical' };
/* Score out of 200:
   - 190 points come from difficulty-weighted accuracy (hard/expert questions weigh more; partial credit for weaker-but-valid choices).
   - up to 10 points of "decision speed", but only on correctly answered questions and scaled by accuracy, so speed alone can never raise the score
     and guessing fast does not help. A correct answer earns its speed credit when answered within the question's reasonable time (not instantly). */
export function scoreAttempt(a: Attempt, bank: Question[]): Result {
  const qs = a.qids.map(id => bank.find(q => q.id === id)).filter(Boolean) as Question[];
  let got = 0, max = 0, correct = 0, answered = 0, speedPts = 0, speedMax = 0;
  const dimGot: Record<string, number> = {}, dimMax: Record<string, number> = {}, secGot: Record<string, number> = {}, secMax: Record<string, number> = {};
  const missed: Result['missedConcepts'] = [];
  for (const q of qs) {
    const rec = a.answers[q.id], w = pts(q), c = credit(q, rec?.choice);
    if (rec?.choice) answered++; if (c === 1) correct++;
    got += w * c; max += w;
    const dims = new Set<Dim>(['knowledge']); q.skills.forEach(s => { const d = DIM_OF[s]; if (d) dims.add(d); });
    if (q.section === 'risk') dims.add(q.skills.includes('psychology') ? 'psychology' : 'risk');
    dims.forEach(d => { dimGot[d] = (dimGot[d] || 0) + w * c; dimMax[d] = (dimMax[d] || 0) + w; });
    secGot[q.section] = (secGot[q.section] || 0) + w * c; secMax[q.section] = (secMax[q.section] || 0) + w;
    if (c < 1) missed.push({ concept: q.concept, section: q.section, qid: q.id });
    // speed: target time grows with difficulty; answering in under 3 s gets nothing (likely a guess)
    const target = { easy: 25, medium: 40, hard: 60, expert: 80 }[q.difficulty] * 1000, ms = rec?.ms ?? 0;
    speedMax += w; if (c === 1 && ms >= 3000) speedPts += w * Math.max(0, Math.min(1, 1.5 - ms / target / 1.5));
  }
  const acc = max ? got / max : 0, speed = speedMax ? speedPts / speedMax : 0, speedBonus = Math.round(10 * speed * acc * 10) / 10;
  const score = Math.round(190 * acc + speedBonus);
  const pct = (g: Record<string, number>, m: Record<string, number>, k: string) => m[k] ? Math.round(100 * (g[k] || 0) / m[k]) : -1;
  const dims = Object.fromEntries(DIMS.map(d => [d.id, pct(dimGot, dimMax, d.id)])) as Record<Dim, number>;
  const sections = Object.fromEntries(Object.keys(secMax).map(k => [k, pct(secGot, secMax, k)])) as Record<SectionId, number>;
  return { score, level: levelOf(score)[1], accuracy: Math.round(acc * 1000) / 10, answered, correct, speedBonus, dims, sections, missedConcepts: missed };
}
// pick questions: quick = 2 per section (balanced difficulty), full = all (up to 10 per section); random order + shuffled options
export function buildAttempt(bank: Question[], size: 20 | 100, mode: Mode, name: string, rnd = Math.random): Attempt {
  const shuffle = <T,>(arr: T[]) => { const x = [...arr]; for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; } return x; };
  const bySec: Record<string, Question[]> = {}; bank.forEach(q => (bySec[q.section] ||= []).push(q));
  let picked: Question[] = [];
  for (const sec of Object.keys(bySec)) {
    const pool = shuffle(bySec[sec]);
    if (size === 20) { const easyMed = pool.filter(q => q.difficulty === 'easy' || q.difficulty === 'medium'), hardEx = pool.filter(q => q.difficulty === 'hard' || q.difficulty === 'expert');
      picked.push(...[easyMed[0] ?? pool[0], hardEx[0] ?? pool.find(q => q !== easyMed[0])].filter(Boolean) as Question[]); }
    else picked.push(...pool.slice(0, 10));
  }
  picked = shuffle(picked).slice(0, size);
  const order = Object.fromEntries(picked.map(q => [q.id, q.type === 'tf' ? q.options.map(o => o.id) : shuffle(q.options.map(o => o.id))]));
  const now = Date.now();
  return { id: 'A' + now.toString(36).toUpperCase(), name, date: new Date(now).toISOString(), mode, size, qids: picked.map(q => q.id), order, answers: {}, startedAt: now, limitSec: size === 20 ? 25 * 60 : 110 * 60, cur: 0 };
}
