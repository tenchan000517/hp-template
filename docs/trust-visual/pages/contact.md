# お問い合わせページ 詳細設計

## 基本情報

**URL**: `/contact`

**ファイル**: `src/app/contact/page.tsx`

---

## このページの目的

### 👤 専門家①（マーケティング）視点

**マーケティング目標**:
1. フォーム送信という「コンバージョン」を達成させる
2. 入力のハードルを下げ、離脱を最小化する
3. 問い合わせ後の流れを明示し、安心感を与える

**KPI指標**:
- フォーム開始率: 70%以上（ページ訪問者のうち、入力を開始する割合）
- フォーム完了率: 50%以上（入力開始者のうち、送信する割合）
- 離脱率: 30%以下

### 👤 専門家②（心理学）視点

**心理的ゴール**:
1. 「問い合わせても大丈夫」という安心感を与える
2. 入力項目を最小限にし、認知負荷を下げる
3. 送信後の流れを明示し、不安を解消する

**活用する心理メカニズム**:
- **損失回避**: 「入力しても無駄になるのでは」という不安を解消
- **プログレスバイアス**: 入力の進捗を示すことで完了まで導く
- **社会的証明**: 「多くの方にご利用いただいています」で安心感

### 👤 専門家③（デザイン）視点

**デザイン上の役割**:
1. フォームを中央に配置し、入力に集中させる
2. 余計な情報を排除し、フォーム完了への導線を最短に
3. 入力欄は十分なサイズを確保し、入力しやすく

---

## ユーザーの状態

**このページに来る前の状態**:
- 他のページで信頼を感じ、問い合わせを決意
- 「とりあえず話を聞いてみたい」という軽い気持ちの場合も
- 「見積もりが欲しい」という具体的なニーズがある場合も

**このページで感じてほしいこと**:
- 「入力項目が少なくて簡単だ」
- 「無料で相談できるなら気軽に問い合わせよう」
- 「送信後にちゃんと対応してくれそう」

**このページから離れる時の状態**:
- フォーム送信完了: 「問い合わせできた。返事が楽しみだ」
- 離脱: 「今はやめておこう」（ → リターゲティングの対象に）

---

## セクション構成

お問い合わせページは以下の4セクションで構成する:

1. ページヒーロー（Page Hero）: ページタイトル + 安心ポイント
2. 問い合わせ前の確認（Pre-form Info）: 対応時間、返信目安
3. お問い合わせフォーム（Contact Form）: 入力フォーム
4. 電話・その他の問い合わせ方法（Alternative Contact）: 電話番号等

---

## セクション1: ページヒーロー（Page Hero）

### なぜこのセクションが必要か

**👤 専門家①（マーケティング）**:
「無料」「お気軽に」等のキーワードで問い合わせのハードルを下げる。このページに来たユーザーは「問い合わせしようか迷っている」状態なので、背中を押す。

**👤 専門家②（心理学）**:
「多くの企業様にご利用いただいています」等の社会的証明で「自分も問い合わせていいんだ」と思わせる。

**👤 専門家③（デザイン）**:
シンプルに、フォームへの導線を最短に。背景は落ち着いた色で、集中を妨げない。

### レイアウト

**構成**:
- 高さ: 30vh
- 背景: オフホワイト（#f8f8f8）
- ページタイトル: 中央配置、56px
- 安心ポイント: タイトル下に3つのポイントを横並び

### コンテンツ要素

**ページタイトル**:
- テキスト: 「お問い合わせ」
- サイズ: 56px（PC）、40px（SP）
- 色: メインカラー

**安心ポイント（3つ）**:
- 「ご相談無料」
- 「24時間受付」
- 「1営業日以内にご返信」

**ポイントの配置**:
- タイトルの32px下
- 3つを横並び（PC）、縦並び（SP）
- 各ポイント: アイコン風の番号またはチェックマーク + テキスト

### デザイン詳細

**余白**:
- 上余白: 80px
- 下余白: 40px

**安心ポイントのスタイル**:
```css
.reassurance-points {
  display: flex;
  justify-content: center;
  gap: 48px;
  margin-top: 32px;
}

.reassurance-point {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: var(--main-color);
}

.reassurance-point::before {
  content: "✓";
  color: var(--accent-color);
  font-weight: bold;
}
```

---

## セクション2: 問い合わせ前の確認（Pre-form Info）

### なぜこのセクションが必要か

