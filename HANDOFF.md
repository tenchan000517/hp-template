# hp-template アニメーション実装 HANDOFF

> **このドキュメントは次世代セッションへの引き継ぎ仕様書です。**

---

## 0. 現状の問題

### 0.1 前任者が行った変更（一部不完全・破損あり）

前任者が各テンプレートに以下の変更を行ったが、**動作確認せずにコピー**したため、一部破損している：

1. `motion`パッケージを全テンプレートに追加
2. `src/components/animations/`ディレクトリを作成
3. `ANIMATION_GUIDE.md`を追加
4. 一部ページに`"use client"`を追加
5. framer-motionのインポートを`motion/react`に変更

**問題点：**
- アニメーションコンポーネントが正しく動作しない
- ページ遷移時のスクロール位置問題が未解決
- Motion（framer-motion）とカスタム実装が混在

---

## 1. 目標

全7テンプレートを**takeuchimoldと同じアニメーション仕様**に統一する。

### 1.1 takeuchimoldのアニメーション仕様

| 項目 | 仕様 |
|------|------|
| ライブラリ | **なし**（純粋CSS transition + IntersectionObserver） |
| スクロール位置問題 | `waitForScrollTop()`で解決 |
| ページ構造 | `layout.tsx`（metadata）+ `"use client" page.tsx` |

### 1.2 対象テンプレート

1. template-fullorder
2. template-standard
3. template-authority-minimal
4. template-trust-visual
5. template-leadgen-minimal
6. template-leadgen-visual
7. template-recruit-magazine

---

## 2. takeuchimoldのアニメーション実装（正解）

### 2.1 ファイル構成

```
src/components/animations/
├── FadeInUp.tsx          # スクロール連動フェードイン + スライドアップ
├── FadeInImage.tsx       # 方向別スライドイン画像（left/right/up）
├── StaggerContainer.tsx  # 子要素の順次アニメーション
├── AnimatedLink.tsx      # アンダーラインアニメーション付きリンク
├── HeroBackground.tsx    # ヒーロー背景フェードイン
└── index.ts              # エクスポート
```

### 2.2 核心：waitForScrollTop()

```typescript
// スクロール位置が0になるまで待ち、さらに少し待機
function waitForScrollTop(): Promise<void> {
  return new Promise(resolve => {
    const check = () => {
      if (window.scrollY === 0) {
        // スクロール完了後、100ms待ってからアニメーション開始
        setTimeout(resolve, 100);
      } else {
        requestAnimationFrame(check);
      }
    };
    check();
  });
}
```

**なぜ必要か：**
1. TOPページで1000pxまでスクロール
2. Serviceページに遷移
3. **一瞬、Serviceページが1000pxの位置から表示される**
4. その後、0pxまでスクロールアップ
5. この間に1000px〜0pxの間の要素がすべてIntersectionObserverで「画面内」と判定されてアニメーション発火済みになる

`waitForScrollTop()`はスクロール位置が0になってからIntersectionObserverを開始することでこの問題を回避する。

### 2.3 ページ構造

アニメーションを使用するページは以下の構造にする：

```
src/app/about/
├── layout.tsx    # metadataを定義
└── page.tsx      # "use client" + アニメーション使用
```

**layout.tsx:**
```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: '会社紹介',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

**page.tsx:**
```tsx
'use client';

import { FadeInUp, FadeInImage } from '@/components/animations';

export default function AboutPage() {
  return (
    <div>
      <FadeInUp>
        <h1>About Us</h1>
      </FadeInUp>
    </div>
  );
}
```

---

## 3. やるべきこと

### 3.1 各テンプレートの修正

| # | 作業 |
|---|------|
| 1 | `src/components/animations/`をtakeuchimoldからコピー |
| 2 | 既存の壊れたアニメーションコンポーネントを削除 |
| 3 | `package.json`から`motion`を削除（不要） |
| 4 | 各ページを`layout.tsx` + `"use client" page.tsx`構造に変更 |
| 5 | 各ページにFadeInUp等のアニメーションを適用 |
| 6 | 動作確認 |

### 3.2 コピー元

```
/mnt/c/client_hp/takeuchimold/src/components/animations/
```

### 3.3 削除すべきもの

各テンプレートの以下のファイル/ディレクトリは削除または置き換え：

- `src/components/animations/`（破損版）→ takeuchimoldからコピーで置き換え
- `src/components/animation/`（一部テンプレートにある古い版）→ 削除
- `src/components/trust-visual/FadeInSection.tsx`など → 新しいanimationsを使用
- `src/components/ScrollReset.tsx` → 削除（効果なし）

### 3.4 ANIMATION_GUIDE.mdの更新

現在のANIMATION_GUIDE.mdは不正確。以下の点を修正：

1. Motionを使用しない（純粋CSS + IntersectionObserver）
2. waitForScrollTop()の説明を追加
3. ページ構造（layout.tsx分離）の説明を追加

---

## 4. 注意事項

### 4.1 動作確認してからコピー

**絶対に動作確認せずに全テンプレートにコピーしないこと。**

1. 1つのテンプレートで変更
2. `npm run dev`でブラウザ確認
3. 問題なければ次のテンプレートへ

### 4.2 既存のアニメーション

一部テンプレートには既にframer-motion/motionを使ったアニメーションがある：
- template-leadgen-visual
- template-recruit-magazine
- template-trust-visual

これらはtakeuchimold方式に統一するか、既存のまま残すか判断が必要。
統一する場合は、motion依存のコードをすべて書き換える必要がある。

---

## 5. 参照ファイル

| ファイル | パス |
|---------|------|
| takeuchimold FadeInUp | `/mnt/c/client_hp/takeuchimold/src/components/animations/FadeInUp.tsx` |
| takeuchimold FadeInImage | `/mnt/c/client_hp/takeuchimold/src/components/animations/FadeInImage.tsx` |
| takeuchimold StaggerContainer | `/mnt/c/client_hp/takeuchimold/src/components/animations/StaggerContainer.tsx` |
| takeuchimold AnimatedLink | `/mnt/c/client_hp/takeuchimold/src/components/animations/AnimatedLink.tsx` |
| takeuchimold HeroBackground | `/mnt/c/client_hp/takeuchimold/src/components/animations/HeroBackground.tsx` |
| takeuchimold index.ts | `/mnt/c/client_hp/takeuchimold/src/components/animations/index.ts` |
| takeuchimold HANDOFF | `/mnt/c/client_hp/takeuchimold/HANDOFF.md` §15.2 |

---

## 6. 前任者の破損した変更を元に戻す（必要に応じて）

もし完全にやり直したい場合：

```bash
# 各テンプレートでgit statusを確認
cd /mnt/c/hp-template/template-xxx
git status

# 必要に応じてリセット
git checkout -- src/components/animations/
git checkout -- package.json
```

---

## 7. 更新履歴

| 日付 | 内容 |
|------|------|
| 2026-02-14 | HANDOFF作成。前任者の破損した変更の修正タスクを記載 |
