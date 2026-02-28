# Local Visual コンポーネント設計

このテンプレート固有のコンポーネントを定義する。
Standard テンプレートにはない、または大幅にカスタマイズが必要なコンポーネントのみ記載。

---

## 1. HeroVisual（ファーストビュー）

### 用途

- TOPページのファーストビュー
- 全画面写真 + オーバーレイ + テキスト + 実績数字

### なぜ必要か

Standard テンプレートのヒーローは「テキスト中心」だが、Local Visual は「写真中心」。
写真の上に電話番号、地域名、実績数字を重ねて表示する独自コンポーネントが必要。

### Props

```typescript
interface HeroVisualProps {
  backgroundImage: string;           // 背景写真のパス
  regionName: string;                // 地域名（例：「岡崎市」）
  catchphrase: string;               // キャッチコピー
  subCatchphrase?: string;           // サブキャッチ
  stats: {
    label: string;                   // ラベル（例：「創業」）
    value: number;                   // 数値（例：30）
    unit: string;                    // 単位（例：「年」）
  }[];
  phoneNumber: string;               // 電話番号（表示用）
  phoneTel: string;                  // 電話番号（tel:リンク用）
  ctaLabel?: string;                 // CTAボタンのラベル
  ctaHref?: string;                  // CTAボタンのリンク先
}
```

### デザイン仕様

**サイズ**：
- 高さ：100vh（ビューポート全体）
- 幅：100%

**背景**：
- 写真：object-fit: cover で全画面カバー
- オーバーレイ：rgba(0, 0, 0, 0.5)

**テキスト配置**：
- 地域名：左上（PC: 80px from left/top、SP: 24px）
- 電話番号：右上（PC: 80px from right、SP: ヘッダーに統合）
- キャッチ：中央
- 実績数字：中央下部、横並び3つ
- CTA：実績数字の下

**色**：
- テキスト：白（#ffffff）
- 電話番号：オレンジ（#f39c12）
- CTAボタン：オレンジ背景、白テキスト

**ホバー時**：
- CTAボタン：背景が暗くなる

### 使用例

```tsx
<HeroVisual
  backgroundImage="/images/hero-main.jpg"
  regionName="岡崎市"
  catchphrase="地域に根ざして30年。お客様の住まいを守り続けます。"
  stats={[
    { label: "創業", value: 30, unit: "年" },
    { label: "施工実績", value: 500, unit: "件+" },
    { label: "地域密着", value: 30, unit: "年" }
  ]}
  phoneNumber="0120-XXX-XXX"
  phoneTel="tel:0120XXXXXX"
  ctaLabel="無料見積もりはこちら"
  ctaHref="/contact"
/>
```

---

## 2. StatsCounter（実績数字カウンター）

### 用途

- TOPページのファーストビュー内
- 施工事例ページのヘッダー内
- 数字をカウントアップアニメーションで表示

### なぜ必要か

Standard テンプレートには数字のカウントアップ機能がない。
Local Visual は「実績の可視化」が重要なため、専用コンポーネントが必要。

### Props

```typescript
interface StatsCounterProps {
  stats: {
    label: string;
    value: number;
    unit: string;
    prefix?: string;      // 数字の前に付ける文字（例：「約」）
  }[];
  duration?: number;      // カウントアップの時間（ms）、デフォルト1500
  startOnView?: boolean;  // 画面に入ったら開始、デフォルトtrue
  size?: 'large' | 'medium' | 'small';
  color?: 'white' | 'dark';
}
```

### デザイン仕様

**サイズ**：
| size | 数字サイズ(PC) | 数字サイズ(SP) | ラベル/単位 |
|------|--------------|---------------|------------|
| large | 72px | 40px | 24px / 16px |
| medium | 48px | 32px | 18px / 14px |
| small | 36px | 24px | 14px / 12px |

**色**：
| color | 数字 | ラベル/単位 |
|-------|-----|------------|
| white | #ffffff | rgba(255,255,255,0.8) |
| dark | #1a2744 | #6b7280 |

**レイアウト**：
- 横並び、gap: 64px（PC）、32px（SP）
- 中央揃え
- SPでは縦並びに変更可（オプション）

