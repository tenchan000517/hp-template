# Authority Minimal コンポーネント設計

このドキュメントでは、Authority Minimalテンプレート固有のコンポーネントを定義する。
汎用コンポーネント（Button, Input等）はtemplate-fullorderから継承し、ここでは追加・カスタマイズが必要なもののみを記載する。

---

## コンポーネント一覧

### レイアウト系
1. PageTitle - ページタイトル
2. SectionWrapper - セクションラッパー
3. DiagonalLayout - 斜め配置レイアウト

### テキスト系
4. VerticalText - 縦書きテキスト
5. QuoteText - 引用テキスト
6. SectionTitle - セクションタイトル（英語+日本語）

### ナビゲーション系
7. MinimalNav - ヘッダーナビゲーション
8. FooterMinimal - ミニマルフッター
9. TextLink - テキストリンク

### コンテンツ系
10. MemberCard - メンバーカード
11. CaseCard - 事例カード
12. ArticleListItem - 記事リストアイテム
13. ProcessStep - プロセスステップ
14. CompanyInfoRow - 会社情報行

### フォーム系
15. MinimalInput - ミニマル入力欄
16. MinimalTextarea - ミニマルテキストエリア
17. MinimalSelect - ミニマルセレクト
18. MinimalRadio - ミニマルラジオボタン
19. MinimalCheckbox - ミニマルチェックボックス
20. SubmitButton - 送信ボタン

---

## 1. PageTitle

### 用途
全ページのタイトルセクションで使用。英語サブタイトル + 日本語タイトル + 任意の導入文を表示。

### なぜ必要か
Authority Minimalでは、ページタイトルに大きな余白（ビューポート50%）を設ける独自の表現が必要。

### Props

```typescript
interface PageTitleProps {
  titleEn: string;        // 英語タイトル（例: "Philosophy"）
  titleJa: string;        // 日本語タイトル（例: "代表メッセージ"）
  lead?: string;          // 導入文（任意）
  subLead?: string;       // 補助テキスト（任意）
}
```

### デザイン仕様

```
上余白: 50vh（最小300px）
下余白: 80px〜120px

英語タイトル:
  - サイズ: 14px
  - フォント: Cormorant Garamond
  - 色: #999999
  - 字間: 0.2em

日本語タイトル:
  - サイズ: 48px（SP: 32px）
  - フォント: 游明朝
  - 色: #1A1A1A
  - 字間: 0.1em
  - 英語から16px下

導入文:
  - サイズ: 18px（SP: 16px）
  - フォント: 游ゴシック
  - 色: #333333
  - 行間: 1.8
  - 最大幅: 480px
  - タイトルから48px下
```

### 使用例

```tsx
<PageTitle
  titleEn="Philosophy"
  titleJa="代表メッセージ"
  lead="私たちの原点と、大切にしていること。"
/>
```

---

## 2. SectionWrapper

### 用途
各セクションのラッパー。余白、背景色、最大幅を統一管理。

### なぜ必要か
Authority Minimalでは意図的に不均一な余白を使用。セクションタイプに応じた余白設定を一元管理。

### Props

```typescript
interface SectionWrapperProps {
  children: React.ReactNode;
  bgColor?: 'white' | 'gray';           // 背景色（デフォルト: white）
  spacing?: 'normal' | 'large' | 'small'; // 余白サイズ
  maxWidth?: 'full' | 'content' | 'narrow'; // コンテンツ最大幅
  id?: string;                           // アンカーリンク用
}
```

### デザイン仕様

```
背景色:
  - white: #FFFFFF
  - gray: #F5F5F5

余白（上下）:
  - normal: 160px（SP: 100px）
  - large: 200px（SP: 120px）
  - small: 120px（SP: 80px）

最大幅:
  - full: 100%
  - content: 1200px + 左右15%マージン
  - narrow: 800px + 左右15%マージン
```

### 使用例

```tsx
<SectionWrapper bgColor="gray" spacing="large" maxWidth="content">
  {/* セクションコンテンツ */}
</SectionWrapper>
```

---

## 3. DiagonalLayout

### 用途
TOPページの事業暗示、サービスページのサービス詳細で使用。要素を斜め方向に配置。

### なぜ必要か
Authority Minimal独自の非対称レイアウト。視線誘導と動きのある構成を実現。

### Props

