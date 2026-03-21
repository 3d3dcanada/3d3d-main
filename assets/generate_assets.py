from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter


ROOT = Path("/home/wess/3d3d-platform")
OUT = ROOT / "assets" / "generated"
OUT.mkdir(parents=True, exist_ok=True)

WORKSHOP = ROOT / "public" / "media" / "workshop"
RACE = ROOT / "public" / "media" / "race"
REAL = ROOT / "public" / "media" / "real"

COLORS = {
    "graphite": "#111214",
    "teal": "#40C4C4",
    "coral": "#E8665A",
    "bone": "#F6F7FA",
    "slate": "#1C2328",
    "gray": "#78838D",
}

FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSansCondensed-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONT_MONO = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"


def rgba(hex_color, alpha=255):
    hex_color = hex_color.lstrip("#")
    return tuple(int(hex_color[i : i + 2], 16) for i in (0, 2, 4)) + (alpha,)


def font(path, size):
    return ImageFont.truetype(path, size=size)


def cover(image, size):
    target_w, target_h = size
    src_w, src_h = image.size
    src_ratio = src_w / src_h
    dst_ratio = target_w / target_h
    if src_ratio > dst_ratio:
        new_h = target_h
        new_w = int(new_h * src_ratio)
    else:
        new_w = target_w
        new_h = int(new_w / src_ratio)
    resized = image.resize((new_w, new_h), Image.Resampling.LANCZOS)
    left = (new_w - target_w) // 2
    top = (new_h - target_h) // 2
    return resized.crop((left, top, left + target_w, top + target_h))


def load(path, size):
    return cover(Image.open(path).convert("RGB"), size)


def darken(image, top_alpha=110, bottom_alpha=190):
    overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    w, h = image.size
    for y in range(h):
        alpha = int(top_alpha + (bottom_alpha - top_alpha) * (y / max(h - 1, 1)))
        draw.line((0, y, w, y), fill=(0, 0, 0, alpha))
    return Image.alpha_composite(image.convert("RGBA"), overlay)


def soften(image, radius=2):
    return image.filter(ImageFilter.GaussianBlur(radius=radius))


def line(draw, xy, fill, width):
    draw.line(xy, fill=fill, width=width)


def fit_text(draw, text, max_width, font_path, start_size, min_size=22):
    size = start_size
    while size >= min_size:
        f = font(font_path, size)
        box = draw.multiline_textbbox((0, 0), text, font=f, spacing=6)
        if box[2] - box[0] <= max_width:
            return f
        size -= 2
    return font(font_path, min_size)


def draw_block(draw, x, y, text, max_width, font_path, start_size, fill, spacing=8, stroke=0):
    f = fit_text(draw, text, max_width, font_path, start_size)
    draw.multiline_text(
        (x, y),
        text,
        font=f,
        fill=fill,
        spacing=spacing,
        stroke_width=stroke,
        stroke_fill=rgba(COLORS["graphite"]),
    )
    box = draw.multiline_textbbox((x, y), text, font=f, spacing=spacing, stroke_width=stroke)
    return box


def badge(draw, x, y, text, fill_bg, fill_fg):
    f = font(FONT_MONO, 28)
    box = draw.textbbox((0, 0), text, font=f)
    pad_x = 18
    pad_y = 10
    draw.rounded_rectangle(
        (x, y, x + box[2] - box[0] + pad_x * 2, y + box[3] - box[1] + pad_y * 2),
        radius=18,
        fill=fill_bg,
    )
    draw.text((x + pad_x, y + pad_y - 1), text, font=f, fill=fill_fg)


def footer(draw, w, h, label="3D3D"):
    f = font(FONT_MONO, 24)
    box = draw.textbbox((0, 0), label, font=f)
    x = w - (box[2] - box[0]) - 46
    y = h - 48
    draw.text((x, y), label, font=f, fill=rgba(COLORS["bone"], 220))


def save(image, name):
    image.convert("RGB").save(OUT / name, quality=95)


# ─── SOCIAL POSTS ──────────────────────────────────────────────────────────────

