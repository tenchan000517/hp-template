# LeadGen Minimal テンプレート HANDOFF

## 設計書概要

このドキュメントは LeadGen Minimal テンプレートの実装引き継ぎ用ファイルです。

### テンプレートコンセプト

**型（Type）**: Lead Gen（CV特化）
**表現（Design）**: Minimal Pro（洗練ミニマル）

**コアメッセージ**: 「静謐な自信」
- 余白を贅沢に使い、高級感と信頼感を演出
- 情報を削ぎ落とし、本当に必要なことだけを伝える
- 3クリック以内にお問い合わせへ導く

### 想定クライアント

- BtoB企業（コンサルティング、システム開発、専門サービス）
- 高単価サービス提供企業
- 問い合わせ獲得が最優先の企業

---

## 次セッションの開始手順

### 0. 実装ディレクトリへ移動

```bash
cd /mnt/c/hp-template/template-leadgen-minimal
```

### 1. 設計書の確認

```bash
# 設計書ディレクトリ
/mnt/c/hp-template/docs/leadgen-minimal/

# 確認順序
1. HANDOFF.md（このファイル）
2. 01-strategy.md（全体戦略・デザインルール）
3. 実装するページの pages/*.md
4. 03-components.md（コンポーネント設計）
5. 04-data.md（site.json構造）
```

### 2. 設計書ファイル一覧

| ファイル | 内容 | 状態 |
|---------|------|------|
| `01-strategy.md` | 全体戦略（カラー、タイポグラフィ、余白、アニメーション） | ✅ 完了 |
| `pages/top.md` | TOPページ詳細設計（5セクション） | ✅ 完了 |
| `pages/service.md` | サービスページ詳細設計（5セクション） | ✅ 完了 |
| `pages/case.md` | 事例ページ詳細設計（4セクション） | ✅ 完了 |
| `pages/contact.md` | お問い合わせページ詳細設計（3セクション） | ✅ 完了 |
| `pages/privacy.md` | プライバシーポリシー詳細設計（2セクション） | ✅ 完了 |
| `03-components.md` | コンポーネント設計（14コンポーネント） | ✅ 完了 |
| `04-data.md` | site.json構造・TypeScript型定義 | ✅ 完了 |
| `photo_guide.md` | 撮影ディレクション | ✅ 完了 |

---

## 実装フェーズ

### Phase 1: 基盤構築 ✅ 完了

- [x] テンプレートクローン（template-fullorder から）
- [x] site.json 構造作成（04-data.md 参照）
- [x] globals.css @theme 設定（04-data.md 参照）
- [x] TypeScript 型定義作成（04-data.md 参照）
- [ ] ロゴ・ファビコン配置（プレースホルダーで対応中）

### Phase 2: 共通コンポーネント ✅ 完了

- [x] MinimalHeader（固定ヘッダー、ナビ4項目、SPハンバーガーメニュー）
- [x] MinimalFooter（シンプルフッター、ダークネイビー背景）
- [x] SectionWrapper（余白・背景管理）
- [x] PrimaryButton（アクセントカラーCTA）
- [x] TextLink（矢印付きリンク）
- [x] FadeInView（アニメーションラッパー、Framer Motion使用）

### Phase 3: ページ実装 ✅ 完了

| ページ | URL | 優先度 | 状態 |
|--------|-----|--------|------|
| TOP | `/` | 高 | [x] |
| サービス | `/service` | 高 | [x] |
| 事例 | `/case` | 高 | [x] |
| お問い合わせ | `/contact` | 高 | [x] |
| プライバシーポリシー | `/privacy` | 中 | [x] |

### Phase 4: 仕上げ ✅ 完了

- [x] レスポンシブ調整（SP対応）
- [x] アニメーション調整
- [x] フォーム動作確認
- [x] OGP設定（各ページにlayout.tsx追加）
- [x] ファビコン確認（Next.js自動検出に修正）
- [x] Lighthouse スコア改善（next/font対応）

---

## 重要な設計ルール（実装時必読）

### 絶対に守ること

1. **カードUIを使わない**: 角丸+影のカードは禁止。背景色と余白で区切る
2. **アイコンを使わない**: 装飾的なアイコンは一切禁止
3. **アニメーションは2種類のみ**: フェードイン + ホバー色変化
4. **アクセントカラーはCTAボタンのみ**: 他の要素に使わない
5. **余白を均一にしない**: セクションごとに余白を変える

### カラーパレット

| 用途 | 色 | HEX |
|------|-----|-----|
| メイン（テキスト） | ダークネイビー | #1a1a2e |
| アクセント（CTAのみ） | テラコッタ | #c45c3e |
| 背景（白） | ピュアホワイト | #FFFFFF |
| 背景（交互） | オフホワイト | #f8f8f8 |
| サブテキスト | ミディアムグレー | #6b7280 |

### フォントサイズ

