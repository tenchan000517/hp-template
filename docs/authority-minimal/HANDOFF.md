# Authority Minimal 実装ハンドオフ

このドキュメントは、設計フェーズから実装フェーズへの引き継ぎ資料です。

**実装ステータス: ✅ 完了（2026年2月1日）**
**画像生成: ✅ 完了（18枚生成済み）**
**SEO・機能強化: ✅ 完了（2026年2月1日）**
**テンプレート公開: ✅ 完了（2026年2月1日）**

---

## GitHubリポジトリ

**URL:** https://github.com/tenchan000517/template-authority-minimal

### 使用方法

```bash
# 1. テンプレートからリポジトリ作成（GitHub UIで「Use this template」）
# または直接クローン
git clone https://github.com/tenchan000517/template-authority-minimal.git my-project
cd my-project

# 2. 依存関係インストール
npm install

# 3. 開発サーバー起動
npm run dev

# 4. data/site.json をカスタマイズ
```

---

## 設計書一覧（完成）

| ファイル | 内容 | ステータス |
|----------|------|-----------|
| `01-strategy.md` | 全体戦略（独自価値、カラー、タイポグラフィ、余白、アニメーション） | ✅ 完了 |
| `pages/top.md` | TOPページ詳細設計 | ✅ 完了 |
| `pages/philosophy.md` | 理念・代表メッセージページ詳細設計 | ✅ 完了 |
| `pages/service.md` | サービスページ詳細設計 | ✅ 完了 |
| `pages/case.md` | 事例ページ詳細設計（一覧 + 詳細） | ✅ 完了 |
| `pages/column.md` | コラムページ詳細設計（一覧 + 詳細） | ✅ 完了 |
| `pages/team.md` | チームページ詳細設計 | ✅ 完了 |
| `pages/about.md` | 会社概要ページ詳細設計 | ✅ 完了 |
| `pages/contact.md` | お問い合わせページ詳細設計 | ✅ 完了 |
| `pages/privacy.md` | プライバシーポリシーページ詳細設計 | ✅ 完了 |
| `03-components.md` | コンポーネント設計（20コンポーネント） | ✅ 完了 |
| `04-data.md` | site.json構造設計 | ✅ 完了 |
| `photo_guide.md` | 撮影ディレクション（全素材リスト） | ✅ 完了 |

---

## 実装済みテンプレート

**GitHub:** https://github.com/tenchan000517/template-authority-minimal

### 開発サーバー起動

```bash
npm install
npm run dev
```

### ビルド

```bash
npm run build
```

---

## 実装完了フェーズ

### Phase 1: 基盤構築 ✅ 完了

| タスク | 対応ファイル | ステータス |
|--------|-------------|-----------|
| globals.cssのカラー変更 | `src/app/globals.css` | ✅ 完了 |
| フォント設定（游明朝、游ゴシック、Cormorant Garamond） | `src/app/layout.tsx` | ✅ 完了 |
| site.json作成 | `data/site.json` | ✅ 完了 |
| lib/site.ts 型定義 | `src/lib/site.ts` | ✅ 完了 |
| ヘッダー（MinimalNav） | `src/components/layout/MinimalNav.tsx` | ✅ 完了 |
| フッター（FooterMinimal） | `src/components/layout/FooterMinimal.tsx` | ✅ 完了 |

### Phase 2: ページ実装 ✅ 完了

| 順序 | ページ | URL | ステータス |
|------|--------|-----|-----------|
| 1 | TOP | `/` | ✅ 完了 |
| 2 | 理念 | `/philosophy` | ✅ 完了 |
| 3 | サービス | `/service` | ✅ 完了 |
| 4 | チーム | `/team` | ✅ 完了 |
| 5 | 会社概要 | `/about` | ✅ 完了 |
| 6 | お問い合わせ | `/contact` | ✅ 完了 |
| 7 | プライバシー | `/privacy` | ✅ 完了 |
| 8 | 事例一覧 | `/case` | ✅ 完了 |
| 9 | 事例詳細 | `/case/[slug]` | ✅ 完了 |
| 10 | コラム一覧 | `/column` | ✅ 完了 |
| 11 | コラム詳細 | `/column/[slug]` | ✅ 完了 |

### Phase 3: コンポーネント詳細 ✅ 完了

