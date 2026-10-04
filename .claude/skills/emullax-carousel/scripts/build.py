#!/usr/bin/env python3
"""EMULLAX carousel: content JSON -> carousel.html (render PNGs with render.js)."""
import json, random, sys, html
from pathlib import Path

SKILL = Path(__file__).resolve().parent.parent
ARABIC_NUM = "٠١٢٣٤٥٦٧٨٩"

def candles(W=1080, H=520, n=40, seed=3, col="#57A1EF"):
    r = random.Random(seed); p = 50.0; step = W / n
    Y = lambda v: H - (v - 20) / 70 * H
    out = [f'<svg viewBox="0 0 {W} {H}" width="100%" xmlns="http://www.w3.org/2000/svg">']
    for i in range(n):
        o = p; c = o + r.gauss(0.25, 2.2); h = max(o, c) + abs(r.gauss(0, 1.2)); l = min(o, c) - abs(r.gauss(0, 1.2)); p = c
        x = i * step + step / 2
        out.append(f'<line x1="{x:.1f}" x2="{x:.1f}" y1="{Y(h):.1f}" y2="{Y(l):.1f}" stroke="{col}" stroke-opacity=".18"/>'
                   f'<rect x="{i*step+step*.2:.1f}" y="{Y(max(o,c)):.1f}" width="{step*.6:.1f}" height="{max(abs(Y(o)-Y(c)),1):.1f}" fill="{col}" fill-opacity="{.16 if c>=o else .07}"/>')
    return "".join(out) + "</svg>"

def items(lst, mark):
    o = '<div class="list">'
    for it in lst:
        if isinstance(it, dict):
            o += f'<div class="item card"><span class="ic">{mark}</span><div><b>{it["title"]}</b><p>{it["text"]}</p></div></div>'
        else:
            o += f'<div class="item card"><span class="ic">{mark}</span><div><p class="solo">{it}</p></div></div>'
    return o + "</div>"

def block(b):
    t = b["type"]
    if t == "lead": return f'<p class="lead">{b["text"]}</p>'
    if t == "body": return f'<p class="body">{b["text"]}</p>'
    if t == "muted": return f'<p class="body mut">{b["text"]}</p>'
    if t == "highlight": return f'<div class="hlb">{b["text"]}</div>'
    if t == "quote": return f'<div class="hlb big">{b["text"]}</div>'
    if t == "steps": return '<div class="tri">' + "".join(f'<div class="card"><span class="n">{i+1:02d}</span><b>{s}</b></div>' for i, s in enumerate(b["items"])) + "</div>"
    if t == "bullets": return items(b["items"], "◆")
    if t == "checklist": return items(b["items"], "✓")
    if t == "pros_cons":
        u, d = b["good"], b["bad"]
        cls = "scn col" if b.get("vertical") else "scn"
        mid = f'<div class="vs">{b.get("between","مقابل")}</div>' if b.get("vertical") else ""
        return f'<div class="{cls}"><div class="u"><small>{u["label"]}</small><b>{u["text"]}</b></div>{mid}<div class="d"><small>{d["label"]}</small><b>{d["text"]}</b></div></div>'
    if t == "chips": return '<div class="chips">' + "".join(f"<span>{c}</span>" for c in b["items"]) + "</div>"
    if t == "grid": return '<div class="g4">' + "".join(f'<div class="card">{c}</div>' for c in b["items"]) + "</div>"
    if t == "next": return f'<div class="nx">{b["text"]} ←</div>'
    raise ValueError(f"unknown block type: {t}")

def main(src, out_dir):
    data = json.loads(Path(src).read_text())
    brand = data.get("brand", "LIQUIDITY GROUP"); handle = data.get("handle", "@emullax"); series = data.get("series", "")
    slides = data["slides"]; N = len(slides); bg = candles()
    secs = []
    for i, s in enumerate(slides, 1):
        kind = s.get("kind", "section")
        if kind == "cover":
            meta = "".join(f'<div>{m[0]}<b>{m[1]}</b></div>' for m in s.get("meta", []))
            body = (f'<div class="cover"><div class="kick n">{brand}</div><h1>{s["title"]}</h1>'
                    + (f'<div class="hl">{s["subtitle"]}</div>' if s.get("subtitle") else "")
                    + (f'<div class="meta">{meta}</div>' if meta else "")
                    + f'<div class="swipe">{s.get("swipe","اسحب للتفاصيل")} ←</div></div>')
            cls = "cov"
        elif kind == "outro":
            body = (f'<div class="cover"><div class="kick n">{brand}</div><p class="o1">{s["title"]}</p>'
                    + (f'<div class="hl">{s["subtitle"]}</div>' if s.get("subtitle") else "")
                    + (f'<div class="disc">{s["disclaimer"]}</div>' if s.get("disclaimer") else "") + "</div>")
            cls = "cov"
        else:
            num = s.get("num", "")
            if isinstance(num, int): num = "".join(ARABIC_NUM[int(d)] for d in str(num))
            body = (f'<div class="sec"><span class="num">{num}</span><h2>{s["title"]}</h2></div>' if num else f"<h2>{s['title']}</h2>")
            body += "".join(block(b) for b in s.get("blocks", []))
            cls = "dense" if s.get("dense") else ""
        dots = "".join(f'<i class="{"on" if k == i else ""}"></i>' for k in range(1, N + 1))
        secs.append(f'''<section class="slide {cls}" id="s{i}"><div class="aura"></div><div class="bgc">{bg}</div><div class="vig"></div>
<div class="hdr"><img src="assets/logo.png" alt="EMULLAX"><div class="rt"><b>{brand}</b>{series}</div></div>
<main>{body}</main>
<div class="ftr"><span class="n">{i} / {N}</span><span class="dots">{dots}</span><span class="h n">{handle}</span></div></section>''')
    css = (SKILL / "assets/fonts.css").read_text() + (SKILL / "assets/style.css").read_text()
    out = Path(out_dir); out.mkdir(parents=True, exist_ok=True)
    page = f'<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><base href="{SKILL.as_uri()}/"><style>{css}</style></head><body>{"".join(secs)}</body></html>'
    (out / "carousel.html").write_text(page)
    print(out / "carousel.html", N, "slides")

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
