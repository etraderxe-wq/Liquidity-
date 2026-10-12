import json, re
tl = json.load(open('timeline.json')); vo = {v['id']: v['words'] for v in tl['vo']}
def w(line, pat): return next(x['s'] for x in vo[line] if re.match(pat, x['w']))
fx = [{"type": "pop", "at": 0.08, "gain": .55},
      {"type": "reverse-whoosh", "at": 2.45, "gain": .55}, {"type": "impact", "at": 2.45, "gain": .85},
      {"type": "shimmer", "at": w('l2', 'حتى'), "gain": .4},
      {"type": "impact", "at": w('l3', 'حدد') - .15 + 1.4, "gain": .6},
      {"type": "shimmer", "at": 23 + .95 + 27 * .19 + .2, "gain": .4},
      {"type": "glitch", "at": w('l5', 'باللوم') + .3 + .15, "gain": .5},
      {"type": "pop", "at": w('l5', 'وابدأ') - .25 + .35, "gain": .6},
      {"type": "tick", "at": w('l5', 'وابدأ') - .25 + 1.35, "gain": .5},
      {"type": "slide", "at": w('l6', 'إذا') - .3, "gain": .5},
      {"type": "tick", "at": 53.8, "gain": .45},
      {"type": "shimmer", "at": 57.6, "gain": .5}]
fx += [{"type": "tick", "at": 5 + .9 + i * .85 + .5, "gain": .28} for i in range(4)]
fx += [{"type": "swoosh-pass", "at": f"scene:s{i}", "gain": .55} for i in range(2, 9)]
json.dump(fx, open('sfx.json', 'w'), indent=1); print(len(fx), 'sfx')
