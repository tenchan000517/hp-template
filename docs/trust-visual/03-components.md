# Trust Visual コンポーネント設計

## 概要

このドキュメントでは、Trust Visual テンプレート固有のコンポーネントを定義する。
Standard テンプレートにはない、または大幅にカスタマイズされたコンポーネントのみを記載。

---

## コンポーネント一覧

1. StatCounter - 実績数字カウントアップ
2. ClientLogos - 取引先ロゴスクロール
3. EvidenceBadge - 根拠数字バッジ
4. TestimonialCard - お客様の声カード
5. WorksGrid - 実績写真グリッド
6. ReasonBlock - 選ばれる理由ブロック
7. SatisfactionBar - 満足度バー
8. CertificationBadge - 資格・認証バッジ
9. CTASection - CTAセクション

---

## コンポーネント1: StatCounter

### 用途

TOPページのヒーローセクションで使用。
実績数字（取引社数、創業年数、満足度等）をカウントアップアニメーション付きで表示する。

### なぜ必要か

Trust Visual の核心である「数字による信頼構築」を視覚的に演出する。
カウントアップアニメーションにより、数字への注目度を高め、印象に残りやすくする。

### Props

```typescript
interface StatCounterProps {
  /** 表示する数字（最終値） */
  value: number;
  /** 単位（"社", "%", "年" 等） */
  unit: string;
  /** 説明ラベル（"取引実績", "お客様満足度" 等） */
  label: string;
  /** 小数点以下の桁数（デフォルト: 0） */
  decimals?: number;
  /** カウントアップの所要時間（ms、デフォルト: 2000） */
  duration?: number;
  /** 数字のサイズ（"large" | "medium"、デフォルト: "large"） */
  size?: "large" | "medium";
}
```

### デザイン仕様

**サイズ（large）**:
- 数字: 96px、Black（900）、メインカラー
- 単位: 24px、SemiBold（600）、アクセントカラー
- ラベル: 14px、Regular（400）、サブテキストカラー

**サイズ（medium）**:
- 数字: 48px
- 単位: 18px
- ラベル: 12px

**レイアウト**:
- 数字と単位は同一行、ベースライン揃え
- ラベルは数字の12px下

**SP変更**:
- large: 56px → 数字
- medium: 40px → 数字

### 使用例

```tsx
<StatCounter
  value={523}
  unit="社"
  label="取引実績"
  duration={2000}
  size="large"
/>
```

### 実装ポイント

```tsx
import { useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export function StatCounter({ value, unit, label, decimals = 0, duration = 2000, size = "large" }: StatCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: duration / 1000,
        ease: "easeOut",
        onUpdate: (v) => setDisplayValue(v),
      });
      return () => controls.stop();
    }
  }, [inView, value, duration]);

  const formattedValue = decimals > 0
    ? displayValue.toFixed(decimals)
    : Math.round(displayValue).toLocaleString();

  return (
    <div ref={ref} className={`stat-counter stat-counter--${size}`}>
      <div className="stat-counter__number">
        <span className="stat-counter__value">{formattedValue}</span>
        <span className="stat-counter__unit">{unit}</span>
      </div>
      <div className="stat-counter__label">{label}</div>
    </div>
  );
}
```

---

## コンポーネント2: ClientLogos

### 用途

TOPページの取引先ロゴセクションで使用。
取引先企業のロゴを横並びで表示し、オプションで無限スクロールアニメーションを適用。

### なぜ必要か

ハロー効果を活用し、有名企業との取引実績で信頼を借用する。
グレースケール化により統一感を出しつつ、ホバーでカラーに戻すインタラクションを提供。

### Props

