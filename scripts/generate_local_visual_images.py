#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Local Visual Template Image Generator

Usage (Windows PowerShell):
    cd C:/Nanobanana
    ./venv/Scripts/python.exe C:/hp-template/scripts/generate_local_visual_images.py

Generated images:
    - Hero/header images
    - Portrait photos (CEO, craftsmen)
    - Service images (exterior painting, roof, reform)
    - Before/After case study images
    - Company exterior
"""

import os
import sys
from pathlib import Path
from dotenv import load_dotenv
from google import genai
from google.genai import types
from PIL import Image
import io
import time

# Windows/WSL path support
import platform
if platform.system() == "Windows":
    NANOBANANA_DIR = Path("C:/Nanobanana")
    OUTPUT_DIR = Path("C:/hp-template/local-visual/public/images")
else:
    NANOBANANA_DIR = Path("/mnt/c/Nanobanana")
    OUTPUT_DIR = Path("/mnt/c/hp-template/local-visual/public/images")

# Color palette (from 01-strategy.md)
COLORS = {
    "primary": "#1a2744",      # Dark Navy
    "accent": "#f39c12",       # Orange
    "bg_white": "#FFFFFF",
    "bg_alt": "#f8f9fa",
}

# Image generation prompts (from photo_guide.md)
PROMPTS = {
    # ============================================================
    # Hero / Header images
    # ============================================================
    "hero_main": """
Japanese modern two-story house exterior after fresh painting,
beige and white color scheme, pristine condition,
clear blue sky with some white clouds, sunny day,
residential neighborhood in Japan, well-maintained garden,
high quality architectural photography, realistic, sharp focus,
the painted walls look fresh and glossy,
aspect ratio 16:9
""",

    "hero_craftsman": """
Japanese male painter working on house exterior wall,
back view showing him using a paint roller on scaffold,
wearing clean navy work clothes and safety helmet,
blue sky background, professional scaffolding visible,
documentary style photography, natural lighting,
focused work atmosphere,
aspect ratio 16:9
""",

    "header_service": """
Wide shot of Japanese craftsmen working on house exterior,
scaffold around a two-story house, multiple workers painting,
sunny day with blue sky, professional construction site,
safe and organized work environment,
architectural documentary photography,
aspect ratio 16:9
""",

    "header_works": """
Beautiful Japanese house exterior after complete renovation,
freshly painted walls in cream color, new roof tiles,
blue sky, residential area, professional photography,
the house looks renewed and well-maintained,
aspect ratio 16:9
""",

    "header_area": """
Scenic view of Japanese suburban residential area,
mix of modern and traditional houses, clear blue sky,
Aichi prefecture style neighborhood,
peaceful and well-maintained streets,
wide landscape photography,
aspect ratio 16:9
""",

    "header_about": """
Japanese small construction company building exterior,
clean modern office building with company signage,
parking lot with work vehicles visible,
sunny day, professional appearance,
architectural photography,
aspect ratio 16:9
""",

    # ============================================================
    # Portrait photos
    # ============================================================
    "ceo_portrait": """
Professional portrait of Japanese male company president in his 50s,
wearing clean navy work clothes with company logo,
warm and trustworthy smile, confident posture,
standing in front of blurred office/warehouse background,
natural lighting, professional business portrait,
bust shot from chest up, slight 45 degree angle,
aspect ratio 3:4
""",

    "staff_01": """
Professional portrait of Japanese male craftsman in his 30s,
wearing clean navy work clothes, safety helmet in hand,
confident smile, arms crossed,
construction site blurred background,
natural lighting, professional portrait,
bust shot, shows expertise and reliability,
aspect ratio 3:4
""",

    "staff_02": """
Professional portrait of Japanese male craftsman in his 40s,
wearing clean navy work clothes,
experienced warm smile, approachable expression,
paint tools visible, workshop background blurred,
natural lighting, professional portrait,
bust shot, veteran craftsman appearance,
aspect ratio 3:4
""",

    "craftsman_working": """
Japanese craftsman painting house exterior wall,
side view showing concentration on work,
using paint roller, wearing work clothes and helmet,
professional scaffolding, blue sky visible,
documentary photography style, natural lighting,
shows dedication and skill,
aspect ratio 4:3
""",

    # ============================================================
    # Service images
    # ============================================================
    "service_exterior": """
Japanese two-story house with freshly painted exterior walls,
cream/beige color, clean and glossy finish,
blue sky background, residential area,
before and after renovation quality,
professional architectural photography,
aspect ratio 4:3
""",

    "service_roof": """
