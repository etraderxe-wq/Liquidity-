# Builds src/data/questions/scenarios.json — 10 practical chart questions. Every chart is checked against the concept it shows.
import json
O = lambda s: [{"id": k, "text": v} for k, v in s]
Q = []
def q(**k):
    k.setdefault("section", "scenarios"); k.setdefault("points", {"easy": 1, "medium": 2, "hard": 3, "expert": 4}[k["difficulty"]]); Q.append(k)
def fvg_bull(c, i): return c[i - 1][1] < c[i + 1][2]

# SC-01 equal highs approached
c = [[50,52,49,51.5],[51.5,55,51,54.6],[54.6,60,54.2,59.4],[59.4,60.02,56,56.6],[56.6,57,53.5,54],[54,57.5,53.6,57.1],[57.1,59.98,56.8,57.5],[57.5,58,54.4,55],
     [55,56,52.6,53.2],[53.2,55.5,52.9,55.2],[55.2,57.6,55,57.3],[57.3,59,57,58.7]]
assert abs(c[2][1] - c[6][1]) < .1 and max(x[1] for x in c[7:]) < 60
q(id="SC-01", type="chart", difficulty="medium", skills=["practical", "liquidity", "chart", "decision"], concept="Equal Highs as BSL",
  question="السعر يقترب من قمتين متساويتين تقريباً (Equal Highs). ما القراءة الأفضل لهذا السياق؟",
  options=O([("a", "القمم المتساوية مقاومة قوية؛ أبيع الحين قبل ما يوصل لها."), ("b", "فوق القمم المتساوية سيولة شراء (BSL) غالباً ما تكون هدفاً للسعر؛ أراقب ردة الفعل بعد أخذها قبل أي قرار."),
             ("c", "اختراق القمم يعني بداية ترند صاعد مؤكد؛ أشتري مع الاختراق مباشرة."), ("d", "القمم المتساوية ما لها أي أهمية في ICT.")]),
  answer="b", partial={"a": 0.2},
  explanation="القمم المتساوية تجمع أوامر وقف البائعين وأوامر الشراء المعلقة فوقها (BSL)، فهي Draw on Liquidity محتمل. القرار يُبنى على ردة الفعل بعد السحب (رفض/MSS أو استمرار بإغلاق قوي)، مو على افتراض أنها مقاومة أو اختراق مؤكد.",
  chart={"tf": "M15", "candles": c, "levels": [{"price": 60.01, "label": "EQH · BSL", "kind": "bsl"}], "labels": [{"i": 2, "price": 60.4, "text": "H1"}, {"i": 6, "price": 60.4, "text": "H2"}]})

# SC-02 SSL sweep + bullish displacement → where to look for entry (clickable)
c = [[60,60.5,57,57.4],[57.4,58,55,55.4],[55.4,56,52.2,52.6],[52.6,54.6,52.4,54.2],[54.2,54.5,51.6,52],[52,52.4,50,50.4],[50.4,51,48.8,50.6],
     [50.6,51.2,50.2,50.9],[50.9,57.4,50.7,57],[57,59.2,53.4,58.8],[58.8,59.4,57.6,58.2]]
SSL = 50.0; assert c[6][2] < SSL < c[6][3] and fvg_bull(c, 8)
fl, fh = c[7][1], c[9][2]
q(id="SC-02", type="chart", difficulty="hard", skills=["practical", "fvg_ob", "liquidity", "chart", "decision"], concept="Entry after SSL sweep + displacement",
  question="السعر سحب SSL ثم ظهر Bullish Displacement. اضغط على المنطقة الأنسب للبحث عن دخول شراء.",
  options=O([("a", "منطقة الـ FVG اللي خلّفها الاندفاع"), ("b", "قمة شمعة الاندفاع (مطاردة السعر)"), ("c", "تحت ذيل السحب"), ("d", "القمة القديمة فوق")]),
  answer="a", partial={"c": 0.3},
  explanation="بعد سحب SSL والاندفاع الصاعد، أفضل منطقة للبحث عن دخول هي الـ FVG اللي تركها الاندفاع (Discount نسبةً للحركة) مع وقف تحت قاع السحب. مطاردة قمة الشمعة تعطي R:R ضعيف، وتحت الذيل هي منطقة الوقف مو الدخول.",
  chart={"tf": "M5", "candles": c, "levels": [{"price": SSL, "label": "SSL", "kind": "ssl"}], "zones": [{"from": fl, "to": fh, "i0": 7, "label": "FVG", "kind": "fvg"}],
         "targets": [{"id": "a", "i0": 7, "i1": 10, "from": fl, "to": fh, "label": "FVG"}, {"id": "b", "i0": 8, "i1": 9, "from": 57.2, "to": 59.4, "label": "Top"},
                     {"id": "c", "i0": 5, "i1": 7, "from": 47.8, "to": 49.4, "label": "Below wick"}, {"id": "d", "i0": 0, "i1": 2, "from": 59.6, "to": 61, "label": "Old high"}]})