def social_discontinued():
    # Fleet race start (left) + winch deck hardware (right)
    size = (1080, 1350)
    left = darken(load(REAL / "fleet-start-press.jpg", (540, 1350)), 70, 150)
    right = darken(load(RACE / "winch-deck-coastal.jpg", (540, 1350)), 60, 150)
    canvas = Image.new("RGBA", size, rgba(COLORS["graphite"]))
    canvas.paste(left, (0, 0))
    canvas.paste(right, (540, 0))
    draw = ImageDraw.Draw(canvas)
    draw.rectangle((526, 0, 554, 1350), fill=rgba(COLORS["teal"], 220))
    badge(draw, 64, 70, "REPLACEMENT-PART RECOVERY", rgba(COLORS["teal"], 235), rgba(COLORS["graphite"]))
    draw_block(draw, 66, 215, "DISCONTINUED?", 460, FONT_BOLD, 110, rgba(COLORS["bone"]), stroke=2)
    draw_block(draw, 66, 342, "REBUILD IT.", 420, FONT_BOLD, 102, rgba(COLORS["coral"]), stroke=2)
    draw_block(draw, 66, 1085, "Reverse-engineered by 3D3D", 420, FONT_MONO, 30, rgba(COLORS["bone"], 220))
    footer(draw, *size)
    save(canvas, "social-discontinued-part-rescue.png")


def social_marine_warning():
    # Real winch deck — marine hardware context
    size = (1080, 1350)
    bg = darken(load(RACE / "winch-deck-coastal.jpg", size), 60, 180)
    canvas = bg.copy()
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle((58, 76, 720, 430), radius=34, fill=rgba(COLORS["graphite"], 188))
    badge(draw, 82, 102, "MARINE MATERIAL WARNING", rgba(COLORS["bone"], 240), rgba(COLORS["graphite"]))
    draw_block(draw, 82, 180, "STOP PRINTING\nBOAT PARTS IN", 570, FONT_BOLD, 100, rgba(COLORS["bone"]), stroke=2)
    draw_block(draw, 82, 388, "PLA", 260, FONT_BOLD, 126, rgba(COLORS["coral"]), stroke=2)
    line(draw, (82, 542, 594, 542), rgba(COLORS["teal"]), 10)
    draw_block(draw, 82, 570, "Material choice is the job.", 720, FONT_BOLD, 58, rgba(COLORS["bone"]), stroke=2)
    footer(draw, *size)
    save(canvas, "social-marine-material-warning.png")


def social_no_cad():
    # Three on-deck sailing shots — context is the ocean, not the workshop
    size = (1080, 1350)
    canvas = Image.new("RGBA", size, rgba(COLORS["graphite"]))
    pad = 46
    gutter = 24
    panel_w = (size[0] - pad * 2 - gutter * 2) // 3
    imgs = [
        load(RACE / "crew-deck-offshore.jpg", (panel_w, 820)),
        load(REAL / "offshore-day-01.jpg", (panel_w, 820)),
        load(REAL / "golden-hour-01.jpg", (panel_w, 820)),
    ]
    draw = ImageDraw.Draw(canvas)
    badge(draw, 48, 64, "REMOTE INTAKE", rgba(COLORS["teal"], 235), rgba(COLORS["graphite"]))
    draw_block(draw, 48, 136, "NO CAD FILE?", 610, FONT_BOLD, 108, rgba(COLORS["bone"]))
    draw_block(draw, 48, 246, "Still workable.", 520, FONT_BOLD, 78, rgba(COLORS["coral"]))
    labels = ["THE PROBLEM", "YOUR VESSEL", "BACK UNDERWAY"]
    for i, img in enumerate(imgs):
        x = pad + i * (panel_w + gutter)
        panel = darken(img, 35, 115)
        canvas.paste(panel, (x, 392))
        draw.rounded_rectangle((x, 392, x + panel_w, 1212), radius=30, outline=rgba(COLORS["bone"], 40), width=2)
        draw.rectangle((x, 1148, x + panel_w, 1212), fill=rgba(COLORS["graphite"], 210))
        draw.text((x + 24, 1168), labels[i], font=font(FONT_MONO, 24), fill=rgba(COLORS["bone"]))
    draw_block(draw, 48, 1244, "Photos. Sample. Measurements.", 760, FONT_MONO, 30, rgba(COLORS["teal"]))
    footer(draw, *size)
    save(canvas, "social-no-cad-needed.png")