```typescript
interface ClientLogo {
  src: string;
  alt: string;
  href?: string; // リンク先（任意）
}

interface ClientLogosProps {
  /** ロゴデータの配列 */
  logos: ClientLogo[];
  /** 無限スクロールを有効にするか（デフォルト: false） */
  infiniteScroll?: boolean;
  /** スクロール速度（秒、デフォルト: 30） */
  scrollDuration?: number;
  /** ロゴの高さ（px、デフォルト: 48） */
  logoHeight?: number;
}
```

### デザイン仕様

**ロゴスタイル**:
- 高さ: 48px（統一）
- 幅: 自動（アスペクト比維持）
- フィルター: grayscale(100%)、opacity(0.7)
- ホバー: grayscale(0%)、opacity(1)
- transition: 0.3s ease

**レイアウト**:
- ロゴ間のギャップ: 48px
- 中央揃え

### 使用例

```tsx
<ClientLogos
  logos={[
    { src: "/logos/client-1.svg", alt: "企業A" },
    { src: "/logos/client-2.svg", alt: "企業B" },
    // ...
  ]}
  infiniteScroll={true}
  scrollDuration={30}
  logoHeight={48}
/>
```

---

## コンポーネント3: EvidenceBadge

### 用途

選ばれる理由ページ、サービスページで使用。
各理由やサービスに紐づく根拠数字をバッジ形式で表示する。

### なぜ必要か

「根拠がある」ことを視覚的に示し、信頼性を高める。
アクセントカラーの背景で目立たせ、数字への注目を促す。

### Props

```typescript
interface EvidenceBadgeProps {
  /** 数字 */
  number: number | string;
  /** 単位 */
  unit: string;
  /** ラベル（任意） */
  label?: string;
}
```

### デザイン仕様

**コンテナ**:
- パディング: 8px 16px
- 背景色: アクセントカラーの10%透明度
- 角丸: 4px
- display: inline-flex

**数字**:
- サイズ: 32px
- ウェイト: Bold（700）
- 色: アクセントカラー

**単位**:
- サイズ: 16px
- ウェイト: SemiBold（600）
- 色: アクセントカラー
- マージン左: 2px

**ラベル**（ある場合）:
- サイズ: 12px
- 色: サブテキストカラー
- マージン左: 8px

### 使用例

```tsx
<EvidenceBadge number={35} unit="年" label="創業からの歴史" />
<EvidenceBadge number="0.01" unit="%以下" label="不良率" />
```

---

## コンポーネント4: TestimonialCard

### 用途

TOPページ、お客様の声ページで使用。
顔写真付きのお客様の声をカード形式で表示する。

### なぜ必要か

社会的証明の最強形態である「顔写真付き実名推薦」を視覚的に表現する。
顔写真を大きく見せることで「実在する人物」感を強調。

### Props

```typescript
interface TestimonialCardProps {
  /** 顔写真のパス */
  photo: string;
  /** 会社名 */
  company: string;
  /** 役職 */
  position: string;
  /** 氏名 */
  name: string;
  /** 引用コメント */
  quote: string;
  /** バリエーション（"summary" | "detail"） */
  variant?: "summary" | "detail";
}
```

### デザイン仕様

**summary バリエーション**（TOPページ用）:
- カード背景: ウォームグレー（#f0ebe6）
- 顔写真: 80×80px、円形
- 写真配置: 中央上部
- 会社名: 14px、サブテキストカラー
- 役職・氏名: 17px、メインカラー
- 引用: 17px、3-5行、メインカラー

**detail バリエーション**（お客様の声ページ用）:
- 顔写真: 縦長（3:4比率）、矩形
- インタビュー形式のレイアウト

### 使用例

```tsx
<TestimonialCard
  photo="/images/voice/person-1.jpg"
  company="株式会社〇〇"
  position="代表取締役"
  name="山田太郎"
  quote="納期と品質の両方を満たしてくれる会社はなかなかありません。"
  variant="summary"
/>
```

---

## コンポーネント5: WorksGrid

### 用途

TOPページ、実績紹介ページで使用。
実績写真をグリッド形式で表示する。

