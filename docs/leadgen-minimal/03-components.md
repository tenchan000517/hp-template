# LeadGen Minimal コンポーネント設計

## 概要

このドキュメントでは、LeadGen Minimal テンプレート固有のコンポーネントを定義する。
Standard テンプレートからの継承コンポーネント（Header, Footer等）は別途記載。

---

## コンポーネント一覧

| コンポーネント名 | 用途 | ページ |
|----------------|------|--------|
| MinimalHeader | ヘッダー（固定表示、Minimal仕様） | 全ページ |
| MinimalFooter | フッター（シンプル構成） | 全ページ |
| SectionWrapper | セクションの余白・背景管理 | 全ページ |
| PageHeader | 下層ページのタイトル部分 | サービス、事例、お問い合わせ、プライバシー |
| CTASection | CTA専用セクション | TOP、サービス、事例 |
| PrimaryButton | アクセントカラーのCTAボタン | 全ページ |
| TextLink | テキストリンク（矢印付き） | 各所 |
| NumberedItem | 番号付きコンテンツ（課題、プロセス等） | TOP、サービス |
| ResultCard | 成果数字カード | TOP、事例 |
| CaseDetail | 事例詳細ブロック | 事例 |
| ContactForm | お問い合わせフォーム | お問い合わせ |
| FormField | フォーム入力フィールド | お問い合わせ |
| ScrollIndicator | スクロール誘導（ヒーロー下部） | TOP |
| FadeInView | フェードインアニメーションラッパー | 各所 |

---

## コンポーネント詳細

---

### MinimalHeader

**用途**: 全ページ共通のヘッダー。常時固定表示。

**なぜ必要か**:
Standard の Header とは異なり、ナビゲーション項目を4つに限定し、CTAボタンをアクセントカラーで強調する。

**Props**:
```typescript
interface MinimalHeaderProps {
  currentPath?: string; // 現在のパス（アクティブ表示用）
}
```

**デザイン仕様**:

| 項目 | 値 |
|------|---|
| 高さ | 80px（PC）、60px（SP） |
| 背景色 | 白（#FFFFFF）、スクロール時に影追加 |
| 位置 | position: fixed; top: 0 |
| z-index | 1000 |
| 左右パディング | 5%（PCは10%） |

**ナビゲーション項目**:
1. ロゴ（左端）: クリックでTOPへ
2. サービス: `/service`
3. 事例: `/case`
4. お問い合わせ（CTAボタン）: `/contact`

**ナビゲーションスタイル**:
- 通常リンク: ダークネイビー、16px、ホバーで透明度80%
- アクティブ: 下線（2px、ダークネイビー）
- CTAボタン: アクセントカラー背景、白文字、角丸4px、幅160px、高さ44px

**SPでの変化**:
- ハンバーガーメニューに変更
- メニュー展開時: 画面全体を覆うオーバーレイ
- CTAボタンはメニュー内でも目立つ位置に

**使用例**:
```tsx
<MinimalHeader currentPath="/" />
```

---

### MinimalFooter

**用途**: 全ページ共通のフッター。シンプル構成。

**なぜ必要か**:
Standard の Footer とは異なり、情報を最小限に絞る。会社情報とナビゲーションのみ。

**Props**:
```typescript
interface MinimalFooterProps {
  // 特になし。site.json から情報を取得
}
```

**デザイン仕様**:

| 項目 | 値 |
|------|---|
| 背景色 | ダークネイビー（#1a1a2e） |
| テキスト色 | 白 |
| 上下パディング | 80px |
| 左右パディング | 10% |

**構成**:
- 左側: 会社名、住所、電話番号、メールアドレス
- 右側: ナビゲーション（サービス、事例、お問い合わせ、プライバシーポリシー）
- 下部: コピーライト

**SPでの変化**:
- 左右分割を解除、縦並び
- 会社情報 → ナビゲーション → コピーライト

**使用例**:
```tsx
<MinimalFooter />
```

---

### SectionWrapper

**用途**: 各セクションの余白・背景色を統一管理するラッパー。

**なぜ必要か**:
セクションごとに余白を変える設計のため、柔軟に設定できるラッパーが必要。

