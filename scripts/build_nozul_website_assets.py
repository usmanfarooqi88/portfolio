#!/usr/bin/env python3
"""Build Nozul Hotels Website case-study WebP assets from Figma PNG exports."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public/images/case-studies/nozul-hotels-website/_src"
OUT = ROOT / "public/images/case-studies/nozul-hotels-website"
QUALITY = 82

BG = (11, 11, 12)  # #0B0B0C
TEXT = (235, 235, 240)
MUTED = (140, 140, 150)
ACCENT = (180, 160, 120)

# Figma node 720:xxxx exports (maxDimension 2048)
ASSETS = {
    "home": "https://www.figma.com/api/mcp/asset/4a5b6418-1713-4e56-b9c0-f0d50cf1235e.png",
    "menu": "https://www.figma.com/api/mcp/asset/7e1a8dd5-7739-4a16-94eb-650514e2a482.png",
    "restaurants": "https://www.figma.com/api/mcp/asset/16c57907-b147-449c-8e36-9251b334cc25.png",
    "restaurant_detail": "https://www.figma.com/api/mcp/asset/f2e0744e-1030-4b5c-8116-30b4168d68dd.png",
    "reservation_review": "https://www.figma.com/api/mcp/asset/12d02366-d1ed-46dc-930f-03af41880887.png",
    "reservation_payment": "https://www.figma.com/api/mcp/asset/caabe06d-b779-4e2c-95df-1a014ad20183.png",
    "reservation_confirmed": "https://www.figma.com/api/mcp/asset/0c7ca193-ff9c-4b77-bb33-a16d4be3c1bb.png",
    "events": "https://www.figma.com/api/mcp/asset/37445484-bd8d-4976-80bb-cd069a853cbf.png",
    "gallery": "https://www.figma.com/api/mcp/asset/0e46b1dd-f2a8-4d02-abec-a9ba570ef95d.png",
    "about": "https://www.figma.com/api/mcp/asset/29e131a9-3d6c-408b-97dd-a4f4f516a37d.png",
    "career": "https://www.figma.com/api/mcp/asset/503dd117-0f94-41db-81f9-4087eddb4a59.png",
    "contact": "https://www.figma.com/api/mcp/asset/ea65a6ac-e367-49a1-a7f3-9cb7eedc9922.png",
    "mission": "https://www.figma.com/api/mcp/asset/e35fd1bb-63fb-462c-8ce5-1a35a17067d5.png",
}

# Original Figma frame heights (px) for proportional cropping
ORIGINAL_HEIGHTS = {
    "home": 7693,
    "restaurants": 4955,
    "restaurant_detail": 4757,
    "events": 4202,
    "gallery": 4013,
    "about": 4621,
    "career": 5371,
    "mission": 3635,
}


def curl_download(url: str, dest: Path, retries: int = 3) -> None:
    for _ in range(retries):
        result = subprocess.run(
            ["curl", "-fsSL", "-o", str(dest), url],
            capture_output=True,
            text=True,
        )
        if result.returncode == 0 and dest.exists() and dest.stat().st_size > 1000:
            return
    raise RuntimeError(f"Failed to download {url} -> {dest}")


def load(name: str) -> Image.Image:
    path = SRC / f"{name}.png"
    if not path.exists() or path.stat().st_size < 1000:
        curl_download(ASSETS[name], path)
    return Image.open(path).convert("RGBA")


def save_webp(img: Image.Image, name: str) -> Path:
    OUT.mkdir(parents=True, exist_ok=True)
    out = OUT / name
    if img.mode == "RGBA":
        rgb = Image.new("RGB", img.size, BG)
        rgb.paste(img, mask=img.split()[3])
    else:
        rgb = img.convert("RGB")
    rgb.save(out, "WEBP", quality=QUALITY, method=6)
    return out


def crop_by_original_y(
    img: Image.Image,
    *,
    y_start: int,
    y_end: int,
    original_height: int,
) -> Image.Image:
    """Crop a tall Figma export using original-frame Y coordinates."""
    w, h = img.size
    top = round(y_start / original_height * h)
    bottom = round(y_end / original_height * h)
    top = max(0, min(top, h - 1))
    bottom = max(top + 1, min(bottom, h))
    return img.crop((0, top, w, bottom))


def resize_to_width(img: Image.Image, width: int) -> Image.Image:
    w, h = img.size
    if w == width:
        return img
    new_h = max(1, round(h * width / w))
    return img.resize((width, new_h), Image.Resampling.LANCZOS)


def resize_to_height(img: Image.Image, height: int) -> Image.Image:
    w, h = img.size
    if h == height:
        return img
    new_w = max(1, round(w * height / h))
    return img.resize((new_w, height), Image.Resampling.LANCZOS)


def add_shadow(img: Image.Image, *, pad: int = 32, blur: int = 18, offset: int = 8) -> Image.Image:
    """Place image on dark canvas with subtle drop shadow."""
    w, h = img.size
    canvas = Image.new("RGBA", (w + pad * 2, h + pad * 2), (*BG, 255))
    shadow = Image.new("RGBA", img.size, (0, 0, 0, 180))
    shadow = shadow.filter(ImageFilter.GaussianBlur(blur))
    canvas.paste(shadow, (pad + offset, pad + offset), shadow)
    canvas.paste(img, (pad, pad), img if img.mode == "RGBA" else None)
    return canvas


def desktop_panel(img: Image.Image, *, target_w: int = 1280) -> Image.Image:
    scaled = resize_to_width(img, target_w)
    return add_shadow(scaled.convert("RGBA"), pad=28)


def side_by_side_desktop(
    images: list[Image.Image],
    *,
    gap: int = 40,
    pad: int = 48,
    panel_w: int = 520,
) -> Image.Image:
    panels = [desktop_panel(img, target_w=panel_w) for img in images]
    total_w = pad * 2 + sum(p.size[0] for p in panels) + gap * (len(panels) - 1)
    max_h = max(p.size[1] for p in panels)
    canvas = Image.new("RGBA", (total_w, max_h + pad * 2), (*BG, 255))
    x = pad
    for panel in panels:
        y = pad + (max_h - panel.size[1]) // 2
        canvas.paste(panel, (x, y), panel)
        x += panel.size[0] + gap
    return canvas


def montage_desktop(
    images: list[Image.Image],
    *,
    cols: int,
    gap: int = 32,
    pad: int = 40,
    panel_w: int = 760,
) -> Image.Image:
    panels = [desktop_panel(img, target_w=panel_w) for img in images]
    rows = (len(panels) + cols - 1) // cols
    cell_w = max(p.size[0] for p in panels)
    cell_h = max(p.size[1] for p in panels)
    canvas_w = pad * 2 + cols * cell_w + gap * (cols - 1)
    canvas_h = pad * 2 + rows * cell_h + gap * (rows - 1)
    canvas = Image.new("RGBA", (canvas_w, canvas_h), (*BG, 255))
    for idx, panel in enumerate(panels):
        r, c = divmod(idx, cols)
        x = pad + c * (cell_w + gap) + (cell_w - panel.size[0]) // 2
        y = pad + r * (cell_h + gap) + (cell_h - panel.size[1]) // 2
        canvas.paste(panel, (x, y), panel)
    return canvas


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/Library/Fonts/Arial.ttf",
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()


def draw_product_structure() -> Image.Image:
    """Pillow diagram: Product structure (explanatory)."""
    width, height = 1680, 820
    canvas = Image.new("RGBA", (width, height), (*BG, 255))
    draw = ImageDraw.Draw(canvas)
    title_font = load_font(32, bold=True)
    section_font = load_font(22, bold=True)
    item_font = load_font(18)
    foot_font = load_font(15)

    draw.text((56, 40), "Product structure (explanatory)", fill=TEXT, font=title_font)

    sections = [
        ("DISCOVER", "Restaurants · Hotels · Offers · Events · Meetings"),
        ("EXPLORE", "Categories · Venue details · Gallery · About · Press"),
        ("ACT", "Make a Reservation · Contact · Sign In · Get the App"),
        ("SUPPORTING", "Careers · Terms · Privacy"),
    ]

    y = 120
    box_h = 110
    gap = 28
    for label, items in sections:
        rect = (56, y, width - 56, y + box_h)
        draw.rounded_rectangle(rect, radius=14, outline=ACCENT, width=2, fill=(20, 20, 24, 255))
        draw.text((80, y + 18), label, fill=ACCENT, font=section_font)
        draw.text((80, y + 56), items, fill=TEXT, font=item_font)
        y += box_h + gap

    footnote = (
        "Menu also labels Weddings & Loyalty — destination frames not verified in this prototype."
    )
    draw.text((56, height - 52), footnote, fill=MUTED, font=foot_font)

    return canvas


def main() -> int:
    SRC.mkdir(parents=True, exist_ok=True)
    OUT.mkdir(parents=True, exist_ok=True)

    print("Downloading Figma PNGs...")
    for name, url in ASSETS.items():
        dest = SRC / f"{name}.png"
        if not dest.exists() or dest.stat().st_size < 1000:
            print(f"  {name}")
            curl_download(url, dest)

    imgs = {name: load(name) for name in ASSETS}
    home_h = ORIGINAL_HEIGHTS["home"]

    # 1 hero.webp — top ~1090px of Home (hero/banner entry)
    hero_crop = crop_by_original_y(imgs["home"], y_start=0, y_end=1090, original_height=home_h)
    hero = add_shadow(resize_to_width(hero_crop, 1728), pad=36)
    save_webp(hero, "hero.webp")
    print("  hero.webp")

    # 2 home-discovery.webp — hero + amenity strip + brand/about OR restaurants
    discovery = crop_by_original_y(imgs["home"], y_start=0, y_end=3200, original_height=home_h)
    discovery = add_shadow(resize_to_width(discovery, 1600), pad=32)
    save_webp(discovery, "home-discovery.webp")
    print("  home-discovery.webp")

    # 3 home-services.webp — offers/packages + meetings & events mid-home
    services = crop_by_original_y(imgs["home"], y_start=3400, y_end=5800, original_height=home_h)
    services = add_shadow(resize_to_width(services, 1600), pad=32)
    save_webp(services, "home-services.webp")
    print("  home-services.webp")

    # 4 product-structure.webp — Pillow diagram
    diagram = draw_product_structure()
    save_webp(diagram, "product-structure.webp")
    print("  product-structure.webp")

    # 5 menu.webp — full Menu frame (1728×1090)
    menu = add_shadow(resize_to_width(imgs["menu"], 1600), pad=32)
    save_webp(menu, "menu.webp")
    print("  menu.webp")

    # 6 restaurants.webp — top ~1400px with category filters
    restaurants_crop = crop_by_original_y(
        imgs["restaurants"], y_start=0, y_end=1400, original_height=ORIGINAL_HEIGHTS["restaurants"]
    )
    restaurants = add_shadow(resize_to_width(restaurants_crop, 1600), pad=32)
    save_webp(restaurants, "restaurants.webp")
    print("  restaurants.webp")

    # 7 restaurant-detail.webp — top/mid crop with venue context + reserve CTAs
    detail_crop = crop_by_original_y(
        imgs["restaurant_detail"], y_start=0, y_end=2200, original_height=ORIGINAL_HEIGHTS["restaurant_detail"]
    )
    detail = add_shadow(resize_to_width(detail_crop, 1600), pad=32)
    save_webp(detail, "restaurant-detail.webp")
    print("  restaurant-detail.webp")

    # 8 reservation-flow.webp — 3599 + 3703 + 3816 side by side
    reservation = side_by_side_desktop(
        [
            crop_by_original_y(imgs["reservation_review"], y_start=0, y_end=1800, original_height=2442),
            crop_by_original_y(imgs["reservation_payment"], y_start=0, y_end=1900, original_height=2641),
            crop_by_original_y(imgs["reservation_confirmed"], y_start=0, y_end=1800, original_height=2481),
        ],
        panel_w=480,
    )
    save_webp(reservation, "reservation-flow.webp")
    print("  reservation-flow.webp")

    # 9 events.webp — Events page top/mid crop
    events_crop = crop_by_original_y(imgs["events"], y_start=0, y_end=2600, original_height=ORIGINAL_HEIGHTS["events"])
    events = add_shadow(resize_to_width(events_crop, 1600), pad=32)
    save_webp(events, "events.webp")
    print("  events.webp")

    # 10 web-app-bridge.webp — Get the App section (~y1825 area)
    app_crop = crop_by_original_y(imgs["home"], y_start=1500, y_end=3200, original_height=home_h)
    app_bridge = add_shadow(resize_to_width(app_crop, 1600), pad=32)
    save_webp(app_bridge, "web-app-bridge.webp")
    print("  web-app-bridge.webp")

    # 11 supporting-content.webp — 2x2: Gallery + About + Events + Career
    supporting = montage_desktop(
        [
            crop_by_original_y(imgs["gallery"], y_start=0, y_end=1800, original_height=ORIGINAL_HEIGHTS["gallery"]),
            crop_by_original_y(imgs["about"], y_start=0, y_end=2000, original_height=ORIGINAL_HEIGHTS["about"]),
            crop_by_original_y(imgs["events"], y_start=0, y_end=1800, original_height=ORIGINAL_HEIGHTS["events"]),
            crop_by_original_y(imgs["career"], y_start=0, y_end=1800, original_height=ORIGINAL_HEIGHTS["career"]),
        ],
        cols=2,
        panel_w=720,
    )
    save_webp(supporting, "supporting-content.webp")
    print("  supporting-content.webp")

    # 12 patterns.webp — menu + filter chips + reservation state
    patterns = montage_desktop(
        [
            resize_to_width(imgs["menu"], 900),
            crop_by_original_y(imgs["restaurants"], y_start=0, y_end=900, original_height=ORIGINAL_HEIGHTS["restaurants"]),
            crop_by_original_y(imgs["reservation_review"], y_start=0, y_end=1200, original_height=2442),
        ],
        cols=3,
        panel_w=520,
        gap=28,
    )
    save_webp(patterns, "patterns.webp")
    print("  patterns.webp")

    print("\nVerification:")
    required = [
        "hero.webp",
        "home-discovery.webp",
        "home-services.webp",
        "product-structure.webp",
        "menu.webp",
        "restaurants.webp",
        "restaurant-detail.webp",
        "reservation-flow.webp",
        "events.webp",
        "web-app-bridge.webp",
        "supporting-content.webp",
        "patterns.webp",
    ]
    ok = True
    for name in required:
        path = OUT / name
        if not path.exists():
            print(f"  MISSING {name}")
            ok = False
            continue
        with Image.open(path) as img:
            w, h = img.size
        size = path.stat().st_size
        status = "OK" if size > 10_000 else "TOO SMALL"
        if size <= 10_000:
            ok = False
        print(f"  {name}: {w}×{h}, {size:,} bytes [{status}]")

    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