def social_quote_checklist():
    # Fleet start as striking background behind the checklist card
    size = (1080, 1350)
    bg_full = darken(load(REAL / "fleet-start-press.jpg", size), 100, 180)
    canvas = bg_full.copy()
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle((56, 58, 640, 1292), radius=42, fill=rgba(COLORS["bone"], 240))
    draw.rounded_rectangle((694, 138, 978, 1130), radius=48, fill=rgba(COLORS["graphite"], 230))
    bg_inset = darken(load(RACE / "helm-offshore-cup.jpg", (238, 660)), 30, 80)
    canvas.paste(bg_inset, (717, 252))
    draw.rounded_rectangle((717, 252, 955, 912), radius=28, outline=rgba(COLORS["teal"]), width=6)
    badge(draw, 88, 96, "QUOTE CHECKLIST", rgba(COLORS["teal"], 235), rgba(COLORS["graphite"]))
    draw_block(draw, 90, 180, "SEND THESE\n4 PHOTOS", 470, FONT_BOLD, 94, rgba(COLORS["graphite"]))
    items = [
        "1  Part installed",
        "2  Part removed",
        "3  Mounting area",
        "4  Scale reference",
    ]
    y = 474
    for item in items:
        draw.rounded_rectangle((94, y - 10, 590, y + 82), radius=24, fill=rgba(COLORS["bone"]))
        draw.text((96, y), item, font=font(FONT_BOLD, 42), fill=rgba(COLORS["graphite"]))
        draw.ellipse((520, y + 8, 566, y + 54), fill=rgba(COLORS["teal"]))
        y += 118
    draw_block(draw, 90, 1008, "Start at 3d3d.ca/quote", 470, FONT_MONO, 28, rgba(COLORS["gray"]))
    draw_block(draw, 718, 952, "I fly to\nyour boat\nor ship to\nyou.", 220, FONT_BOLD, 36, rgba(COLORS["bone"]))
    footer(draw, *size)
    save(canvas, "social-quote-checklist.png")


def social_field_deployment():
    # Crew on deck offshore — already correct, keep
    size = (1080, 1350)
    bg = soften(load(RACE / "crew-deck-offshore.jpg", size), radius=1)
    bg = darken(bg, 80, 180)
    canvas = bg.copy()
    draw = ImageDraw.Draw(canvas)
    line(draw, (72, 1080, 1008, 1080), rgba(COLORS["teal"]), 14)
    draw_block(draw, 70, 96, "IF THE PROBLEM\nCAN'T SHIP", 760, FONT_BOLD, 110, rgba(COLORS["bone"]), stroke=2)
    draw_block(draw, 70, 352, "Bring the fabricator.", 700, FONT_BOLD, 74, rgba(COLORS["coral"]), stroke=2)
    draw_block(draw, 70, 1118, "Field deployment for marinas, events, race support, and time-sensitive jobs.", 920, FONT_REG, 38, rgba(COLORS["bone"]))
    footer(draw, *size)
    save(canvas, "social-field-deployment.png")


# ─── PAID AD ───────────────────────────────────────────────────────────────────