Japanese house with new roof tiles installed,
dark gray or brown roof tiles gleaming in sunlight,
blue sky background, the roof looks brand new,
professional roofing work completed,
architectural photography from slight low angle,
aspect ratio 4:3
""",

    "service_reform": """
Modern Japanese bathroom after renovation,
clean white tiles, new bathtub and fixtures,
bright and clean atmosphere, natural lighting,
contemporary Japanese home interior style,
interior photography, warm and inviting,
aspect ratio 4:3
""",

    # ============================================================
    # Case study Before/After images
    # ============================================================
    # Case 1: Okazaki exterior painting
    "work_01_before": """
Japanese two-story house with aged and faded exterior walls,
paint peeling slightly, color faded to dull beige,
shows weathering and age but not severely damaged,
overcast or neutral lighting, needs renovation,
realistic documentary photography,
aspect ratio 16:9
""",

    "work_01_after": """
Japanese two-story house with freshly painted exterior walls,
bright cream beige color, glossy fresh finish,
same house structure as before, completely renewed look,
blue sky sunny day, looks brand new,
professional architectural photography,
aspect ratio 16:9
""",

    # Case 2: Toyota roof work
    "work_02_before": """
Japanese house roof showing age and wear,
faded roof tiles, some moss visible,
the roof needs maintenance and renewal,
overcast lighting, realistic condition,
documentary photography,
aspect ratio 16:9
""",

    "work_02_after": """
Japanese house with brand new roof tiles,
dark gray tiles gleaming in sunlight,
completely renewed roof, professional work,
blue sky background, pristine condition,
architectural photography,
aspect ratio 16:9
""",

    # Case 3: Anjo reform
    "work_03_before": """
Old Japanese bathroom interior needing renovation,
dated fixtures, old tiles, shows age,
typical aging Japanese home bathroom,
not severely damaged but clearly outdated,
interior documentary photography,
aspect ratio 16:9
""",

    "work_03_after": """
Newly renovated modern Japanese bathroom,
white clean tiles, new bathtub and shower,
bright and fresh atmosphere, contemporary design,
complete transformation, sparkling clean,
interior photography with natural lighting,
aspect ratio 16:9
""",

    # Case 4-6: Additional exterior cases
    "work_04_before": """
Japanese house with weathered exterior paint,
faded walls showing age, minor cracks visible,
needs professional repainting,
neutral lighting, realistic documentation,
aspect ratio 16:9
""",

    "work_04_after": """
Same Japanese house with fresh exterior paint,
bright white and gray color scheme,
completely renewed appearance, professional finish,
sunny day with blue sky,
architectural photography,
aspect ratio 16:9
""",

    "work_05_before": """
Japanese house roof with aged tiles,
color faded, some tiles displaced,
needs professional roof maintenance,
overcast sky, realistic condition,
documentary photography,
aspect ratio 16:9
""",

    "work_05_after": """
Japanese house with professionally repainted roof,
heat-reflective coating applied, fresh appearance,
tiles look renewed and protected,
sunny day, professional work visible,
architectural photography,
aspect ratio 16:9
""",

    "work_06_before": """
Japanese house exterior with aging waterproofing,
balcony and walls showing water damage signs,
needs waterproofing treatment,
neutral lighting, realistic documentation,
aspect ratio 16:9
""",

    "work_06_after": """
Japanese house with renewed waterproofing treatment,
clean exterior, protected balcony and walls,
professional waterproofing completed,
sunny day, well-maintained appearance,
architectural photography,
aspect ratio 16:9
""",

    # ============================================================
    # Gallery images for case details
    # ============================================================
    "gallery_pressure_wash": """
High pressure water cleaning of house exterior wall,
water spray visible, cleaning in progress,
Japanese craftsman operating pressure washer,
before painting preparation work,
documentary photography,
aspect ratio 4:3
""",

    "gallery_painting_detail": """
Close up of Japanese craftsman painting wall detail,
using brush for careful edge work,
shows precision and attention to detail,
professional painting technique,
documentary photography,
aspect ratio 4:3
""",

    "gallery_scaffold": """
Professional scaffold setup around Japanese house,
safe and organized construction site,
workers visible on scaffold,
blue sky background, professional work,
documentary photography,
aspect ratio 4:3
""",

    "gallery_wall_texture": """
Close up of freshly painted exterior wall surface,
showing smooth finish and quality texture,
cream beige color, professional result,
macro/detail photography,
aspect ratio 4:3
""",

    # ============================================================
    # Company / Facility images
    # ============================================================
    "company_exterior": """