```typescript
interface DiagonalLayoutProps {
  items: {
    numberEn: string;    // 番号（"01", "02" 等）
    titleEn: string;     // 英語タイトル
    titleJa: string;     // 日本語タイトル
    description?: string; // 説明文（任意）
    details?: string[];  // 詳細項目（任意）
  }[];
  variant?: 'simple' | 'detailed'; // 表示バリエーション
}
```

### デザイン仕様

```
PC配置:
  - アイテム1: 左10%
  - アイテム2: 左45%（中央）
  - アイテム3: 左70%（右寄り）
  - 各アイテムの縦位置: 前のアイテムから下方向にオフセット

SP配置:
  - 全アイテム左寄せ
  - 縦に積み上げ

番号:
  - サイズ: 14px
  - 色: #CCCCCC

英語タイトル:
  - サイズ: 14px
  - 色: #999999

日本語タイトル:
  - サイズ: 20px〜28px
  - 色: #1A1A1A
```

### 使用例

```tsx
<DiagonalLayout
  variant="detailed"
  items={[
    {
      numberEn: "01",
      titleEn: "Strategy",
      titleJa: "戦略設計",
      description: "課題を正しく定義し、進むべき方向を明確にする。",
      details: ["現状分析", "ゴール設定", "実行計画"]
    },
    // ...
  ]}
/>
```

---

## 4. VerticalText

### 用途
理念ページの見出し、TOPページのアクセント。縦書きテキストを表示。

### なぜ必要か
日本語の美しさを表現するための縦書き。Authority Minimalの差別化要素。

### Props

```typescript
interface VerticalTextProps {
  children: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}
```

### デザイン仕様

```css
.vertical-text {
  writing-mode: vertical-rl;
  text-orientation: upright;
  white-space: nowrap;
}

サイズ:
  - small: 14px
  - medium: 24px
  - large: 36px

フォント: 游明朝
色: デフォルト #1A1A1A
```

### 使用例

```tsx
<VerticalText size="large">
  本質を、かたちに。
</VerticalText>
```

---

## 5. QuoteText

### 用途
TOPページの理念導入、サービスページの哲学。引用・強調テキストを表示。

### なぜ必要か
通常の本文とは異なる「重みのある言葉」を表現。中央配置、大きめのサイズ、明朝体。

### Props

```typescript
interface QuoteTextProps {
  children: string;
  author?: string;        // 発言者（任意）
  withLink?: {
    text: string;
    href: string;
  };
}
```

### デザイン仕様

```
テキスト:
  - サイズ: 20px〜24px（SP: 17px〜18px）
  - フォント: 游明朝
  - 色: #333333
  - 行間: 2.0〜2.2
  - 最大幅: 520px〜600px
  - 中央揃え

発言者:
  - サイズ: 14px
  - 色: #666666
  - 右寄せ
  - テキストから32px下
```

### 使用例

```tsx
<QuoteText
  author="代表取締役 山田太郎"
  withLink={{ text: "続きを読む", href: "/philosophy" }}
>
  私たちは、答えではなく問いを持つクライアントと共に歩みます。
</QuoteText>
```

---

## 6. SectionTitle

### 用途
各セクションの見出し。英語 + 日本語の2層構造。

### なぜ必要か
PageTitleとは異なり、ページ内セクションの区切りとして使用。

### Props

```typescript
interface SectionTitleProps {
  titleEn: string;
  titleJa: string;
  withLine?: boolean;    // 下線を追加するか
  align?: 'left' | 'center';
}
```

### デザイン仕様

```
英語:
  - サイズ: 14px
  - フォント: Cormorant Garamond
  - 色: #999999

日本語:
  - サイズ: 24px〜28px（SP: 20px〜22px）
  - フォント: 游明朝
  - 色: #1A1A1A
  - 英語から8px下

下線（withLine: true）:
  - 幅: 100%
  - 高さ: 1px
  - 色: #E0E0E0
  - タイトルから32px下
```

### 使用例

```tsx
<SectionTitle
  titleEn="Process"
  titleJa="進め方"
  withLine
  align="left"
/>
```

---

## 7. MinimalNav

### 用途
ヘッダーナビゲーション。

### なぜ必要か
Authority Minimal専用のシンプルなナビゲーション。ホバー時の下線アニメーションを含む。

### Props

```typescript
interface MinimalNavProps {
  items: {
    label: string;
    href: string;
  }[];
  currentPath: string;
}
```

