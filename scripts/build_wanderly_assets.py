#!/usr/bin/env python3
"""Build Wanderly case-study WebP assets from existing screen PNG exports."""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public/images/case-studies/wanderly"
BEHANCE = SRC / "behance"
OUT = SRC
QUALITY = 82

BG = (11, 11, 12)  # #0B0B0C
BOX_FILL = (18, 18, 22)
TEXT = (235, 235, 240)
MUTED = (140, 140, 150)
ACCENT = (92, 200, 200)  # #5CC8C8 teal/cyan


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


def load_screen(name: str) -> Image.Image:
    path = SRC / f"screen-{name}.png"
    if not path.exists():
        raise FileNotFoundError(f"Missing source screen: {path}")
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


def crop_top_fraction(img: Image.Image, fraction: float = 0.55) -> Image.Image:
    w, h = img.size
    return img.crop((0, 0, w, max(1, round(h * fraction))))


def add_shadow(img: Image.Image, *, pad: int = 28, blur: int = 16, offset: int = 6) -> Image.Image:
    w, h = img.size
    canvas = Image.new("RGBA", (w + pad * 2, h + pad * 2), (*BG, 255))
    shadow = Image.new("RGBA", img.size, (0, 0, 0, 160))
    shadow = shadow.filter(ImageFilter.GaussianBlur(blur))
    canvas.paste(shadow, (pad + offset, pad + offset), shadow)
    canvas.paste(img, (pad, pad), img if img.mode == "RGBA" else None)
    return canvas


