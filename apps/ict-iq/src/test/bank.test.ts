import { describe, it, expect } from 'vitest';
import { BUILTIN, SECTIONS, validate } from '../lib/bank';
import { scoreAttempt, buildAttempt, levelOf, type Attempt } from '../lib/scoring';
import type { Question } from '../types';
const seeded = (s: number) => () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296);
describe('question bank', () => {
  it('has 100 questions, 10 per section, unique ids', () => {
    expect(BUILTIN.length).toBe(100);
    SECTIONS.forEach(s => expect(BUILTIN.filter(q => q.section === s.id).length, s.id).toBe(10));
    expect(new Set(BUILTIN.map(q => q.id)).size).toBe(100);
  });
  it('every question validates', () => { BUILTIN.forEach(q => expect(validate(q), q.id).toEqual([])); });
  it('covers all types and difficulties', () => {
    ['mcq', 'tf', 'chart', 'scenario', 'analytical'].forEach(t => expect(BUILTIN.some(q => q.type === t), t).toBe(true));
    ['easy', 'medium', 'hard', 'expert'].forEach(d => expect(BUILTIN.some(q => q.difficulty === d), d).toBe(true));
  });
});
function answerAll(a: Attempt, bank: Question[], pick: (q: Question) => string | undefined, ms: number) {
  a.qids.forEach(id => { const q = bank.find(x => x.id === id)!; a.answers[id] = { qid: id, choice: pick(q), ms }; }); return scoreAttempt(a, bank);
}
describe('scoring', () => {
  it('quick test = 20 questions, 2 per section; full = 100', () => {
    const a = buildAttempt(BUILTIN, 20, 'challenge', 'T', seeded(1)); expect(a.qids.length).toBe(20);
    SECTIONS.forEach(s => expect(a.qids.filter(id => BUILTIN.find(q => q.id === id)!.section === s.id).length).toBe(2));
    expect(buildAttempt(BUILTIN, 100, 'challenge', 'T', seeded(2)).qids.length).toBe(100);
  });
  it('perfect answers = 200, Elite', () => { const r = answerAll(buildAttempt(BUILTIN, 100, 'challenge', 'T', seeded(3)), BUILTIN, q => q.answer, 30000); expect(r.score).toBe(200); expect(levelOf(r.score)[1]).toBe('Elite Market Analyst'); });
  it('no answers = 0', () => { const r = answerAll(buildAttempt(BUILTIN, 20, 'challenge', 'T', seeded(4)), BUILTIN, () => undefined, 1000); expect(r.score).toBe(0); });
  it('fast wrong answers score 0 (speed alone cannot raise score)', () => {
    const r = answerAll(buildAttempt(BUILTIN, 100, 'challenge', 'T', seeded(5)), BUILTIN, q => q.options.find(o => o.id !== q.answer && !q.partial?.[o.id])!.id, 4000);
    expect(r.score).toBe(0); expect(r.speedBonus).toBe(0);
  });
  it('speed never beats accuracy: slow-correct > fast with fewer correct', () => {
    const b = buildAttempt(BUILTIN, 100, 'challenge', 'T', seeded(6));
    const slow = answerAll(structuredClone(b), BUILTIN, q => q.answer, 600000).score;
    let n = 0; const fast = answerAll(structuredClone(b), BUILTIN, q => (n++ % 10 === 0 ? q.options.find(o => o.id !== q.answer && !q.partial?.[o.id])!.id : q.answer), 5000).score;
    expect(slow).toBeGreaterThanOrEqual(190); expect(fast).toBeLessThan(slow);
  });
  it('instant answers (<3s) get no speed credit', () => { const r = answerAll(buildAttempt(BUILTIN, 20, 'challenge', 'T', seeded(7)), BUILTIN, q => q.answer, 500); expect(r.speedBonus).toBe(0); expect(r.score).toBe(190); });
  it('level thresholds', () => { expect(levelOf(59)[1]).toBe('Beginner'); expect(levelOf(60)[1]).toMatch(/Developing/); expect(levelOf(139)[1]).toMatch(/Intermediate/); expect(levelOf(140)[1]).toMatch(/Advanced/); expect(levelOf(170)[1]).toBe('ICT Specialist'); expect(levelOf(189)[1]).toBe('ICT Specialist'); });
});
describe('charts', () => {
  it('no visible hint: zones equal to the answer target are hidden until reveal (only SC-02, SC-10 have them)', () => {
    const hits = BUILTIN.filter(q => q.chart?.targets && q.chart.zones?.some(z => q.chart!.targets!.some(t => t.from === z.from && t.to === z.to))).map(q => q.id);
    expect(hits.sort()).toEqual(['SC-02', 'SC-10']);
  });
});