**アニメーション**：
- Framer Motion の `useInView` と `useSpring` を使用
- 0 → 目標値 へ `duration` msでカウントアップ
- イージング：easeOut
- 1回のみ実行

### 使用例

```tsx
<StatsCounter
  stats={[
    { label: "創業", value: 30, unit: "年" },
    { label: "施工実績", value: 500, unit: "件", prefix: "" },
    { label: "地域密着", value: 30, unit: "年" }
  ]}
  duration={1500}
  size="large"
  color="white"
/>
```

---

## 3. WorksGrid（施工事例グリッド）

### 用途

- TOPページの施工事例セクション
- 施工事例一覧ページ
- 地域タグ付きの施工事例カードをグリッド表示

### なぜ必要か

Standard テンプレートの事例表示はシンプルなカードだが、
Local Visual は「地域タグ」「ホバーズーム」「フィルタリング」機能が必要。

### Props

```typescript
interface WorksGridProps {
  works: {
    slug: string;
    title: string;
    area: string;           // 地域名
    category: string;       // 工事種別
    thumbnailImage: string;
  }[];
  columns?: 2 | 3;          // PC時のカラム数、デフォルト3
  showAreaTag?: boolean;    // 地域タグを表示、デフォルトtrue
  limit?: number;           // 表示件数制限
  showMoreLink?: string;    // 「もっと見る」のリンク先
  showMoreLabel?: string;   // 「もっと見る」のラベル
  enableAnimation?: boolean; // スクロールアニメーション
}
```

### デザイン仕様

**グリッド**：
- PC 3カラム / SP 2カラム
- gap: 24px（PC）、16px（SP）
- 各カード：アスペクト比1:1（正方形）

**カード**：
- 写真：object-fit: cover、角丸8px
- 地域タグ：左上、rgba(0,0,0,0.7)背景、白文字、12px、padding 4px 8px
- 工事種別：写真下、18px、ダークネイビー、font-weight 600

**ホバー**：
- 写真：scale(1.05)、0.3s
- overflow: hidden でクリップ
- オーバーレイ：メインカラー70%透過が出現
- 「詳細を見る」テキストが中央に表示

**アニメーション**：
- enableAnimation=true の場合
- 各カードが順番にフェードイン（stagger: 0.05s）

### 使用例

```tsx
<WorksGrid
  works={works}
  columns={3}
  showAreaTag={true}
  limit={6}
  showMoreLink="/works"
  showMoreLabel="施工事例をもっと見る"
  enableAnimation={true}
/>
```

---

## 4. BeforeAfter（ビフォーアフター比較）

### 用途

- 施工事例詳細ページ
- Before/After写真を比較表示

### なぜ必要か

Standard テンプレートにはビフォーアフター比較機能がない。
Local Visual は施工事例が重要なため、専用コンポーネントが必要。

### Props

```typescript
interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;     // デフォルト「BEFORE」
  afterLabel?: string;      // デフォルト「AFTER」
  mode?: 'side-by-side' | 'slider';  // 表示モード
  aspectRatio?: string;     // デフォルト「16/9」
}
```

### デザイン仕様

**side-by-side モード**：
- 横並び、gap: 16px
- 中央に縦線（2px、グレー）
- 各写真の左上にラベル

**slider モード**：
- 1枚の写真エリア
- 中央にスライダーバー（メインカラー）
- ドラッグで左右に移動
- Before写真が左、After写真が右

**ラベル**：
- メインカラー背景、白テキスト
- padding: 8px 16px
- 左上に配置

**SP対応**：
- side-by-side：縦並びに変更
- slider：そのまま維持

### 使用例

```tsx
<BeforeAfter
  beforeImage="/images/works/case1-before.jpg"
  afterImage="/images/works/case1-after.jpg"
  mode="slider"
  aspectRatio="16/9"
/>
```

---

## 5. AreaMap（対応エリアマップ）

### 用途

- TOPページの対応エリアセクション
- 対応エリアページ
- SVG地図で対応エリアを可視化

### なぜ必要か

Standard テンプレートには地図表示機能がない。
Local Visual は「地域密着」をアピールするため、対応エリアの可視化が必要。

### Props

```typescript
interface AreaMapProps {
  mapSvg: string;           // SVG地図のパス
  mainArea: string;         // メインエリア名
  subAreas: string[];       // サブエリア名の配列
  onAreaClick?: (area: string) => void;  // エリアクリック時のコールバック
  highlightColor?: string;  // ハイライト色
}
```