| 要素 | PC | SP |
|------|----|----|
| H1（ヒーロー） | 72px | 40px |
| H2（セクション見出し） | 48px | 32px |
| H3（サブ見出し） | 28px | 22px |
| 本文 | 17px | 16px |

### 余白サイズ

| サイズ | PC | SP |
|--------|----|----|
| sm | 80px | 60px |
| md | 120px | 80px |
| lg | 160px | 100px |
| xl | 200px | 120px |

---

## 画像準備

### 撮影が必要な場合

1. `photo_guide.md` をカメラマンに共有
2. 必須素材: ロゴ（SVG）、ファビコン、OGP画像
3. 推奨素材: 代表者写真（任意）

### AI画像生成で対応する場合

実装完了後、`photo_guide.md` を元に生成スクリプトを作成

```bash
# 生成スクリプトの作成先（例）
/mnt/c/hp-template/scripts/generate_images.py
```

---

### Phase 5: 画像生成 ✅ 完了

- [x] 画像生成スクリプト作成（`/mnt/c/hp-template/scripts/generate_leadgen_minimal_images.py`）
- [x] OGP画像生成（1200x630、ダークネイビー+テラコッタ）
- [x] ファビコン生成（16x16, 32x32, 180x180, 192x192, 512x512）
- [x] GitHubリポジトリにプッシュ

### Phase 6: 品質確認 ✅ 完了

- [x] 他テンプレートとの比較（authority-minimal, recruit-magazine, fullorder）
- [x] JSON-LD構造化データ追加（LocalBusiness）
- [x] canonical URL / robots meta 追加
- [x] Viewport（themeColor）追加
- [x] API Route実装（/api/contact）
- [x] サーバーサイドバリデーション実装
- [x] アクセシビリティ改善（aria-expanded追加）
- [ ] 本番環境へのデプロイ
- [ ] Google Analytics / GTM 設定
- [ ] サーチコンソール登録

---

## 比較対象テンプレート

次セッションで以下のテンプレートと比較し、不足・劣化・ギャップを確認する:

| テンプレート | パス | 比較観点 |
|-------------|------|----------|
| template-authority-minimal | `/mnt/c/hp-template/template-authority-minimal` | Minimal表現の一貫性 |
| template-recruit-magazine | `/mnt/c/hp-template/template-recruit-magazine` | コンポーネント構成 |
| template-fullorder | `/mnt/c/hp-template/template-fullorder` | ベーステンプレート機能 |

### 確認項目

- [x] site.json構造の統一性
- [x] TypeScript型定義の網羅性
- [x] コンポーネント命名規則
- [x] レスポンシブ対応の品質
- [x] アクセシビリティ対応
- [x] SEO対応（メタデータ、構造化データ）
- [x] パフォーマンス（ビルド成功確認）

---

## 実装完了後のタスク（デプロイ後）

- [ ] 本番環境へのデプロイ
- [ ] Google Analytics / GTM 設定
- [ ] サーチコンソール登録

---

## トラブルシューティング

### よくある間違い

| 問題 | 原因 | 対処 |
|------|------|------|
| カードっぽく見える | 角丸・影を使っている | 背景色変更のみで区切る |
| 派手に見える | アクセントカラーを多用 | CTAボタン以外は使わない |
| 退屈に見える | 余白が均一 | セクションごとに余白を変える |
| 読みにくい | 行間が狭い | 日本語は line-height: 1.8 |

### 確認チェックリスト

各ページ実装後、以下を確認:

- [ ] カードコンポーネントを使っていない
- [ ] 紫系の色を使っていない
- [ ] 全セクションの余白が均一でない
- [ ] アニメーションが2種類に収まっている
- [ ] アイコンを装飾的に使っていない
- [ ] 3クリック以内にお問い合わせに到達できる
- [ ] SP表示で崩れていない

---

## 関連ドキュメント

- 全体戦略: `/mnt/c/hp-template/docs/leadgen-minimal/01-strategy.md`
- ページ設計: `/mnt/c/hp-template/docs/leadgen-minimal/pages/*.md`
- コンポーネント: `/mnt/c/hp-template/docs/leadgen-minimal/03-components.md`
- データ構造: `/mnt/c/hp-template/docs/leadgen-minimal/04-data.md`
- 撮影指示: `/mnt/c/hp-template/docs/leadgen-minimal/photo_guide.md`

---

## 実装ディレクトリ

```bash
/mnt/c/hp-template/template-leadgen-minimal/
```

### Phase 1 で作成したファイル

| ファイル | 内容 |
|---------|------|
| `data/site.json` | LeadGen Minimal用データ構造（全ページ分） |
| `src/app/globals.css` | Minimalデザイン用@theme設定 |
| `src/types/site.ts` | TypeScript型定義（新規作成） |
| `src/lib/site.ts` | データ読み込みヘルパー |
| `src/app/layout.tsx` | メタデータ設定（metadataBase対応済） |
| `src/app/page.tsx` | プレースホルダーTOPページ |