| コンポーネント | ファイル | ステータス |
|---------------|----------|-----------|
| MinimalNav | `src/components/layout/MinimalNav.tsx` | ✅ 完了 |
| FooterMinimal | `src/components/layout/FooterMinimal.tsx` | ✅ 完了 |
| PageTitle | `src/components/layout/PageTitle.tsx` | ✅ 完了 |
| SectionWrapper | `src/components/layout/SectionWrapper.tsx` | ✅ 完了 |
| SectionTitle | `src/components/text/SectionTitle.tsx` | ✅ 完了 |
| TextLink | `src/components/text/TextLink.tsx` | ✅ 完了 |
| QuoteText | `src/components/text/QuoteText.tsx` | ✅ 完了 |
| VerticalText | `src/components/text/VerticalText.tsx` | ✅ 完了 |
| MemberCard | `src/components/content/MemberCard.tsx` | ✅ 完了 |
| CaseCard | `src/components/content/CaseCard.tsx` | ✅ 完了 |
| ArticleListItem | `src/components/content/ArticleListItem.tsx` | ✅ 完了 |
| ProcessStep | `src/components/content/ProcessStep.tsx` | ✅ 完了 |
| CompanyInfoRow | `src/components/content/CompanyInfoRow.tsx` | ✅ 完了 |
| MinimalInput | `src/components/form/MinimalInput.tsx` | ✅ 完了 |
| MinimalTextarea | `src/components/form/MinimalTextarea.tsx` | ✅ 完了 |
| MinimalSelect | `src/components/form/MinimalSelect.tsx` | ✅ 完了 |
| SubmitButton | `src/components/form/SubmitButton.tsx` | ✅ 完了 |

### Phase 4: 仕上げ ✅ 完了

| タスク | ステータス |
|--------|-----------|
| ビルド確認 | ✅ 成功（全21ルート生成） |
| OGP画像設定 | ✅ 完了 |
| viewport/metadata設定 | ✅ 完了 |
| sitemap.xml | ✅ 完了 |
| robots.txt | ✅ 完了 |
| JSON-LD構造化データ | ✅ 完了 |
| API Route | ✅ 完了 |

---

## ファイル構成

