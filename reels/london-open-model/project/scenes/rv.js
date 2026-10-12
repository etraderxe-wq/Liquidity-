// reveal schedule: [[iFrom, iTo, tStart, tEnd], ...] → local reveal time per candle
export const rv = segs => i => { for (const [a, b, t0, t1] of segs) if (i >= a && i <= b) return t0 + (b > a ? (i - a) / (b - a) : 0) * (t1 - t0); return 1e9; };