### デザイン仕様

```
レイアウト:
  - ロゴ: 左
  - ナビゲーション: 右
  - 高さ: 80px（SP: 60px）
  - 背景: 透明（スクロールで#FFFFFF）

ナビゲーションリンク:
  - サイズ: 13px
  - フォント: 游ゴシック
  - 色: #333333
  - 間隔: 32px
  - ホバー時: 下線が左から右へ展開（0.3s）
  - 現在ページ: 下線が常に表示

SP:
  - ハンバーガーメニュー
  - 全画面オーバーレイ
```

### 使用例

```tsx
<MinimalNav
  items={[
    { label: "Philosophy", href: "/philosophy" },
    { label: "Service", href: "/service" },
    { label: "Case", href: "/case" },
    { label: "Contact", href: "/contact" },
  ]}
  currentPath="/service"
/>
```

---

## 8. FooterMinimal

### 用途
全ページのフッター。

### なぜ必要か
Authority Minimal用のシンプルなフッター。情報を最小限に。

### Props

```typescript
interface FooterMinimalProps {
  companyName: string;
  links: {
    label: string;
    href: string;
  }[];
}
```

### デザイン仕様

```
背景: #1A1A1A（ダークグレー）
文字色: #FFFFFF（ロゴ、リンク）
       #999999（コピーライト）

高さ: 200px（SP: 180px）

構成:
  - 上部: ロゴ（中央）
  - 中部: リンク一覧（横並び）
  - 下部: コピーライト

リンク:
  - サイズ: 12px
  - 間隔: 24px
  - ホバー: opacity 0.7
```

### 使用例

```tsx
<FooterMinimal
  companyName="株式会社〇〇"
  links={[
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Contact", href: "/contact" },
  ]}
/>
```

---

## 9. TextLink

### 用途
「続きを読む →」「相談する →」等のテキストリンク。

### なぜ必要か
ボタンではなく、テキストリンクでの控えめな導線。矢印付き。

### Props

```typescript
interface TextLinkProps {
  children: string;
  href: string;
  withArrow?: boolean;
  size?: 'small' | 'medium';
}
```

### デザイン仕様

```
small:
  - サイズ: 13px
  - 矢印: 「→」

medium:
  - サイズ: 14px
  - 矢印: 「→」

共通:
  - フォント: 游ゴシック
  - 色: #666666
  - ホバー時: #333333、下線出現（0.2s）
```

### 使用例

```tsx
<TextLink href="/philosophy" withArrow>
  続きを読む
</TextLink>
```

---

## 10. MemberCard

### 用途
チームページのメンバー紹介。

### なぜ必要か
写真 + 名前 + 肩書きのシンプルなカード。代表者用と通常メンバー用のバリエーション。

### Props

```typescript
interface MemberCardProps {
  image: string;
  nameJa: string;
  nameEn: string;
  title: string;
  isRepresentative?: boolean;
}
```

### デザイン仕様

```
代表者（isRepresentative: true）:
  - 写真幅: 400px（SP: 80%）
  - 中央配置

通常メンバー:
  - 2カラムグリッド
  - 写真幅: 48%

共通:
  - 写真アスペクト比: 3:4
  - 名前日本語: 16px〜20px、游ゴシック Medium
  - 名前英語: 12px〜13px、Cormorant Garamond
  - 肩書き: 13px〜14px、游ゴシック
```

---

## 11. CaseCard

### 用途
事例一覧ページのサムネイル。

### Props

```typescript
interface CaseCardProps {
  image: string;
  client: string;
  description?: string;
  href: string;
  isMain?: boolean;      // メイン表示（大きく）
}
```

### デザイン仕様

```
メイン（isMain: true）:
  - 幅: 100%
  - アスペクト比: 16:9

通常:
  - 2カラム
  - アスペクト比: 4:3

ホバー時:
  - 画像opacity: 0.9
  - cursor: pointer
```

---

## 12. ArticleListItem

### 用途
コラム一覧ページの記事リスト。

### Props

```typescript
interface ArticleListItemProps {
  date: string;          // "2024.01.15" 形式
  title: string;
  lead?: string;
  href: string;
}
```

### デザイン仕様

