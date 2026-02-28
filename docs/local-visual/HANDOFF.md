# Local Visual テンプレート HANDOFF

## 設計ドキュメント完了状況

| ファイル | 状態 | 内容 |
|---------|-----|------|
| `01-strategy.md` | 完了 | 全体戦略（カラー、タイポグラフィ、余白、アニメーション） |
| `pages/top.md` | 完了 | TOPページ詳細設計（6セクション） |
| `pages/service.md` | 完了 | サービスページ詳細設計（6セクション） |
| `pages/area.md` | 完了 | 対応エリアページ詳細設計（6セクション） |
| `pages/works.md` | 完了 | 施工事例ページ詳細設計（一覧7セクション + 詳細7セクション） |
| `pages/about.md` | 完了 | 会社概要ページ詳細設計（8セクション） |
| `pages/contact.md` | 完了 | お問い合わせページ詳細設計（5セクション + サンクスページ） |
| `03-components.md` | 完了 | コンポーネント設計（12コンポーネント） |
| `04-data.md` | 完了 | site.json構造定義 |
| `photo_guide.md` | 完了 | 撮影ディレクション（全素材網羅） |

---

## 実装進捗状況

### Phase 1: 基盤構築 ✅ 完了

- [x] テンプレートクローン（template-fullorder → local-visual）
- [x] site.json 構造作成（`04-data.md` 参照）
- [x] globals.css カラー設定（`01-strategy.md` セクション1-2参照）
  - メインカラー: #1a2744（ダークネイビー）
  - アクセントカラー: #f39c12（オレンジ）
- [x] フォント設定（Noto Sans JP 400,500,600,700,900）
- [x] 共通コンポーネント準備（Header, Footer 調整）
- [x] 依存パッケージ追加（lucide-react, framer-motion）

### Phase 2: コアコンポーネント実装 ✅ 完了

- [x] `HeroVisual` - ファーストビュー（`03-components.md` #1）
- [x] `StatsCounter` - 実績数字カウンター（`03-components.md` #2）
- [x] `PageHeader` - 下層ページヘッダー（`03-components.md` #7）
- [x] `CTASection` - 問い合わせ誘導（`03-components.md` #8）
- [x] `PhoneButton` - 電話ボタン（`03-components.md` #6）

### Phase 3: ページ実装 ✅ 完了

1. **TOPページ（/）** ✅ 完了
   - 参照: `pages/top.md`
   - 6セクション実装済み（Hero, Services, Works, Reasons, Area, CTA）

2. **お問い合わせページ（/contact）** ✅ 完了
   - 参照: `pages/contact.md`
   - 5セクション実装済み（Header, ContactMethod, Form, FAQ, CompanyInfo）
   - サンクスページ（/contact/thanks）も実装済み
   - react-hook-form + zod によるバリデーション

3. **会社概要ページ（/about）** ✅ 完了
   - 参照: `pages/about.md`
   - 8セクション実装済み（Header, CEO Greeting, Philosophy, Info, History, Certifications, Access, CTA）

4. **サービスページ（/service）** ✅ 完了
   - 参照: `pages/service.md`
   - 6セクション実装済み（Header, ServiceCards, AdditionalServices, Pricing, Process, CTA）

5. **対応エリアページ（/area）** ✅ 完了
   - 参照: `pages/area.md`
   - 6セクション実装済み（Header, AreaMap, AreaList, OutsideArea, CompanyLocation, CTA）

6. **施工事例ページ（/works, /works/[slug]）** ✅ 完了
   - 参照: `pages/works.md`
   - 一覧: 4セクション（Header, Filter, Grid, CTA）
   - 詳細: 7セクション（BeforeAfter, Info, Gallery, CustomerVoice, StaffComment, Related, CTA）

### Phase 4: 追加コンポーネント・仕上げ ✅ 完了

- [x] `WorksGrid` 実装
- [x] `ServiceCard` 実装
- [x] `BeforeAfter` 実装
- [x] `AreaMap` 実装（愛知県西三河エリアのインタラクティブSVG地図）
- [x] `Timeline` 実装
- [x] `Accordion` 実装
- [x] `ImageGallery` 実装
- [ ] レスポンシブ調整（ブラウザで目視確認が必要）
- [x] SEO設定（meta title/description 全ページ設定済み）
- [x] 構造化データ設定（LocalBusiness, Organization, WebSite）
- [x] sitemap.xml 生成（`src/app/sitemap.ts`）
- [x] robots.txt 設定（`src/app/robots.ts`）

---

## 次セッションの開始手順

