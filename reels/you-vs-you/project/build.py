import json
SC = [('s1', 0, 3.75, None), ('s2', 3.75, 9.15, {'type': 'crossfade', 'dur': .5}), ('s3', 9.15, 19.1, {'type': 'zoom', 'dur': .4}),
      ('s4', 19.1, 21.05, {'type': 'flash', 'dur': .3}), ('s5', 21.05, 29.4, {'type': 'wipe', 'dur': .5, 'dir': 'rtl', 'ease': 'expoInOut'}),
      ('s6', 29.4, 37.0, {'type': 'wipe', 'dur': .5, 'dir': 'ltr', 'ease': 'expoInOut'}), ('s7', 37.0, 46.5, {'type': 'zoom', 'dur': .4}),
      ('s8', 46.5, 50.7, {'type': 'push', 'dur': .5, 'dir': 'up', 'ease': 'expoInOut'}), ('s9', 50.7, 59.65, {'type': 'glitch', 'dur': .35}),
      ('s10', 59.65, 67.6, {'type': 'push', 'dur': .5, 'dir': 'up', 'ease': 'expoInOut'})]
DUR = 67.6
pal = {'bg': '#050608', 'ink': '#FCFCFC', 'acc': '#57A1EF', 'clay': '#3977D5', 'hi': '#93F9FF', 'mut': '#8C94A8'}
json.dump({'name': 'You vs You', 'fps': 30, 'width': 1080, 'height': 1920, 'bpm': 90, 'palette': pal, 'fonts': {'display': 'Tajawal', 'body': 'Tajawal', 'num': 'Inter'},
  'images': {'logo': 'assets/logo.png'}, 'extraFonts': [{'family': 'Michroma', 'file': 'assets/michroma.woff2', 'weight': '400'}], 'post': {'grain': .035, 'vignette': .35},
  'scenes': [{'id': i, 'file': f'scenes/{i}.js', **({'transition': tr} if tr else {})} for i, a, b, tr in SC] + [{'id': 'subs', 'file': 'scenes/subs-overlay.js'}]}, open('project.json', 'w'), indent=1)
json.dump({'fps': 30, 'width': 1080, 'height': 1920, 'duration': DUR, 'bpm': 90, 'beatsPerBar': 4, 'beatOffset': 0, 'beats': [round(i * 2 / 3, 3) for i in range(110)],
  'sections': [{'name': 'main', 'start': 0, 'end': DUR}], 'scenes': [{'id': i, 'file': f'scenes/{i}.js', 'start': a, 'end': b, 'lines': [], 'transition': tr} for i, a, b, tr in SC]
  + [{'id': 'subs', 'file': 'scenes/subs-overlay.js', 'start': 0, 'end': DUR, 'lines': [], 'transition': None}], 'vo': []}, open('timeline.json', 'w'), indent=1)
