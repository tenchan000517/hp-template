# Trust Visual テンプレート 実装ハンドオフ

## 現在の実装状況

**最終更新**: 2026-02-01
**ビルド状況**: ✅ 正常（2026-02-01 確認済み）

### 完了済み

| タスク | 状態 | ファイル |
|--------|------|----------|
| テンプレートクローン | ✅ 完了 | `/mnt/c/hp-template/template-trust-visual/` |
| globals.css カラー設定 | ✅ 完了 | `src/app/globals.css` |
| site.json 作成 | ✅ 完了 | `data/site.json` |
| lib/site.ts 型定義 | ✅ 完了 | `src/lib/site.ts` |
| 固有コンポーネント9種 | ✅ 完了 | `src/components/trust-visual/` |
| Header/Footer 更新 | ✅ 完了 | `src/components/Header.tsx`, `Footer.tsx` |
| TOPページ | ✅ 完了 | `src/app/page.tsx` |

### Phase 2 完了

| タスク | 状態 | ファイル | 参照設計書 |
|--------|------|----------|-----------|
| 選ばれる理由ページ | ✅ 完了 | `src/app/why/page.tsx` | `pages/why.md` |
| 実績紹介ページ | ✅ 完了 | `src/app/works/page.tsx` | `pages/works.md` |
| お客様の声ページ | ✅ 完了 | `src/app/voice/page.tsx` | `pages/voice.md` |
| 会社概要ページ | ✅ 完了 | `src/app/about/page.tsx` | `pages/about.md` |
| サービスページ | ✅ 完了 | `src/app/service/page.tsx` | `pages/service.md` |
| お問い合わせページ | ✅ 完了 | `src/app/contact/page.tsx` | `pages/contact.md` |

### Phase 3 完了

| タスク | 状態 | ファイル |
|--------|------|----------|
| アニメーション強化 | ✅ 完了 | `FadeInSection.tsx`, `StaggerChildren.tsx` |
| SEO設定 | ✅ 完了 | `layout.tsx`, 各ページ `layout.tsx` |
| フォーム送信機能 | ✅ 完了 | `src/app/api/contact/route.ts` |

### Phase 4 完了

| タスク | 状態 | ファイル |
|--------|------|----------|
| レスポンシブ確認・強化 | ✅ 完了 | 全コンポーネント・ページ |
| next/font導入（Lighthouse改善） | ✅ 完了 | `src/app/layout.tsx`, `globals.css` |
| アニメーション最終確認 | ✅ 完了 | `FadeInSection.tsx`, `StaggerChildren.tsx` |
| 最終ビルド確認 | ✅ 完了 | 全11ルート生成成功 |

### Phase 5: 画像生成 ✅ 完了

| タスク | 状態 | ファイル |
|--------|------|----------|
| 画像生成スクリプト作成 | ✅ 完了 | `/mnt/c/hp-template/scripts/generate_trust_visual_images.py` |
| 画像生成実行 | ✅ 完了 | 29枚生成成功 |
| site.json画像パス更新 | ✅ 完了 | `data/site.json` |
| ページファイル更新 | ✅ 完了 | 全ページからプレースホルダー削除 |
| ビルド確認 | ✅ 完了 | 全11ルート生成成功 |

#### 画像生成コマンド

```bash
cd C:/Nanobanana
./venv/Scripts/python.exe C:/hp-template/scripts/generate_trust_visual_images.py
```

#### 生成される画像（計28枚）

| カテゴリ | ファイル | 用途 |
|---------|---------|------|
| ヒーロー | `hero.jpg` | TOPページメインビジュアル |
| CEO | `ceo.jpg` | 会社概要・代表メッセージ |
| 顧客 | `customers/customer-01.jpg` 〜 `06.jpg` | お客様の声（6名） |
| 理由 | `reasons/reason-01.jpg` 〜 `03.jpg` | 選ばれる理由（3枚） |
| 実績 | `works/work-01.jpg` 〜 `12.jpg` | 実績紹介（12枚） |
| サービス | `services/service-01.jpg` 〜 `03.jpg` | サービスページ（3枚） |
| 外観 | `exterior.jpg` | 会社概要ヒーロー |
| OGP | `og-image.jpg` | SNSシェア用（1200x630） |
| Favicon | `favicon-*.png`, `apple-touch-icon.png` | ブラウザアイコン |

#### 注意事項

photo_guide.mdに記載の通り、顧客ポートレートはAI生成を推奨しません。
これらは**開発用プレースホルダー**です。本番では実写に差し替えてください。

---

## 実装完了サマリー