# SC-03 premium + bearish MSS
c = [[40,44,39.6,43.6],[43.6,48,43.2,47.6],[47.6,52,47.2,51.6],[51.6,56,51.2,55.4],[55.4,57,53,53.6],[53.6,58,53.2,57.6],[57.6,60.6,57.2,58.2],
     [58.2,58.6,52.4,52.8],[52.8,55.2,52.4,54.8],[54.8,55,52.6,53]]
lo, hi = 39.6, 60.6; eq = (lo + hi) / 2; assert c[6][1] > c[3][1] and c[7][3] < c[4][2] and c[7][2] > eq
q(id="SC-03", type="chart", difficulty="hard", skills=["practical", "premium", "structure", "chart", "decision"], concept="Premium + bearish MSS",
  question="السعر داخل منطقة Premium من النطاق، سحب القمة السابقة ثم أغلق بقوة تحت آخر Swing Low (Bearish MSS). ما القرار الأفضل؟",
  options=O([("a", "أشتري لأن الترند الأكبر صاعد."), ("b", "أبحث عن بيع عند رجوع السعر لـ FVG/OB هابط داخل الـ Premium، مع وقف فوق قمة السحب وهدف أولي عند Equilibrium/سيولة تحت."),
             ("c", "أبيع فوراً بالسعر الحالي بدون انتظار أي رجوع."), ("d", "أتجاهل الإشارة لأن MSS ما له علاقة بالـ Premium.")]),
  answer="b", partial={"c": 0.3},
  explanation="اجتماع سحب السيولة فوق القمة + Bearish MSS + وجود السعر في Premium سياق قوي للبحث عن بيع، والدخول الأفضل عند الرجوع لمنطقة POI هابطة مع وقف منطقي. البيع الفوري ممكن لكنه يعطي سعراً أسوأ ووقفاً أبعد.",
  chart={"tf": "M15", "candles": c, "zones": [{"from": eq, "to": hi, "i0": 0, "label": "PREMIUM", "kind": "premium"}, {"from": lo, "to": eq, "i0": 0, "label": "DISCOUNT", "kind": "discount"}],
         "levels": [{"price": eq, "label": "EQ 50%", "kind": "eq"}], "labels": [{"i": 6, "price": 61.2, "text": "sweep"}, {"i": 7, "price": 51.8, "text": "MSS"}]})

# SC-04 sweep without displacement
c = [[56,56.5,53,53.4],[53.4,54,50.2,50.6],[50.6,52.8,50.4,52.4],[52.4,53,51.2,51.6],[51.6,52,50.6,51],[51,51.4,49.4,50.9],[50.9,51.5,50.5,51.2],[51.2,51.6,50.6,50.8],[50.8,51.3,50.3,51.1]]
assert c[5][2] < 50.2 < c[5][3] and max(abs(x[3] - x[0]) for x in c[5:]) < 1
q(id="SC-04", type="chart", difficulty="medium", skills=["practical", "liquidity", "structure", "chart", "decision"], concept="Sweep without displacement",
  question="حصل Liquidity Sweep تحت القاع، لكن الشموع بعده صغيرة ومترددة ولا يوجد Displacement ولا كسر هيكل. هل تدخل شراء الحين؟",
  options=O([("a", "نعم، السحب وحده إشارة دخول كافية."), ("b", "لا؛ أنتظر Displacement وMSS/CISD يأكد أن السحب أدى لتغيير في التسليم، وإلا قد يكمل السعر نزولاً."),
             ("c", "أبيع لأن السعر كسر القاع."), ("d", "أدخل بلوت كبير لأن الوقف قريب.")]),
  answer="b",
  explanation="السحب بدون اندفاع ولا كسر هيكل ما يثبت أن المشترين سيطروا؛ ممكن يكون مجرد توقف قبل استمرار الهبوط. التأكيد يجي من Displacement وكسر هيكل. البيع لأن السعر 'كسر' القاع خطأ لأن الكسر كان بذيل وأغلق فوقه.",
  chart={"tf": "M5", "candles": c, "levels": [{"price": 50.2, "label": "SSL", "kind": "ssl"}], "labels": [{"i": 5, "price": 49, "text": "sweep"}]})