### デザイン仕様

**地図**：
- SVG形式
- 対応エリアがメインカラーで塗りつぶし
- 周辺エリアはメインカラー薄め
- 対応外はグレー

**インタラクション**：
- ホバー：該当エリアが少し明るくなる + ツールチップ
- クリック：onAreaClick コールバック実行

**補足テキスト**：
- 地図下に「本社から車で約30分圏内」等

### 使用例

```tsx
<AreaMap
  mapSvg="/images/area-map.svg"
  mainArea="岡崎市"
  subAreas={["豊田市", "安城市", "刈谷市", "西尾市"]}
  onAreaClick={(area) => scrollToAreaSection(area)}
  highlightColor="#1a2744"
/>
```

---

## 6. PhoneButton（電話ボタン）

### 用途

- ヘッダー
- 各ページのCTAセクション
- SP時のフローティングボタン
- 電話番号を目立たせ、タップで発信

### なぜ必要か

Local Visual は「電話問い合わせ」が重要なため、
電話番号を強調表示する専用コンポーネントが必要。

### Props

```typescript
interface PhoneButtonProps {
  phoneNumber: string;      // 表示用（例：「0120-XXX-XXX」）
  phoneTel: string;         // tel:リンク用（例：「tel:0120XXXXXX」）
  variant?: 'large' | 'medium' | 'small' | 'floating';
  showIcon?: boolean;       // 電話アイコン表示
  showHours?: boolean;      // 受付時間表示
  hours?: string;           // 受付時間テキスト
}
```

### デザイン仕様

**variant別サイズ**：
| variant | 電話番号サイズ | パディング |
|---------|--------------|----------|
| large | 48px | 16px 32px |
| medium | 36px | 12px 24px |
| small | 24px | 8px 16px |
| floating | 20px | 12px 20px |

**色**：
- 電話番号：オレンジ（#f39c12）または白（ダーク背景時）
- アイコン：電話番号と同色
- 背景（floating）：オレンジ、影付き

**floating 特有**：
- 画面右下固定
- 丸みを帯びた形状
- 影：box-shadow: 0 4px 12px rgba(0,0,0,0.15)
- SPのみ表示

### 使用例

```tsx
<PhoneButton
  phoneNumber="0120-XXX-XXX"
  phoneTel="tel:0120XXXXXX"
  variant="large"
  showIcon={true}
  showHours={true}
  hours="受付: 9:00-18:00（日祝除く）"
/>
```

---

## 7. PageHeader（下層ページヘッダー）

### 用途

- 全ての下層ページ（サービス、施工事例、会社概要、お問い合わせ等）
- 背景写真 + ページタイトル + サブタイトル

### なぜ必要か

Standard テンプレートのページヘッダーはシンプルだが、
Local Visual は「写真付き」のヘッダーで視覚的な統一感を作る。

### Props

```typescript
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;   // 背景写真（省略時は色背景）
  backgroundBlur?: boolean;   // ぼかし処理、デフォルトtrue
  overlayOpacity?: number;    // オーバーレイ透過度、デフォルト0.6
  height?: 'tall' | 'medium' | 'short';  // デフォルト'medium'
  badge?: {
    label: string;
    value: string;
  };                          // オプションバッジ（例：総施工件数）
}
```

### デザイン仕様

**高さ**：
| height | PC | SP |
|--------|------|------|
| tall | 400px | 280px |
| medium | 300px | 200px |
| short | 200px | 160px |

**背景**：
- 写真あり：filter: blur(4px)（backgroundBlur=true時）
- 写真なし：ダークネイビーグラデーション
- オーバーレイ：rgba(0,0,0, overlayOpacity)

**テキスト**：
- タイトル：48px（PC）、32px（SP）、白、font-weight 700
- サブタイトル：18px（PC）、16px（SP）、白80%

**バッジ**：
- オレンジ背景、白テキスト
- タイトル下に配置

### 使用例

```tsx
<PageHeader
  title="施工事例"
  subtitle="これまでの施工実績をご紹介します"
  backgroundImage="/images/works-header.jpg"
  backgroundBlur={true}
  height="medium"
  badge={{ label: "総施工件数", value: "500件以上" }}
/>
```