**👤 専門家①（マーケティング）**:
「いつ返事が来るか」「どんな内容を書けばいいか」を事前に示すことで、入力への不安を解消する。

**👤 専門家②（心理学）**:
不確実性を減らすことで行動を促す。「24時間以内に返信」等の具体的な約束は安心感を与える。

**👤 専門家③（デザイン）**:
フォームの直前に簡潔に表示。フォームの邪魔にならないよう、控えめなデザインで。

### レイアウト

**構成**:
- 背景色: 白（#FFFFFF）
- 内容: 2-3行のテキスト（対応時間、返信目安等）

### コンテンツ要素

**テキスト例**:
「お問い合わせいただいた内容は、1営業日以内にメールまたはお電話でご返信いたします。
お急ぎの場合は、お電話（03-1234-5678）でも承っております。」

**サイズ**: 15px
**色**: サブテキストカラー
**配置**: 中央揃え、最大幅600px

### デザイン詳細

**余白**:
- 上余白: 40px
- 下余白: 40px

---

## セクション3: お問い合わせフォーム（Contact Form）

### なぜこのセクションが必要か

**👤 専門家①（マーケティング）**:
フォームはコンバージョンの核心。入力項目を最小限にし、完了率を最大化する。必須項目と任意項目を明確に区別する。

**👤 専門家②（心理学）**:
入力項目が多いと離脱率が上がる（フォーム疲れ）。最低限必要な情報のみを求め、詳細は後から確認する設計に。

**👤 専門家③（デザイン）**:
入力欄は十分なサイズを確保し、入力しやすく。ラベルは入力欄の上に配置し、視線の流れをスムーズに。送信ボタンは目立つアクセントカラーで。

### レイアウト

**構成**:
- 背景色: 白（#FFFFFF）
- フォーム幅: 最大600px、中央配置
- 入力項目: 縦並び
- 送信ボタン: フォーム下部、中央配置

**入力項目の配置**:
- 各項目の間隔: 24px
- ラベル: 入力欄の上、8px余白
- 必須マーク: 赤色の「*」

### コンテンツ要素

**入力項目**:

| 項目名 | 入力タイプ | 必須/任意 | 備考 |
|--------|----------|----------|------|
| お名前 | text | 必須 | |
| 会社名 | text | 任意 | 個人の方は空欄可 |
| メールアドレス | email | 必須 | |
| 電話番号 | tel | 任意 | |
| お問い合わせ種別 | select | 必須 | お見積もり/ご相談/その他 |
| お問い合わせ内容 | textarea | 必須 | 5行分の高さ |
| 個人情報の取り扱い | checkbox | 必須 | 同意チェック |

**お問い合わせ種別の選択肢**:
- お見積もりのご依頼
- サービスに関するご相談
- その他のお問い合わせ

**送信ボタン**:
- テキスト: 「送信する」
- サイズ: 幅280px、高さ56px
- 背景色: アクセントカラー
- 文字色: 白

**個人情報の取り扱いリンク**:
- テキスト: 「個人情報の取り扱いについて」
- リンク先: `/privacy`（別タブで開く）

### デザイン詳細

**フォームのスタイル**:
```css
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px;
}

.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--main-color);
  margin-bottom: 8px;
}

.form-label .required {
  color: #e53935;
  margin-left: 4px;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 14px 16px;
  font-size: 16px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background-color: #FFFFFF;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--main-color);
  box-shadow: 0 0 0 3px rgba(var(--main-color-rgb), 0.1);
}

.form-textarea {
  min-height: 150px;
  resize: vertical;
}

.form-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.form-checkbox input {
  width: 20px;
  height: 20px;
  margin-top: 2px;
}

.submit-button {
  display: block;
  width: 280px;
  height: 56px;
  margin: 40px auto 0;
  background-color: var(--accent-color);
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: var(--main-color);
}

.submit-button:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
}
```

**余白**:
- 上余白: 40px
- 下余白: 80px

### バリデーション

**リアルタイムバリデーション**:
- メールアドレス: 形式チェック
- 電話番号: 数字とハイフンのみ
- 必須項目: 空欄チェック

**エラー表示**:
- 入力欄の下に赤色テキストで表示
- 入力欄の枠線も赤色に変更

### 送信完了後

**表示内容**:
- 見出し: 「お問い合わせありがとうございます」
- 本文: 「お問い合わせを受け付けました。1営業日以内に担当者よりご連絡いたします。」
- TOPへ戻るリンク