### なぜ必要か

写真という「証拠」で「本当に仕事をしている」ことを証明する。
グリッド形式で多数の写真を見せ、「実績の多さ」を印象づける。

### Props

```typescript
interface WorkItem {
  id: string;
  image: string;
  title: string;
  category?: string;
  year?: number;
}

interface WorksGridProps {
  /** 実績データの配列 */
  works: WorkItem[];
  /** カラム数（デフォルト: 3） */
  columns?: 2 | 3 | 4;
  /** ギャップ（px、デフォルト: 16） */
  gap?: number;
  /** ホバーでオーバーレイ表示するか（デフォルト: true） */
  showOverlay?: boolean;
}
```

### デザイン仕様

**グリッド**:
- カラム: 3（PC）、2（SP）
- ギャップ: 16px
- アスペクト比: 4:3

**写真**:
- object-fit: cover
- ホバー: scale(1.03)、transition 0.4s

**オーバーレイ**（ホバー時）:
- 背景: 黒の半透明（linear-gradient）
- opacity: 0 → 1
- カテゴリバッジ: 左上、アクセントカラー背景、12px
- タイトル: 下部中央、18px、白

### 使用例

```tsx
<WorksGrid
  works={[
    { id: "1", image: "/works/1.jpg", title: "A社様 設備導入", category: "製造業" },
    // ...
  ]}
  columns={3}
  gap={16}
  showOverlay={true}
/>
```

---

## コンポーネント6: ReasonBlock

### 用途

選ばれる理由ページで使用。
各理由を「番号 + タイトル + 説明 + 写真 + 根拠数字」の統一フォーマットで表示。

### なぜ必要か

選ばれる理由を構造化して提示し、理解しやすくする。
交互レイアウトでリズムを作り、スクロール時の単調さを防ぐ。

### Props

```typescript
interface ReasonBlockProps {
  /** 理由番号（"01", "02", "03"） */
  number: string;
  /** タイトル */
  title: string;
  /** 写真パス */
  image: string;
  /** 説明文 */
  description: string;
  /** 根拠数字の配列 */
  evidence: Array<{ number: number | string; unit: string; label: string }>;
  /** 認証バッジの配列（任意） */
  certifications?: Array<{ src: string; alt: string }>;
  /** レイアウト方向 */
  direction?: "left" | "right";
}
```

### デザイン仕様

**番号**:
- サイズ: 96px（PC）、64px（SP）
- ウェイト: Light（300）
- 色: アクセントカラー

**タイトル**:
- サイズ: 32px（PC）、24px（SP）
- ウェイト: Bold（700）
- 色: メインカラー

**レイアウト**:
- direction="left": 写真左、テキスト右
- direction="right": 写真右、テキスト左

### 使用例

```tsx
<ReasonBlock
  number="01"
  title="35年の経験と実績"
  image="/images/why/reason-01.jpg"
  description="創業以来、35年にわたり..."
  evidence={[
    { number: 35, unit: "年", label: "創業からの歴史" },
    { number: 12000, unit: "件+", label: "累計納品実績" },
  ]}
  direction="left"
/>
```

---

## コンポーネント7: SatisfactionBar

### 用途

お客様の声ページの満足度まとめセクションで使用。
パーセンテージをバーチャートで視覚化する。

### なぜ必要か

満足度の高さを視覚的にわかりやすく表現する。
バーのフィルアニメーションで注目を集める。

### Props

```typescript
interface SatisfactionBarProps {
  /** ラベル（"品質満足度" 等） */
  label: string;
  /** パーセンテージ（0-100） */
  percentage: number;
  /** アニメーションするか（デフォルト: true） */
  animate?: boolean;
}
```

### デザイン仕様

**パーセンテージ数字**:
- サイズ: 48px
- ウェイト: Bold
- 色: 白

**ラベル**:
- サイズ: 16px
- 色: 白（opacity 0.8）