---

## 8. CTASection（問い合わせ誘導セクション）

### 用途

- 各ページの最下部
- 電話番号 + フォームボタンの問い合わせ誘導

### なぜ必要か

Local Visual は各ページ末尾に統一されたCTAセクションを配置する。
再利用可能なコンポーネント化が必要。

### Props

```typescript
interface CTASectionProps {
  heading: string;
  subheading?: string;
  phoneNumber: string;
  phoneTel: string;
  hours?: string;
  buttonLabel?: string;
  buttonHref?: string;
}
```

### デザイン仕様

**背景**：
- ダークネイビー（#1a2744）

**余白**：
- 上下：100px（PC）、64px（SP）

**テキスト**：
- heading：32px（PC）、24px（SP）、白
- subheading：18px（PC）、16px（SP）、白70%
- 電話番号：48px（PC）、32px（SP）、オレンジ
- 受付時間：14px、白70%

**ボタン**：
- オレンジ背景、白テキスト
- パディング：16px 48px

**配置**：
- 全て中央揃え
- 縦に並べる

### 使用例

```tsx
<CTASection
  heading="まずはお気軽にご相談ください"
  subheading="無料見積もり・現地調査"
  phoneNumber="0120-XXX-XXX"
  phoneTel="tel:0120XXXXXX"
  hours="受付時間: 9:00-18:00（日祝除く）"
  buttonLabel="メールで問い合わせ"
  buttonHref="/contact"
/>
```

---

## 9. ServiceCard（サービスカード）

### 用途

- TOPページのサービス概要セクション
- サービスページのサービス一覧
- 写真 + タイトル + 説明 + リンク

### なぜ必要か

Local Visual のサービス表示は「写真が大きく」「番号付き」という特徴がある。

### Props

```typescript
interface ServiceCardProps {
  number?: string;           // 番号（例：「01」）
  image: string;
  title: string;
  description: string;
  features?: string[];       // 特徴リスト
  href: string;
  linkLabel?: string;        // デフォルト「詳しく見る」
  layout?: 'vertical' | 'horizontal' | 'horizontal-reverse';
}
```

### デザイン仕様

**vertical レイアウト**：
- 写真が上、テキストが下
- 写真アスペクト比：4:3

**horizontal / horizontal-reverse レイアウト**：
- 写真とテキストが横並び
- horizontal：写真左、テキスト右
- horizontal-reverse：テキスト左、写真右
- 写真幅：50%

**番号**：
- 薄いグレー（#e0e0e0）
- 80px（PC）、48px（SP）
- font-weight 900
- テキストエリアの左上にオーバーラップ

**写真**：
- 角丸8px
- ホバー時：scale(1.02)

**テキスト**：
- タイトル：32px（horizontal）、24px（vertical）、700
- 説明：16px、グレー
- 特徴：チェックマークアイコン付きリスト

### 使用例

```tsx
<ServiceCard
  number="01"
  image="/images/service-painting.jpg"
  title="外壁塗装"
  description="建物の美観回復と保護を同時に実現..."
  features={["10年以上の耐久性", "下地処理を丁寧に", "色彩提案も可能"]}
  href="/service/painting"
  linkLabel="このサービスを詳しく見る"
  layout="horizontal"
/>
```

---

## 10. Timeline（タイムライン/沿革）

### 用途

- 会社概要ページの沿革セクション
- 縦のタイムライン形式で歴史を表示

### なぜ必要か

Standard テンプレートにはタイムライン表示がない。
Local Visual は「歴史」をアピールするため専用コンポーネントが必要。

### Props

```typescript
interface TimelineProps {
  items: {
    year: string;
    content: string;
    isCurrent?: boolean;     // 「現在」の場合true
  }[];
  lineColor?: string;        // 縦線の色
  dotColor?: string;         // ドットの色
}
```

### デザイン仕様

**レイアウト**：
- 縦並び
- 各項目間：32px

**年号**：
- メインカラー背景の丸形バッジ
- 白テキスト
- 48px x 48px

**縦線**：
- メインカラー
- 2px幅
- 年号の中心を通る

**内容テキスト**：
- 16px、グレー
- 年号の右側に配置