### Phase 2 で作成したファイル

| ファイル | 内容 |
|---------|------|
| `src/components/index.ts` | コンポーネント一括エクスポート |
| `src/components/layout/MinimalHeader.tsx` | 固定ヘッダー（スクロール影、SPハンバーガー） |
| `src/components/layout/MinimalFooter.tsx` | フッター（ダークネイビー背景） |
| `src/components/layout/SectionWrapper.tsx` | 余白・背景管理ラッパー |
| `src/components/ui/PrimaryButton.tsx` | CTAボタン（md/lg、ホバー色変化） |
| `src/components/ui/TextLink.tsx` | 矢印付きテキストリンク |
| `src/components/animation/FadeInView.tsx` | フェードインアニメーション |

### Phase 3 で作成したファイル

| ファイル | 内容 |
|---------|------|
| `src/app/page.tsx` | TOPページ（Hero/Problem/Solution/Results/CTA） |
| `src/app/service/page.tsx` | サービスページ（Overview/WhyChooseUs/Process/CTA） |
| `src/app/case/page.tsx` | 事例ページ（Summary/Details×3/CTA） |
| `src/app/contact/page.tsx` | お問い合わせページ（Form/ThankYou） |
| `src/app/privacy/page.tsx` | プライバシーポリシーページ |
| `src/components/sections/PageHeader.tsx` | 下層ページヘッダー |
| `src/components/sections/CTASection.tsx` | CTA共通セクション |
| `src/components/ui/ScrollIndicator.tsx` | スクロール誘導 |
| `src/components/contact/FormField.tsx` | フォーム入力フィールド |

### Phase 4 で作成・修正したファイル

| ファイル | 内容 |
|---------|------|
| `src/app/service/layout.tsx` | サービスページ用メタデータ |
| `src/app/case/layout.tsx` | 事例ページ用メタデータ |
| `src/app/contact/layout.tsx` | お問い合わせページ用メタデータ |
| `src/app/privacy/layout.tsx` | プライバシーページ用メタデータ |
| `src/app/layout.tsx` | next/font対応、favicon設定削除 |
| `src/app/globals.css` | Google Fonts外部読み込み削除 |
| `src/app/privacy/page.tsx` | 角丸削除（設計ルール準拠） |

### Phase 6 で作成・修正したファイル

| ファイル | 内容 |
|---------|------|
| `src/app/layout.tsx` | JSON-LD構造化データ、canonical、robots、viewport追加 |
| `src/app/api/contact/route.ts` | コンタクトフォームAPI（サーバーサイドバリデーション） |
| `src/app/contact/page.tsx` | APIコール実装、エラーハンドリング改善 |
| `src/components/layout/MinimalHeader.tsx` | aria-expanded属性追加 |

### 追加した依存関係

| パッケージ | 用途 |
|-----------|------|
| `framer-motion` | アニメーション（FadeInView、メニュー開閉） |

### ビルド状態

```bash
cd /mnt/c/hp-template/template-leadgen-minimal
npm run build  # ✅ 成功
```

---

## 更新履歴

| 日付 | 内容 |
|------|------|
| 2026-02-01 | Phase 6 品質確認完了（SEO・アクセシビリティ・API改善） |
| 2026-02-01 | Phase 5 画像生成完了（OGP・ファビコン、GitHubプッシュ） |
| 2026-02-01 | Phase 4 仕上げ完了（OGP設定、next/font対応、設計ルール修正） |
| 2026-02-01 | Phase 3 全ページ実装完了（TOP/Service/Case/Contact/Privacy） |
| 2026-02-01 | Phase 2 共通コンポーネント完了 |
| 2026-02-01 | Phase 1 基盤構築完了 |
| 2024-XX-XX | 初版作成 |

---

## 改善推奨事項

他テンプレート（trust-visual）との比較で特定された改善ポイント。

### 高優先度（SEO・機能強化）✅ 対応完了

| 項目 | 状態 | 対応内容 |
|------|------|----------|
| JSON-LD構造化データ | ✅ 完了 | LocalBusinessスキーマを追加 |
| canonical URL | ✅ 完了 | `metadata.alternates.canonical` を追加 |
| robots meta | ✅ 完了 | `metadata.robots` を追加 |
| API Route | ✅ 完了 | `/api/contact` でサーバーサイド処理 |
| Viewport | ✅ 完了 | `themeColor` を追加 |
| aria-expanded | ✅ 完了 | MinimalHeaderに追加 |

### 中優先度（今後の対応）

| 項目 | 現状 | 推奨対応 |
|------|------|----------|
| フォント種類 | Noto Sans JP のみ | 数字用に Inter を追加（任意） |
| メール送信 | コンソール出力のみ | Resend/SendGrid 連携 |