### 1. 現在の実装状況を確認

```bash
cd /mnt/c/hp-template/local-visual
npx tsc --noEmit  # 型チェック
```

### 2. 次に実装するページの設計書を読む

```bash
# お問い合わせページの場合
cat /mnt/c/hp-template/docs/local-visual/pages/contact.md
```

### 3. 必要なコンポーネントを確認

```bash
cat /mnt/c/hp-template/docs/local-visual/03-components.md
```

---

## 実装済みファイル一覧

### データ・設定

| ファイル | 内容 |
|---------|------|
| `data/site.json` | Local Visual用サイトデータ |
| `src/lib/site.ts` | 型定義・ヘルパー関数 |
| `src/app/globals.css` | カラー・フォント・ユーティリティ |

### コンポーネント

| ファイル | 内容 |
|---------|------|
| `src/components/Header.tsx` | ヘッダー（電話番号強調） |
| `src/components/Footer.tsx` | フッター |
| `src/components/HeroVisual.tsx` | ファーストビュー |
| `src/components/StatsCounter.tsx` | 数字カウントアップ |
| `src/components/PageHeader.tsx` | 下層ページヘッダー |
| `src/components/CTASection.tsx` | CTA誘導セクション |
| `src/components/PhoneButton.tsx` | 電話ボタン |
| `src/components/Accordion.tsx` | アコーディオンFAQ |
| `src/components/ContactForm.tsx` | お問い合わせフォーム（react-hook-form + zod） |
| `src/components/Timeline.tsx` | 沿革タイムライン |
| `src/components/ServiceCard.tsx` | サービスカード（ジグザグレイアウト） |
| `src/components/WorksGrid.tsx` | 施工事例グリッド |
| `src/components/BeforeAfter.tsx` | ビフォーアフター比較スライダー |
| `src/components/ImageGallery.tsx` | 画像ギャラリー（ライトボックス付き） |
| `src/components/AreaMap.tsx` | 対応エリア地図（愛知県西三河エリアSVG） |
| `src/components/StructuredData.tsx` | 構造化データ（JSON-LD） |

### ページ

| ファイル | 内容 |
|---------|------|
| `src/app/page.tsx` | TOPページ（6セクション） |
| `src/app/opengraph-image.tsx` | OGP画像生成 |
| `src/app/contact/page.tsx` | お問い合わせページ（5セクション） |
| `src/app/contact/thanks/page.tsx` | 送信完了サンクスページ |
| `src/app/contact/thanks/layout.tsx` | サンクスページレイアウト（noindex設定） |
| `src/app/about/page.tsx` | 会社概要ページ（8セクション） |
| `src/app/service/page.tsx` | サービスページ（6セクション） |
| `src/app/area/page.tsx` | 対応エリアページ（6セクション） |
| `src/app/works/page.tsx` | 施工事例一覧ページ（4セクション） |
| `src/app/works/layout.tsx` | 施工事例レイアウト（metadata設定） |
| `src/app/works/[slug]/page.tsx` | 施工事例詳細ページ（7セクション） |
| `src/app/sitemap.ts` | サイトマップ自動生成 |
| `src/app/robots.ts` | robots.txt自動生成 |

---

## 画像準備

### 撮影の場合

`photo_guide.md` をカメラマンに共有。

**最低限必要な画像**:
- メインビジュアル 1-2枚
- 代表者ポートレート 1枚
- 職人ポートレート 2-3枚
- サービス画像 3枚（外壁塗装、屋根工事、リフォーム）
- 施工事例 6件分（Before/After各1枚 + ギャラリー3枚）
- 会社外観 1枚
- ロゴ（PNG透過）

### AI生成の場合

実装完了後、`photo_guide.md` を元に Nanobanana 用スクリプトを作成：

```bash
# Nanobanana: /mnt/c/Nanobanana/generate_image.py
# photo_guide.md セクション8「AI画像生成の場合」のプロンプト例を参照
```

**生成優先順位**:
1. メインビジュアル（hero_01.jpg）
2. サービス画像 3枚
3. 施工事例 Before/After 6セット
4. 代表者・職人ポートレート

---

## 技術スタック

| 項目 | 値 |
|-----|---|
| フレームワーク | Next.js 16.x (App Router) |
| スタイル | Tailwind CSS 4.x |
| アニメーション | Framer Motion 12.x |
| 画像 | next/image |
| フォント | Noto Sans JP (Google Fonts) |
| アイコン | Lucide React |
| フォーム | React Hook Form + Zod（推奨） |

---

## 重要な設計判断

### カラー設定

