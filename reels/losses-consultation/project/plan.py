# «مو كل خسارة تعني إن تحليلك غلط» — EMULLAX reel on Ebrahim's own voice.
# Line timing = speech segments measured on the recording (silence detection, -35 dB / 0.35 s);
# words inside a segment are spread by letter count. Text = his words as spoken (Kuwaiti), not rewritten.
import json, re
FPS, BPM = 30, 80
VOICE_END = 60.18
SEG = {  # line id: [(start, end, text), ...]  one segment = one subtitle chunk
 'l1': [(0.86, 3.43, 'مو كل مرة تخسر فيها معناته تحليلك غلط.')],
 'l2': [(4.16, 4.94, 'تدري شنو المشكلة'), (5.37, 6.64, 'اللي يعاني منها أغلب المتداولين؟')],
 'l3': [(7.11, 8.12, 'إنه يعرف يحلل السوق،'), (8.55, 10.76, 'بس ما يعرف يتحكم بنفسه وقت التداول.')],
 'l4': [(11.78, 12.39, 'يشوف فرصة،'), (12.91, 13.84, 'ويدخل قبل التأكيد،'), (14.77, 16.03, 'يضرب الستوب،')],
 'l5': [(16.65, 18.10, 'ويدخل بلوت أكبر'), (18.72, 19.53, 'علشان يعوّض.')],
 'l6': [(20.14, 21.90, 'وبعد 3 أو 4 خسارات،'), (21.95, 24.89, 'يقرر يغيّر استراتيجيته بالكامل.')],
 'l7': [(25.48, 27.16, 'وهنا تبدأ المشكلة الحقيقية.')],
 'l8': [(27.80, 28.45, 'خلني أقولك شي:'), (29.14, 31.89, 'الاستراتيجية بروحها ما راح تخليك متداول ناجح.')],
 'l9': [(32.52, 34.09, 'لازم تعرف متى تدخل،'), (34.52, 35.07, 'ومتى تطلع،'), (35.76, 37.55, 'والأهم… متى توقف التداول.')],
 'l10': [(38.38, 39.48, 'راجع صفقاتك،'), (40.04, 41.38, 'التزم بإدارة المخاطر،'), (41.85, 45.08, 'ولا تخلي خسارة وحدة تتحكم بقراراتك.')],
 'l11': [(45.86, 47.59, 'إذا قاعد تعاني من خسارات متتالية،'), (48.06, 50.33, 'مو شرط تحتاج استراتيجية جديدة،'), (50.88, 52.91, 'يمكن تحتاج أحد يراجع تداولك معك.')],
 'l12': [(53.31, 55.57, 'اكتب كلمة استشارة'), (56.23, 57.06, 'وراح أوفّر لك'), (57.75, 60.18, 'استشارة مجانية مدتها ساعة كاملة.')],
}
SC = [('s1', 0, 4.05, None, ['l1']),
      ('s2', 4.05, 16.35, {'type': 'zoom', 'dur': .5}, ['l2', 'l3', 'l4']),
      ('s3', 16.35, 25.3, {'type': 'glitch', 'dur': .45}, ['l5', 'l6']),
      ('s4', 25.3, 32.2, {'type': 'flash', 'dur': .4}, ['l7', 'l8']),
      ('s5', 32.2, 38.0, {'type': 'push', 'dur': .6, 'dir': 'up', 'ease': 'expoInOut'}, ['l9']),
      ('s6', 38.0, 45.6, {'type': 'wipe', 'dur': .6, 'dir': 'rtl', 'ease': 'expoInOut'}, ['l10']),
      ('s7', 45.6, 53.1, {'type': 'zoom', 'dur': .5}, ['l11']),
      ('s8', 53.1, 60.45, {'type': 'push', 'dur': .6, 'dir': 'up', 'ease': 'expoInOut'}, ['l12']),
      ('s9', 60.45, 64.6, {'type': 'dip', 'dur': .7, 'color': '#00051A'}, [])]
DUR = SC[-1][2]

def words(s, e, text):
    ws = text.split(); wt = [len(re.sub(r'\W', '', w)) + 2 for w in ws]; k = (e - s) / sum(wt); t = s; out = []
    for w, a in zip(ws, wt): d = a * k; out.append({'w': w, 's': round(t, 3), 'e': round(t + d * .94, 3)}); t += d
    return out
vo, subs = [], []
for lid, segs in SEG.items():
    ws = []
    for s, e, txt in segs:
        w = words(s, e, txt); ws += w; subs.append({'s': s, 'e': e, 'line': lid, 'words': w})
    vo.append({'id': lid, 'text': ' '.join(x[2] for x in segs), 'start': segs[0][0], 'end': segs[-1][1], 'dur': round(segs[-1][1] - segs[0][0], 3), 'words': ws})
open('scenes/subs.js', 'w').write('export const SUBS = ' + json.dumps(subs, ensure_ascii=False) + ';\n')

pal = {'bg': '#00051A', 'card': 'rgba(0,5,26,.82)', 'ink': '#FCFCFC', 'acc': '#57A1EF', 'acc2': '#3977D5', 'hi': '#93F9FF', 'mut': '#A9B6D3', 'clay': '#3977D5'}
scenes = [{'id': i, 'file': f'scenes/{i}.js', 'lines': ln, **({'transition': tr} if tr else {})} for i, a, b, tr, ln in SC]
scenes.append({'id': 'subs', 'file': 'scenes/subs-overlay.js', 'lines': []})
json.dump({'name': 'EMULLAX — Losses & Consultation', 'fps': FPS, 'width': 1080, 'height': 1920, 'bpm': BPM, 'palette': pal,
           'fonts': {'display': 'Tajawal', 'body': 'Tajawal', 'num': 'Inter'}, 'images': {'logo': 'assets/logo.png'},
           'extraFonts': [{'family': 'Michroma', 'file': 'assets/michroma.woff2', 'weight': '400'}],
           'post': {'grain': .03, 'vignette': .28}, 'scenes': scenes},
          open('project.json', 'w'), ensure_ascii=False, indent=1)
spb = 60 / BPM; beats = [round(i * spb, 3) for i in range(int(DUR / spb) + 2)]
json.dump({'fps': FPS, 'width': 1080, 'height': 1920, 'duration': DUR, 'bpm': BPM, 'beatsPerBar': 4, 'beatOffset': 0, 'beats': beats, 'bars': beats[::4],
           'sections': [{'name': 'main', 'start': 0, 'end': DUR}],
           'scenes': [{'id': i, 'file': f'scenes/{i}.js', 'start': a, 'end': b, 'lines': ln, 'transition': tr} for i, a, b, tr, ln in SC]
                     + [{'id': 'subs', 'file': 'scenes/subs-overlay.js', 'start': 0, 'end': DUR, 'lines': [], 'transition': None}],
           'vo': vo}, open('timeline.json', 'w'), ensure_ascii=False, indent=1)
print('duration', DUR)
