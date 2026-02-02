# 専門家意図解説ドキュメント作成 HANDOFF

## ステータス: ⚠️ 残タスクあり

---

## 概要

各テンプレートの「セクションごとの設計意図」を、3人の専門家の視点から解説したクライアント向けドキュメントを作成する。

---

## 完成したドキュメント構成

```
/mnt/c/hp-template/
├── README.md                              # インデックス（全テンプレート一覧）
│
├── template-standard/
│   └── DESIGN_GUIDE.md                    # 標準テンプレートの設計ガイド
│
├── template-recruit-magazine/
│   └── DESIGN_GUIDE.md                    # 採用サイトの設計ガイド
│
├── template-leadgen-minimal/
│   └── DESIGN_GUIDE.md                    # リード獲得型の設計ガイド
│
├── template-leadgen-visual/
│   └── DESIGN_GUIDE.md                    # 地域密着型の設計ガイド
│
├── template-trust-visual/
│   └── DESIGN_GUIDE.md                    # 信頼構築型の設計ガイド
│
├── template-authority-minimal/
│   └── DESIGN_GUIDE.md                    # 権威性訴求の設計ガイド
│
└── template-fullorder/
    └── DESIGN_GUIDE.md                    # フルオーダーの設計ガイド
```

**変更点（当初計画からの変更）:**
- ファイル名: `EXPERT_GUIDE.md` → `DESIGN_GUIDE.md`（より分かりやすい名前に）
- 配置場所: `template-*/docs/` → `template-*/`（階層を浅く）
- インデックス: `docs/README.md` → `README.md`（親フォルダ直下）

---

## 3人の専門家ペルソナ

### 📊 専門家①: WEBマーケティングプロフェッショナル
- **専門領域**: コンバージョン最適化、ユーザー心理学、データドリブンマーケティング
- **視点**:
  - 各セクションでユーザーがどう行動し、どこで離脱し、どこでコンバージョンするか
  - ターゲット別の最適な導線設計
  - 心理トリガー（社会的証明、希少性、権威性など）の戦略的配置
- **ドキュメントでの役割**: 「なぜこのセクションがここにあるのか」「CVにどう貢献するか」を解説

### 👥 専門家②: 求人コンサルタント/ユーザー心理専門家
- **専門領域**: 採用ブランディング、求職者心理、ユーザー心理
- **視点**:
  - ユーザー/求職者が本当に知りたい情報は何か
  - 行動ハードルを下げる情報開示の順序と深さ
  - 「この会社に頼みたい/働きたい」と思わせる感情設計
- **ドキュメントでの役割**: 「ユーザーにとってこのセクションがなぜ重要か」を解説

### 🎨 専門家③: WEBデザイナー（反AIデザイン哲学）
- **専門領域**: UI/UX、ビジュアル階層設計、ブランド体験設計
- **視点**:
  - 視線の流れを計算した要素配置とビジュアル階層
  - 感情を動かす色彩・余白・タイポグラフィの選定
  - AIデザインの典型的な特徴を排除した人間らしいデザイン
- **ドキュメントでの役割**: 「なぜこのレイアウト・色・余白なのか」を解説

---

## 完成したドキュメント一覧

| テンプレート | ファイル | 行数 | コミット |
|-------------|---------|------|---------|
| 親フォルダ | README.md | - | 2048fe1 |
| template-standard | DESIGN_GUIDE.md | 876行 | b3c42ee |
| template-recruit-magazine | DESIGN_GUIDE.md | 762行 | 72b8b0c |
| template-leadgen-minimal | DESIGN_GUIDE.md | 558行 | d3bacc7 |
| template-leadgen-visual | DESIGN_GUIDE.md | 600行 | 6590722 |
| template-trust-visual | DESIGN_GUIDE.md | 603行 | 12148f0 |
| template-authority-minimal | DESIGN_GUIDE.md | - | 2048fe1 |
| template-fullorder | DESIGN_GUIDE.md | 248行 | e70ac2f |

---

## DESIGN_GUIDE.md の構成

```markdown
# {テンプレート名} 設計ガイド

## テンプレート概要
| 項目 | 内容 |
|------|------|
| テンプレート名 | {日本語名} |
| ID | {template-id} |
| ページ数 | {N}ページ |
| 想定業種 | {業種例} |
| コンセプト | {一言コンセプト} |

## ページ構成
1. {ページ1}
2. {ページ2}
...

## セクション別 専門家解説

### {セクション名}

#### 📊 マーケティング視点
- 目的
- CV導線上の役割
- 心理トリガー
- 設計意図

#### 👥 ユーザー視点
- ユーザーの期待
- 解消する不安
- 設計意図

#### 🎨 デザイン視点
- 視線の流れ
- 色彩設計
- 余白の意図
- 設計意図

## まとめ: このテンプレートの設計思想
```

---

## 参考ファイル

| ファイル | 用途 |
|---------|------|
| `template-*/docs/sample-prompt.md` | テンプレート設定（元データ） |
| `README.md` | テンプレート一覧・選定ガイド |

---

## 残タスク

### template-authority-minimal のサブモジュール化

**現状:**
- 親リポジトリ https://github.com/tenchan000517/hp-template に6つのテンプレートをサブモジュールとして追加済み
- template-authority-minimal のみ、通常フォルダとして親リポジトリに含まれたまま

**必要な作業:**
1. template-authority-minimal をインデックスから削除（`git rm --cached template-authority-minimal`）
2. サブモジュールとして再追加（`git submodule add https://github.com/tenchan000517/template-authority-minimal.git template-authority-minimal`）
3. コミット＆プッシュ

**注意:**
- 作業前に未コミットの変更がないか確認
- ローカルの変更が失われないよう注意

---

## 更新履歴

| 日付 | 内容 |
|------|------|
| 2026-02-01 | HANDOFF作成 |
| 2026-02-02 | 全テンプレートのDESIGN_GUIDE.md作成完了、GitHubにプッシュ完了 |
| 2026-02-02 | hp-templateリポジトリ作成、6テンプレートをサブモジュール化。authority-minimalは残タスク |
