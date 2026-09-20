#!/usr/bin/env python3
"""Build NHR case study WebP assets from Figma PNG exports."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public/images/case-studies/nhr/_src"
OUT = ROOT / "public/images/case-studies/nhr"
QUALITY = 82

BG = (12, 12, 14)
TEXT = (235, 235, 240)
MUTED = (140, 140, 150)
ACCENT = (180, 160, 120)

ASSETS = {
    "home": "https://www.figma.com/api/mcp/asset/122c3b0a-a75a-44e4-9143-a20a9bf85de3.png",
    "restaurants": "https://www.figma.com/api/mcp/asset/f5bb1855-0bce-4591-ad27-44a784a86cb8.png",
    "restaurant_details": "https://www.figma.com/api/mcp/asset/674c7527-b18d-4298-b474-b0927b491f7c.png",
    "menu": "https://www.figma.com/api/mcp/asset/76527609-e0b9-4447-b94c-c8a91ac1cf15.png",
    "reserve": "https://www.figma.com/api/mcp/asset/67243794-7289-413c-b0a9-87033703474d.png",
    "bookings_upcoming": "https://www.figma.com/api/mcp/asset/65589995-ab7d-4519-ad41-591f3099003a.png",
    "bookings_previous": "https://www.figma.com/api/mcp/asset/357fefd2-a0b8-4581-a0e3-5b8c8079cab7.png",
    "events": "https://www.figma.com/api/mcp/asset/4e12f0f9-45ea-4677-85f7-670878f116d3.png",
    "book_event": "https://www.figma.com/api/mcp/asset/2a954b95-0a3b-4d17-8d79-845a12e13247.png",
    "splash": "https://www.figma.com/api/mcp/asset/fd18d00e-5abd-4cb2-b47a-3cb4fbd6f663.png",
    "onboarding": "https://www.figma.com/api/mcp/asset/bcd7e81a-c8b2-41dc-964d-cb7d11ee4e31.png",
    "signup": "https://www.figma.com/api/mcp/asset/b836c2bb-1f52-4774-9d3f-12ec40347c9c.png",
    "signin": "https://www.figma.com/api/mcp/asset/4b45be0d-d5da-4ae4-99c6-9ae6163d83e6.png",
    "signin_alt": "https://www.figma.com/api/mcp/asset/86c4eb3f-ab1b-4730-aef4-7799c9f0822b.png",
    "about": "https://www.figma.com/api/mcp/asset/6022683e-72b8-45f3-9afc-0afe886615bb.png",
    "profile": "https://www.figma.com/api/mcp/asset/5da2f0dd-7673-4403-b097-0bcd30f0743f.png",
    "loader": "https://www.figma.com/api/mcp/asset/ca109c8f-31f7-4386-91e4-d45486d23a5d.png",
    "bottom_sheet": "https://www.figma.com/api/mcp/asset/3a721e4e-7bea-4df7-8318-069a9030dd8f.png",
}


def curl_download(url: str, dest: Path, retries: int = 3) -> None:
    for attempt in range(retries):
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
    if not path.exists():
        curl_download(ASSETS[name], path)
    return Image.open(path).convert("RGBA")


def save_webp(img: Image.Image, name: str) -> Path:
    OUT.mkdir(parents=True, exist_ok=True)
    out = OUT / name
    rgb = Image.new("RGB", img.size, BG)
    rgb.paste(img, mask=img.split()[3] if img.mode == "RGBA" else None)
    rgb.save(out, "WEBP", quality=QUALITY, method=6)
    return out


def crop_top_phone(img: Image.Image, phone_h: int = 812) -> Image.Image:
    w, h = img.size
    crop_h = min(phone_h, h)
    return img.crop((0, 0, w, crop_h))


def resize_to_height(img: Image.Image, height: int) -> Image.Image:
    w, h = img.size
    if h == height:
        return img
    new_w = max(1, round(w * height / h))
    return img.resize((new_w, height), Image.Resampling.LANCZOS)


def add_phone_frame(img: Image.Image, pad: int = 24, radius: int = 36) -> Image.Image:
    w, h = img.size
    frame_w, frame_h = w + pad * 2, h + pad * 2
    frame = Image.new("RGBA", (frame_w, frame_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(frame)
    outer = (8, 8, 10, 255)
    inner = (22, 22, 26, 255)
    draw.rounded_rectangle((0, 0, frame_w - 1, frame_h - 1), radius=radius, fill=outer)
    draw.rounded_rectangle((pad - 6, pad - 6, frame_w - pad + 5, frame_h - pad + 5), radius=radius - 8, fill=inner)
    screen = img.convert("RGBA")
    mask = Image.new("L", screen.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, w, h), radius=radius - 12, fill=255)
    frame.paste(screen, (pad, pad), mask)
    return frame


def side_by_side(
    images: list[Image.Image],
    *,
    gap: int = 48,
    pad: int = 56,
    phone_height: int = 760,
    framed: bool = True,
) -> Image.Image:
    processed = []
    for img in images:
        cropped = crop_top_phone(img, 812)
        resized = resize_to_height(cropped, phone_height)
        processed.append(add_phone_frame(resized) if framed else resized)

    total_w = pad * 2 + sum(i.size[0] for i in processed) + gap * (len(processed) - 1)
    max_h = max(i.size[1] for i in processed)
    canvas = Image.new("RGBA", (total_w, max_h + pad * 2), (*BG, 255))
    x = pad
    for img in processed:
        y = pad + (max_h - img.size[1]) // 2
        canvas.paste(img, (x, y), img)
        x += img.size[0] + gap
    return canvas


def montage(
    images: list[Image.Image],
    *,
    cols: int,
    gap: int = 40,
    pad: int = 48,
    phone_height: int = 620,
) -> Image.Image:
    processed = []
    for img in images:
        cropped = crop_top_phone(img, 812)
        resized = resize_to_height(cropped, phone_height)
        processed.append(add_phone_frame(resized))

    rows = (len(processed) + cols - 1) // cols
    cell_w = max(i.size[0] for i in processed)
    cell_h = max(i.size[1] for i in processed)
    canvas_w = pad * 2 + cols * cell_w + gap * (cols - 1)
    canvas_h = pad * 2 + rows * cell_h + gap * (rows - 1)
    canvas = Image.new("RGBA", (canvas_w, canvas_h), (*BG, 255))

    for idx, img in enumerate(processed):
        r, c = divmod(idx, cols)
        x = pad + c * (cell_w + gap) + (cell_w - img.size[0]) // 2
        y = pad + r * (cell_h + gap) + (cell_h - img.size[1]) // 2
        canvas.paste(img, (x, y), img)
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


def draw_diagram(
    title: str,
    nodes: list[str],
    *,
    width: int = 1600,
    height: int = 520,
    horizontal: bool = True,
) -> Image.Image:
    canvas = Image.new("RGBA", (width, height), (*BG, 255))
    draw = ImageDraw.Draw(canvas)
    title_font = load_font(34, bold=True)
    label_font = load_font(22, bold=True)
    small_font = load_font(18)

    draw.text((56, 42), title, fill=TEXT, font=title_font)

    if horizontal:
        box_h = 72
        y = height // 2 - box_h // 2 + 20
        usable_w = width - 112
        n = len(nodes)
        gap = 36
        arrow_w = 28
        total_boxes = n
        box_w = (usable_w - gap * (total_boxes - 1) - arrow_w * (total_boxes - 1)) // total_boxes
        x = 56
        for i, label in enumerate(nodes):
            rect = (x, y, x + box_w, y + box_h)
            draw.rounded_rectangle(rect, radius=14, outline=ACCENT, width=2, fill=(24, 24, 28, 255))
            tw = draw.textlength(label, font=label_font)
            draw.text((x + (box_w - tw) / 2, y + 22), label, fill=TEXT, font=label_font)
            if i < n - 1:
                ax = x + box_w + 8
                mid = y + box_h // 2
                draw.line((ax, mid, ax + arrow_w - 8, mid), fill=MUTED, width=2)
                draw.polygon([(ax + arrow_w - 8, mid - 6), (ax + arrow_w, mid), (ax + arrow_w - 8, mid + 6)], fill=MUTED)
            x += box_w + gap + arrow_w
    else:
        # hub diagram for architecture
        center_x, center_y = width // 2, height // 2 + 36
        hub_w, hub_h = 220, 84
        hub = (center_x - hub_w // 2, center_y - hub_h // 2, center_x + hub_w // 2, center_y + hub_h // 2)
        draw.rounded_rectangle(hub, radius=18, outline=ACCENT, width=3, fill=(28, 28, 32, 255))
        tw = draw.textlength(nodes[0], font=label_font)
        draw.text((center_x - tw / 2, center_y - 14), nodes[0], fill=TEXT, font=label_font)

        satellites = nodes[1:]
        radius = 220
        positions = [
            (center_x, center_y - radius),
            (center_x + radius, center_y),
            (center_x, center_y + radius),
            (center_x - radius, center_y),
        ]
        for label, (sx, sy) in zip(satellites, positions):
            bw, bh = 240, 72
            rect = (sx - bw // 2, sy - bh // 2, sx + bw // 2, sy + bh // 2)
            draw.line((center_x, center_y, sx, sy), fill=(80, 80, 92, 255), width=3)
            draw.rounded_rectangle(rect, radius=14, outline=(90, 90, 102, 255), width=2, fill=(22, 22, 26, 255))
            tw = draw.textlength(label, font=label_font)
            draw.text((sx - tw / 2, sy - 14), label, fill=TEXT, font=label_font)

        # subtle grid texture for file weight / visual depth
        for gx in range(0, width, 48):
            draw.line((gx, 120, gx, height), fill=(18, 18, 22, 255), width=1)
        for gy in range(120, height, 48):
            draw.line((0, gy, width, gy), fill=(18, 18, 22, 255), width=1)

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

    # 1 hero.webp — framed home, large
    home_crop = crop_top_phone(imgs["home"], 900)
    hero_img = add_phone_frame(resize_to_height(home_crop, 920), pad=28, radius=40)
    hero_canvas = Image.new("RGBA", (hero_img.size[0] + 120, hero_img.size[1] + 120), (*BG, 255))
    hero_canvas.paste(hero_img, (60, 60), hero_img)
    save_webp(hero_canvas, "hero.webp")
    print("  hero.webp")

    # 2 home.webp
    home_view = crop_top_phone(imgs["home"], 860)
    home_framed = add_phone_frame(resize_to_height(home_view, 780))
    home_canvas = Image.new("RGBA", (home_framed.size[0] + 96, home_framed.size[1] + 96), (*BG, 255))
    home_canvas.paste(home_framed, (48, 48), home_framed)
    save_webp(home_canvas, "home.webp")
    print("  home.webp")

    # 3 journey.webp
    journey = draw_diagram(
        "Guest journey",
        ["DISCOVER", "RESTAURANT/EVENT", "DETAILS", "RESERVE/BOOK", "BOOKING", "MANAGE"],
    )
    save_webp(journey, "journey.webp")
    print("  journey.webp")

    # 4 architecture.webp
    architecture = draw_diagram(
        "Product structure",
        ["Home", "Restaurants", "Events", "Bookings", "Profile"],
        width=1600,
        height=720,
        horizontal=False,
    )
    save_webp(architecture, "architecture.webp")
    print("  architecture.webp")

    # 5 restaurants.webp — crop to phone viewport
    restaurants_crop = crop_top_phone(imgs["restaurants"], 812)
    restaurants_framed = add_phone_frame(resize_to_height(restaurants_crop, 780))
    restaurants_canvas = Image.new("RGBA", (restaurants_framed.size[0] + 96, restaurants_framed.size[1] + 96), (*BG, 255))
    restaurants_canvas.paste(restaurants_framed, (48, 48), restaurants_framed)
    save_webp(restaurants_canvas, "restaurants.webp")
    print("  restaurants.webp")

    # 6 restaurant-flow.webp
    restaurant_flow = side_by_side(
        [imgs["restaurant_details"], imgs["menu"], imgs["reserve"]],
        phone_height=720,
    )
    save_webp(restaurant_flow, "restaurant-flow.webp")
    print("  restaurant-flow.webp")

    # 7 bookings.webp
    bookings = side_by_side([imgs["bookings_upcoming"], imgs["bookings_previous"]], phone_height=740)
    save_webp(bookings, "bookings.webp")
    print("  bookings.webp")

    # 8 events.webp
    events = side_by_side(
        [crop_top_phone(imgs["events"], 900), crop_top_phone(imgs["book_event"], 900)],
        phone_height=700,
    )
    save_webp(events, "events.webp")
    print("  events.webp")

    # 9 supporting.webp — splash, onboarding, sign up, sign in
    supporting = montage(
        [imgs["splash"], imgs["onboarding"], imgs["signup"], imgs["signin"]],
        cols=4,
        phone_height=560,
    )
    save_webp(supporting, "supporting.webp")
    print("  supporting.webp")

    # 10 states.webp — loader, bottom sheet, sign in alt, booking tabs
    states = montage(
        [imgs["loader"], imgs["bottom_sheet"], imgs["signin_alt"], imgs["bookings_upcoming"]],
        cols=4,
        phone_height=560,
    )
    save_webp(states, "states.webp")
    print("  states.webp")

    print("\nVerification:")
    required = [
        "hero.webp",
        "home.webp",
        "journey.webp",
        "architecture.webp",
        "restaurants.webp",
        "restaurant-flow.webp",
        "bookings.webp",
        "events.webp",
        "supporting.webp",
        "states.webp",
    ]
    ok = True
    for name in required:
        path = OUT / name
        if not path.exists():
            print(f"  MISSING {name}")
            ok = False
            continue
        size = path.stat().st_size
        status = "OK" if size > 10_000 else "TOO SMALL"
        if size <= 10_000:
            ok = False
        print(f"  {name}: {size:,} bytes [{status}]")

    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
