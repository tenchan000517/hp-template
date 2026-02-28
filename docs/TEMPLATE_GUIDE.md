# テンプレート化ガイド

このドキュメントは、hp-templateプロジェクトにおけるテンプレート作成・公開のルールを定義します。

---

## 1. リポジトリ命名規則

### 形式

```
template-{type}-{design}
```

### 命名パターン

| 要素 | 説明 | 例 |
|------|------|-----|
| `type` | サイトの目的・型 | leadgen, recruit, corporate, lp |
| `design` | デザインテイスト | minimal, visual, magazine, standard |

### 実例

| リポジトリ名 | 説明 |
|-------------|------|
| `template-leadgen-minimal` | リード獲得特化 × ミニマルデザイン |
| `template-authority-minimal` | 権威性訴求 × ミニマルデザイン |
| `template-trust-visual` | 信頼性訴求 × ビジュアル重視 |
| `template-recruit-magazine` | 採用サイト × マガジン風 |
| `template-fullorder` | ベーステンプレート（クローン元） |

---

## 2. GitHub設定

### リポジトリ作成

```bash
# GitHubでリポジトリを作成
# Organization: tenchan000517
# 命名: template-{type}-{design}
```

### 公開設定

| 設定項目 | 値 | 理由 |
|----------|-----|------|
| Visibility | **Public** | テンプレートとして再利用可能にする |
| Template repository | **有効** | GitHub Template機能を使用 |
| Default branch | `main` | 標準ブランチ名 |

### GitHub Template設定手順

```bash
# CLIでテンプレートリポジトリに設定
gh repo edit tenchan000517/template-{name} --template
```

または：
1. リポジトリの Settings を開く
2. 「Template repository」にチェックを入れる
3. これにより「Use this template」ボタンが表示される

---

## 3. 初期セットアップ

### ベーステンプレートからクローン

```bash
# template-fullorderをベースにクローン
cd /mnt/c/hp-template
cp -r template-fullorder template-{new-name}
cd template-{new-name}

# Git初期化（既存の履歴を削除）
rm -rf .git
git init
git add .
git commit -m "feat: 初期リリース"
git branch -M main
```

### package.json 更新

```json
{
  "name": "template-{new-name}",
  "version": "0.1.0",
  "private": false
}
```

### GitHubリポジトリ作成 & プッシュ（gh CLI）

```bash
# リポジトリ作成 + リモート設定 + プッシュを一発で実行
gh repo create tenchan000517/template-{new-name} --public --source=. --push
```

| オプション | 意味 |
|-----------|------|
| `--public` | 公開リポジトリとして作成 |
| `--source=.` | 現在のディレクトリをソースに |
| `--push` | 作成後すぐにプッシュ |

### 既存リポジトリのリモート変更

```bash
# 間違ったリモートを削除
git remote remove origin

# 新規リポジトリ作成 + プッシュ
gh repo create tenchan000517/template-{new-name} --public --source=. --push
```

### よくあるエラーと対処

| エラー | 原因 | 対処 |
|--------|------|------|
| `Repository not found` | GitHubにリポジトリがない | `gh repo create` を先に実行 |
| `remote origin already exists` | 既にremote設定済み | `git remote remove origin` してから再実行 |
| `failed to push some refs` | リモートに既存コミットがある | `git pull --rebase origin main` してからpush |

---

## 4. 必須ファイル構成

### ディレクトリ構造

```
template-{name}/
├── data/
│   └── site.json          # サイトデータ
├── public/
│   └── images/
│       ├── og-image.jpg   # OGP画像（1200x630）
│       ├── favicon-*.png  # ファビコン各サイズ
│       └── logo.png       # ロゴ
├── src/
│   ├── app/
│   │   ├── layout.tsx     # ルートレイアウト
│   │   ├── page.tsx       # TOPページ
│   │   ├── globals.css    # グローバルCSS
│   │   ├── icon.png       # Next.js自動検出ファビコン
│   │   └── api/           # APIルート（必要に応じて）
│   ├── components/        # コンポーネント
│   ├── lib/
│   │   └── site.ts        # データ読み込みヘルパー
│   └── types/
│       └── site.ts        # TypeScript型定義
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 5. SEO必須設定

### layout.tsx に含めるべき項目

```tsx
import type { Metadata, Viewport } from "next";

