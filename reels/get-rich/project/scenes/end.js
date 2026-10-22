// 1 s cinematic logo fade
MOTION.scene({ id: 'end', draw(t, lt, ctx) { const { X, at } = ctx; X.fillStyle = '#030406'; X.fillRect(0, 0, 1080, 1920);
  const k = at(lt, 0, .45, 'sineOut') * (1 - at(lt, .8, 1.0)), img = ctx.img('logo'), w = 470, h = w * img.height / img.width, s = 1.04 - .04 * at(lt, 0, 1);
  const g = X.createRadialGradient(540, 960, 0, 540, 960, 520); g.addColorStop(0, `rgba(57,119,213,${.35 * k})`); g.addColorStop(1, 'rgba(57,119,213,0)'); X.fillStyle = g; X.fillRect(0, 0, 1080, 1920);
  X.save(); X.globalAlpha = k; X.translate(540, 960); X.scale(s, s); X.filter = `blur(${(1 - k) * 8}px)`; X.drawImage(img, -w / 2, -h / 2, w, h); X.restore(); } });