### アニメーション強化

以下のアニメーションコンポーネントを追加:

| コンポーネント | 用途 |
|--------------|------|
| `FadeInSection` | スクロールで画面内に入った際のフェードイン（上下左右対応） |
| `StaggerChildren` | 子要素を順番にアニメーション表示 |

既存コンポーネントへの適用:
- `ReasonBlock`: 画像とコンテンツが左右から交互にスライドイン
- `CTASection`: 見出し → サブテキスト → ボタン → 電話番号の順にフェードイン
- `TestimonialCard`: ホバー時のシャドウ強調
- `StatCounter`: カウントアップアニメーション（既存）
- `SatisfactionBar`: バーの伸長アニメーション（既存）

TOPページへの適用:
- 選ばれる理由セクション: スタガードアニメーション
- 実績ギャラリーセクション: フェードイン
- お客様の声セクション: スタガードアニメーション

### SEO設定

1. **メタデータ強化** (`src/app/layout.tsx`)
   - Open Graph タグ完全対応
   - Twitter Card 対応
   - canonical URL 設定
   - robots 設定

2. **各ページのSEO** (各 `layout.tsx`)
   - ページ固有のtitle, description
   - Open Graph 設定
   - canonical URL

3. **構造化データ** (JSON-LD)
   - LocalBusiness スキーマ
   - 会社情報、連絡先、住所を含む

### フォーム送信機能

1. **API Route** (`src/app/api/contact/route.ts`)
   - POSTリクエスト処理
   - サーバーサイドバリデーション
   - メール送信サービス連携の準備（コメント付き）
   - 開発用ログ出力

2. **フロントエンド連携** (`src/app/contact/page.tsx`)
   - API呼び出しに変更
   - エラーハンドリング
   - ローディング状態管理

### Phase 4: 仕上げ

1. **レスポンシブ確認**
   - 全ページ・コンポーネントのSP対応確認済み
   - `lg:` ブレークポイントで適切に分岐
   - Header: PC/SP分離、モバイルハンバーガーメニュー
   - Footer: 1カラム〜4カラムのレスポンシブグリッド

2. **next/font導入（Lighthouse改善）**
   - Google Fonts外部読み込みを削除
   - `next/font/google` でInter, Noto Sans JPを最適化読み込み
   - CSS変数 `--font-inter`, `--font-noto-sans-jp` を設定

3. **最終ビルド確認**
   - 全11ルート生成成功
   - TypeScriptエラーなし

---

## 実装済みコンポーネント

`src/components/trust-visual/` に以下のコンポーネントが作成済み:

| コンポーネント | 用途 |
|--------------|------|
| `StatCounter` | 実績数字のカウントアップアニメーション |
| `ClientLogos` | 取引先ロゴ一覧（グレースケール＋ホバー） |
| `EvidenceBadge` | 根拠数字のバッジ表示 |
| `TestimonialCard` | お客様の声カード（summary/detail） |
| `WorksGrid` | 実績写真グリッド（フィルター対応） |
| `ReasonBlock` | 選ばれる理由ブロック（交互レイアウト＋アニメーション） |
| `SatisfactionBar` | 満足度バーチャート |
| `CertificationBadge` | 資格・認証バッジ |
| `CTASection` | CTA セクション（dark/light＋アニメーション） |
| `FadeInSection` | スクロールフェードインアニメーション |
| `StaggerChildren` | 子要素スタガードアニメーション |

使用例:
```tsx
import { StatCounter, CTASection, FadeInSection } from "@/components/trust-visual";
```

---

## データ構造

`data/site.json` に全データが定義済み。`src/lib/site.ts` で型付きエクスポート。

```tsx
import { trustVisual, cta, company, contact, seo, siteInfo } from "@/lib/site";

// trustVisual.stats - 実績数字
// trustVisual.clientLogos - 取引先ロゴ
// trustVisual.reasons - 選ばれる理由
// trustVisual.works - 実績
// trustVisual.testimonials - お客様の声
// trustVisual.certifications - 資格・認証
// trustVisual.services - サービス
// company - 会社情報
// contact - 連絡先情報
// cta - CTAコンテンツ
// seo - SEO設定
// siteInfo - サイト基本情報
```

---

## カラー設定

`globals.css` に定義済み:

| 変数 | 色 | 用途 |
|------|-----|------|
| `--color-main` | #1e3a2f | メインカラー（ダークグリーン） |
| `--color-accent` | #c45c3e | アクセントカラー（テラコッタ） |
| `--color-bg-offwhite` | #f8f8f8 | 背景（オフホワイト） |
| `--color-bg-warm` | #f0ebe6 | 背景（ウォームグレー） |

