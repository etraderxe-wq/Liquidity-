# project.json + timeline.json for «5 قواعد للمتداول المنضبط». VO text is kept for timing
# only (never drawn on screen); word timings are a reading-pace placeholder until a
# real recording exists.
import json, re
FPS, BPM, DUR = 30, 92, 67.0
T = lambda typ, d=.5, **k: {"type": typ, "dur": d, "ease": "expoInOut", **k}
SC = [("s1", 0, 5, None), ("s2", 5, 14, T("push", dir="up")), ("s3", 14, 23, T("wipe", dir="rtl")),
      ("s4", 23, 32, T("iris", .6, at=[540, 900])), ("s5", 32, 41, T("crossfade", .6)), ("s6", 41, 50, T("push", dir="left")),
      ("s7", 50, 56, T("wipe", dir="up")), ("s8", 56, 60, T("dip", .8, color="#00051A")), ("s9", 60, DUR, T("crossfade", .6))]
VO = [("l1", .4, 4.6, "تدخل كل يوم، بس ما عندك خطة ثابتة؟ هذي خمس قواعد تساعدك تضبط تداولك."),
      ("l2", 5.5, 13.6, "الانضباط إنك تلتزم بخطتك حتى لو مالك خلق. لا تدخل من الملل، ولا تغيّر وقفك عشان تتمنى السعر يرجع."),
      ("l3", 14.5, 22.6, "ركّز على نموذج دخول تفهمه، وعلى أسواق تعرف تتابعها. مو كل شمعة فرصة، ومو لازم تلحق كل حركة."),
      ("l4", 23.5, 31.6, "الاستمرارية مو إنك تتداول كل يوم. إنك تراجع، تسجّل، وتلتزم. وإذا ما في فرصة توافق خطتك، عادي ما تدخل."),
      ("l5", 32.5, 40.6, "السوق ما تقدر تتحكم فيه، بس دخولك ومخاطرتك بيدك. بعد الخسارة، اسأل نفسك: التزمت بخطتي، ولا تصرّفت بعاطفة؟"),
      ("l6", 41.5, 49.6, "سجّل صفقاتك وراجع أخطاءك. لا تغيّر استراتيجيتك بعد كل خسارة؛ خلّ تعديلك مبني على مراجعة وبيانات."),
      ("l7", 50.4, 55.6, "أي قاعدة من هالخمس تحتاج تشتغل عليها؟ اكتب رقمها بالتعليقات.")]
def words(s, e, text):
    ws = text.split(); pause = [.3 if re.search(r"[.؟?…:؛]$", w) else .15 if w.endswith("،") else 0 for w in ws]
    wt = [len(re.sub(r"\W", "", w)) + 2 for w in ws]; k = ((e - s) - sum(pause)) / sum(wt); t = s; out = []
    for w, a, p in zip(ws, wt, pause): d = a * k; out.append({"w": w, "s": round(t, 3), "e": round(t + d * .92, 3)}); t += d + p
    return out
pal = {"bg": "#00051A", "card": "rgba(0,5,26,.82)", "ink": "#FCFCFC", "acc": "#57A1EF", "acc2": "#3977D5", "hi": "#93F9FF", "mut": "#A9B6D3", "clay": "#3977D5"}
proj = {"name": "5 قواعد للمتداول المنضبط", "fps": FPS, "width": 1080, "height": 1920, "bpm": BPM, "beatsPerBar": 4, "beatOffset": 0,
        "palette": pal, "fonts": {"display": "Tajawal", "body": "Tajawal", "num": "Inter"}, "images": {"logo": "assets/logo.png"},
        "post": {"grain": .04, "vignette": .18},
        "music": {"key": "E", "scale": "minor", "progression": [0, 5, 3, 4], "level": -12, "duck": -6, "top": {"hat": 9, "pluck": 1}},
        "scenes": [{"id": i, "file": f"scenes/{i}.js", "lines": [f"l{i[1]}"] if int(i[1]) < 8 else [], **({"transition": tr} if tr else {})} for i, a, b, tr in SC]}
spb = 60 / BPM; beats = [round(i * spb, 3) for i in range(int(DUR / spb) + 1)]
tl = {"fps": FPS, "width": 1080, "height": 1920, "duration": DUR, "bpm": BPM, "beatsPerBar": 4, "beatOffset": 0, "grid": .25, "beats": beats, "bars": beats[::4],
      "sections": [{"name": "intro", "start": 0, "end": 5}, {"name": "break", "start": 5, "end": 50}, {"name": "outro", "start": 50, "end": DUR}],
      "scenes": [{"id": i, "file": f"scenes/{i}.js", "start": a, "end": b, "lines": [f"l{i[1]}"] if int(i[1]) < 8 else [], "transition": tr} for i, a, b, tr in SC],
      "vo": [{"id": i, "text": t, "start": s, "end": e, "dur": round(e - s, 3), "words": words(s, e, t)} for i, s, e, t in VO]}
json.dump(proj, open("project.json", "w"), ensure_ascii=False, indent=1); json.dump(tl, open("timeline.json", "w"), ensure_ascii=False, indent=1)
fx = [{"type": "pop", "at": .5, "gain": .5}, {"type": "whoosh", "at": 1.3, "gain": .35}, {"type": "shimmer", "at": 2.6, "gain": .35}]
fx += [{"type": "swoosh-pass", "at": f"scene:s{i}", "gain": .45} for i in range(2, 10)]
fx += [{"type": "tick", "at": 5 + 1.2 + i * .8 + .45, "gain": .3} for i in range(4)]
fx += [{"type": "shimmer", "at": 6.8, "gain": .3}, {"type": "shimmer", "at": 14 + 4.6, "gain": .4},
       {"type": "pop", "at": 32 + 2.4, "gain": .4}, {"type": "pop", "at": 32 + 3.9, "gain": .4}, {"type": "pop", "at": 32 + 5.4, "gain": .4},
       {"type": "pop", "at": 41 + 1.0, "gain": .4}, {"type": "pop", "at": 41 + 2.2, "gain": .4}, {"type": "pop", "at": 41 + 3.4, "gain": .4},
       {"type": "shimmer", "at": 56.6, "gain": .45}, {"type": "pop", "at": 61.0, "gain": .5}, {"type": "shimmer", "at": 61.7, "gain": .4}, {"type": "pop", "at": 64.3, "gain": .5}]
json.dump(fx, open("sfx.json", "w"), indent=1); print("ok", len(fx), "sfx")