```
template-authority-minimal/
├── data/
│   └── site.json                    # サイトデータ（04-data.md準拠）
├── public/
│   └── images/                      # 画像（プレースホルダー状態）
├── src/
│   ├── app/
│   │   ├── globals.css              # グローバルスタイル
│   │   ├── layout.tsx               # ルートレイアウト（JSON-LD含む）
│   │   ├── page.tsx                 # TOP
│   │   ├── opengraph-image.tsx      # OGP画像
│   │   ├── sitemap.ts               # サイトマップ自動生成
│   │   ├── robots.ts                # robots.txt自動生成
│   │   ├── philosophy/page.tsx      # 理念
│   │   ├── service/page.tsx         # サービス
│   │   ├── team/page.tsx            # チーム
│   │   ├── about/page.tsx           # 会社概要
│   │   ├── contact/page.tsx         # お問い合わせ
│   │   ├── privacy/page.tsx         # プライバシー
│   │   ├── api/
│   │   │   └── contact/route.ts     # お問い合わせAPI
│   │   ├── case/
│   │   │   ├── page.tsx             # 事例一覧
│   │   │   └── [slug]/page.tsx      # 事例詳細
│   │   └── column/
│   │       ├── page.tsx             # コラム一覧
│   │       └── [slug]/page.tsx      # コラム詳細
│   ├── components/
│   │   ├── animation/
│   │   │   └── FadeInSection.tsx    # フェードインアニメーション
│   │   ├── layout/
│   │   │   ├── MinimalNav.tsx       # ヘッダー
│   │   │   ├── FooterMinimal.tsx    # フッター
│   │   │   ├── PageTitle.tsx        # ページタイトル
│   │   │   └── SectionWrapper.tsx   # セクションラッパー
│   │   ├── text/
│   │   │   ├── SectionTitle.tsx     # セクション見出し
│   │   │   ├── TextLink.tsx         # テキストリンク
│   │   │   ├── QuoteText.tsx        # 引用テキスト
│   │   │   └── VerticalText.tsx     # 縦書きテキスト
│   │   ├── content/
│   │   │   ├── MemberCard.tsx       # メンバーカード
│   │   │   ├── CaseCard.tsx         # 事例カード
│   │   │   ├── ArticleListItem.tsx  # 記事リスト
│   │   │   ├── ProcessStep.tsx      # プロセスステップ
│   │   │   └── CompanyInfoRow.tsx   # 会社情報行
│   │   └── form/
│   │       ├── MinimalInput.tsx     # 入力欄
│   │       ├── MinimalTextarea.tsx  # テキストエリア
│   │       ├── MinimalSelect.tsx    # セレクト
│   │       └── SubmitButton.tsx     # 送信ボタン
│   └── lib/
│       └── site.ts                  # サイトデータ型定義・ヘルパー
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 残タスク（運用開始前）

### 1. 画像の準備 ✅ 完了

AI生成画像が配置済み（18枚）:
- ポートレート: 5枚（`philosophy/portrait.jpg`, `team/*.jpg`）
- 事例画像: 11枚（`case/*/main.jpg`, `case/*/thumbnail.jpg`, `case/*/result-*.jpg`）
- OGP: 1枚（`og-image.jpg`）
- ファビコン: 5サイズ

**実際の運用時は撮影写真への差し替えを推奨**
- `photo_guide.md` に基づき撮影を行う

### 2. site.json のカスタマイズ

実際のクライアント情報に書き換え:
- 会社名、住所、連絡先
- 代表者情報
- サービス内容
- 事例・コラムの内容

### 3. フォーム送信の実装 ✅ API実装済み

`/api/contact` でサーバーサイドバリデーション実装済み。
メール送信は運用時に設定が必要:
- `src/app/api/contact/route.ts` のコメントを参考に
- Resend または SendGrid を推奨
- 環境変数 `RESEND_API_KEY` 等を設定

### 4. 最終確認チェックリスト

- [ ] 全ページの表示確認
- [ ] レスポンシブ確認（PC / タブレット / SP）
- [ ] 全リンクの動作確認
- [ ] フォーム送信テスト
- [ ] パフォーマンス計測（Lighthouse）
- [ ] アクセシビリティ確認
- [ ] OGP画像の確認（SNSシェア時）

---

## カスタマイズガイド

### カラーの変更

`src/app/globals.css` の `@theme` セクション:

```css
@theme {
  --color-primary: #1E3A5F;        /* アクセントカラー */
  --color-text-main: #1A1A1A;      /* 見出し */
  --color-text-body: #333333;      /* 本文 */
  --color-text-sub: #666666;       /* 補助テキスト */
  --color-text-light: #999999;     /* 薄いテキスト */
  --color-bg-gray: #F5F5F5;        /* グレー背景 */
  --color-border: #E0E0E0;         /* 区切り線 */
}
```

### コンテンツの変更

`data/site.json` を編集:
- `meta`: サイト名、タグライン、説明文
- `company`: 会社情報
- `navigation`: ナビゲーションメニュー
- `pages.*`: 各ページのコンテンツ
- `cases`: 事例データ
- `columns`: コラムデータ

### 新規ページの追加

1. `src/app/[page-name]/page.tsx` を作成
2. `data/site.json` の `navigation.header` に追加
3. 必要に応じて `pages.[page-name]` にデータ追加

---

## 問い合わせ

設計に関する不明点は、設計書の該当セクションを参照。
実装上の判断が必要な場合は、以下の優先順位で対応:

1. 設計書に記載がある → 設計書に従う
2. 設計書に記載がない → `01-strategy.md` の原則に従う
3. 判断が難しい → 「控えめ」「シンプル」を選択

---

---

## 実装済み機能（trust-visual比較で追加）

### アニメーション ✅ 実装済み

`FadeInSection`コンポーネントを追加（CSS + IntersectionObserver、外部依存なし）

- ファイル: `src/components/animation/FadeInSection.tsx`
- 「静謐」なコンセプトに合わせた控えめな設定（duration: 800ms, distance: 20px）
- 全ページのセクションに適用済み

### SEO・機能強化 ✅ 全て実装済み

| 項目 | ステータス | 実装ファイル |
|------|-----------|-------------|
| JSON-LD構造化データ | ✅ 実装済み | `src/app/layout.tsx` |
| canonical URL | ✅ 実装済み | `src/app/layout.tsx` |
| robots meta | ✅ 実装済み | `src/app/layout.tsx` |
| API Route | ✅ 実装済み | `src/app/api/contact/route.ts` |
| metadataBase | ✅ 動的設定 | `src/app/layout.tsx` |
| Twitter Card images | ✅ 実装済み | `src/app/layout.tsx` |
| sitemap.xml | ✅ 実装済み | `src/app/sitemap.ts` |
| robots.txt | ✅ 実装済み | `src/app/robots.ts` |
| サーバーサイドバリデーション | ✅ 実装済み | `src/app/api/contact/route.ts` |

### 残タスク（運用時）

| 項目 | 対応内容 |
|------|----------|
| メール送信 | `src/app/api/contact/route.ts` のコメントを参考にResend/SendGrid連携 |
| siteUrl変更 | `data/site.json` の `meta.siteUrl` を実際のドメインに変更 |

---

*実装完了: 2026年2月1日*
*画像生成完了: 2026年2月1日*
*SEO・機能強化完了: 2026年2月1日*
