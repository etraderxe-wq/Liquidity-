---
name: emullax-carousel
description: Build an Instagram carousel (كورسيل انستقرام) in the official EMULLAX / LIQUIDITY GROUP blue brand identity — 1080x1350 PNG slides from Arabic text. Use whenever Ebrahim (@emullax) asks for a carousel, كورسيل, سلايدات انستقرام, بوست شرائح, or "سوها كورسيل" — every carousel must use this exact look unless he asks otherwise.
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
   `render.js` reports any OVERFLOW (exit 1). Fix by splitting the slide or setting `dense` — never by shrinking fonts below the stylesheet sizes.
4. Look at every PNG yourself (or a contact sheet): Arabic joined, nothing clipped, logo crisp.
5. Commit PNGs to `carousels/<slug>/` (delete `carousel.html` or keep it, it's self-referencing the skill assets) and send the slides to the user.

## Publishing
Only schedule when asked. Metricool cannot attach music to an image carousel — music only works on Reels. If he wants a song, either schedule with `autoPublish: false` so he adds it in the Instagram app, or offer a Reel slideshow version.