Tailwind ユーティリティ:
- `bg-main`, `text-main`
- `bg-accent`, `text-accent`
- `bg-offwhite`, `bg-warm`

---

## 設計書一覧

| ファイル | 内容 |
|---------|------|
| `docs/trust-visual/01-strategy.md` | 全体戦略（カラー、タイポ、余白、アニメーション） |
| `docs/trust-visual/03-components.md` | コンポーネント設計（9種） |
| `docs/trust-visual/04-data.md` | site.json 構造定義 |
| `docs/trust-visual/pages/top.md` | TOPページ詳細設計 |
| `docs/trust-visual/pages/why.md` | 選ばれる理由ページ詳細設計 |
| `docs/trust-visual/pages/works.md` | 実績紹介ページ詳細設計 |
| `docs/trust-visual/pages/voice.md` | お客様の声ページ詳細設計 |
| `docs/trust-visual/pages/about.md` | 会社概要ページ詳細設計 |
| `docs/trust-visual/pages/service.md` | サービスページ詳細設計 |
| `docs/trust-visual/pages/contact.md` | お問い合わせページ詳細設計 |

---

## プレースホルダー画像

開発中は以下を使用:

```tsx
const PLACEHOLDER = {
  hero: "https://placehold.co/1920x1080/1e3a2f/ffffff?text=Hero+Image",
  work: "https://placehold.co/800x600/f8f8f8/333333?text=Work+Sample",
  person: "https://placehold.co/300x400/f0ebe6/333333?text=Photo",
};
```

---

## 本番環境への移行時の注意点

### 1. メール送信機能の設定

`src/app/api/contact/route.ts` のコメントを参照し、以下のいずれかを設定:

```bash
# Resend（推奨）
npm install resend
# .env.local に RESEND_API_KEY を設定

# または SendGrid
npm install @sendgrid/mail
# .env.local に SENDGRID_API_KEY を設定
```

### 2. 環境変数

`.env.local` に以下を設定:

```env
# メール送信サービス（いずれか）
RESEND_API_KEY=your_api_key
SENDGRID_API_KEY=your_api_key

# サイトURL（本番用）
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 3. 画像の差し替え

プレースホルダー画像を実際の画像に差し替え:
- `public/images/` に画像を配置
- `data/site.json` のパスを更新

### 4. OGP画像の作成

`public/images/og-image.jpg` を1200x630pxで作成

---

## 更新履歴

| 日付 | 内容 |
|-----|------|
| 2026-02-01 | 初版作成。全設計書完了。 |
| 2026-02-01 | Phase 1 完了、TOPページ実装完了。残り6ページは未実装。 |
| 2026-02-01 | Phase 2 完了。全6ページ実装完了。 |
| 2026-02-01 | Phase 3 完了。アニメーション強化、SEO設定、フォーム送信機能を実装。 |
| 2026-02-01 | ビルドエラー修正（StaggerChildren型エラー、OGP画像生成）。本番ビルド成功確認。 |
| 2026-02-01 | Phase 4 完了。レスポンシブ確認、next/font導入、最終ビルド確認。 |
| 2026-02-01 | Phase 5 完了。画像生成29枚、site.json更新、ビルド確認。 |

---

## 次のセッションへの引き継ぎ

**全フェーズ完了。ビルド確認済み。**

### 完了した作業

- Phase 1〜4: 基盤構築、ページ実装、アニメーション、レスポンシブ
- Phase 5: 画像生成29枚、site.json更新、ビルド確認

### 生成された画像（29枚）

| カテゴリ | ファイル |
|---------|---------|
| ヒーロー | `/images/hero.jpg` |
| CEO | `/images/ceo.jpg` |
| 顧客 | `/images/customers/customer-01.jpg` 〜 `06.jpg` |
| 理由 | `/images/reasons/reason-01.jpg` 〜 `03.jpg` |
| 実績 | `/images/works/work-01.jpg` 〜 `12.jpg` |
| サービス | `/images/services/service-01.jpg` 〜 `03.jpg` |
| 外観 | `/images/exterior.jpg` |
| OGP | `/images/og-image.jpg` |
| Favicon | 各サイズ生成済み |

### 注意事項

- 顧客ポートレート（6名）は**開発用プレースホルダー**
- 本番では実写に差し替え必須（photo_guide.md参照）

### 残タスク

現時点で未完了のタスクはありません。本番環境への移行準備が整っています。

本番移行時に必要な作業は「本番環境への移行時の注意点」セクションを参照してください。