**Props**:
```typescript
interface SectionWrapperProps {
  children: React.ReactNode;
  background?: 'white' | 'offwhite' | 'dark'; // 背景色
  paddingTop?: 'sm' | 'md' | 'lg' | 'xl'; // 上余白
  paddingBottom?: 'sm' | 'md' | 'lg' | 'xl'; // 下余白
  id?: string; // アンカー用
}
```

**余白サイズ定義**:

| サイズ | PC | SP |
|--------|----|----|
| sm | 80px | 60px |
| md | 120px | 80px |
| lg | 160px | 100px |
| xl | 200px | 120px |

**背景色定義**:

| 値 | 色 |
|----|-----|
| white | #FFFFFF |
| offwhite | #f8f8f8 |
| dark | #1a1a2e |

**使用例**:
```tsx
<SectionWrapper background="offwhite" paddingTop="lg" paddingBottom="md">
  <h2>セクション見出し</h2>
  <p>コンテンツ</p>
</SectionWrapper>
```

---

### PageHeader

**用途**: 下層ページのタイトル部分。

**なぜ必要か**:
各下層ページで統一されたヘッダーを表示するため。高さや余白をページごとに調整可能。

**Props**:
```typescript
interface PageHeaderProps {
  title: string;
  description?: string;
  height?: 'sm' | 'md' | 'lg'; // 高さ
  lastUpdated?: string; // プライバシーポリシー用
}
```

**高さ定義**:

| サイズ | PC | SP |
|--------|----|----|
| sm | 25vh | 20vh |
| md | 30vh | 25vh |
| lg | 40vh | 35vh |

**デザイン仕様**:
- タイトル: 48px（sm時は40px）、中央揃え
- 説明文: 18px、中央揃え、タイトルから24px下
- 最終更新日: 14px、ミディアムグレー

**使用例**:
```tsx
<PageHeader
  title="サービス"
  description="私たちが提供する価値と、その実現方法をご紹介します。"
  height="lg"
/>
```

---

### CTASection

**用途**: CTA専用のセクション。各ページ下部で使用。

**なぜ必要か**:
CTA部分のデザインを統一し、再利用可能にする。

**Props**:
```typescript
interface CTASectionProps {
  heading: string;
  subText: string;
  buttonText: string;
  buttonLink: string;
  secondaryLink?: {
    text: string;
    href: string;
  };
  background?: 'dark' | 'offwhite'; // 背景色
}
```

**デザイン仕様**:
- 背景色: ダークネイビー（dark）またはオフホワイト（offwhite）
- 見出し: 36px、中央揃え
- 補足テキスト: 17px、中央揃え、見出しから24px下
- ボタン: PrimaryButton コンポーネント使用、補足テキストから48px下
- セカンダリリンク: テキストリンク、ボタンから32px下

**使用例**:
```tsx
<CTASection
  heading="まずは、お話しませんか。"
  subText="無料でご相談いただけます。お気軽にどうぞ。"
  buttonText="お問い合わせ"
  buttonLink="/contact"
  background="dark"
/>
```

---

### PrimaryButton

**用途**: メインのCTAボタン。アクセントカラー使用。

**なぜ必要か**:
CTAボタンのデザインを統一し、サイト全体で一貫した視覚言語を維持する。

**Props**:
```typescript
interface PrimaryButtonProps {
  children: React.ReactNode;
  href?: string; // リンク先（指定時は<a>タグ）
  onClick?: () => void; // クリックハンドラ（href未指定時）
  size?: 'md' | 'lg'; // サイズ
  fullWidth?: boolean; // 幅100%
  disabled?: boolean;
  type?: 'button' | 'submit';
}
```

**サイズ定義**:

| サイズ | 幅 | 高さ | フォントサイズ |
|--------|----|----|--------------|
| md | 200px | 56px | 16px |
| lg | 280px | 64px | 17px |

**デザイン仕様**:
- 背景色: アクセントカラー（#c45c3e）
- 文字色: 白
- 角丸: 4px
- ホバー: 背景色がダークネイビーに変化（0.2秒）
- 無効時: 背景色 #d0d0d0、クリック不可

**使用例**:
```tsx
<PrimaryButton href="/contact" size="lg">
  お問い合わせ
</PrimaryButton>
```

