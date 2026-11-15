// ICT TRADING IQ — question bank schema. Questions live in src/data/questions/*.json (editable; admin edits are layered on top in localStorage).
export type SectionId = 'structure' | 'liquidity' | 'fvg' | 'orderblocks' | 'premium' | 'time' | 'advanced' | 'mtf' | 'risk' | 'scenarios';
export type QType = 'mcq' | 'tf' | 'chart' | 'scenario' | 'analytical';
export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';
// skill dimensions used in the report
export type Skill = 'structure' | 'liquidity' | 'fvg_ob' | 'premium' | 'time' | 'advanced' | 'mtf' | 'psychology' | 'risk' | 'practical' | 'chart' | 'decision';
export interface Option { id: string; text: string }
// candle = [open, high, low, close]; prices are illustrative (no real symbol)
export type Candle = [number, number, number, number];
export interface ChartLevel { price: number; label: string; kind: 'bsl' | 'ssl' | 'level' | 'eq' | 'entry' | 'sl' | 'tp' }
export interface ChartZone { from: number; to: number; i0: number; i1?: number; label: string; kind: 'fvg' | 'ob' | 'premium' | 'discount' | 'poi' | 'breaker' }
export interface ChartLabel { i: number; price: number; text: string }
// a clickable region on the chart; its id must equal an option id
export interface ChartTarget { id: string; i0: number; i1: number; from: number; to: number; label: string }
export interface ChartSpec { title?: string; tf?: string; candles: Candle[]; levels?: ChartLevel[]; zones?: ChartZone[]; labels?: ChartLabel[]; targets?: ChartTarget[] }
export interface Question {
  id: string;               // e.g. "LQ-04"
  section: SectionId;
  type: QType;
  difficulty: Difficulty;
  points?: number;          // default by difficulty: easy 1, medium 2, hard 3, expert 4
  skills: Skill[];
  concept: string;          // short concept tag in English, e.g. "Liquidity Sweep vs BOS"
  question: string;         // Arabic (Gulf-friendly MSA), English ICT terms kept as-is
  options: Option[];        // tf: [{id:'t',text:'صح'},{id:'f',text:'خطأ'}]
  answer: string;           // id of the BEST option
  partial?: Record<string, number>; // other acceptable-but-weaker options → credit 0..0.6
  explanation: string;      // Arabic, why the best answer is best and why the trap is wrong
  chart?: ChartSpec;
}