// JSON-LD構造化データ
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.name,
  // ...
};

export const metadata: Metadata = {
  metadataBase: new URL(meta.siteUrl),
  title: meta.siteName,
  description: meta.description,

  // canonical URL
  alternates: {
    canonical: "/",
  },

  // robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // OGP
  openGraph: {
    title: meta.siteName,
    description: meta.description,
    locale: "ja_JP",
    type: "website",
    url: meta.siteUrl,
    siteName: meta.siteName,
    images: [{ url: meta.ogImage, width: 1200, height: 630 }],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: meta.siteName,
    description: meta.description,
    images: [meta.ogImage],
  },
};

// Viewport
export const viewport: Viewport = {
  themeColor: theme.colors.primary,
};

// JSON-LDスクリプトをheadに追加
<head>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
  />
</head>
```

---

## 6. アクセシビリティ必須項目

| 項目 | 必須 | 実装場所 |
|------|------|----------|
| `lang="ja"` | ✅ | html要素 |
| `aria-label` | ✅ | ボタン、リンク |
| `aria-expanded` | ✅ | ハンバーガーメニュー |
| `alt` | ✅ | すべての画像 |
| キーボードナビゲーション | ✅ | フォーカス可能要素 |

---

## 7. コンタクトフォーム

### API Route 必須

```
src/app/api/contact/route.ts
```

### 必須機能

- [x] サーバーサイドバリデーション
- [x] エラーハンドリング
- [ ] メール送信（本番環境で設定）

---

## 8. 画像準備チェックリスト

| 画像 | サイズ | 形式 | 必須 |
|------|--------|------|------|
| OGP画像 | 1200x630 | JPG/PNG | ✅ |
| favicon-16x16 | 16x16 | PNG | ✅ |
| favicon-32x32 | 32x32 | PNG | ✅ |
| apple-touch-icon | 180x180 | PNG | ✅ |
| android-chrome-192 | 192x192 | PNG | ✅ |
| android-chrome-512 | 512x512 | PNG | ✅ |
| icon.png (src/app/) | 任意 | PNG | ✅ |
| ロゴ | 任意 | PNG/SVG | ✅ |

---

## 9. ビルド確認

### リリース前チェック

```bash
# TypeScriptエラーチェック
npm run build

# 期待される出力
# ✓ Finished TypeScript
# ✓ Collecting page data
# ✓ Generating static pages
```

### ルート確認

```
Route (app)
├ ○ /              # 静的
├ ○ /service       # 静的
├ ○ /case          # 静的
├ ○ /contact       # 静的
├ ○ /privacy       # 静的
├ ƒ /api/contact   # 動的（API）
└ ○ /icon.png      # 静的
```

---

## 10. HANDOFF.md 必須記載事項

各テンプレートの `/docs/{template-name}/HANDOFF.md` に以下を記載：

1. テンプレートコンセプト
2. 実装フェーズと進捗
3. 設計ルール
4. ファイル一覧
5. 更新履歴

---

## 11. Git コミットメッセージ規則

```
feat: 新機能追加
fix: バグ修正
docs: ドキュメント更新
style: コードスタイル変更
refactor: リファクタリング
perf: パフォーマンス改善
```

### 例

```bash
git commit -m "feat: SEO・アクセシビリティ・API改善"
git commit -m "fix: フォームバリデーションエラー修正"
git commit -m "docs: HANDOFF.md更新"
```

---

## 更新履歴

| 日付 | 内容 |
|------|------|
| 2026-02-01 | 初版作成 |