def ad_broken_part():
    # Skipper at helm offshore — real sailing context, premium feel
    size = (1080, 1350)
    bg = darken(load(RACE / "helm-offshore-cup.jpg", size), 50, 170)
    canvas = bg.copy()
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle((72, 800, 640, 1280), radius=40, fill=rgba(COLORS["graphite"], 215))
    badge(draw, 92, 834, "REMOTE QUOTE", rgba(COLORS["coral"], 235), rgba(COLORS["bone"]))
    draw_block(draw, 92, 918, "BROKEN\nPART?", 360, FONT_BOLD, 110, rgba(COLORS["bone"]), stroke=2)
    draw_block(draw, 92, 1118, "Send a photo and start\nthe quote today.", 480, FONT_REG, 34, rgba(COLORS["bone"], 210))
    draw.rounded_rectangle((92, 1218, 580, 1268), radius=26, fill=rgba(COLORS["teal"]))
    draw.text((126, 1229), "3d3d.ca/quote  →  START HERE", font=font(FONT_BOLD, 28), fill=rgba(COLORS["graphite"]))
    footer(draw, *size)
    save(canvas, "ad-broken-part-start-here.png")


# ─── STORIES ───────────────────────────────────────────────────────────────────

def story_quote_checklist():
    # Fleet start as top hero, checklist card below
    size = (1080, 1920)
    canvas = Image.new("RGBA", size, rgba(COLORS["graphite"]))
    draw = ImageDraw.Draw(canvas)
    bg = darken(load(REAL / "fleet-start-press.jpg", (1080, 760)), 20, 90)
    canvas.paste(bg, (0, 0))
    draw.rounded_rectangle((62, 706, 1018, 1790), radius=52, fill=rgba(COLORS["bone"]))
    badge(draw, 96, 750, "STORY CHECKLIST", rgba(COLORS["teal"], 235), rgba(COLORS["graphite"]))
    draw_block(draw, 98, 840, "4 PHOTOS FOR\nA FASTER QUOTE", 780, FONT_BOLD, 102, rgba(COLORS["graphite"]))
    items = [
        "Front view",
        "Back view",
        "Mounting area",
        "Scale reference",
    ]
    y = 1160
    for idx, item in enumerate(items, start=1):
        draw.rounded_rectangle((98, y - 6, 982, y + 108), radius=28, fill=rgba(COLORS["bone"]))
        draw.ellipse((116, y + 20, 174, y + 78), fill=rgba(COLORS["teal"]))
        draw.text((135, y + 28), str(idx), font=font(FONT_BOLD, 28), fill=rgba(COLORS["graphite"]))
        draw.text((202, y + 22), item, font=font(FONT_BOLD, 46), fill=rgba(COLORS["graphite"]))
        y += 148
    draw_block(draw, 98, 1710, "DM or quote link.", 520, FONT_MONO, 34, rgba(COLORS["gray"]))
    footer(draw, *size)
    save(canvas, "story-quote-checklist.png")


def story_before_after():
    # Top: fleet race start (the stakes) / Bottom: skipper at helm (the solution)
    size = (1080, 1920)
    top = darken(load(REAL / "fleet-start-press.jpg", (1080, 920)), 60, 130)
    bottom = darken(load(RACE / "helm-offshore-cup.jpg", (1080, 920)), 50, 110)
    canvas = Image.new("RGBA", size, rgba(COLORS["graphite"]))
    canvas.paste(top, (0, 0))
    canvas.paste(bottom, (0, 1000))
    draw = ImageDraw.Draw(canvas)
    draw.rectangle((0, 910, 1080, 1000), fill=rgba(COLORS["graphite"]))
    draw.line((0, 955, 1080, 955), fill=rgba(COLORS["teal"]), width=6)
    draw.text((72, 832), "THE RACE", font=font(FONT_BOLD, 66), fill=rgba(COLORS["coral"]))
    draw.text((72, 1006), "THE FIX", font=font(FONT_BOLD, 66), fill=rgba(COLORS["teal"]))
    draw_block(draw, 72, 72, "You're offshore.\nSomething broke.", 760, FONT_BOLD, 72, rgba(COLORS["bone"]), stroke=2)
    draw_block(draw, 72, 1620, "I fly to you.\nI fix it.\nYou keep sailing.", 880, FONT_BOLD, 62, rgba(COLORS["bone"]), stroke=2)
    footer(draw, *size)
    save(canvas, "story-before-after.png")


# ─── YOUTUBE THUMBNAILS ────────────────────────────────────────────────────────

