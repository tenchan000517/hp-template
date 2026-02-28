# Trust Visual site.json 構造

## 概要

このドキュメントでは、Trust Visual テンプレートで必要な site.json の構造を定義する。
Standard テンプレートの基本構造に加え、Trust Visual 固有のフィールドを追加する。

---

## site.json 全体構造

```json
{
  "site": {
    "name": "株式会社〇〇",
    "description": "〇〇の製造・販売を行う会社です。",
    "url": "https://example.com",
    "locale": "ja_JP",
    "template": "trust-visual"
  },

  "branding": {
    "logo": "/images/logo.svg",
    "logoAlt": "株式会社〇〇",
    "favicon": "/favicon.ico",
    "ogImage": "/images/og-image.jpg"
  },

  "colors": {
    "main": "#1e3a2f",
    "accent": "#c45c3e",
    "background": "#ffffff",
    "backgroundAlt": "#f8f8f8",
    "text": "#1e3a2f",
    "textSub": "#6b7280"
  },

  "contact": {
    "phone": "03-1234-5678",
    "fax": "03-1234-5679",
    "email": "info@example.com",
    "address": {
      "postalCode": "123-4567",
      "prefecture": "東京都",
      "city": "〇〇区",
      "street": "〇〇1-2-3",
      "building": ""
    },
    "businessHours": "平日 9:00〜18:00",
    "googleMapsEmbedUrl": "https://www.google.com/maps/embed?..."
  },

  "social": {
    "twitter": "",
    "facebook": "",
    "instagram": "",
    "linkedin": "",
    "youtube": ""
  },

  "navigation": {
    "header": [
      { "label": "TOP", "href": "/" },
      { "label": "選ばれる理由", "href": "/why" },
      { "label": "実績紹介", "href": "/works" },
      { "label": "お客様の声", "href": "/voice" },
      { "label": "サービス", "href": "/service" },
      { "label": "会社概要", "href": "/about" }
    ],
    "footer": [
      { "label": "TOP", "href": "/" },
      { "label": "選ばれる理由", "href": "/why" },
      { "label": "実績紹介", "href": "/works" },
      { "label": "お客様の声", "href": "/voice" },
      { "label": "サービス", "href": "/service" },
      { "label": "会社概要", "href": "/about" },
      { "label": "お問い合わせ", "href": "/contact" },
      { "label": "プライバシーポリシー", "href": "/privacy" }
    ],
    "ctaButton": {
      "label": "お問い合わせ",
      "href": "/contact"
    }
  },

  "trustVisual": {
    "stats": [...],
    "clientLogos": [...],
    "reasons": [...],
    "works": [...],
    "testimonials": [...],
    "certifications": [...],
    "services": [...]
  },

  "company": {...},

  "seo": {...}
}
```

---

## Trust Visual 固有フィールド詳細

### trustVisual.stats

TOPページのヒーローセクションで表示する実績数字。

```json
{
  "stats": [
    {
      "id": "clients",
      "number": 523,
      "unit": "社",
      "label": "取引実績",
      "displayOrder": 1
    },
    {
      "id": "years",
      "number": 35,
      "unit": "年",
      "label": "創業からの歴史",
      "displayOrder": 2
    },
    {
      "id": "satisfaction",
      "number": 98.2,
      "unit": "%",
      "label": "お客様満足度",
      "decimals": 1,
      "displayOrder": 3
    },
    {
      "id": "deliveries",
      "number": 12000,
      "unit": "件",
      "label": "累計納品数",
      "displayOrder": 4
    }
  ]
}
```

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| id | string | ○ | 一意の識別子 |
| number | number | ○ | 表示する数字 |
| unit | string | ○ | 単位（"社", "%", "年" 等） |
| label | string | ○ | 説明ラベル |
| decimals | number | - | 小数点以下の桁数（デフォルト: 0） |
| displayOrder | number | ○ | 表示順序 |

---

### trustVisual.clientLogos

取引先ロゴセクションで表示するロゴ一覧。

```json
{
  "clientLogos": {
    "heading": "お取引先企業",
    "note": "他、500社以上の企業様とお取引しています",
    "logos": [
      {
        "id": "client-001",
        "src": "/images/logos/client-1.svg",
        "alt": "企業A",
        "displayOrder": 1
      },
      {
        "id": "client-002",
        "src": "/images/logos/client-2.svg",
        "alt": "企業B",
        "displayOrder": 2
      }
    ],
    "infiniteScroll": false
  }
}
```

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| heading | string | ○ | セクション見出し |
| note | string | - | 補足テキスト |
| logos | array | ○ | ロゴデータの配列 |
| logos[].id | string | ○ | 一意の識別子 |
| logos[].src | string | ○ | ロゴ画像のパス |
| logos[].alt | string | ○ | 代替テキスト |
| logos[].displayOrder | number | ○ | 表示順序（知名度順推奨） |
| infiniteScroll | boolean | - | 無限スクロールを有効にするか |

---

### trustVisual.reasons

選ばれる理由ページで表示する理由一覧。