# SC-05 LTF FVG against HTF bias
c = [[48,48.4,45.6,46],[46,46.4,44,44.3],[44.3,44.6,42.6,43],[43,46.6,42.8,46.2],[46.2,48.6,45.6,48.2],[48.2,48.6,46.6,47]]
assert fvg_bull(c, 3)
q(id="SC-05", type="chart", difficulty="expert", skills=["practical", "mtf", "fvg_ob", "decision"], concept="LTF FVG vs HTF bias",
  question="على الـ M5 ظهر Bullish FVG بعد ارتداد، لكن الـ Daily Bias هابط والسعر في Premium اليومي ويتجه لسيولة SSL يومية. كيف تتصرف؟",
  options=O([("a", "أشتري من الـ FVG بنفس حجم المخاطرة المعتاد لأن الإشارة واضحة على الـ M5."), ("b", "أعتبره غالباً ارتداد داخلي ضد الاتجاه؛ أتجنب الشراء وأنتظر فرصة بيع تتوافق مع الـ HTF (مثلاً Bearish FVG/OB في Premium)."),
             ("c", "إذا تداولته فكسكالب قصير لأقرب سيولة وبمخاطرة مخفضة، مع وعي أنه ضد التحيز."), ("d", "أعكس التحيز اليومي إلى صاعد بسبب FVG واحد.")]),
  answer="b", partial={"c": 0.5},
  explanation="الإطار الأعلى يحدد الاتجاه والهدف؛ FVG على الإطار الصغير ضد التحيز اليومي احتماله أقل وغالباً يكون رجوعاً داخلياً. التداول ضده ممكن للمتمرس بسكالب مخفض المخاطرة، لكن الأفضل انتظار التوافق. تغيير التحيز اليومي بسبب FVG على M5 خطأ منهجي.",
  chart={"tf": "M5", "title": "LTF view · Daily bias: bearish", "candles": c, "zones": [{"from": c[2][1], "to": c[4][2], "i0": 2, "label": "Bullish FVG (M5)", "kind": "fvg"}]})

# SC-06 sweep then CISD — entry / stop / target
c = [[60,60.6,57.4,57.8],[57.8,58.2,55.6,56],[56,56.4,53.4,53.8],[53.8,55.6,53.6,55.2],[55.2,55.4,52.2,52.6],[52.6,53,50.2,50.6],[50.6,51.4,48.6,51.2],[51.2,54.8,51,54.4],[54.4,56.4,53.2,56],[56,56.8,54.6,55.2]]
open_series = c[4][0]; assert c[6][2] < 50.2 < c[6][3] and c[7][3] < open_series < c[8][3]
q(id="SC-06", type="chart", difficulty="expert", skills=["practical", "advanced", "risk", "chart", "decision"], concept="Sweep + CISD trade plan",
  question="السعر سحب SSL ثم أغلق فوق افتتاح سلسلة الشموع الهابطة اللي وصّلته (CISD). أي خطة هي الأنسب؟",
  options=O([("a", "دخول عند رجوع السعر لمنطقة الـ CISD/الفجوة، وقف تحت قاع السحب، الهدف سيولة القمم فوق (BSL)."), ("b", "دخول فوري عند أعلى شمعة، وقف تحت آخر شمعة مباشرة، الهدف مفتوح."),
             ("c", "دخول بيع لأن الترند هابط، وقف فوق القمة، الهدف قاع جديد."), ("d", "دخول شراء تحت قاع السحب لأن السعر 'رخيص' هناك.")]),
  answer="a", partial={"b": 0.25},
  explanation="الـ CISD بعد سحب السيولة يدل على تغير التسليم لصالح المشترين؛ الدخول الأفضل عند الرجوع للمنطقة اللي حصل فيها التغيير، الوقف تحت قاع السحب (اللي يُبطل الفكرة)، والهدف سيولة واضحة فوق. هذي خطة احتمالية وليست ضماناً.",
  chart={"tf": "M5", "candles": c, "levels": [{"price": 50.2, "label": "SSL", "kind": "ssl"}, {"price": open_series, "label": "CISD (series open)", "kind": "level"}, {"price": 60.6, "label": "BSL", "kind": "bsl"}]})