---

### TextLink

**用途**: テキストリンク。矢印付き。

**なぜ必要か**:
サブアクションのリンクを統一的に表示する。

**Props**:
```typescript
interface TextLinkProps {
  children: React.ReactNode;
  href: string;
  arrow?: 'right' | 'left'; // 矢印の方向
  color?: 'dark' | 'light'; // 色
}
```

**デザイン仕様**:
- フォントサイズ: 16px
- 色: ダークネイビー（dark）または白（light）
- 矢印: → または ←、テキストと8pxの余白
- ホバー: アンダーライン表示

**使用例**:
```tsx
<TextLink href="/case" arrow="right">
  事例を見る
</TextLink>

<TextLink href="/" arrow="left" color="light">
  TOPページへ戻る
</TextLink>
```

---

### NumberedItem

**用途**: 番号付きのコンテンツアイテム。課題、プロセス等で使用。

**なぜ必要か**:
番号 + タイトル + 説明文の組み合わせを統一的に表示する。

**Props**:
```typescript
interface NumberedItemProps {
  number: string; // "01", "02" など
  title: string;
  description: string;
  items?: string[]; // サブ項目（リスト表示）
  layout?: 'stacked' | 'split'; // 縦並び or 左右分割
}
```

**レイアウト: stacked（縦並び）**:
- 番号: 32px、アクセントカラー
- タイトル: 24px、ダークネイビー、番号の16px下
- 説明文: 17px、ミディアムグレー、タイトルの12px下

**レイアウト: split（左右分割）**:
- 左側（40%）: 番号 + タイトル
- 右側（60%）: 説明文 + サブ項目

**使用例**:
```tsx
<NumberedItem
  number="01"
  title="課題の本質を見極める"
  description="表面的な対処ではなく、根本原因にアプローチします。"
  layout="stacked"
/>
```

---

### ResultCard

**用途**: 成果数字を表示するカード。

**なぜ必要か**:
大きな数字 + 単位 + 説明のセットを統一的に表示する。

**Props**:
```typescript
interface ResultCardProps {
  number: string | number;
  unit: string;
  label: string;
  description?: string;
  size?: 'md' | 'lg'; // 数字のサイズ
  color?: 'accent' | 'white'; // 数字の色
}
```

**サイズ定義**:

| サイズ | 数字 | 単位 | ラベル |
|--------|------|------|-------|
| md | 48px | 20px | 14px |
| lg | 96px | 24px | 18px |

**デザイン仕様**:
- 数字: アクセントカラーまたは白、Bold
- 単位: 数字の右側に配置
- ラベル/説明: 数字の下、ミディアムグレーまたは薄い白

**使用例**:
```tsx
<ResultCard
  number={32}
  unit="%"
  label="生産性向上"
  size="lg"
  color="white"
/>
```

---

### CaseDetail

**用途**: 事例詳細を表示するブロック。

**なぜ必要か**:
事例の「背景→課題→解決策→成果」の構造を統一的に表示する。

**Props**:
```typescript
interface CaseDetailProps {
  title: string;
  background: string;
  problem: string;
  solution: string;
  result: {
    number: string;
    unit: string;
    label: string;
    description: string;
  };
}
```

**デザイン仕様**:
- タイトル: 28px、ダークネイビー
- 各セクション見出し（課題、解決策、成果）: 20px
- 本文: 17px、行間1.8
- 成果数字: 64px、アクセントカラー

**使用例**:
```tsx
<CaseDetail
  title="製造業 × 業務改善"
  background="従業員300名の精密機器メーカー..."
  problem="製造ラインの最適化は..."
  solution="まず、ベテラン社員へのヒアリングを..."
  result={{
    number: "45",
    unit: "%",
    label: "生産性向上",
    description: "導入から6ヶ月で生産性が45%向上..."
  }}
/>
```

---

### ContactForm

**用途**: お問い合わせフォーム全体。

**なぜ必要か**:
フォームのロジック（バリデーション、送信処理）を一括管理する。

**Props**:
```typescript
interface ContactFormProps {
  onSubmitSuccess?: () => void; // 送信成功時のコールバック
  submitEndpoint?: string; // API エンドポイント
}
```

