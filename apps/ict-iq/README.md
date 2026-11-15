# EMULLAX | ICT TRADING IQ

React + TypeScript + Tailwind. 100 questions (10 sections × 10) in `src/data/questions/*.json`, editable.

- `npm install && npm run dev`: development
- `npm test`: bank validation and scoring tests
- `npm run build`: build to `dist/`
- `SINGLE=1 npx vite build --outDir dist-single`: a single HTML file (a copy lives at `ict-trading-iq.html`)

Progress, results and admin edits are stored in the browser's localStorage (per device).