def thumb_stop_pla():
    # Winch deck — correct marine hardware context
    size = (1280, 720)
    bg = darken(load(RACE / "winch-deck-coastal.jpg", size), 40, 160)
    canvas = bg.copy()
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle((56, 56, 744, 286), radius=34, fill=rgba(COLORS["graphite"], 215))
    draw_block(draw, 82, 86, "STOP USING PLA", 600, FONT_BOLD, 96, rgba(COLORS["bone"]), stroke=2)
    draw_block(draw, 82, 310, "for boat parts", 520, FONT_BOLD, 54, rgba(COLORS["coral"]), stroke=2)
    draw.ellipse((994, 74, 1194, 274), fill=rgba(COLORS["coral"], 225))
    draw.text((1050, 142), "X", font=font(FONT_BOLD, 108), fill=rgba(COLORS["bone"]))
    footer(draw, *size)
    save(canvas, "thumb-stop-using-pla.png")


def thumb_no_cad():
    # Crew on deck offshore — real sailing context
    size = (1280, 720)
    bg = darken(load(RACE / "crew-deck-offshore.jpg", size), 50, 170)
    canvas = bg.copy()
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle((56, 56, 696, 262), radius=30, fill=rgba(COLORS["graphite"], 210))
    draw_block(draw, 84, 82, "NO CAD?", 540, FONT_BOLD, 108, rgba(COLORS["bone"]), stroke=2)
    draw_block(draw, 84, 296, "Still fixable.", 560, FONT_BOLD, 60, rgba(COLORS["teal"]), stroke=2)
    draw.rounded_rectangle((878, 454, 1216, 640), radius=28, fill=rgba(COLORS["coral"], 235))
    draw.text((934, 520), "SEND IT", font=font(FONT_BOLD, 58), fill=rgba(COLORS["bone"]))
    footer(draw, *size)
    save(canvas, "thumb-no-cad-needed.png")


def thumb_discontinued():
    # Fleet start (left) + winch hardware (right) — both marine, both real
    size = (1280, 720)
    left = darken(load(REAL / "fleet-start-press.jpg", (640, 720)), 60, 120)
    right = darken(load(RACE / "winch-deck-coastal.jpg", (640, 720)), 60, 120)
    canvas = Image.new("RGBA", size, rgba(COLORS["graphite"]))
    canvas.paste(left, (0, 0))
    canvas.paste(right, (640, 0))
    draw = ImageDraw.Draw(canvas)
    draw.rectangle((612, 0, 668, 720), fill=rgba(COLORS["teal"], 220))
    draw.rounded_rectangle((56, 58, 560, 226), radius=28, fill=rgba(COLORS["graphite"], 210))
    draw_block(draw, 84, 82, "DISCONTINUED?", 420, FONT_BOLD, 78, rgba(COLORS["bone"]), stroke=2)
    draw.rounded_rectangle((720, 472, 1190, 642), radius=28, fill=rgba(COLORS["coral"], 228))
    draw_block(draw, 760, 506, "REBUILT", 340, FONT_BOLD, 76, rgba(COLORS["bone"]))
    footer(draw, *size)
    save(canvas, "thumb-discontinued-rebuilt.png")


# ─── SAVINGS INFOGRAPHIC ───────────────────────────────────────────────────────

