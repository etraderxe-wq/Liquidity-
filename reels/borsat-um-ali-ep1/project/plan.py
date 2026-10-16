# Timeline for «بورصة أم علي — الحلقة 1». Line starts are placed from the voice durations (vo/voices.json).
import json, sys
sys.path.insert(0, '.'); from dialogue import LINES
V = json.load(open('vo/voices.json')); SUB = {l[0]: l[2] for l in LINES}
START = {'h1': .7, 'h2': None, 'b1': None, 'h3': None, 'b2': None, 'h4': None, 'b3': None,
         's1': 25.6, 'b4': None, 's2': None, 'b5': None,
         's3': 44.8, 'b6': None, 's4': None, 'b7': None,
         'h5': 59.6, 'b8': None, 's5': None, 'b9': None}
GAP = {'h2': 1.7, 'b1': .3, 'h3': .3, 'b2': .25, 'h4': .2, 'b3': .35, 'b4': .3, 's2': .3, 'b5': .35, 'b6': .3, 's4': .3, 'b7': .3, 'b8': .3, 's5': .25, 'b9': .45}
out, prev = [], None
for lid, who, sub, say in LINES:
    s = START[lid] if START[lid] is not None else round(prev + GAP.get(lid, .3), 2)
    e = round(s + V[lid]['dur'], 3); out.append({'id': lid, 'who': who, 's': s, 'e': e, 'sub': sub, 'env': V[lid]['env']}); prev = e
T = {l['id']: l for l in out}
SC = [('s1', 0, 25.3, None), ('s2', 25.3, 44.5, {'type': 'push', 'dur': .6, 'dir': 'up', 'ease': 'expoInOut'}),
      ('s3', 44.5, 59.3, {'type': 'zoom', 'dur': .5}), ('s4', 59.3, T['b9']['e'] + 3.0, {'type': 'wipe', 'dur': .6, 'dir': 'rtl', 'ease': 'expoInOut'})]
endS = SC[-1][2]; SC.append(('s5', endS, endS + 11.5, {'type': 'dip', 'dur': .8, 'color': '#000000'}))
DUR = round(SC[-1][2], 2)
for a in SC: print(a[0], a[1], round(a[2], 2))
for l in out: print(l['id'], l['s'], l['e'])
open('scenes/data.js', 'w').write('export const LINES = ' + json.dumps(out, ensure_ascii=False) + ';\nexport const T = Object.fromEntries(LINES.map(l => [l.id, l]));\n'
  + 'export const SCN = ' + json.dumps({a[0]: [a[1], round(a[2], 3)] for a in SC}) + ';\n')
pal = {'bg': '#00051A', 'card': 'rgba(0,5,26,.82)', 'ink': '#FCFCFC', 'acc': '#57A1EF', 'acc2': '#3977D5', 'hi': '#93F9FF', 'mut': '#A9B6D3', 'clay': '#3977D5'}
scenes = [{'id': i, 'file': f'scenes/{i}.js', **({'transition': tr} if tr else {})} for i, a, b, tr in SC] + [{'id': 'subs', 'file': 'scenes/subs-overlay.js'}]
json.dump({'name': 'Borsat Um Ali — EP1', 'fps': 30, 'width': 1080, 'height': 1920, 'bpm': 100, 'palette': pal,
  'fonts': {'display': 'Tajawal', 'body': 'Tajawal', 'num': 'Inter'}, 'images': {'logo': 'assets/logo.png'},
  'extraFonts': [{'family': 'Michroma', 'file': 'assets/michroma.woff2', 'weight': '400'}], 'post': {'grain': .025, 'vignette': .3}, 'scenes': scenes},
  open('project.json', 'w'), ensure_ascii=False, indent=1)
json.dump({'fps': 30, 'width': 1080, 'height': 1920, 'duration': DUR, 'bpm': 100, 'beatsPerBar': 4, 'beatOffset': 0, 'beats': [round(i * .6, 3) for i in range(int(DUR / .6) + 2)],
  'sections': [{'name': 'main', 'start': 0, 'end': DUR}],
  'scenes': [{'id': i, 'file': f'scenes/{i}.js', 'start': a, 'end': round(b, 3), 'lines': [], 'transition': tr} for i, a, b, tr in SC] + [{'id': 'subs', 'file': 'scenes/subs-overlay.js', 'start': 0, 'end': DUR, 'lines': [], 'transition': None}],
  'vo': []}, open('timeline.json', 'w'), ensure_ascii=False, indent=1)
json.dump({'duration': DUR, 'lines': [{k: l[k] for k in ('id', 'who', 's', 'e')} for l in out]}, open('vo/placement.json', 'w'))
print('DUR', DUR)