```css
/* globals.css @theme 内 */
--color-primary: #1a2744;      /* ダークネイビー */
--color-primary-dark: #141d33;
--color-accent: #f39c12;       /* オレンジ（CTA用） */
--color-accent-dark: #d35400;
--color-background: #ffffff;   /* 白 */
--color-background-alt: #f8f9fa; /* オフホワイト */
--color-background-warm: #f5f3f0; /* ライトベージュ */
--color-text: #1a2744;         /* 本文 */
--color-text-muted: #6b7280;   /* 補足テキスト */
```

### 余白の基準

| 種類 | PC | SP |
|-----|---|---|
| セクション間 | 100px | 64px |
| コンテナ左右 | 80px | 24px |
| 要素間（大） | 48px | 32px |
| 要素間（中） | 24px | 16px |
| 要素間（小） | 16px | 12px |

### ブレイクポイント

| 名前 | 値 | 用途 |
|-----|---|------|
| md | 768px | SP/PC切り替え |
| lg | 1024px | 3カラムレイアウト |

---

## チェックリスト（実装完了時）

### 機能

- [x] 全ページが表示される - 全6ページ実装済み
- [x] ナビゲーションが動作する
- [x] 電話番号がタップで発信される（SP）- Header, PhoneButton実装済み
- [x] 問い合わせフォームが送信できる - ContactForm実装済み（バリデーション付き）
- [x] 施工事例のフィルターが動作する - WorksGrid実装済み
- [x] ライトボックスが動作する（施工事例詳細）- ImageGallery実装済み

### デザイン

- [x] TOPページでレスポンシブが正しく動作する
- [x] カラーが設計通り（`01-strategy.md` 1-2参照）
- [x] アニメーションが設計通り（`01-strategy.md` 1-5参照）
- [ ] 全ページでレスポンシブが正しく動作する

### SEO

- [x] 全ページにmeta title/description設定
- [x] OGP画像設定（opengraph-image.tsx）
- [x] 構造化データ設定（LocalBusiness, Organization, WebSite）
- [x] sitemap.xml 生成（sitemap.ts）
- [x] robots.txt 設定（robots.ts）
- [x] metadataBase 設定（site.json の seo.siteUrl を使用）

### パフォーマンス

- [ ] 画像が最適化されている（WebP）
- [ ] Lighthouse スコア 90+ （Performance）
- [ ] Core Web Vitals 合格

---

## 注意事項

1. **写真の品質**: このテンプレートは「Visual Impact」がコンセプト。写真のクオリティが低いとサイト全体の印象が下がる。

2. **電話番号**: 全ページでヘッダーとCTAに電話番号を配置。SPでは固定フローティングボタンも実装済み。

3. **地域名**: MEO/SEO効果のため、各ページに地域名を自然に含める。

4. **施工事例**: 最低6件のBefore/After写真が必要。件数が少ないとサイトの説得力が下がる。

5. **アニメーション**: 過剰にならないよう注意。`01-strategy.md` 1-5の基準を守る。

6. **本番デプロイ時**: `data/site.json` の `seo.siteUrl` を本番ドメインに変更すること（現在は `https://example.com`）。

---

## テンプレート化チェックリスト

### Phase T1: SEO設定追加 ✅ 完了
- [x] viewport設定（themeColor）
- [x] JSON-LD構造化データ強化（LocalBusiness完全版）
- [x] robots設定強化
- [x] Twitter Card設定
- [x] canonical URL設定

### Phase T2: API Route作成 ✅ 完了
- [x] `/api/contact/route.ts` 作成
- [x] サーバーサイドバリデーション
- [x] エラーハンドリング

### Phase T3: favicon生成 ✅ 完了
- [x] favicon-16x16.png
- [x] favicon-32x32.png
- [x] apple-touch-icon.png (180x180)
- [x] android-chrome-192x192.png
- [x] android-chrome-512x512.png
- [x] src/app/icon.png

### Phase T4: アクセシビリティ ✅ 完了
- [x] `lang="ja"` 確認
- [x] `aria-label` 確認（ボタン、リンク）
- [x] `aria-expanded` 確認（ハンバーガーメニュー）
- [x] `alt` 確認（すべての画像）
- [x] キーボードナビゲーション確認

### Phase T5: 最終確認 ✅ 完了
- [x] ビルド成功
- [x] 全ルート確認（静的13ページ + 動的API）
- [x] HANDOFF更新

### Phase T6: GitHub公開
- [ ] リポジトリ名変更（template-leadgen-visual）
- [ ] Template repository設定有効化
- [ ] Public公開