def infographic_cost_savings():
    # Fleet start background — stakes are clear, this is where parts fail
    size = (1080, 1350)
    bg = darken(load(REAL / "fleet-start-press.jpg", size), 140, 210)
    canvas = bg.copy()
    draw = ImageDraw.Draw(canvas)

    # Header
    badge(draw, 64, 60, "THE MATH IS SIMPLE", rgba(COLORS["teal"], 235), rgba(COLORS["graphite"]))
    draw_block(draw, 64, 150, "One broken part.\nOne blocked vessel.", 840, FONT_BOLD, 84, rgba(COLORS["bone"]), stroke=2)

    col_pad = 56
    col_gap = 28
    col_w = (size[0] - col_pad * 2 - col_gap) // 2
    col_h = 500
    col_y = 460

    # LEFT column — WITHOUT
    lx = col_pad
    draw.rounded_rectangle((lx, col_y, lx + col_w, col_y + col_h), radius=28, fill=rgba(COLORS["coral"], 30))
    draw.rounded_rectangle((lx, col_y, lx + col_w, col_y + col_h), radius=28, outline=rgba(COLORS["coral"], 180), width=3)
    draw_block(draw, lx + 20, col_y + 18, "WITHOUT 3D3D", col_w - 40, FONT_MONO, 28, rgba(COLORS["coral"]))
    without_lines = [
        "OEM part: backordered",
        "or discontinued.",
        "",
        "Wait time: weeks.",
        "",
        "Vessel: tied up.",
        "",
        "Trip: cancelled.",
    ]
    wy = col_y + 76
    for txt in without_lines:
        if txt:
            draw.text((lx + 20, wy), txt, font=font(FONT_REG, 32), fill=rgba(COLORS["bone"], 210))
        wy += 46

    # RIGHT column — WITH
    rx = col_pad + col_w + col_gap
    draw.rounded_rectangle((rx, col_y, rx + col_w, col_y + col_h), radius=28, fill=rgba(COLORS["teal"], 30))
    draw.rounded_rectangle((rx, col_y, rx + col_w, col_y + col_h), radius=28, outline=rgba(COLORS["teal"], 180), width=3)
    draw_block(draw, rx + 20, col_y + 18, "WITH 3D3D", col_w - 40, FONT_MONO, 28, rgba(COLORS["teal"]))
    with_lines = [
        "Part rebuilt from",
        "photo or sample.",
        "",
        "Days, not weeks.",
        "",
        "I fly to you.",
        "",
        "You keep sailing.",
    ]
    ry = col_y + 76
    for txt in with_lines:
        if txt:
            draw.text((rx + 20, ry), txt, font=font(FONT_REG, 32), fill=rgba(COLORS["bone"], 210))
        ry += 46

    # Divider and bottom line
    line(draw, (col_pad, 1010, size[0] - col_pad, 1010), rgba(COLORS["teal"], 120), 2)
    draw_block(
        draw, col_pad, 1042,
        "One part. One vessel moving again.\nWorldwide. No excuses.",
        size[0] - col_pad * 2, FONT_BOLD, 58, rgba(COLORS["bone"]), stroke=1
    )

    # CTA
    draw.rounded_rectangle((col_pad, 1238, size[0] - col_pad, 1292), radius=26, fill=rgba(COLORS["teal"]))
    cta = "3d3d.ca  —  I fly to you. Worldwide."
    draw.text((col_pad + 28, 1248), cta, font=font(FONT_BOLD, 36), fill=rgba(COLORS["graphite"]))

    footer(draw, *size)
    save(canvas, "infographic-cost-savings.png")


# ─── OG IMAGES ────────────────────────────────────────────────────────────────

def og_home():
    size = (1200, 630)
    bg = darken(load(REAL / "fleet-start-press.jpg", size), 100, 180)
    canvas = bg.copy()
    draw = ImageDraw.Draw(canvas)
    badge(draw, 64, 48, "3D3D", rgba(COLORS["teal"], 235), rgba(COLORS["graphite"]))
    draw_block(draw, 64, 140, "YOU HAVE A PROBLEM.\nI AM YOUR SOLUTION.", 900, FONT_BOLD, 78, rgba(COLORS["bone"]), stroke=2)
    draw_block(draw, 64, 360, "Offshore fabrication. Marine hardware.\nWorldwide deployment.", 900, FONT_REG, 34, rgba(COLORS["bone"], 200))
    line(draw, (64, 500, 600, 500), rgba(COLORS["teal"]), 6)
    draw_block(draw, 64, 530, "3d3d.ca", 300, FONT_MONO, 32, rgba(COLORS["teal"]))
    save(canvas, "og-home.png")