def add_phone_frame(img: Image.Image, *, pad: int = 20, radius: int = 32) -> Image.Image:
    w, h = img.size
    frame_w, frame_h = w + pad * 2, h + pad * 2
    frame = Image.new("RGBA", (frame_w, frame_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(frame)
    draw.rounded_rectangle((0, 0, frame_w - 1, frame_h - 1), radius=radius, fill=(8, 8, 10, 255))
    draw.rounded_rectangle(
        (pad - 5, pad - 5, frame_w - pad + 4, frame_h - pad + 4),
        radius=radius - 6,
        fill=(22, 22, 26, 255),
    )
    screen = img.convert("RGBA")
    mask = Image.new("L", screen.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, w, h), radius=radius - 10, fill=255)
    frame.paste(screen, (pad, pad), mask)
    return frame


def side_by_side_phones(
    images: list[Image.Image],
    *,
    gap: int = 40,
    pad: int = 48,
    phone_height: int = 720,
    framed: bool = True,
    crop_fraction: float | None = 0.58,
) -> Image.Image:
    processed: list[Image.Image] = []
    for img in images:
        cropped = crop_top_fraction(img, crop_fraction) if crop_fraction else img
        resized = resize_to_height(cropped, phone_height)
        processed.append(add_phone_frame(resized) if framed else add_shadow(resized))

    total_w = pad * 2 + sum(i.size[0] for i in processed) + gap * (len(processed) - 1)
    max_h = max(i.size[1] for i in processed)
    canvas = Image.new("RGBA", (total_w, max_h + pad * 2), (*BG, 255))
    x = pad
    for img in processed:
        y = pad + (max_h - img.size[1]) // 2
        canvas.paste(img, (x, y), img)
        x += img.size[0] + gap
    return canvas


def side_by_side_equal_height(
    images: list[Image.Image],
    *,
    gap: int = 40,
    pad: int = 48,
    target_height: int = 900,
    framed: bool = False,
    crop_fraction: float | None = 0.62,
) -> Image.Image:
    processed: list[Image.Image] = []
    for img in images:
        cropped = crop_top_fraction(img, crop_fraction) if crop_fraction else img
        resized = resize_to_height(cropped, target_height)
        if framed:
            processed.append(add_phone_frame(resized))
        else:
            processed.append(add_shadow(resized, pad=20))
    total_w = pad * 2 + sum(i.size[0] for i in processed) + gap * (len(processed) - 1)
    max_h = max(i.size[1] for i in processed)
    canvas = Image.new("RGBA", (total_w, max_h + pad * 2), (*BG, 255))
    x = pad
    for img in processed:
        y = pad + (max_h - img.size[1]) // 2
        canvas.paste(img, (x, y), img)
        x += img.size[0] + gap
    return canvas


def draw_arrow(draw: ImageDraw.ImageDraw, x: int, y1: int, y2: int) -> None:
    draw.line((x, y1, x, y2 - 8), fill=ACCENT, width=2)
    draw.polygon([(x, y2), (x - 6, y2 - 10), (x + 6, y2 - 10)], fill=ACCENT)


def text_width(font: ImageFont.ImageFont, text: str) -> int:
    bbox = font.getbbox(text)
    return bbox[2] - bbox[0]


def draw_architecture() -> Image.Image:
    """Vertical product-structure diagram for Wanderly."""
    width, height = 1280, 980
    canvas = Image.new("RGBA", (width, height), (*BG, 255))
    draw = ImageDraw.Draw(canvas)

    label_font = load_font(17, bold=True)
    sub_font = load_font(14)
    meta_font = load_font(13)
    foot_font = load_font(14)
    side_font = load_font(12)

    flow = [
        ("HOME", "AI-first entry"),
        ("AI TRIP PLANNING", "Conversational intent"),
        ("TRIP PACKAGES", "Budget · Mid · Luxury"),
        ("CUSTOMIZATION", "Flight · Hotel · Activities · Transport"),
        ("BOOKING", "Review → Traveler → Payment → Confirm"),
        ("POST-BOOKING", "Trips · Bookings · Explore"),
    ]

    box_x, box_w = 120, 520
    box_h = 58
    arrow_gap = 18
    y = 56

    for title, subtitle in flow:
        rect = (box_x, y, box_x + box_w, y + box_h)
        draw.rounded_rectangle(rect, radius=10, outline=ACCENT, width=1, fill=(*BOX_FILL, 255))
        draw.text((box_x + 18, y + 10), title, fill=ACCENT, font=label_font)
        draw.text((box_x + 18, y + 32), subtitle, fill=TEXT, font=sub_font)
        y += box_h + arrow_gap
        if title != flow[-1][0]:
            draw_arrow(draw, box_x + box_w // 2, y - arrow_gap + 2, y + 6)
            y += 14

    side_x = box_x + box_w + 72
    side_y = 120
    draw.text((side_x, side_y - 28), "Navigation", fill=MUTED, font=meta_font)
    nav_items = ["Home", "Trips", "Bookings", "Explore", "Profile"]
    for item in nav_items:
        draw.rounded_rectangle(
            (side_x, side_y, side_x + 150, side_y + 34),
            radius=8,
            outline=(60, 60, 68),
            width=1,
            fill=(14, 14, 18, 255),
        )
        tw = text_width(sub_font, item)
        draw.text((side_x + (150 - tw) // 2, side_y + 9), item, fill=TEXT, font=sub_font)
        side_y += 44

    side_y += 16
    draw.text((side_x, side_y), "Supporting", fill=MUTED, font=meta_font)
    side_y += 26
    supporting = "Plus / Elite · Rewards · Hotels · Flights · Activities · Car"
    for line in _wrap_text(supporting, sub_font, 190):
        draw.text((side_x, side_y), line, fill=MUTED, font=side_font)
        side_y += 18

    bottom_y = y + 36
    draw.line((80, bottom_y, width - 80, bottom_y), fill=(40, 40, 48), width=1)
    draw.text((80, bottom_y + 18), "Nav:", fill=ACCENT, font=meta_font)
    draw.text(
        (130, bottom_y + 18),
        "Home · Trips · Bookings · Explore · Profile",
        fill=TEXT,
        font=sub_font,
    )
    draw.text((80, bottom_y + 44), "Supporting:", fill=ACCENT, font=meta_font)
    draw.text(
        (180, bottom_y + 44),
        "Plus / Elite · Rewards · Hotels · Flights · Activities · Car",
        fill=MUTED,
        font=sub_font,
    )

    caption = "Product structure (explanatory)"
    cw = text_width(foot_font, caption)
    draw.text(((width - cw) // 2, height - 40), caption, fill=MUTED, font=foot_font)

    return canvas


def _wrap_text(text: str, font: ImageFont.ImageFont, max_w: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        trial = f"{current} {word}".strip()
        if text_width(font, trial) <= max_w:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines or [text]


def build_patterns() -> Image.Image:
    screens = [
        load_screen("home"),
        load_screen("ai-trip-plan"),
        load_screen("wanderly-plus"),
    ]
    composite = side_by_side_phones(screens, phone_height=700, crop_fraction=0.52)
    if composite.size[0] > 2200:
        composite = side_by_side_phones(
            [load_screen("home"), load_screen("ai-trip-plan")],
            phone_height=760,
            crop_fraction=0.55,
        )
    return composite


def build_booking_flow() -> Image.Image:
    buy_now = load_screen("buy-now-steps")
    w, h = buy_now.size
    aspect = w / h
    if aspect < 1.4:
        panel = resize_to_width(buy_now, 520)
        return add_shadow(panel, pad=48)
    return add_shadow(resize_to_width(buy_now, 960), pad=40)


def build_discovery() -> Image.Image:
    return side_by_side_equal_height(
        [load_screen("explore-activities"), load_screen("find-a-hotel")],
        target_height=880,
        crop_fraction=0.55,
        framed=False,
    )


def verify(outputs: list[str]) -> bool:
    ok = True
    print("\nVerification:")
    for name in outputs:
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
    return ok


def main() -> int:
    outputs: list[str] = []

    print("Building architecture.webp...")
    save_webp(draw_architecture(), "architecture.webp")
    outputs.append("architecture.webp")

    print("Building patterns.webp...")
    save_webp(build_patterns(), "patterns.webp")
    outputs.append("patterns.webp")

    print("Building booking-flow.webp...")
    save_webp(build_booking_flow(), "booking-flow.webp")
    outputs.append("booking-flow.webp")

    print("Building discovery.webp...")
    save_webp(build_discovery(), "discovery.webp")
    outputs.append("discovery.webp")

    return 0 if verify(outputs) else 1


if __name__ == "__main__":
    sys.exit(main())
