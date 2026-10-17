# «YOU VS YOU» — motivational reel on the original audio. Text = whisper transcript (punctuation fixed only), timed per speech chunk
# (chunks cut at measured energy dips; sentences inside a chunk split by letter count).
import json, re
CH = [  # (start, end, [(en, ar), ...])
 (0.10, 1.13, [('They know your fears.', 'يعرف مخاوفك.')]),
 (3.80, 9.15, [("Every morning when you wake up, there's one person waiting to challenge you.", 'كل يوم الصبح أول ما تقعد من النوم، فيه شخص واحد ينطرك علشان يتحداك.')]),
 (9.15, 12.06, [('They know your fears, your excuses,', 'يعرف مخاوفك، وأعذارك،')]),
 (12.06, 16.38, [('and your untapped potential.', 'وقدراتك اللي للحين ما استغليتها.'), ("That person isn't your coworker,", 'هالشخص مو زميلك بالدوام،')]),
 (16.38, 21.08, [('your neighbor, or a stranger.', 'ولا جارك، ولا واحد غريب.'), ('That person is you.', 'هالشخص… هو إنت.')]),
 (21.08, 25.03, [('On one side stands the version of you who takes the easy way out.', 'من جهة، واقفة النسخة منك اللي تختار الطريق الأسهل.')]),
 (25.03, 29.41, [('The one who procrastinates, doubts, and hides from discomfort.', 'اللي تأجّل، وتشك، وتهرب من أي شي يتعبها.')]),
 (29.41, 33.08, [('On the other side stands the version of you who is relentless,', 'ومن الجهة الثانية، واقفة النسخة منك اللي ما توقف،')]),
 (33.08, 37.02, [('unstoppable, and capable of achieving greatness.', 'اللي محد يقدر يوقفها، وتقدر توصل لأشياء عظيمة.')]),
 (37.02, 41.14, [('The question is, which version of you will win today?', 'السؤال: أي نسخة منك راح تفوز اليوم؟')]),
 (41.14, 46.54, [("This is the most important battle you'll ever face.", 'هذي أهم معركة راح تواجهها بحياتك.'), ('You versus you.', 'إنت ضد إنت.')]),
 (46.54, 50.71, [("It's a battle that shapes your happiness, success, and legacy.", 'معركة تحدد سعادتك، ونجاحك، والأثر اللي راح تخليه وراك.')]),
 (50.71, 55.10, [("Let's get one thing straight.", 'خلنا نوضّح شي واحد:'), ('No one owes you anything.', 'محد مديون لك بشي.')]),
 (55.10, 59.69, [("Life doesn't owe you success.", 'الحياة مو مديونة لك بالنجاح.'), ('No one is going to hand you your dreams.', 'ومحد راح يسلّمك أحلامك بإيدك.')]),
 (59.69, 65.40, [("There's no magical shortcut.", 'ما فيه طريق مختصر سحري.'), ('No lucky break waiting just around the corner.', 'ولا فيه ضربة حظ تنطرك ورا الزاوية.'), ("It's all on you.", 'كل شي عليك إنت.')]),
]
SEG = []
for s, e, items in CH:
    w = [len(re.sub(r'\W', '', en)) + 6 for en, _ in items]; k = (e - s) / sum(w); t = s
    for (en, ar), ww in zip(items, w):
        d = ww * k; SEG.append({'s': round(t, 2), 'e': round(t + d - .05, 2), 'en': en, 'ar': ar}); t += d
for x in SEG:
    if x['en'] == 'You versus you.': x['s'] = 44.75
    if x['en'].startswith('This is the most'): x['e'] = 44.7
if __name__ == '__main__':
    for x in SEG: print(x['s'], x['e'], x['en'])
    json.dump(SEG, open('segments.json', 'w'), ensure_ascii=False, indent=1)
    open('scenes/subs.js', 'w').write('export const SEG = ' + json.dumps(SEG, ensure_ascii=False) + ';\n')
    def ts(x): return f"00:{int(x // 60):02d}:{int(x % 60):02d},{int(round((x % 1) * 1000)):03d}"
    for lang in ('ar', 'en'):
        open(f'../you-vs-you-{lang}.srt', 'w').write('\n'.join(f"{i}\n{ts(x['s'])} --> {ts(x['e'] + .15)}\n{x[lang]}\n" for i, x in enumerate(SEG, 1)))