def og_materials():
    size = (1200, 630)
    canvas = Image.new("RGBA", size, rgba(COLORS["graphite"]))
    draw = ImageDraw.Draw(canvas)
    badge(draw, 64, 48, "MATERIAL STACK", rgba(COLORS["teal"], 235), rgba(COLORS["graphite"]))
    draw_block(draw, 64, 140, "17 COMPOUNDS.\nZERO COMPROMISES.", 900, FONT_BOLD, 82, rgba(COLORS["bone"]), stroke=2)
    # Material chips
    mats = ["ASA", "PA11 CF", "PP-GF", "PC Blend", "PEI 1010", "TPU 95A", "PETG-CF"]
    x = 64
    y = 400
    for mat in mats:
        f = font(FONT_MONO, 24)
        box = draw.textbbox((0, 0), mat, font=f)
        w = box[2] - box[0] + 28
        draw.rounded_rectangle((x, y, x + w, y + 42), radius=12, fill=rgba(COLORS["teal"], 40))
        draw.rounded_rectangle((x, y, x + w, y + 42), radius=12, outline=rgba(COLORS["teal"], 180), width=2)
        draw.text((x + 14, y + 8), mat, font=f, fill=rgba(COLORS["teal"]))
        x += w + 12
        if x > 1050:
            break
    line(draw, (64, 530, 600, 530), rgba(COLORS["teal"]), 6)
    draw_block(draw, 64, 556, "3d3d.ca/materials", 400, FONT_MONO, 28, rgba(COLORS["teal"]))
    save(canvas, "og-materials.png")


def og_about():
    size = (1200, 630)
    bg = darken(load(RACE / "crew-helm-offshore.jpg", size), 80, 170)
    canvas = bg.copy()
    draw = ImageDraw.Draw(canvas)
    badge(draw, 64, 48, "ABOUT", rgba(COLORS["teal"], 235), rgba(COLORS["graphite"]))
    draw_block(draw, 64, 140, "20,000 NAUTICAL MILES.\n10 YEARS TURNING WRENCHES.", 900, FONT_BOLD, 68, rgba(COLORS["bone"]), stroke=2)
    draw_block(draw, 64, 380, "Offshore specialist. Professional mechanic.\nFabricator. Available worldwide.", 900, FONT_REG, 34, rgba(COLORS["bone"], 200))
    line(draw, (64, 520, 600, 520), rgba(COLORS["teal"]), 6)
    draw_block(draw, 64, 548, "3d3d.ca/about", 300, FONT_MONO, 28, rgba(COLORS["teal"]))
    save(canvas, "og-about.png")


def og_blog():
    size = (1200, 630)
    bg = darken(load(REAL / "afternoon-sail.jpg", size), 90, 180)
    canvas = bg.copy()
    draw = ImageDraw.Draw(canvas)
    badge(draw, 64, 48, "BLOG", rgba(COLORS["teal"], 235), rgba(COLORS["graphite"]))
    draw_block(draw, 64, 140, "FIELD NOTES.\nMATERIAL SCIENCE.\nOFFSHORE REALITY.", 900, FONT_BOLD, 72, rgba(COLORS["bone"]), stroke=2)
    line(draw, (64, 500, 600, 500), rgba(COLORS["teal"]), 6)
    draw_block(draw, 64, 530, "3d3d.ca/blog", 300, FONT_MONO, 28, rgba(COLORS["teal"]))
    save(canvas, "og-blog.png")


# ─── MATERIAL CARDS ───────────────────────────────────────────────────────────

