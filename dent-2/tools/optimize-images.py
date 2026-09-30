#!/usr/bin/env python3
"""
Готовит фото для сайта: обрезает под нужные пропорции и сохраняет
две версии WebP — name-640.webp (телефоны) и name-1024.webp (ПК).

Установка (один раз):   pip install pillow
Использование:
    python3 tools/optimize-images.py фото.jpg assets/img/svc-engine
    python3 tools/optimize-images.py фото.jpg assets/img/hero-repair --ratio 4:3
    python3 tools/optimize-images.py фото.jpg assets/img/workshop --ratio 16:9

После этого в config.js укажите путь без размера и расширения:
    image: "assets/img/svc-engine"
"""
import argparse
from PIL import Image, ImageOps

ap = argparse.ArgumentParser()
ap.add_argument("src")
ap.add_argument("dest", help="путь без расширения, напр. assets/img/svc-engine")
ap.add_argument("--ratio", default="4:3", help="пропорции: 4:3, 3:2, 16:9, 1:1 или none")
ap.add_argument("--focus", type=float, default=0.5, help="куда смещать кадр при обрезке: 0 — верх/лево, 1 — низ/право")
a = ap.parse_args()

im = ImageOps.exif_transpose(Image.open(a.src)).convert("RGB")
if a.ratio != "none":
    rw, rh = map(float, a.ratio.split(":")); r = rw / rh
    w, h = im.size
    if w / h > r:
        nw = int(h * r); x = int((w - nw) * a.focus); im = im.crop((x, 0, x + nw, h))
    else:
        nh = int(w / r); y = int((h - nh) * a.focus); im = im.crop((0, y, w, y + nh))
for width, q in ((640, 72), (1024, 66)):
    out = im if im.width <= width else im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    out.save(f"{a.dest}-{width}.webp", "WEBP", quality=q, method=6)
    print("saved", f"{a.dest}-{width}.webp", out.size)