**「現在」項目**：
- 星マークまたは特別なアイコン
- テキストを太字に

### 使用例

```tsx
<Timeline
  items={[
    { year: "1994", content: "〇〇市にて創業" },
    { year: "2000", content: "法人化。株式会社〇〇を設立" },
    { year: "2010", content: "現在地に本社移転" },
    { year: "現在", content: "地域密着でサービス提供中", isCurrent: true }
  ]}
  lineColor="#1a2744"
  dotColor="#1a2744"
/>
```

---

## 11. Accordion（アコーディオン/FAQ）

### 用途

- お問い合わせページのFAQ
- 開閉式のQ&A表示

### なぜ必要か

Standard テンプレートにもアコーディオンはあるが、
Local Visual 用にデザインをカスタマイズ。

### Props

```typescript
interface AccordionProps {
  items: {
    question: string;
    answer: string;
  }[];
  allowMultiple?: boolean;   // 複数同時に開けるか
  defaultOpen?: number[];    // デフォルトで開いている項目のインデックス
}
```

### デザイン仕様

**質問行**：
- 背景：オフホワイト（#f5f5f5）
- パディング：16px 20px
- 右端に開閉アイコン（矢印）
- font-weight 600

**回答行**：
- 背景：白
- パディング：16px 20px
- 左にメインカラーのボーダー（4px）
- 開閉アニメーション：高さ0→auto、0.3s

**開閉アイコン**：
- 矢印（chevron）
- 開いている時：180度回転

### 使用例

```tsx
<Accordion
  items={[
    { question: "見積もりは本当に無料ですか？", answer: "はい、完全無料です..." },
    { question: "対応エリア外でも相談できますか？", answer: "内容によっては..." }
  ]}
  allowMultiple={false}
  defaultOpen={[0]}
/>
```

---

## 12. ImageGallery（画像ギャラリー）

### 用途

- 施工事例詳細ページ
- メイン画像 + サムネイル + ライトボックス

### なぜ必要か

Standard テンプレートには高機能なギャラリーがない。
Local Visual は施工写真を効果的に見せる必要がある。

### Props

```typescript
interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  mainImageAspectRatio?: string;  // デフォルト「16/9」
  thumbnailSize?: number;         // デフォルト80
  enableLightbox?: boolean;       // ライトボックス機能
}
```

### デザイン仕様

**メイン画像**：
- 幅100%
- アスペクト比：指定値（デフォルト16:9）
- 角丸8px
- クリックでライトボックス表示

**サムネイル**：
- 横並び、gap 8px
- サイズ：thumbnailSize x thumbnailSize
- 選択中：メインカラー枠線（2px）
- クリックでメイン画像切り替え

**ライトボックス**：
- 背景：rgba(0,0,0,0.9)
- 画像：中央に大きく表示
- 左右矢印でナビゲーション
- 閉じるボタン：右上に×
- キャプション：画像下に表示

### 使用例

```tsx
<ImageGallery
  images={[
    { src: "/images/works/1.jpg", alt: "施工後外観", caption: "施工完了後の外観" },
    { src: "/images/works/2.jpg", alt: "施工前外観" },
    { src: "/images/works/3.jpg", alt: "作業中" }
  ]}
  mainImageAspectRatio="16/9"
  thumbnailSize={80}
  enableLightbox={true}
/>
```

---

## 共通コンポーネント（既存を流用）

以下のコンポーネントは template-fullorder または template-standard から流用し、スタイルのみ調整：

- **Header**: ロゴ + ナビ + 電話番号（電話番号を大きく目立たせる調整）
- **Footer**: 会社情報 + ナビ + コピーライト
- **Container**: 最大幅制限（max-width: 1200px）
- **Button**: 各種ボタン（色設定を調整）
- **Form系**: Input, Textarea, Select, Checkbox, Radio（スタイル調整）

---

## コンポーネント実装優先順位

1. **Phase 1（必須）**
   - HeroVisual
   - StatsCounter
   - PageHeader
   - CTASection
   - PhoneButton

2. **Phase 2（重要）**
   - WorksGrid
   - ServiceCard
   - BeforeAfter

3. **Phase 3（追加機能）**
   - AreaMap
   - Timeline
   - Accordion
   - ImageGallery
