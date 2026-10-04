---
name: emullax-carousel
description: Build an Instagram carousel (كورسيل انستقرام) AND its matching Reel in the official EMULLAX / LIQUIDITY GROUP blue brand identity — 1080x1350 PNG slides plus a 1080x1920 MP4 reel from Arabic text. Use whenever Ebrahim (@emullax) asks for a carousel, كورسيل, سلايدات انستقرام, بوست شرائح, or "سوها كورسيل" — every carousel must use this exact look and always ships with the reel version unless he asks otherwise.
---

# EMULLAX Instagram Carousel

Every carousel for @emullax uses this one look. Do not switch to the gold daily-report theme or the teal reel theme.

## Brand (from `assets/brand-guide.png` — the official guide)
- Colors: `#00051A` background · `#030B24` cards · `#FCFCFC` text · `#3977D5` / `#57A1EF` blue accents · `#93F9FF` cyan highlight. Cyan→blue glow aura at the top.
- Logo: `assets/logo.png` (white). Keep clear space around it; never recolor or stretch.
- Fonts in the guide are licensed and not bundled, so free substitutes are embedded in `assets/fonts/`:
  Arabic headings Maghfira → **Alexandria** · Arabic body Aktiv Grotesk → **IBM Plex Sans Arabic** · English headings Panchang → **Michroma**.
  If the user supplies the real font files, add `@font-face` rules to `assets/fonts.css` and swap the family names in `assets/style.css`.

## Steps
1. Keep the user's text **verbatim**. Only add short design labels (cover meta, section titles for split slides, "اسحب للتفاصيل") and say which ones you added.
2. Write a content JSON like `examples/financial-literacy.json`:
   - `kind: "cover"` → title, subtitle, optional `meta` (3 pairs).
   - Section slides → `num` (int → Arabic digits), `title`, `blocks`, optional `dense: true` for list-heavy slides.
   - `kind: "outro"` → closing line (`title`), `subtitle`, `disclaimer` (always include one for trading/finance content).
   - Block types: `lead`, `body`, `muted`, `highlight`, `quote`, `steps`, `bullets` (items `{title,text}`), `checklist`, `pros_cons` (`good`/`bad`, `vertical`, `between`), `chips`, `grid`, `next`.
   - Wrap emphasis in `<em>…</em>` (renders cyan).
   - Roughly one idea per slide; split long sections across 2 slides with the same `num`. Max 20 slides (Instagram limit).
3. Build and render:
   ```bash
   python3 .claude/skills/emullax-carousel/scripts/build.py content.json carousels/<slug>
   node .claude/skills/emullax-carousel/scripts/render.js carousels/<slug>
   ```
   Then ALWAYS make the reel too:
   ```bash
   node .claude/skills/emullax-carousel/scripts/render.js carousels/<slug> --reel   # reel/frame-XX.png 1080x1920
   python3 .claude/skills/emullax-carousel/scripts/reel.py carousels/<slug>         # reel.mp4 (~40 s render)
   ```
   The reel is the same slides in 9:16 (header/footer kept clear of Instagram's UI), each held 3.5–7 s by word count, slow push-in, 0.5 s fades, 30 fps, **no audio** — he adds the music himself in Instagram.
   `render.js` reports any OVERFLOW (exit 1). Fix by splitting the slide or setting `dense` — never by shrinking fonts below the stylesheet sizes.
4. Look at every PNG yourself (or a contact sheet): Arabic joined, nothing clipped, logo crisp. For the reel, pull 3–4 frames with `ffmpeg -ss T -i reel.mp4 -frames:v 1` and check duration with ffprobe.
5. Commit `slide-XX.png` and `reel.mp4` to `carousels/<slug>/` (drop `carousel.html` and the `reel/` frames folder) and send both to the user.

## Publishing
Only schedule when asked. He prefers to post himself and add music in Instagram — don't schedule unless he asks. If he does: Metricool can't attach music to an image carousel; for the reel it can (`instagramData.type: REEL` + `audioConfiguration.audioId`, Business account only).