# SC-07 click the real BOS (body close) vs a wick through
c = [[40,43,39.6,42.6],[42.6,46,42.2,45.6],[45.6,46.6,43.6,44],[44,45,42.4,44.6],[44.6,47.4,44.2,45.8],[45.8,46.2,44,44.4],[44.4,48.6,44.2,48.2],[48.2,49,47.4,48.6]]
H = c[2][1]; assert c[4][1] > H and c[4][3] < H and c[6][3] > H
q(id="SC-07", type="chart", difficulty="medium", skills=["practical", "structure", "chart"], concept="BOS = body close beyond swing",
  question="اضغط على الشمعة اللي أكّدت Bullish BOS فعلياً فوق القمة المحددة.",
  options=O([("a", "الشمعة اللي خرجت بذيل فوق القمة وأغلقت تحتها"), ("b", "الشمعة اللي أغلقت جسمها فوق القمة"), ("c", "الشمعة اللي صنعت القمة نفسها"), ("d", "أول شمعة في الشارت")]),
  answer="b",
  explanation="كسر الهيكل يُعتمد بإغلاق الجسم فوق القمة؛ الشمعة اللي خرجت بذيل فقط وأغلقت تحت المستوى تُعتبر أخذ سيولة (Sweep) وليست BOS.",
  chart={"tf": "M15", "candles": c, "levels": [{"price": H, "label": "Swing High", "kind": "level"}],
         "targets": [{"id": "a", "i0": 4, "i1": 4, "from": 43.8, "to": 47.8, "label": "wick"}, {"id": "b", "i0": 6, "i1": 6, "from": 43.8, "to": 49, "label": "close"},
                     {"id": "c", "i0": 2, "i1": 2, "from": 43.2, "to": 47, "label": "high"}, {"id": "d", "i0": 0, "i1": 0, "from": 39.2, "to": 43.4, "label": "first"}]})

# SC-08 click the valid bullish OB
c = [[50,50.4,48.2,48.6],[48.6,49.2,47.4,48.8],[48.8,49,47.6,47.9],[47.9,48.2,46.4,46.8],[46.8,51.6,46.6,51.2],[51.2,54.4,50.8,54],[54,54.6,52.6,53]]
assert c[3][3] < c[3][0] and c[4][3] - c[4][0] > 3 and fvg_bull(c, 4) and c[4][3] > max(x[1] for x in c[:3])
q(id="SC-08", type="chart", difficulty="hard", skills=["practical", "fvg_ob", "chart"], concept="Valid bullish Order Block",
  question="أي شمعة تمثل Bullish Order Block صالح؟ اضغط عليها.",
  options=O([("a", "الشمعة الهابطة الأخيرة قبل الاندفاع الصاعد اللي كسر الهيكل وخلّف FVG"), ("b", "شمعة هابطة في وسط التذبذب قبلها"), ("c", "شمعة الاندفاع الصاعدة نفسها"), ("d", "آخر شمعة في الشارت")]),
  answer="a", partial={"b": 0.2},
  explanation="الـ Bullish OB هو آخر شمعة إغلاقها هابط قبل حركة اندفاعية صاعدة تكسر الهيكل وتترك عدم توازن (FVG). الشموع الهابطة داخل التذبذب بدون اندفاع بعدها ما تعتبر OB صالح.",
  chart={"tf": "M15", "candles": c,
         "targets": [{"id": "a", "i0": 3, "i1": 3, "from": 46, "to": 48.6, "label": "last down"}, {"id": "b", "i0": 2, "i1": 2, "from": 47.2, "to": 49.4, "label": "chop"},
                     {"id": "c", "i0": 4, "i1": 4, "from": 49, "to": 52, "label": "impulse"}, {"id": "d", "i0": 6, "i1": 6, "from": 52.2, "to": 55, "label": "last"}]})

