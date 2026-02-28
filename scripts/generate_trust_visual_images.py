#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Trust Visual Template Image Generator

Usage (Windows PowerShell):
    cd C:/Nanobanana
    ./venv/Scripts/python.exe C:/hp-template/scripts/generate_trust_visual_images.py

Generated images:
    - Hero image (main visual)
    - CEO portrait
    - Customer testimonial portraits (6)
    - Reason photos (3)
    - Works/portfolio images (12)
    - Service images (3)
    - Company exterior
    - OGP image (1200x630)
    - Favicon

Note: Trust Visual emphasizes "social proof" - customer photos should ideally be real.
      These AI-generated images are placeholders for development only.
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
    OUTPUT_DIR = Path("C:/hp-template/template-trust-visual/public/images")
else:
    NANOBANANA_DIR = Path("/mnt/c/Nanobanana")
    OUTPUT_DIR = Path("/mnt/c/hp-template/template-trust-visual/public/images")

# Color palette (from 01-strategy.md)
COLORS = {
    "main": "#1e3a2f",           # Deep Forest Green
    "accent": "#c45c3e",         # Terracotta
    "bg_offwhite": "#f8f8f8",
    "bg_warm": "#f0ebe6",
}

# Image generation prompts (based on photo_guide.md)
PROMPTS = {
    # ============================================================
    # Hero Image
    # ============================================================
    "hero": """
Professional manufacturing facility interior,
skilled Japanese workers in clean work uniforms operating precision machinery,
natural lighting from large windows, modern industrial environment,
high-quality craftsmanship, attention to detail visible,
warm professional atmosphere, clean organized workspace,
corporate documentary photography style,
aspect ratio 16:9
""",

    # ============================================================
    # CEO Portrait
    # ============================================================
    "ceo": """
Professional business portrait of a Japanese male executive in his 50s,
wearing a navy blue suit or clean work uniform,
standing in a modern factory or office setting,
calm confident expression with subtle warm smile,
soft natural lighting, professional corporate photography,
trustworthy and approachable appearance,
bust shot from chest up,
aspect ratio 3:4
""",

    # ============================================================
    # Customer Testimonial Portraits (6 people)
    # ============================================================
    "customer_01": """
Professional business portrait of a Japanese male manager in his 40s,
wearing a business suit, in an office environment,
natural confident smile, trustworthy appearance,
soft lighting, professional corporate photography,
bust shot from chest up,
aspect ratio 3:4
""",

    "customer_02": """
Professional business portrait of a Japanese female executive in her 40s,
wearing a professional blazer, in a modern office,
warm professional smile, competent appearance,
soft lighting, professional corporate photography,
bust shot from chest up,
aspect ratio 3:4
""",

    "customer_03": """
Professional business portrait of a Japanese male director in his 50s,
wearing a dark suit, in a corporate office setting,
dignified professional expression,
soft lighting, professional corporate photography,
bust shot from chest up,
aspect ratio 3:4
""",

    "customer_04": """
Professional business portrait of a Japanese male purchasing manager in his 30s,
wearing a business casual outfit, in an office,
friendly professional smile,
soft lighting, professional corporate photography,
bust shot from chest up,
aspect ratio 3:4
""",

    "customer_05": """
Professional business portrait of a Japanese female project manager in her 30s,
wearing a professional blouse, in a modern workspace,
confident warm smile,
soft lighting, professional corporate photography,
bust shot from chest up,
aspect ratio 3:4
""",

    "customer_06": """
Professional business portrait of a Japanese male engineer in his 40s,
wearing work uniform or business casual,
professional confident expression,
soft lighting, professional corporate photography,
bust shot from chest up,
aspect ratio 3:4
""",

    # ============================================================
    # Reason Photos (3)
    # ============================================================
    "reason_01": """
Experienced Japanese craftsman working on precision machinery,
decades of expertise visible in careful skilled movements,
veteran worker with focused expression,
traditional craftsmanship meets modern technology,
warm natural lighting in workshop setting,
corporate documentary photography,
aspect ratio 4:3
""",

    "reason_02": """
Quality control inspection in modern Japanese manufacturing facility,
technician using precision measuring equipment,
careful attention to detail, quality assurance process,
clean organized inspection area,
professional corporate photography,
aspect ratio 4:3
""",

    "reason_03": """
Japanese business team in meeting discussing client needs,
collaborative professional discussion,
quick response and flexible service atmosphere,
modern meeting room with whiteboards and documents,
natural lighting, corporate documentary style,
aspect ratio 4:3
""",

    # ============================================================
    # Works/Portfolio Images (12)
    # ============================================================
    "work_01": """
High-quality precision metal parts on clean white surface,
professional product photography, detailed craftsmanship visible,
manufacturing excellence, industrial components,
soft studio lighting, clean background,
aspect ratio 4:3
""",

    "work_02": """
Custom fabricated industrial equipment,
professional installation in factory setting,
high-quality manufacturing, Japanese precision engineering,
clean modern industrial environment,
corporate photography style,
aspect ratio 4:3
""",

    "work_03": """
Precision machined components arranged professionally,
high-quality surface finish visible,
manufacturing expertise, industrial parts,
product photography on neutral background,
aspect ratio 4:3
""",

    "work_04": """
Large scale industrial project completion,
custom machinery installation in client facility,
professional manufacturing delivery,
wide shot showing scale and quality,
corporate documentary photography,
aspect ratio 4:3
""",

    "work_05": """
Detailed close-up of precision manufactured parts,
excellent surface finish and tight tolerances,
Japanese manufacturing quality,
macro product photography style,
aspect ratio 4:3
""",

    "work_06": """
Assembly line of custom manufactured products,
quality control in progress,
professional manufacturing environment,
corporate industrial photography,
aspect ratio 4:3
""",

    "work_07": """
Finished industrial products ready for delivery,
professional packaging and presentation,
high-quality manufacturing output,
clean organized shipping area,
aspect ratio 4:3
""",

    "work_08": """
Technical drawings and finished parts side by side,
precision manufacturing from design to reality,
engineering excellence visible,
professional product photography,
aspect ratio 4:3
""",

    "work_09": """
CNC machining center producing precision parts,
modern manufacturing technology in action,
Japanese precision engineering,
industrial documentary photography,
aspect ratio 4:3
""",

    "work_10": """
Custom tool and die manufacturing,
skilled craftsman at work,
traditional expertise with modern equipment,
workshop environment photography,
aspect ratio 4:3
""",

    "work_11": """
Quality inspection of batch manufactured parts,
statistical quality control visible,
manufacturing excellence and consistency,
professional industrial photography,
aspect ratio 4:3
""",

    "work_12": """
Client project completion ceremony,
finished product handover moment,
successful delivery and satisfaction,
professional corporate photography,
aspect ratio 4:3
""",

    # ============================================================
    # Service Images (3)
    # ============================================================
    "service_01": """
Precision machining service in action,
CNC machine with skilled operator,
high-precision manufacturing process,
modern Japanese manufacturing facility,
industrial documentary photography,
aspect ratio 4:3
""",

    "service_02": """
Custom fabrication and welding service,
skilled welder at work in workshop,
high-quality metal fabrication,
professional industrial environment,
aspect ratio 4:3
""",

    "service_03": """
Assembly and inspection service,
technicians assembling complex equipment,
quality control checkpoints visible,
clean organized assembly area,
aspect ratio 4:3
""",

    # ============================================================
    # Company Exterior
    # ============================================================
    "exterior": """
Modern Japanese manufacturing company building exterior,
clean professional industrial facility,
company signage visible, well-maintained grounds,
sunny day with blue sky,
architectural corporate photography,
aspect ratio 16:9
""",

    # ============================================================
    # OGP Image
    # ============================================================
    "ogp": """
Elegant professional background for corporate OGP image,
deep forest green (#1e3a2f) with subtle gradient,
sophisticated minimalist design,
abstract flowing lines suggesting precision and trust,
no text, no logos, no icons,
Japanese corporate aesthetic, trustworthy and professional,
high quality design,
aspect ratio 16:9
""",

    # ============================================================
    # Favicon
    # ============================================================
    "favicon": """
Simple geometric symbol for favicon,
deep forest green (#1e3a2f) abstract shape on white background,
minimalist, trustworthy, professional design,
single clean geometric mark suggesting precision,
no text, works well at small sizes,
Japanese corporate identity style,
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
    print("Trust Visual Image Generator")
    print("=" * 60)
    print(f"Output: {OUTPUT_DIR}")
    print()

    # Ensure output directory exists
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    generated_count = 0
    total_count = 0

    # ============================================================
    # 1. Hero Image
    # ============================================================
    print("\n[1/8] Generating hero image...")

    total_count += 1
    hero_path = OUTPUT_DIR / "hero.jpg"
    hero_img = generate_image(PROMPTS["hero"], str(hero_path), "16:9")
    if hero_img:
        hero_img.convert("RGB").save(hero_path, "JPEG", quality=90)
        generated_count += 1
    time.sleep(1)

    # ============================================================
    # 2. CEO Portrait
    # ============================================================
    print("\n[2/8] Generating CEO portrait...")

    total_count += 1
    ceo_path = OUTPUT_DIR / "ceo.jpg"
    ceo_img = generate_image(PROMPTS["ceo"], str(ceo_path), "3:4")
    if ceo_img:
        ceo_img.convert("RGB").save(ceo_path, "JPEG", quality=90)
        generated_count += 1
    time.sleep(1)

    # ============================================================
    # 3. Customer Portraits
    # ============================================================
    print("\n[3/8] Generating customer portraits...")

    customers_dir = OUTPUT_DIR / "customers"
    customers_dir.mkdir(parents=True, exist_ok=True)

    for i in range(1, 7):
        total_count += 1
        prompt_key = f"customer_{i:02d}"
        output_path = customers_dir / f"customer-{i:02d}.jpg"
        img = generate_image(PROMPTS[prompt_key], str(output_path), "3:4")
        if img:
            img.convert("RGB").save(output_path, "JPEG", quality=90)
            generated_count += 1
        time.sleep(1)

    # ============================================================
    # 4. Reason Photos
    # ============================================================
    print("\n[4/8] Generating reason photos...")

    reasons_dir = OUTPUT_DIR / "reasons"
    reasons_dir.mkdir(parents=True, exist_ok=True)

    for i in range(1, 4):
        total_count += 1
        prompt_key = f"reason_{i:02d}"
        output_path = reasons_dir / f"reason-{i:02d}.jpg"
        img = generate_image(PROMPTS[prompt_key], str(output_path), "4:3")
        if img:
            img.convert("RGB").save(output_path, "JPEG", quality=90)
            generated_count += 1
        time.sleep(1)

    # ============================================================
    # 5. Works/Portfolio Images
    # ============================================================
    print("\n[5/8] Generating works images...")

    works_dir = OUTPUT_DIR / "works"
    works_dir.mkdir(parents=True, exist_ok=True)

    for i in range(1, 13):
        total_count += 1
        prompt_key = f"work_{i:02d}"
        output_path = works_dir / f"work-{i:02d}.jpg"
        img = generate_image(PROMPTS[prompt_key], str(output_path), "4:3")
        if img:
            img.convert("RGB").save(output_path, "JPEG", quality=90)
            generated_count += 1
        time.sleep(1)

    # ============================================================
    # 6. Service Images
    # ============================================================
    print("\n[6/8] Generating service images...")

    services_dir = OUTPUT_DIR / "services"
    services_dir.mkdir(parents=True, exist_ok=True)

    for i in range(1, 4):
        total_count += 1
        prompt_key = f"service_{i:02d}"
        output_path = services_dir / f"service-{i:02d}.jpg"
        img = generate_image(PROMPTS[prompt_key], str(output_path), "4:3")
        if img:
            img.convert("RGB").save(output_path, "JPEG", quality=90)
            generated_count += 1
        time.sleep(1)

    # ============================================================
    # 7. Company Exterior
    # ============================================================
    print("\n[7/8] Generating company exterior...")

    total_count += 1
    exterior_path = OUTPUT_DIR / "exterior.jpg"
    exterior_img = generate_image(PROMPTS["exterior"], str(exterior_path), "16:9")
    if exterior_img:
        exterior_img.convert("RGB").save(exterior_path, "JPEG", quality=90)
        generated_count += 1
    time.sleep(1)

    # ============================================================
    # 8. OGP Image
    # ============================================================
    print("\n[8/8] Generating OGP and favicon...")

    total_count += 1
    ogp_path = OUTPUT_DIR / "og-image.jpg"
    ogp_img = generate_image(PROMPTS["ogp"], str(ogp_path), "16:9")
    if ogp_img:
        # Resize to 1200x630
        resized = ogp_img.resize((1200, 630), Image.Resampling.LANCZOS)
        resized.convert("RGB").save(ogp_path, "JPEG", quality=90)
        generated_count += 1

    # Favicon
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
        if f.is_file() and not f.name.startswith("logo"):
            rel = f.relative_to(OUTPUT_DIR)
            size = f.stat().st_size / 1024
            print(f"  {rel} ({size:.1f} KB)")

    print("\n" + "=" * 60)
    print("IMPORTANT: These are placeholder images for development.")
    print("For production, replace customer portraits with real photos.")
    print("=" * 60)


if __name__ == "__main__":
    main()