MATERIAL_DATA = [
    ("ASA", "93°C", "Engineering", ["UV-stable", "Outdoor", "Marine"]),
    ("PETG-CF", ">68°C", "Engineering", ["Structural", "Stiff"]),
    ("PC Blend", "113°C", "Engineering", ["Tough", "Impact-resistant"]),
    ("PC Blend CF", "114°C", "Engineering", ["Stiff", "Heat-resistant"]),
    ("PP Glass Fiber", "138°C", "Engineering", ["Chemical-resistant", "Marine"]),
    ("PP Carbon Fiber", "120°C", "Engineering", ["Lightweight", "Structural"]),
    ("PA11 CF", "192°C", "Engineering", ["High-temp", "Automotive"]),
    ("PC Space Grade", "137°C", "Engineering", ["ESD-safe", "Low-outgassing"]),
    ("PETG V0", "68°C", "Engineering", ["Flame-retardant", "UL94 V0"]),
    ("PEI 1010", "207°C", "Elite", ["Metal-replacement", "Extreme-temp"]),
    ("TPU 95A", "78°C", "Flexible", ["Flexible", "Seals"]),
    ("PETG Magnetite", "93°C", "Specialty", ["Paramagnetic", "High-density"]),
    ("PETG Tungsten", "94°C", "Specialty", ["Radiation-shielding", "Lead-free"]),
    ("PETG", "68°C", "Standard", ["General-purpose", "Tough"]),
    ("PLA", "55°C", "Standard", ["Prototyping", "Detail"]),
    ("PVB", "<60°C", "Standard", ["Smoothable", "Transparent"]),
]

TIER_COLORS = {
    "Elite": COLORS["coral"],
    "Engineering": COLORS["teal"],
    "Flexible": "#E8A85A",
    "Specialty": "#A47CDB",
    "Standard": COLORS["gray"],
}


def material_card(name, hdt, tier, tags):
    size = (600, 400)
    canvas = Image.new("RGBA", size, rgba(COLORS["graphite"]))
    draw = ImageDraw.Draw(canvas)
    tier_color = TIER_COLORS.get(tier, COLORS["teal"])

    # Tier accent stripe
    draw.rectangle((0, 0, 8, 400), fill=rgba(tier_color))

    # Tier badge
    f_tier = font(FONT_MONO, 18)
    draw.text((28, 24), tier.upper(), font=f_tier, fill=rgba(tier_color))

    # HDT badge top right
    f_hdt = font(FONT_MONO, 20)
    hdt_box = draw.textbbox((0, 0), hdt, font=f_hdt)
    hdt_w = hdt_box[2] - hdt_box[0] + 24
    draw.rounded_rectangle((size[0] - hdt_w - 28, 18, size[0] - 28, 52), radius=10, fill=rgba(tier_color, 40))
    draw.text((size[0] - hdt_w - 16, 22), hdt, font=f_hdt, fill=rgba(tier_color))

    # Material name
    draw_block(draw, 28, 70, name.upper(), 540, FONT_BOLD, 64, rgba(COLORS["bone"]))

    # Tags
    x = 28
    y = 200
    for tag in tags[:3]:
        f_tag = font(FONT_MONO, 18)
        box = draw.textbbox((0, 0), tag, font=f_tag)
        w = box[2] - box[0] + 20
        draw.rounded_rectangle((x, y, x + w, y + 32), radius=8, fill=rgba(tier_color, 30))
        draw.rounded_rectangle((x, y, x + w, y + 32), radius=8, outline=rgba(tier_color, 120), width=1)
        draw.text((x + 10, y + 5), tag, font=f_tag, fill=rgba(tier_color))
        x += w + 8

    # Bottom line
    draw.line((28, 340, 572, 340), fill=rgba(tier_color, 80), width=2)
    draw.text((28, 356), "3D3D", font=font(FONT_MONO, 20), fill=rgba(COLORS["bone"], 160))
    draw.text((size[0] - 150, 356), "3d3d.ca", font=font(FONT_MONO, 20), fill=rgba(COLORS["teal"], 160))

    slug = name.lower().replace(" ", "-").replace("+", "")
    save(canvas, f"material-card-{slug}.png")


def all_material_cards():
    for name, hdt, tier, tags in MATERIAL_DATA:
        material_card(name, hdt, tier, tags)


def main():
    social_discontinued()
    social_marine_warning()
    social_no_cad()
    social_quote_checklist()
    social_field_deployment()
    ad_broken_part()
    story_quote_checklist()
    story_before_after()
    thumb_stop_pla()
    thumb_no_cad()
    thumb_discontinued()
    infographic_cost_savings()
    og_home()
    og_materials()
    og_about()
    og_blog()
    all_material_cards()
    print(f"Generated {len(list(OUT.glob('*.png')))} assets in {OUT}")


if __name__ == "__main__":
    main()