# SC-09 draw on liquidity after bullish MSS (clickable)
c = [[62,62.4,58.6,59],[59,59.4,56,56.4],[56.4,58.6,56,58.2],[58.2,62.38,57.8,58.6],[58.6,59,54.4,54.8],[54.8,55,52.2,52.6],[52.6,53,50.6,51],[51,56.6,50.8,56.2],[56.2,59.2,55.8,58.9],[58.9,59.4,57.8,58.2]]
assert abs(c[0][1] - c[3][1]) < .05 and c[8][3] > c[5][1]
q(id="SC-09", type="chart", difficulty="hard", skills=["practical", "liquidity", "chart", "decision"], concept="Draw on Liquidity",
  question="بعد Bullish MSS، أين أوضح Draw on Liquidity كهدف أعلى للسعر؟ اضغط عليه.",
  options=O([("a", "القمم المتساوية فوق (BSL خارجية)"), ("b", "القاع اللي تم سحبه تحت"), ("c", "منتصف آخر شمعة"), ("d", "أعلى شمعة MSS مباشرة")]),
  answer="a", partial={"d": 0.3},
  explanation="الهدف المنطقي بعد تحول الهيكل الصاعد هو السيولة الخارجية الواضحة فوق، مثل القمم المتساوية (BSL). أعلى شمعة الـ MSS ممكن يكون هدفاً داخلياً قريباً لكنه ليس الـ Draw الأوضح.",
  chart={"tf": "M15", "candles": c, "levels": [{"price": 62.39, "label": "EQH", "kind": "bsl"}],
         "targets": [{"id": "a", "i0": 0, "i1": 9, "from": 61.9, "to": 63, "label": "EQH"}, {"id": "b", "i0": 5, "i1": 7, "from": 49.8, "to": 51.2, "label": "low"},
                     {"id": "c", "i0": 9, "i1": 9, "from": 57.9, "to": 58.5, "label": "mid"}, {"id": "d", "i0": 8, "i1": 8, "from": 59, "to": 59.8, "label": "MSS high"}]})

# SC-10 OTE on a dealing range (clickable)
c = [[40,40.6,38,38.4],[38.4,42,38.2,41.6],[41.6,46,41.2,45.6],[45.6,50,45.2,49.6],[49.6,52,49.2,51.6],[51.6,51.8,48,48.4],[48.4,48.8,45.4,45.8]]
L, Hh = 38.0, 52.0; r = lambda f: Hh - (Hh - L) * f
q(id="SC-10", type="chart", difficulty="medium", skills=["practical", "premium", "chart"], concept="OTE 62–79%",
  question="على النطاق من القاع 38 إلى القمة 52، اضغط على منطقة الـ OTE لشراء محتمل.",
  options=O([("a", "بين 62% و79% تصحيح (تقريباً 43.0–43.3 حتى 41.0)"), ("b", "فوق 50% (منطقة Premium)"), ("c", "عند القمة 52"), ("d", "تحت القاع 38")]),
  answer="a",
  explanation=f"الـ OTE هي منطقة تصحيح 62%–79% من النطاق: من {r(.62):.2f} إلى {r(.79):.2f} تقريباً، ومنتصفها المفضل 70.5% عند {r(.705):.2f}. الشراء فوق 50% يعني شراء في Premium.",
  chart={"tf": "M15", "candles": c, "levels": [{"price": r(.5), "label": "50%", "kind": "eq"}],
         "zones": [{"from": r(.79), "to": r(.62), "i0": 4, "label": "OTE 62–79%", "kind": "poi"}],
         "targets": [{"id": "a", "i0": 5, "i1": 9, "from": r(.79), "to": r(.62), "label": "OTE"}, {"id": "b", "i0": 5, "i1": 9, "from": r(.5), "to": 50.5, "label": "premium"},
                     {"id": "c", "i0": 4, "i1": 4, "from": 51, "to": 52.6, "label": "high"}, {"id": "d", "i0": 0, "i1": 1, "from": 36.6, "to": 37.8, "label": "below"}]})
json.dump(Q, open("src/data/questions/scenarios.json", "w"), ensure_ascii=False, indent=1)
print(len(Q))