```
日付:
  - サイズ: 13px
  - フォント: Cormorant Garamond
  - 色: #999999

タイトル:
  - サイズ: 22px（SP: 18px）
  - フォント: 游明朝
  - 色: #1A1A1A
  - ホバー: #666666

リード:
  - サイズ: 14px
  - 色: #666666
  - 最大2行（overflow: hidden）

区切り線:
  - 各記事の下
  - 1px、#E0E0E0
```

---

## 13. ProcessStep

### 用途
サービスページのプロセス、事例詳細のアプローチ。

### Props

```typescript
interface ProcessStepProps {
  steps: {
    number: string;      // "01", "02" 等
    title: string;
    description: string;
  }[];
}
```

### デザイン仕様

```
番号:
  - サイズ: 14px
  - 色: #CCCCCC

タイトル:
  - サイズ: 18px
  - 色: #333333

説明:
  - サイズ: 15px
  - 色: #666666

ステップ間余白: 48px〜64px
```

---

## 14. CompanyInfoRow

### 用途
会社概要ページの情報行。

### Props

```typescript
interface CompanyInfoRowProps {
  label: string;
  value: string | string[];  // 複数行対応
}
```

### デザイン仕様

```
ラベル:
  - サイズ: 14px
  - 色: #999999
  - 幅: 120px固定

値:
  - サイズ: 15px
  - 色: #333333
  - 複数行は改行で表示

区切り線:
  - 各行の上
  - 1px、#E0E0E0
```

---

## 15-19. フォームコンポーネント

### MinimalInput

```typescript
interface MinimalInputProps {
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel';
  required?: boolean;
  placeholder?: string;
  error?: string;
}
```

### MinimalTextarea

```typescript
interface MinimalTextareaProps {
  label: string;
  name: string;
  required?: boolean;
  rows?: number;
  error?: string;
}
```

### MinimalSelect

```typescript
interface MinimalSelectProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
}
```

### MinimalRadio

```typescript
interface MinimalRadioProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
}
```

### MinimalCheckbox

```typescript
interface MinimalCheckboxProps {
  label: string;
  name: string;
  required?: boolean;
  linkText?: string;
  linkHref?: string;
}
```

### 共通デザイン仕様

```
入力欄:
  - 高さ: 56px（SP: 52px）
  - ボーダー: 1px solid #E0E0E0
  - 角丸: 0
  - フォーカス時: ボーダー #333333

ラベル:
  - サイズ: 14px
  - 色: #333333
  - 必須マーク: #C0392B

エラー:
  - サイズ: 14px
  - 色: #C0392B
  - 入力欄下に表示
```

---

## 20. SubmitButton

### Props

```typescript
interface SubmitButtonProps {
  children: string;
  disabled?: boolean;
  loading?: boolean;
}
```

### デザイン仕様

```
通常:
  - 幅: 200px
  - 高さ: 56px
  - ボーダー: 1px solid #333333
  - 背景: transparent
  - 色: #333333

ホバー:
  - 背景: #333333
  - 色: #FFFFFF
  - transition: 0.2s

無効時:
  - opacity: 0.5
  - cursor: not-allowed

ローディング時:
  - テキストを「送信中...」に
  - cursor: wait
```

---

## アニメーション定義（Framer Motion）

### textFadeIn

```typescript
export const textFadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  viewport: { once: true, margin: "-100px" }
};
```

### pageTransition

```typescript
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};
```

---

## ファイル構成（推奨）

```
components/
├── layout/
│   ├── PageTitle.tsx
│   ├── SectionWrapper.tsx
│   ├── DiagonalLayout.tsx
│   ├── MinimalNav.tsx
│   └── FooterMinimal.tsx
├── text/
│   ├── VerticalText.tsx
│   ├── QuoteText.tsx
│   ├── SectionTitle.tsx
│   └── TextLink.tsx
├── content/
│   ├── MemberCard.tsx
│   ├── CaseCard.tsx
│   ├── ArticleListItem.tsx
│   ├── ProcessStep.tsx
│   └── CompanyInfoRow.tsx
├── form/
│   ├── MinimalInput.tsx
│   ├── MinimalTextarea.tsx
│   ├── MinimalSelect.tsx
│   ├── MinimalRadio.tsx
│   ├── MinimalCheckbox.tsx
│   └── SubmitButton.tsx
└── animations/
    └── variants.ts
```

---

*このコンポーネント設計に基づき、各コンポーネントを実装する。*
