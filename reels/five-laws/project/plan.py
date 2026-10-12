# Writes project.json + timeline.json. VO timings are a reading-pace placeholder
# (no recording yet) laid on the user's scene windows; replace with real word
# timings once his recording exists.
import json, re
FPS, BPM, DUR = 30, 100, 66.5
SC = [("s1", 0.0, 5.0, None),
      ("s2", 5.0, 14.0, {"type": "push", "dur": 0.5, "dir": "up", "ease": "expoInOut"}),
      ("s3", 14.0, 23.0, {"type": "wipe", "dur": 0.5, "dir": "rtl", "ease": "expoInOut"}),
      ("s4", 23.0, 32.0, {"type": "iris", "dur": 0.6, "at": [540, 900]}),
      ("s5", 32.0, 41.0, {"type": "zoom", "dur": 0.5}),
      ("s6", 41.0, 50.0, {"type": "blinds", "dur": 0.6, "n": 7}),
      ("s7", 50.0, 59.5, {"type": "dip", "dur": 0.6, "color": "#00051A"}),
      ("s8", 59.5, DUR, {"type": "crossfade", "dur": 0.6})]
VO = [("l1", 0.35, 4.55, "ناطر الحماس علشان تبدأ؟ عيل اسمع هالخمس قوانين."),
      ("l2", 5.5, 13.6, "الأول: الانضباط. سو اللي لازم تسويه، حتى بالأيام اللي مالك خلق. الحماس يروح… بس التزامك اهو اللي يكمّلك."),
      ("l3", 14.5, 22.6, "الثاني: التركيز. مو كل شي لازم تلحقه. حدد شنو تبي، وعطِه وقتك وطاقتك، وخفف الأشياء اللي تشتتك."),
      ("l4", 23.5, 31.4, "الثالث: الاستمرارية. شغلة صغيرة تسويها كل يوم، أحسن من دفعة قوية تسويها مرة وتوقف."),
      ("l5", 32.5, 40.6, "الرابع: المسؤولية. بدل ما تضيع وقتك باللوم، اسأل نفسك: شنو أقدر أغيّر؟ وابدأ باللي بإيدك."),
      ("l6", 41.5, 49.4, "الخامس: النمو. تعلم، جرّب، وراجع أخطاءك. إذا وقفت تتعلم، راح تكرر نفس الغلط."),
      ("l7", 50.5, 57.2, "لا تحاول تغيّر كل شي بيوم واحد. اختار قانون واحد، وابدأ فيه اليوم.")]
def words(s, e, text):
    ws = text.split(); pause = [0.32 if re.search(r"[.؟?…:]$", w) else 0.16 if w.endswith("،") else 0 for w in ws]
    wt = [len(re.sub(r"\W", "", w)) + 2 for w in ws]
    k = ((e - s) - sum(pause)) / sum(wt); t = s; out = []
    for w, a, p in zip(ws, wt, pause):
        d = a * k; out.append({"w": w, "s": round(t, 3), "e": round(t + d * .92, 3)}); t += d + p
    return out
pal = {"bg": "#00051A", "card": "rgba(0,5,26,.82)", "ink": "#FCFCFC", "acc": "#57A1EF", "acc2": "#3977D5", "hi": "#93F9FF", "mut": "#8C9AB8", "clay": "#3977D5"}
proj = {"name": "5 قوانين قاسية للنجاح", "fps": FPS, "width": 1080, "height": 1920, "bpm": BPM, "beatsPerBar": 4, "beatOffset": 0,
        "palette": pal, "fonts": {"display": "Tajawal", "body": "IBM Plex Sans Arabic", "num": "Inter"},
        "images": {"logo": "assets/logo.png"}, "post": {"grain": 0.045, "vignette": 0.22},
        "music": {"key": "D", "scale": "minor", "progression": [0, 5, 3, 4], "level": -9, "duck": -5, "top": {"hat": 12, "pluck": 2}},
        "scenes": [{"id": i, "file": f"scenes/{i}.js", "lines": [f"l{i[1]}"] if int(i[1]) < 8 else [], **({"transition": tr} if tr else {})} for i, a, b, tr in SC]}
spb = 60 / BPM; beats = [round(i * spb, 3) for i in range(int(DUR / spb) + 1)]
tl = {"fps": FPS, "width": 1080, "height": 1920, "duration": DUR, "bpm": BPM, "beatsPerBar": 4, "beatOffset": 0, "grid": 0.25,
      "beats": beats, "bars": beats[::4],
      "sections": [{"name": "intro", "start": 0, "end": 5.0}, {"name": "break", "start": 5.0, "end": 32.0},
                   {"name": "build", "start": 32.0, "end": 41.0}, {"name": "break", "start": 41.0, "end": 50.0},
                   {"name": "outro", "start": 50.0, "end": DUR}],
      "scenes": [{"id": i, "file": f"scenes/{i}.js", "start": a, "end": b, "lines": [f"l{i[1]}"] if int(i[1]) < 8 else [], "transition": tr} for i, a, b, tr in SC],
      "vo": [{"id": i, "text": t, "start": s, "end": e, "dur": round(e - s, 3), "words": words(s, e, t)} for i, s, e, t in VO]}
json.dump(proj, open("project.json", "w"), ensure_ascii=False, indent=1)
json.dump(tl, open("timeline.json", "w"), ensure_ascii=False, indent=1)
print("ok", len(beats), "beats")