```json
{
  "reasons": [
    {
      "id": "reason-001",
      "number": "01",
      "title": "35年の経験と実績",
      "image": "/images/why/reason-01.jpg",
      "description": "1989年の創業以来、35年にわたりお客様のご要望にお応えしてまいりました。",
      "evidence": [
        { "number": 35, "unit": "年", "label": "創業からの歴史" },
        { "number": 12000, "unit": "件+", "label": "累計納品実績" },
        { "number": 85, "unit": "%", "label": "リピート率" }
      ],
      "certifications": [],
      "displayOrder": 1
    },
    {
      "id": "reason-002",
      "number": "02",
      "title": "徹底した品質管理",
      "image": "/images/why/reason-02.jpg",
      "description": "ISO9001認証を取得し、体系的な品質管理体制を構築しています。",
      "evidence": [
        { "number": 0.01, "unit": "%以下", "label": "不良率" },
        { "number": 100, "unit": "%", "label": "全数検査" },
        { "number": 3, "unit": "名", "label": "専任検査員" }
      ],
      "certifications": [
        { "src": "/images/certifications/iso9001.png", "alt": "ISO9001" }
      ],
      "displayOrder": 2
    },
    {
      "id": "reason-003",
      "number": "03",
      "title": "迅速・柔軟な対応",
      "image": "/images/why/reason-03.jpg",
      "description": "お問い合わせには24時間以内に回答いたします。",
      "evidence": [
        { "number": 24, "unit": "時間以内", "label": "お問い合わせ回答" },
        { "number": 3, "unit": "日〜", "label": "最短納期" },
        { "number": 95, "unit": "%", "label": "緊急対応成功率" }
      ],
      "certifications": [],
      "displayOrder": 3
    }
  ]
}
```

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| id | string | ○ | 一意の識別子 |
| number | string | ○ | 理由番号（"01", "02", "03"） |
| title | string | ○ | 理由タイトル |
| image | string | ○ | 写真パス |
| description | string | ○ | 説明文 |
| evidence | array | ○ | 根拠数字の配列 |
| certifications | array | - | 認証バッジの配列 |
| displayOrder | number | ○ | 表示順序 |

---

### trustVisual.works

実績紹介ページで表示する実績一覧。

```json
{
  "works": {
    "heading": "実績紹介",
    "subHeading": "お客様のご要望に応じた、多様な実績をご紹介します。",
    "stats": [
      { "number": 12000, "unit": "件+", "label": "累計納品実績" },
      { "number": 50, "unit": "業種+", "label": "対応業種数" },
      { "number": 800, "unit": "件/年", "label": "年間納品数" }
    ],
    "categories": [
      { "id": "all", "label": "すべて" },
      { "id": "manufacturing", "label": "製造業" },
      { "id": "construction", "label": "建設業" },
      { "id": "food", "label": "食品業" },
      { "id": "retail", "label": "小売業" },
      { "id": "other", "label": "その他" }
    ],
    "items": [
      {
        "id": "work-001",
        "image": "/images/works/work-1.jpg",
        "title": "A社様 設備導入",
        "category": "manufacturing",
        "year": 2024,
        "featured": true
      }
    ]
  }
}
```

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| heading | string | ○ | ページ見出し |
| subHeading | string | - | サブ見出し |
| stats | array | - | ページヒーロー用の統計数字 |
| categories | array | ○ | カテゴリフィルター |
| items | array | ○ | 実績データの配列 |
| items[].id | string | ○ | 一意の識別子 |
| items[].image | string | ○ | 写真パス |
| items[].title | string | ○ | 案件名 |
| items[].category | string | ○ | カテゴリID |
| items[].year | number | - | 年度 |
| items[].featured | boolean | - | TOPページで表示するか |

---

### trustVisual.testimonials

お客様の声ページで表示するインタビュー一覧。

```json
{
  "testimonials": {
    "heading": "お客様の声",
    "satisfaction": {
      "number": 98.2,
      "unit": "%",
      "label": "お客様満足度",
      "source": "2024年 お客様アンケート結果より"
    },
    "satisfactionBreakdown": [
      { "label": "品質満足度", "percentage": 98 },
      { "label": "納期満足度", "percentage": 96 },
      { "label": "対応満足度", "percentage": 99 },
      { "label": "再依頼意向", "percentage": 95 }
    ],
    "items": [
      {
        "id": "voice-001",
        "photo": "/images/voice/person-1.jpg",
        "company": "株式会社〇〇製作所",
        "position": "代表取締役",
        "name": "山田太郎",
        "since": "2020年導入",
        "interview": {
          "challenge": "以前の取引先では納期の遅れが頻繁にあり...",
          "reason": "知人からの紹介で〇〇社を知りました...",
          "effect": "納期通りの納品が当たり前になり...",
          "quote": "安心して任せられるパートナーです。"
        },
        "featured": true,
        "displayOrder": 1
      }
    ]
  }
}
```

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| heading | string | ○ | ページ見出し |
| satisfaction | object | ○ | 満足度数字 |
| satisfactionBreakdown | array | - | 満足度の内訳 |
| items | array | ○ | インタビューデータの配列 |
| items[].id | string | ○ | 一意の識別子 |
| items[].photo | string | ○ | 顔写真パス |
| items[].company | string | ○ | 会社名 |
| items[].position | string | ○ | 役職 |
| items[].name | string | ○ | 氏名 |
| items[].since | string | - | 導入時期 |
| items[].interview | object | ○ | インタビュー内容 |
| items[].interview.challenge | string | ○ | 導入前の課題 |
| items[].interview.reason | string | ○ | 選んだ理由 |
| items[].interview.effect | string | ○ | 導入後の変化 |
| items[].interview.quote | string | ○ | 一言コメント |
| items[].featured | boolean | - | TOPページで表示するか |
| items[].displayOrder | number | ○ | 表示順序 |