**デザイン**:
- フォーム部分を完了メッセージに置き換え
- 中央配置、背景は変更なし

### SP（スマートフォン）での変化

**サイズ変更**:
- 入力欄: フォントサイズ16px（ズーム防止）
- 送信ボタン: 幅100%

---

## セクション4: 電話・その他の問い合わせ方法（Alternative Contact）

### なぜこのセクションが必要か

**👤 専門家①（マーケティング）**:
フォーム入力が苦手なユーザー向けに、電話での問い合わせ方法も提示する。特に年配の決裁者には電話の方が好まれる場合がある。

**👤 専門家②（心理学）**:
選択肢を提供することで「どちらでも問い合わせられる」という安心感を与える。

**👤 専門家③（デザイン）**:
フォームの下にさりげなく配置。電話番号は大きめに表示し、タップで発信できるようにする。

### レイアウト

**構成**:
- 背景色: オフホワイト（#f8f8f8）
- 内容: 電話番号 + 営業時間

### コンテンツ要素

**見出し**:
- テキスト: 「お電話でのお問い合わせ」
- サイズ: 20px

**電話番号**:
- テキスト: 「03-1234-5678」
- サイズ: 32px、Bold
- リンク: `tel:0312345678`（SPでタップ発信）

**営業時間**:
- テキスト: 「平日 9:00〜18:00」
- サイズ: 14px

### デザイン詳細

**余白**:
- 上余白: 60px
- 下余白: 80px

**スタイル**:
```css
.phone-contact {
  text-align: center;
  padding: 60px 20px 80px;
  background-color: #f8f8f8;
}

.phone-contact h3 {
  font-size: 20px;
  color: var(--main-color);
  margin-bottom: 16px;
}

.phone-number {
  font-size: 32px;
  font-weight: 700;
  color: var(--main-color);
  text-decoration: none;
}

.phone-number:hover {
  color: var(--accent-color);
}

.business-hours {
  font-size: 14px;
  color: var(--sub-text-color);
  margin-top: 8px;
}
```

---

## ページ全体のデータ構造

```typescript
// src/app/contact/page.tsx 上部に定義
const CONTACT_PAGE_CONTENT = {
  hero: {
    title: "お問い合わせ",
    reassurancePoints: [
      "ご相談無料",
      "24時間受付",
      "1営業日以内にご返信"
    ]
  },
  preFormInfo: {
    text: "お問い合わせいただいた内容は、1営業日以内にメールまたはお電話でご返信いたします。お急ぎの場合は、お電話（03-1234-5678）でも承っております。"
  },
  form: {
    fields: [
      { name: "name", label: "お名前", type: "text", required: true },
      { name: "company", label: "会社名", type: "text", required: false, placeholder: "個人の方は空欄可" },
      { name: "email", label: "メールアドレス", type: "email", required: true },
      { name: "phone", label: "電話番号", type: "tel", required: false },
      { name: "type", label: "お問い合わせ種別", type: "select", required: true, options: [
        { value: "", label: "選択してください" },
        { value: "estimate", label: "お見積もりのご依頼" },
        { value: "consultation", label: "サービスに関するご相談" },
        { value: "other", label: "その他のお問い合わせ" }
      ]},
      { name: "message", label: "お問い合わせ内容", type: "textarea", required: true },
      { name: "privacy", label: "個人情報の取り扱いに同意する", type: "checkbox", required: true }
    ],
    submitButton: "送信する",
    privacyLink: { text: "個人情報の取り扱いについて", href: "/privacy" }
  },
  completion: {
    heading: "お問い合わせありがとうございます",
    message: "お問い合わせを受け付けました。1営業日以内に担当者よりご連絡いたします。",
    backLink: { text: "TOPへ戻る", href: "/" }
  },
  phoneContact: {
    heading: "お電話でのお問い合わせ",
    phoneNumber: "03-1234-5678",
    businessHours: "平日 9:00〜18:00"
  }
};
```

---

## 実装チェックリスト

- [ ] 安心ポイント3つが表示されているか
- [ ] フォームの入力項目が最小限に抑えられているか
- [ ] 必須/任意が明確に区別されているか
- [ ] 入力欄のフォーカス時にスタイルが変わるか
- [ ] バリデーションエラーが表示されるか
- [ ] 送信ボタンがアクセントカラーになっているか
- [ ] 送信完了後に完了メッセージが表示されるか
- [ ] 電話番号がタップで発信できるか
- [ ] SPでフォントサイズ16px以上になっているか