**内部状態**:
- formData: 各フィールドの値
- errors: 各フィールドのエラー
- isSubmitting: 送信中フラグ
- isSubmitted: 送信完了フラグ

**使用例**:
```tsx
<ContactForm
  onSubmitSuccess={() => setShowThankYou(true)}
  submitEndpoint="/api/contact"
/>
```

---

### FormField

**用途**: フォームの入力フィールド。

**なぜ必要か**:
ラベル、入力、エラー表示を統一的に管理する。

**Props**:
```typescript
interface FormFieldProps {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}
```

**デザイン仕様**:
- ラベル: 15px、ダークネイビー
- 必須表示: 「（必須）」テキスト、ダークネイビー
- 任意表示: 「（任意）」テキスト、ミディアムグレー
- 入力フィールド: 高さ56px、ボーダー1px、角丸4px
- エラー: 14px、赤（#dc2626）、フィールド下8px

**使用例**:
```tsx
<FormField
  name="email"
  label="メールアドレス"
  type="email"
  required
  placeholder="example@company.co.jp"
  value={email}
  onChange={setEmail}
  error={errors.email}
/>
```

---

### ScrollIndicator

**用途**: ヒーローセクション下部のスクロール誘導。

**なぜ必要か**:
「下にコンテンツがある」ことを示し、スクロールを促す。

**Props**:
```typescript
interface ScrollIndicatorProps {
  text?: string; // デフォルト: "Scroll"
}
```

**デザイン仕様**:
- 縦線: 高さ40px、幅1px、ダークネイビー
- テキスト: 12px、ミディアムグレー、縦線の下8px
- アニメーション: 縦線が上下に2pxゆっくり動く（無限ループ）

**使用例**:
```tsx
<ScrollIndicator text="Scroll" />
```

---

### FadeInView

**用途**: フェードインアニメーションのラッパー。

**なぜ必要か**:
Framer Motion のアニメーション設定を統一的に適用する。

**Props**:
```typescript
interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number; // 遅延（秒）
  direction?: 'up' | 'left' | 'right' | 'none'; // 移動方向
  distance?: number; // 移動距離（px）
}
```

**デザイン仕様**:
- デフォルト: opacity 0→1、y 20→0
- duration: 0.6秒
- ease: "easeOut"
- viewport: { once: true, margin: "-100px" }

**使用例**:
```tsx
<FadeInView delay={0.2} direction="up">
  <h2>セクション見出し</h2>
</FadeInView>
```

---

## コンポーネントディレクトリ構造

```
src/components/
├── layout/
│   ├── MinimalHeader.tsx
│   ├── MinimalFooter.tsx
│   └── SectionWrapper.tsx
├── sections/
│   ├── PageHeader.tsx
│   └── CTASection.tsx
├── ui/
│   ├── PrimaryButton.tsx
│   ├── TextLink.tsx
│   ├── NumberedItem.tsx
│   ├── ResultCard.tsx
│   └── ScrollIndicator.tsx
├── case/
│   └── CaseDetail.tsx
├── contact/
│   ├── ContactForm.tsx
│   └── FormField.tsx
└── animation/
    └── FadeInView.tsx
```

---

## Standard テンプレートからの継承・変更

| Standard コンポーネント | LeadGen Minimal での扱い |
|------------------------|-------------------------|
| Header | MinimalHeader に置換（ナビ項目削減） |
| Footer | MinimalFooter に置換（情報削減） |
| Button | PrimaryButton として再定義（アクセントカラー専用） |
| Card | 使用しない（背景色のみで区切る） |
| SectionTitle | 使用しない（見出しは直接記述） |
| HeroSection | 使用しない（TOPページ固有の実装） |

---

## 実装時の注意点

1. **カードUIの禁止**: 角丸+影のカードは使用しない。背景色と余白で区切る
2. **アイコンの禁止**: 装飾的なアイコンは一切使用しない
3. **アニメーションの制限**: FadeInView のみ使用。その他のアニメーションは禁止
4. **色の制限**: アクセントカラーは PrimaryButton のみで使用
5. **余白の非均一化**: SectionWrapper の paddingTop/paddingBottom を意図的に変える
