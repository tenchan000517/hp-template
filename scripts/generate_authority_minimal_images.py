#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Authority Minimal Template Image Generator

Usage (Windows PowerShell):
    cd C:/Nanobanana
    ./venv/Scripts/python.exe C:/hp-template/scripts/generate_authority_minimal_images.py

Generated images:
    - Portrait photos (CEO, team members)
    - Case study images (main, sub, thumbnail)
    - OGP image (1200x630)
    - Favicon
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
    OUTPUT_DIR = Path("C:/hp-template/template-authority-minimal/public/images")
else:
    NANOBANANA_DIR = Path("/mnt/c/Nanobanana")
    OUTPUT_DIR = Path("/mnt/c/hp-template/template-authority-minimal/public/images")

# Color palette (from 01-strategy.md)
COLORS = {
    "primary": "#1E3A5F",      # Navy
    "text_main": "#1A1A1A",
    "text_body": "#333333",
    "bg_white": "#FFFFFF",
    "bg_gray": "#F5F5F5",
}

# Image generation prompts (from photo_guide.md)
PROMPTS = {
    # Portrait - CEO main
    "portrait_ceo_main": """
Professional business portrait of a Japanese male executive in his 50s,
wearing a navy blue suit with white shirt,
standing against a pure white background,
serious confident expression, not smiling,
soft studio lighting, no harsh shadows,
high-end corporate photography style,
bust shot from chest up,
camera angle slightly angled 15-30 degrees,
aspect ratio 3:4
""",

    # Portrait - CEO for team page
    "portrait_ceo_team": """
Professional business portrait of a Japanese male executive in his 50s,
wearing a navy blue suit with white shirt,
standing against a pure white background,
subtle warm smile, approachable yet professional,
soft studio lighting, no harsh shadows,
high-end corporate photography style,
bust shot from chest up,
aspect ratio 3:4
""",

    # Portrait - Female designer
    "portrait_female_designer": """
Professional business portrait of a Japanese woman in her 30s,
wearing a white blouse or light gray jacket,
standing against a pure white background,
natural warm smile, creative professional look,
soft studio lighting, no harsh shadows,
high-end corporate photography style,
bust shot from chest up,
aspect ratio 3:4
""",

    # Portrait - Male strategist
    "portrait_male_strategist": """
Professional business portrait of a Japanese man in his 40s,
wearing a navy blazer with white shirt, no tie,
standing against a pure white background,
confident slight smile, intellectual appearance,
soft studio lighting, no harsh shadows,
high-end corporate photography style,
bust shot from chest up,
aspect ratio 3:4
""",

    # Portrait - Male PM
    "portrait_male_pm": """
Professional business portrait of a Japanese man in his 30s,
wearing a gray suit with white shirt,
standing against a pure white background,
friendly professional smile,
soft studio lighting, no harsh shadows,
high-end corporate photography style,
bust shot from chest up,
aspect ratio 3:4
""",

    # Case - ABC Corporation rebranding
    "case_abc_main": """
Luxury brand identity mockup on white marble surface,
corporate logo redesign with business cards and letterhead,
minimalist elegant design, navy blue and white color scheme,
top-down view with soft shadows,
professional product photography,
high-end Japanese corporate branding,
aspect ratio 16:9
""",

    "case_abc_result": """
Corporate brand identity materials spread on light gray surface,
business cards, envelope, letterhead with minimalist logo,
navy blue and white color scheme,
elegant professional arrangement,
soft natural lighting,
product photography style,
aspect ratio 4:3
""",

    # Case - XYZ Startup branding
    "case_xyz_main": """
Modern startup brand identity on clean white desk,
laptop showing website mockup, business cards, brand guide book,
fresh contemporary design, blue accent colors,
tech startup aesthetic,
top-down angle with soft lighting,
professional product photography,
aspect ratio 16:9
""",

    "case_xyz_result": """
Startup branding materials on minimalist desk,
MacBook with website, iPhone with app, brand guidelines,
modern tech company aesthetic,
clean professional photography,
aspect ratio 4:3
""",

    # Case - DEF Clinic website
    "case_def_main": """
Medical clinic website mockup on laptop and phone,
clean modern healthcare design, white and light blue colors,
trustworthy professional medical aesthetic,
MacBook and iPhone showing responsive website,
white desk background with soft lighting,
aspect ratio 16:9
""",

    # OGP image
    "ogp": """
Elegant minimalist background for corporate OGP image,
navy blue (#1E3A5F) subtle gradient,
very refined, quiet, sophisticated design,
no text, no logos, no icons,
abstract flowing subtle lines,
Japanese business aesthetic, authoritative yet calm,
high quality professional design,
aspect ratio 16:9
""",

    # Favicon
    "favicon": """
Simple geometric symbol for favicon,
Navy blue (#1E3A5F) abstract shape on white background,
minimalist, elegant, authoritative design,
single clean geometric mark,
no text, works well at small sizes,
modern Japanese corporate identity,
aspect ratio 1:1
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


def create_favicon_sizes(image, output_dir):
    """Generate favicon in multiple sizes"""
    sizes = [
        (16, "favicon-16x16.png"),
        (32, "favicon-32x32.png"),
        (180, "apple-touch-icon.png"),
        (192, "android-chrome-192x192.png"),
        (512, "android-chrome-512x512.png"),
    ]

    for size, filename in sizes:
        resized = image.resize((size, size), Image.Resampling.LANCZOS)
        output_path = output_dir / filename
        resized.save(output_path)
        print(f"    Favicon: {filename}")


def main():
    print("=" * 60)
    print("Authority Minimal Image Generator")
    print("=" * 60)
    print(f"Output: {OUTPUT_DIR}")
    print()

    # Ensure output directory exists
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    generated_count = 0
    total_count = 0

    # ============================================================
    # 1. Portraits
    # ============================================================
    print("\n[1/4] Generating portraits...")

    portraits = [
        ("portrait_ceo_main", "philosophy/portrait.jpg", "3:4"),
        ("portrait_ceo_team", "team/yamada.jpg", "3:4"),
        ("portrait_female_designer", "team/suzuki.jpg", "3:4"),
        ("portrait_male_strategist", "team/sato.jpg", "3:4"),
        ("portrait_male_pm", "team/tanaka.jpg", "3:4"),
    ]

    for prompt_key, rel_path, aspect in portraits:
        total_count += 1
        output_path = OUTPUT_DIR / rel_path
        img = generate_image(PROMPTS[prompt_key], str(output_path), aspect)
        if img:
            # Convert to JPG
            if output_path.suffix.lower() == '.jpg':
                img.convert("RGB").save(output_path, "JPEG", quality=90)
            generated_count += 1
        time.sleep(1)  # API rate limit

    # ============================================================
    # 2. Case study images
    # ============================================================
    print("\n[2/4] Generating case study images...")

    cases = [
        # ABC Corporation
        ("case_abc_main", "case/abc/main.jpg", "16:9"),
        ("case_abc_main", "case/abc/thumbnail.jpg", "16:9"),
        ("case_abc_result", "case/abc/result-01.jpg", "4:3"),
        ("case_abc_result", "case/abc/result-02.jpg", "4:3"),
        ("case_abc_result", "case/abc/result-03.jpg", "4:3"),
        # XYZ Startup
        ("case_xyz_main", "case/xyz/main.jpg", "16:9"),
        ("case_xyz_main", "case/xyz/thumbnail.jpg", "4:3"),
        ("case_xyz_result", "case/xyz/result-01.jpg", "4:3"),
        ("case_xyz_result", "case/xyz/result-02.jpg", "4:3"),
        # DEF Clinic
        ("case_def_main", "case/def/main.jpg", "16:9"),
        ("case_def_main", "case/def/thumbnail.jpg", "4:3"),
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
    # 3. OGP image
    # ============================================================
    print("\n[3/4] Generating OGP image...")

    total_count += 1
    ogp_path = OUTPUT_DIR / "og-image.jpg"
    ogp_img = generate_image(PROMPTS["ogp"], str(ogp_path), "16:9")
    if ogp_img:
        # Resize to 1200x630
        resized = ogp_img.resize((1200, 630), Image.Resampling.LANCZOS)
        resized.convert("RGB").save(ogp_path, "JPEG", quality=90)
        generated_count += 1

    # ============================================================
    # 4. Favicon
    # ============================================================
    print("\n[4/4] Generating favicon...")

    total_count += 1
    favicon_temp = OUTPUT_DIR / "favicon-temp.png"
    favicon_img = generate_image(PROMPTS["favicon"], str(favicon_temp), "1:1")
    if favicon_img:
        create_favicon_sizes(favicon_img, OUTPUT_DIR)
        favicon_temp.unlink(missing_ok=True)
        generated_count += 1

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