---

### trustVisual.certifications

会社概要ページで表示する資格・認証一覧。

```json
{
  "certifications": [
    {
      "id": "cert-001",
      "image": "/images/certifications/iso9001.png",
      "name": "ISO9001",
      "note": "2010年取得",
      "displayOrder": 1
    },
    {
      "id": "cert-002",
      "image": "/images/certifications/iso14001.png",
      "name": "ISO14001",
      "note": "2015年取得",
      "displayOrder": 2
    }
  ]
}
```

---

### trustVisual.services

サービスページで表示するサービス一覧。

```json
{
  "services": {
    "heading": "サービス",
    "description": "お客様のニーズに合わせた多様なサービスを提供しています。",
    "items": [
      {
        "id": "service-001",
        "name": "〇〇加工",
        "image": "/images/service/service-01.jpg",
        "description": "高精度な〇〇加工を提供します。",
        "features": [
          "精度±0.01mm",
          "24時間対応可能",
          "小ロット1個から対応"
        ],
        "stats": [
          { "number": 500, "unit": "件/年", "label": "年間対応件数" }
        ],
        "displayOrder": 1
      }
    ],
    "coverage": {
      "heading": "対応範囲",
      "items": [
        { "title": "対応エリア", "content": "全国対応" },
        { "title": "対応業種", "content": "製造業、建設業 他" },
        { "title": "対応規模", "content": "小ロット〜大量生産" }
      ]
    },
    "pricing": {
      "heading": "料金・納期の目安",
      "items": [
        { "service": "〇〇加工", "price": "¥5,000〜", "leadTime": "3営業日〜" }
      ],
      "note": "※ 上記は目安です。詳細はお見積もりにてご案内いたします。"
    }
  }
}
```

---

### company

会社概要ページで表示する会社情報。

```json
{
  "company": {
    "heroImage": "/images/about/exterior.jpg",
    "info": [
      { "label": "会社名", "value": "株式会社〇〇" },
      { "label": "代表者", "value": "代表取締役 山田太郎" },
      { "label": "設立", "value": "1989年4月1日" },
      { "label": "資本金", "value": "3,000万円" },
      { "label": "従業員数", "value": "45名（2024年4月現在）" },
      { "label": "所在地", "value": "〒123-4567 東京都〇〇区〇〇1-2-3" },
      { "label": "電話番号", "value": "03-1234-5678" },
      { "label": "FAX番号", "value": "03-1234-5679" },
      { "label": "営業時間", "value": "平日 9:00〜18:00" },
      { "label": "事業内容", "value": "〇〇の製造・販売" },
      { "label": "取引銀行", "value": "〇〇銀行 △△支店" },
      { "label": "主要取引先", "value": "株式会社A、株式会社B 他" }
    ],
    "ceoMessage": {
      "heading": "代表メッセージ",
      "photo": "/images/about/ceo.jpg",
      "message": "弊社は1989年の創業以来...",
      "title": "代表取締役",
      "name": "山田 太郎"
    },
    "access": {
      "heading": "アクセス",
      "directions": [
        { "method": "電車", "detail": "〇〇線 △△駅 徒歩5分" },
        { "method": "バス", "detail": "〇〇バス「△△」停留所 徒歩2分" },
        { "method": "駐車場", "detail": "あり（10台分）" }
      ]
    }
  }
}
```

---

## 初期データ作成時の注意点

1. **画像パスは仮で設定**: 撮影前は `/images/placeholder/xxx.jpg` 等の仮パスを設定
2. **数字は概算でOK**: 正確な数字は後から更新
3. **displayOrder は1から順番に**: 表示順序を明示的に指定
4. **featured フラグを活用**: TOPページに表示する項目を選択

---

## 型定義ファイル（参考）

```typescript
// types/site.ts

export interface SiteConfig {
  site: SiteInfo;
  branding: BrandingConfig;
  colors: ColorConfig;
  contact: ContactConfig;
  social: SocialConfig;
  navigation: NavigationConfig;
  trustVisual: TrustVisualConfig;
  company: CompanyConfig;
  seo: SEOConfig;
}

export interface TrustVisualConfig {
  stats: StatItem[];
  clientLogos: ClientLogosConfig;
  reasons: ReasonItem[];
  works: WorksConfig;
  testimonials: TestimonialsConfig;
  certifications: CertificationItem[];
  services: ServicesConfig;
}

// ... 詳細な型定義
```