**バー**:
- 高さ: 8px
- 背景: 白の20%透明度
- フィル: アクセントカラー
- 角丸: 4px

### 使用例

```tsx
<SatisfactionBar
  label="品質満足度"
  percentage={98}
  animate={true}
/>
```

---

## コンポーネント8: CertificationBadge

### 用途

会社概要ページの資格・認証セクションで使用。
ISO認証等のバッジを表示する。

### なぜ必要か

権威性バイアスを活用し、公的機関による「お墨付き」を視覚化する。

### Props

```typescript
interface CertificationBadgeProps {
  /** バッジ画像パス */
  image: string;
  /** 認証名 */
  name: string;
  /** 補足情報（取得年等） */
  note?: string;
}
```

### デザイン仕様

**バッジ画像**:
- 高さ: 80px（PC）、60px（SP）
- 幅: 自動
- マージン下: 16px

**認証名**:
- サイズ: 14px
- ウェイト: SemiBold（600）
- 色: メインカラー

**補足**:
- サイズ: 12px
- 色: サブテキストカラー

### 使用例

```tsx
<CertificationBadge
  image="/images/certifications/iso9001.png"
  name="ISO9001"
  note="2010年取得"
/>
```

---

## コンポーネント9: CTASection

### 用途

各ページ下部で使用。
問い合わせへの誘導を行うセクション。

### なぜ必要か

全ページで統一されたCTAセクションを提供し、問い合わせへの導線を確保する。

### Props

```typescript
interface CTAButtonConfig {
  text: string;
  href: string;
  variant?: "primary" | "secondary";
}

interface CTASectionProps {
  /** 見出し */
  heading: string;
  /** サブテキスト */
  subText?: string;
  /** メインボタン */
  primaryButton: CTAButtonConfig;
  /** サブボタン（任意） */
  secondaryButton?: CTAButtonConfig;
  /** 電話番号（任意） */
  phone?: { number: string; hours: string };
  /** 背景バリエーション */
  variant?: "dark" | "light";
}
```

### デザイン仕様

**dark バリエーション**:
- 背景: メインカラー
- テキスト: 白
- 主ボタン: アクセントカラー背景

**light バリエーション**:
- 背景: オフホワイト
- テキスト: メインカラー
- 主ボタン: アクセントカラー背景

### 使用例

```tsx
<CTASection
  heading="まずは、お気軽にご相談ください。"
  subText="お見積もり・ご相談は無料です。"
  primaryButton={{ text: "お問い合わせ", href: "/contact" }}
  secondaryButton={{ text: "実績を見る", href: "/works" }}
  phone={{ number: "03-1234-5678", hours: "平日 9:00-18:00" }}
  variant="dark"
/>
```

---

## 共通コンポーネント拡張

### PageHero

既存のPageHeroコンポーネントを拡張し、Trust Visual 用のバリエーションを追加。

**追加Props**:
```typescript
interface PageHeroProps {
  // 既存のProps...

  /** 背景画像（Trust Visual 用） */
  backgroundImage?: string;
  /** 統計数字（Trust Visual 用） */
  stats?: Array<{ number: number; unit: string; label: string }>;
  /** 満足度数字（Trust Visual 用） */
  satisfaction?: { number: number; unit: string; label: string; source: string };
}
```

---

## スタイル定義（globals.css 追加分）

```css
/* Trust Visual 固有のCSS変数 */
@theme {
  /* 既存の変数に追加 */
  --stat-number-size-lg: 96px;
  --stat-number-size-md: 48px;
  --stat-number-size-sm: 32px;

  --evidence-badge-bg: rgba(196, 92, 62, 0.1);
  --evidence-badge-radius: 4px;

  --testimonial-card-bg: #f0ebe6;
  --testimonial-quote-size: 64px;

  --works-grid-gap: 16px;
  --works-overlay-gradient: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%);
}
```
