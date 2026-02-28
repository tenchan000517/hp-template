#!/usr/bin/env python3
"""
LeadGen Minimal テンプレート用画像生成スクリプト

使用方法:
    cd /mnt/c/Nanobanana
    source venv/bin/activate
    python /mnt/c/hp-template/scripts/generate_leadgen_minimal_images.py

生成される画像:
    - OGP画像（1200x630）: 抽象的なミニマルデザイン
    - ファビコン用シンボル（512x512）: シンプルな幾何学模様
"""

import os
import sys
from pathlib import Path
from dotenv import load_dotenv
from google import genai
from google.genai import types
from PIL import Image
import io

# Nanobananaの.envを読み込む（Windows/WSL両対応）
import platform
if platform.system() == "Windows":
    NANOBANANA_DIR = Path("C:/Nanobanana")
    OUTPUT_DIR = Path("C:/hp-template/template-leadgen-minimal/public/images")
else:
    NANOBANANA_DIR = Path("/mnt/c/Nanobanana")
    OUTPUT_DIR = Path("/mnt/c/hp-template/template-leadgen-minimal/public/images")

# カラーパレット（photo_guide.mdより）
COLORS = {
    "primary": "#1a1a2e",  # ダークネイビー
    "accent": "#c45c3e",   # テラコッタ
    "background": "#FFFFFF",
    "background_alt": "#f8f8f8",
}

# 画像生成プロンプト
PROMPTS = {
    "ogp": """
Minimalist abstract background for OGP image.
Dark navy blue (#1a1a2e) background with subtle geometric patterns.
Very clean, professional, elegant design.
No text, no logos, no icons.
Soft gradients from dark navy to slightly lighter navy.
Abstract flowing lines or subtle wave patterns.
Corporate, trustworthy, sophisticated mood.
Japanese business aesthetic.
High quality, modern minimalist design.
""",

    "favicon": """
Simple geometric symbol for favicon.
Dark navy blue (#1a1a2e) color on white background.
Minimalist, abstract, professional design.
Single clean geometric shape.
No text, no complex details.
Works well at small sizes (16x16 pixels).
Modern, elegant, corporate identity.
Japanese business aesthetic.
""",

    "ogp_with_pattern": """
Elegant OGP image background with minimal geometric pattern.
Main color: dark navy blue (#1a1a2e).
Subtle accent: terracotta (#c45c3e) used sparingly.
Abstract, flowing, organic geometric shapes.
Very refined, luxurious, calm impression.
No text, no faces, no icons.
Clean negative space.
Professional Japanese corporate design.
""",
}


def generate_image(prompt: str, output_path: str, aspect_ratio: str = "1:1") -> Image.Image | None:
    """画像を生成して保存する"""

    load_dotenv(NANOBANANA_DIR / ".env")
    client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

    print(f"生成中: {output_path}")
    print(f"アスペクト比: {aspect_ratio}")

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
            print(f"エラー: 画像生成に失敗しました")
            return None

        for part in response.candidates[0].content.parts:
            if hasattr(part, 'inline_data'):
                image = Image.open(io.BytesIO(part.inline_data.data))

                # 出力ディレクトリを確保
                Path(output_path).parent.mkdir(parents=True, exist_ok=True)

                image.save(output_path)
                print(f"保存完了: {output_path}")
                return image

    except Exception as e:
        print(f"エラー: {e}")
        return None

    return None


def resize_for_ogp(image: Image.Image, output_path: str):
    """OGP用にリサイズ（1200x630）"""
    target_size = (1200, 630)
    resized = image.resize(target_size, Image.Resampling.LANCZOS)
    resized.save(output_path)
    print(f"OGPサイズにリサイズ: {output_path}")


def create_favicon_sizes(image: Image.Image, output_dir: Path):
    """ファビコン用の各サイズを生成"""
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
        print(f"ファビコン生成: {output_path}")


def main():
    print("=" * 60)
    print("LeadGen Minimal 画像生成")
    print("=" * 60)
    print(f"出力先: {OUTPUT_DIR}")
    print()

    # 出力ディレクトリ確認
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # 1. OGP画像生成
    print("\n[1/2] OGP画像を生成中...")
    ogp_temp = OUTPUT_DIR / "ogp-temp.png"
    ogp_final = OUTPUT_DIR / "og-image.jpg"

    ogp_image = generate_image(
        PROMPTS["ogp_with_pattern"],
        str(ogp_temp),
        aspect_ratio="16:9"  # 1200x630に近い
    )

    if ogp_image:
        # 1200x630にリサイズしてJPGで保存
        target_size = (1200, 630)
        resized = ogp_image.resize(target_size, Image.Resampling.LANCZOS)
        resized.convert("RGB").save(ogp_final, "JPEG", quality=90)
        print(f"OGP画像完成: {ogp_final}")

        # 一時ファイル削除
        ogp_temp.unlink(missing_ok=True)

    # 2. ファビコン用シンボル生成
    print("\n[2/2] ファビコン用シンボルを生成中...")
    favicon_temp = OUTPUT_DIR / "favicon-temp.png"

    favicon_image = generate_image(
        PROMPTS["favicon"],
        str(favicon_temp),
        aspect_ratio="1:1"
    )

    if favicon_image:
        create_favicon_sizes(favicon_image, OUTPUT_DIR)

        # 一時ファイル削除
        favicon_temp.unlink(missing_ok=True)

    print("\n" + "=" * 60)
    print("生成完了!")
    print("=" * 60)
    print("\n生成されたファイル:")
    for f in OUTPUT_DIR.glob("*"):
        if f.is_file():
            size = f.stat().st_size / 1024
            print(f"  {f.name} ({size:.1f} KB)")


if __name__ == "__main__":
    main()