Japanese small construction company office building,
clean modern facade, company signage visible,
parking lot with branded work vehicles,
sunny day, professional business appearance,
architectural photography,
aspect ratio 16:9
""",

    "company_vehicles": """
Row of Japanese construction company work vehicles,
white vans with company logo/name on side,
parked neatly in company parking lot,
sunny day, organized and professional,
documentary photography,
aspect ratio 16:9
""",

    # ============================================================
    # OGP image
    # ============================================================
    "ogp": """
Elegant background for corporate OGP image,
dark navy blue (#1a2744) with subtle orange (#f39c12) accent,
abstract architectural lines suggesting house/roof shape,
professional Japanese construction company aesthetic,
minimalist, modern, trustworthy design,
no text, no logos, pure abstract background,
high quality corporate design,
aspect ratio 16:9
""",
}


def generate_image(prompt, output_path, aspect_ratio="1:1", retries=3):
    """Generate and save an image"""

    load_dotenv(NANOBANANA_DIR / ".env")
    client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

    print(f"  Generating: {Path(output_path).name}")

    for attempt in range(retries):
        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash-image",
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_modalities=['IMAGE'],
                    image_config=types.ImageConfig(aspect_ratio=aspect_ratio)
                )
            )

            if not response.candidates or not response.candidates[0].content:
                print(f"    Warning: Generation failed (attempt {attempt + 1}/{retries})")
                time.sleep(2)
                continue

            for part in response.candidates[0].content.parts:
                if hasattr(part, 'inline_data'):
                    image = Image.open(io.BytesIO(part.inline_data.data))

                    # Ensure output directory exists
                    Path(output_path).parent.mkdir(parents=True, exist_ok=True)

                    image.save(output_path)
                    print(f"    Saved: {output_path}")
                    return image

        except Exception as e:
            print(f"    Error: {e}")
            if attempt < retries - 1:
                print(f"    Retrying... ({attempt + 2}/{retries})")
                time.sleep(3)

    return None


def main():
    print("=" * 60)
    print("Local Visual Image Generator")
    print("=" * 60)
    print(f"Output: {OUTPUT_DIR}")
    print()

    # Ensure output directory exists
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    generated_count = 0
    total_count = 0

    # ============================================================
    # 1. Hero / Header images
    # ============================================================
    print("\n[1/6] Generating hero & header images...")

    headers = [
        ("hero_main", "hero-main.jpg", "16:9"),
        ("hero_craftsman", "hero-craftsman.jpg", "16:9"),
        ("header_service", "service-hero.jpg", "16:9"),
        ("header_works", "works-hero.jpg", "16:9"),
        ("header_area", "area-hero.jpg", "16:9"),
        ("header_about", "about-hero.jpg", "16:9"),
    ]

    for prompt_key, rel_path, aspect in headers:
        total_count += 1
        output_path = OUTPUT_DIR / rel_path
        img = generate_image(PROMPTS[prompt_key], str(output_path), aspect)
        if img:
            img.convert("RGB").save(output_path, "JPEG", quality=90)
            generated_count += 1
        time.sleep(1)

    # ============================================================
    # 2. Portrait photos
    # ============================================================
    print("\n[2/6] Generating portraits...")

    portraits = [
        ("ceo_portrait", "ceo-portrait.jpg", "3:4"),
        ("staff_01", "staff/staff-01.jpg", "3:4"),
        ("staff_02", "staff/staff-02.jpg", "3:4"),
        ("craftsman_working", "craftsman.jpg", "4:3"),
    ]

    for prompt_key, rel_path, aspect in portraits:
        total_count += 1
        output_path = OUTPUT_DIR / rel_path
        img = generate_image(PROMPTS[prompt_key], str(output_path), aspect)
        if img:
            img.convert("RGB").save(output_path, "JPEG", quality=90)
            generated_count += 1
        time.sleep(1)

    # ============================================================
    # 3. Service images
    # ============================================================
    print("\n[3/6] Generating service images...")

    services = [
        ("service_exterior", "service-exterior.jpg", "4:3"),
        ("service_roof", "service-roof.jpg", "4:3"),
        ("service_reform", "service-reform.jpg", "4:3"),
    ]

    for prompt_key, rel_path, aspect in services:
        total_count += 1
        output_path = OUTPUT_DIR / rel_path
        img = generate_image(PROMPTS[prompt_key], str(output_path), aspect)
        if img:
            img.convert("RGB").save(output_path, "JPEG", quality=90)
            generated_count += 1
        time.sleep(1)

    # ============================================================
    # 4. Case study Before/After images
    # ============================================================
    print("\n[4/6] Generating case study images...")

    cases = [
        # Case 1: Okazaki exterior
        ("work_01_before", "works/work-01-before.jpg", "16:9"),
        ("work_01_after", "works/work-01-after.jpg", "16:9"),
        # Case 2: Toyota roof
        ("work_02_before", "works/work-02-before.jpg", "16:9"),
        ("work_02_after", "works/work-02-after.jpg", "16:9"),
        # Case 3: Anjo reform
        ("work_03_before", "works/work-03-before.jpg", "16:9"),
        ("work_03_after", "works/work-03-after.jpg", "16:9"),
        # Case 4: Kariya exterior
        ("work_04_before", "works/work-04-before.jpg", "16:9"),
        ("work_04_after", "works/work-04-after.jpg", "16:9"),
        # Case 5: Nishio roof
        ("work_05_before", "works/work-05-before.jpg", "16:9"),
        ("work_05_after", "works/work-05-after.jpg", "16:9"),
        # Case 6: Okazaki waterproof
        ("work_06_before", "works/work-06-before.jpg", "16:9"),
        ("work_06_after", "works/work-06-after.jpg", "16:9"),
    ]

    for prompt_key, rel_path, aspect in cases:
        total_count += 1
        output_path = OUTPUT_DIR / rel_path
        img = generate_image(PROMPTS[prompt_key], str(output_path), aspect)
        if img:
            img.convert("RGB").save(output_path, "JPEG", quality=90)
            generated_count += 1
        time.sleep(1)

    # ============================================================
    # 5. Gallery images
    # ============================================================
    print("\n[5/6] Generating gallery images...")

    gallery = [
        ("gallery_pressure_wash", "works/work-01-gallery-01.jpg", "4:3"),
        ("gallery_painting_detail", "works/work-01-gallery-02.jpg", "4:3"),
        ("gallery_scaffold", "works/work-01-gallery-03.jpg", "4:3"),
        ("gallery_wall_texture", "works/work-01-gallery-04.jpg", "4:3"),
    ]

    for prompt_key, rel_path, aspect in gallery:
        total_count += 1
        output_path = OUTPUT_DIR / rel_path
        img = generate_image(PROMPTS[prompt_key], str(output_path), aspect)
        if img:
            img.convert("RGB").save(output_path, "JPEG", quality=90)
            generated_count += 1
        time.sleep(1)

    # ============================================================
    # 6. Company / OGP images
    # ============================================================
    print("\n[6/6] Generating company & OGP images...")

    company = [
        ("company_exterior", "company-exterior.jpg", "16:9"),
        ("company_vehicles", "company-vehicles.jpg", "16:9"),
        ("ogp", "og-image.jpg", "16:9"),
    ]

    for prompt_key, rel_path, aspect in company:
        total_count += 1
        output_path = OUTPUT_DIR / rel_path
        img = generate_image(PROMPTS[prompt_key], str(output_path), aspect)
        if img:
            if rel_path == "og-image.jpg":
                # OGP is 1200x630
                resized = img.resize((1200, 630), Image.Resampling.LANCZOS)
                resized.convert("RGB").save(output_path, "JPEG", quality=90)
            else:
                img.convert("RGB").save(output_path, "JPEG", quality=90)
            generated_count += 1
        time.sleep(1)

    # ============================================================
    # Create placeholder thumbnails (using after images)
    # ============================================================
    print("\n[Bonus] Creating thumbnails from after images...")

    # Create work thumbnails from after images
    for i in range(1, 7):
        after_path = OUTPUT_DIR / f"works/work-0{i}-after.jpg"
        thumb_path = OUTPUT_DIR / f"works/work-0{i}.jpg"
        if after_path.exists():
            img = Image.open(after_path)
            # Crop to square for thumbnail
            width, height = img.size
            size = min(width, height)
            left = (width - size) // 2
            top = (height - size) // 2
            cropped = img.crop((left, top, left + size, top + size))
            cropped.save(thumb_path, "JPEG", quality=85)
            print(f"    Created thumbnail: {thumb_path.name}")

    # ============================================================
    # Report
    # ============================================================
    print("\n" + "=" * 60)
    print(f"Complete! ({generated_count}/{total_count})")
    print("=" * 60)

    print("\nGenerated files:")
    for f in sorted(OUTPUT_DIR.rglob("*")):
        if f.is_file():
            rel = f.relative_to(OUTPUT_DIR)
            size = f.stat().st_size / 1024
            print(f"  {rel} ({size:.1f} KB)")


if __name__ == "__main__":
    main()
