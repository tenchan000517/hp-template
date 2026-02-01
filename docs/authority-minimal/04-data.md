# Authority Minimal site.json 構造設計

このドキュメントでは、Authority Minimalテンプレートで使用するsite.jsonのデータ構造を定義する。

---

## 基本構造

```json
{
  "meta": { ... },
  "company": { ... },
  "navigation": { ... },
  "pages": {
    "top": { ... },
    "philosophy": { ... },
    "service": { ... },
    "team": { ... },
    "about": { ... },
    "contact": { ... },
    "privacy": { ... }
  },
  "cases": [ ... ],
  "columns": [ ... ]
}
```

---

## 1. meta（メタ情報）

```json
{
  "meta": {
    "siteName": "株式会社〇〇",
    "siteNameEn": "Company Name Inc.",
    "tagline": "本質を、かたちに。",
    "taglineEn": "Essence into Form.",
    "description": "ブランディングとデザインで、本質的な価値を生み出す。",
    "ogImage": "/images/og-image.jpg",
    "favicon": "/favicon.ico",
    "themeColor": "#1E3A5F",
    "googleAnalyticsId": "G-XXXXXXXXXX"
  }
}
```

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| siteName | string | 必須 | サイト名（日本語） |
| siteNameEn | string | 任意 | サイト名（英語） |
| tagline | string | 必須 | キャッチコピー（日本語） |
| taglineEn | string | 任意 | キャッチコピー（英語） |
| description | string | 必須 | サイト説明文（meta description用） |
| ogImage | string | 必須 | OGP画像パス |
| favicon | string | 必須 | ファビコンパス |
| themeColor | string | 必須 | テーマカラー（アクセントカラー） |
| googleAnalyticsId | string | 任意 | GA4測定ID |

---

## 2. company（会社情報）

```json
{
  "company": {
    "name": "株式会社〇〇",
    "nameEn": "Company Name Inc.",
    "representative": {
      "name": "山田 太郎",
      "nameEn": "Taro Yamada",
      "title": "代表取締役",
      "image": "/images/team/yamada.jpg"
    },
    "established": "2003年4月",
    "address": {
      "postalCode": "150-0001",
      "prefecture": "東京都",
      "city": "渋谷区",
      "street": "神宮前1-2-3",
      "building": "〇〇ビル 5F",
      "full": "東京都渋谷区神宮前1-2-3 〇〇ビル 5F"
    },
    "contact": {
      "phone": "03-0000-0000",
      "email": "info@example.com",
      "businessHours": "平日 10:00 - 18:00"
    },
    "business": [
      "ブランディング",
      "ウェブサイト制作",
      "コンサルティング"
    ],
    "capital": "1,000万円",
    "employees": "10名",
    "history": [
      { "year": 2003, "event": "創業。代表 山田が個人事業として開始" },
      { "year": 2005, "event": "株式会社〇〇 設立" },
      { "year": 2010, "event": "渋谷区に事務所移転" },
      { "year": 2015, "event": "□□賞 受賞" },
      { "year": 2020, "event": "従業員10名体制に" }
    ],
    "access": {
      "station": "〇〇駅",
      "walkMinutes": 5,
      "mapEmbedUrl": "https://www.google.com/maps/embed?...",
      "mapImageUrl": "/images/about/map.jpg"
    }
  }
}
```

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| name | string | 必須 | 会社名 |
| nameEn | string | 任意 | 会社名（英語） |
| representative | object | 必須 | 代表者情報 |
| established | string | 必須 | 設立年月 |
| address | object | 必須 | 住所情報 |
| contact | object | 必須 | 連絡先情報 |
| business | string[] | 必須 | 事業内容（配列） |
| capital | string | 任意 | 資本金 |
| employees | string | 任意 | 従業員数 |
| history | object[] | 任意 | 沿革 |
| access | object | 任意 | アクセス情報 |

---

## 3. navigation（ナビゲーション）

```json
{
  "navigation": {
    "header": [
      { "label": "Philosophy", "href": "/philosophy" },
      { "label": "Service", "href": "/service" },
      { "label": "Case", "href": "/case" },
      { "label": "Column", "href": "/column" },
      { "label": "Team", "href": "/team" },
      { "label": "About", "href": "/about" },
      { "label": "Contact", "href": "/contact" }
    ],
    "footer": [
      { "label": "Privacy Policy", "href": "/privacy" }
    ]
  }
}
```

---

## 4. pages（ページ別コンテンツ）

### 4-1. pages.top

```json
{
  "pages": {
    "top": {
      "catchphrase": {
        "main": "本質を、\nかたちに。",
        "sub": "Essence into Form."
      },
      "philosophyTeaser": {
        "quote": "私たちは、答えではなく問いを持つクライアントと共に歩みます。",
        "linkText": "続きを読む",
        "linkHref": "/philosophy"
      },
      "services": [
        {
          "numberEn": "01",
          "titleEn": "Strategy",
          "titleJa": "戦略設計"
        },
        {
          "numberEn": "02",
          "titleEn": "Design",
          "titleJa": "デザイン"
        },
        {
          "numberEn": "03",
          "titleEn": "Branding",
          "titleJa": "ブランディング"
        }
      ],
      "cta": {
        "text": "プロジェクトについて\nお聞かせください。",
        "buttonText": "Contact",
        "buttonHref": "/contact"
      }
    }
  }
}
```

### 4-2. pages.philosophy

```json
{
  "pages": {
    "philosophy": {
      "title": {
        "en": "Philosophy",
        "ja": "代表メッセージ"
      },
      "portrait": {
        "image": "/images/philosophy/portrait.jpg",
        "caption": "代表取締役　山田 太郎"
      },
      "message": {
        "heading": "本質を、かたちに。",
        "body": "私がこの仕事を始めたのは、一つの違和感からでした。\n\n20年前、ある大企業のプロジェクトに参画した時のこと...\n\n（本文が続く）",
        "signature": {
          "title": "代表取締役",
          "name": "山田 太郎"
        }
      },
      "profile": {
        "nameJa": "山田 太郎",
        "nameEn": "Taro Yamada",
        "items": [
          "1975年　東京都生まれ",
          "1998年　〇〇大学 建築学科 卒業",
          "2003年　△△事務所 設立",
          "2015年　□□賞 受賞"
        ]
      }
    }
  }
}
```

### 4-3. pages.service

```json
{
  "pages": {
    "service": {
      "title": {
        "en": "Services",
        "ja": "私たちの仕事"
      },
      "lead": "本質的な課題に向き合い、\n持続的な価値を生み出す。",
      "philosophy": {
        "text": "私たちは「答え」を売りません。\nクライアントと共に「問い」を立て、\n本質に迫ることで、\n表面的な対処ではなく、\n根本的な変化を実現します。"
      },
      "services": [
        {
          "numberEn": "01",
          "titleEn": "Strategy",
          "titleJa": "戦略設計",
          "description": "課題を正しく定義し、\n進むべき方向を明確にする。",
          "details": [
            "現状分析と課題の構造化",
            "ゴール設定と戦略立案",
            "実行計画の策定"
          ]
        },
        {
          "numberEn": "02",
          "titleEn": "Design",
          "titleJa": "デザイン",
          "description": "戦略を具体的なかたちにする。\n美しさと機能を両立させる。",
          "details": [
            "ビジュアルアイデンティティ",
            "ウェブサイト・アプリ設計",
            "プロダクトデザイン"
          ]
        },
        {
          "numberEn": "03",
          "titleEn": "Branding",
          "titleJa": "ブランディング",
          "description": "一貫した価値を届け続ける\n仕組みを構築する。",
          "details": [
            "ブランド戦略策定",
            "コミュニケーション設計",
            "社内浸透プログラム"
          ]
        }
      ],
      "process": [
        {
          "numberEn": "01",
          "title": "ヒアリング",
          "description": "課題と目標を丁寧にお聞きします。\nこの段階で費用は発生しません。"
        },
        {
          "numberEn": "02",
          "title": "ご提案",
          "description": "課題を整理し、解決の方向性と\n概算費用をご提示します。"
        },
        {
          "numberEn": "03",
          "title": "実行",
          "description": "定期的なコミュニケーションを取りながら、\nプロジェクトを進行します。"
        },
        {
          "numberEn": "04",
          "title": "完了・継続",
          "description": "成果を確認し、必要に応じて\n継続的なサポートを行います。"
        }
      ],
      "cta": {
        "text": "これまでの仕事をご覧ください。",
        "links": [
          { "text": "事例を見る", "href": "/case" },
          { "text": "相談する", "href": "/contact" }
        ]
      }
    }
  }
}
```

### 4-4. pages.team

```json
{
  "pages": {
    "team": {
      "title": {
        "en": "Team",
        "ja": "チーム"
      },
      "lead": "私たちと一緒に、\n本質的な価値を生み出しましょう。",
      "members": [
        {
          "id": "yamada",
          "nameJa": "山田 太郎",
          "nameEn": "Taro Yamada",
          "title": "代表取締役 / ブランドストラテジスト",
          "image": "/images/team/yamada.jpg",
          "isRepresentative": true
        },
        {
          "id": "suzuki",
          "nameJa": "鈴木 花子",
          "nameEn": "Hanako Suzuki",
          "title": "デザイナー",
          "image": "/images/team/suzuki.jpg",
          "isRepresentative": false
        },
        {
          "id": "sato",
          "nameJa": "佐藤 一郎",
          "nameEn": "Ichiro Sato",
          "title": "ストラテジスト",
          "image": "/images/team/sato.jpg",
          "isRepresentative": false
        },
        {
          "id": "tanaka",
          "nameJa": "田中 次郎",
          "nameEn": "Jiro Tanaka",
          "title": "プロジェクトマネージャー",
          "image": "/images/team/tanaka.jpg",
          "isRepresentative": false
        }
      ]
    }
  }
}
```

### 4-5. pages.about（会社概要）

```json
{
  "pages": {
    "about": {
      "title": {
        "en": "About",
        "ja": "会社概要"
      },
      "showHistory": true,
      "showAccess": true
    }
  }
}
```

※ 会社情報は `company` オブジェクトから参照

### 4-6. pages.contact

```json
{
  "pages": {
    "contact": {
      "title": {
        "en": "Contact",
        "ja": "お問い合わせ"
      },
      "lead": "プロジェクトについて\nお聞かせください。",
      "responseTime": "内容を確認後、2営業日以内に\n担当者よりご連絡いたします。",
      "inquiryTypes": [
        { "value": "new_project", "label": "新規プロジェクトのご相談" },
        { "value": "improvement", "label": "既存サイト・ブランドの改善" },
        { "value": "branding", "label": "ブランディング・戦略について" },
        { "value": "other", "label": "その他" }
      ],
      "budgetOptions": [
        { "value": "", "label": "選択してください" },
        { "value": "under_50", "label": "50万円未満" },
        { "value": "50_100", "label": "50万円〜100万円" },
        { "value": "100_300", "label": "100万円〜300万円" },
        { "value": "300_500", "label": "300万円〜500万円" },
        { "value": "over_500", "label": "500万円以上" },
        { "value": "undecided", "label": "未定・相談したい" }
      ],
      "timelineOptions": [
        { "value": "", "label": "選択してください" },
        { "value": "asap", "label": "なるべく早く" },
        { "value": "1month", "label": "1ヶ月以内" },
        { "value": "3months", "label": "3ヶ月以内" },
        { "value": "6months", "label": "半年以内" },
        { "value": "undecided", "label": "時期は未定" }
      ],
      "thanks": {
        "title": {
          "en": "Thank you",
          "ja": "お問い合わせありがとうございます"
        },
        "message": "内容を確認の上、\n2営業日以内にご連絡いたします。\n\nしばらくお待ちください。",
        "backLink": {
          "text": "トップページへ戻る",
          "href": "/"
        }
      }
    }
  }
}
```

### 4-7. pages.privacy

```json
{
  "pages": {
    "privacy": {
      "title": {
        "en": "Privacy Policy",
        "ja": "個人情報保護方針"
      },
      "preamble": "株式会社〇〇（以下「当社」といいます）は、お客様からお預かりする個人情報の重要性を認識し、その適切な保護と管理に努めます。当社は、以下の方針に基づき個人情報を取り扱います。",
      "sections": [
        {
          "title": "個人情報の定義",
          "content": "本方針において「個人情報」とは..."
        },
        {
          "title": "個人情報の収集",
          "content": "当社は、以下の場合に個人情報を収集することがあります。\n\n・お問い合わせフォームからのご連絡時\n・サービスのお申し込み時\n・採用へのご応募時"
        }
      ],
      "enactedDate": "2020年4月1日",
      "revisedDate": "2024年1月15日",
      "contact": {
        "manager": "山田 太郎",
        "email": "privacy@example.com"
      }
    }
  }
}
```

---

## 5. cases（事例）

```json
{
  "cases": [
    {
      "slug": "abc-corporation-rebranding",
      "client": "株式会社ABC",
      "industry": "製造業",
      "year": 2023,
      "scope": ["戦略設計", "ブランディング"],
      "title": "株式会社ABC様 リブランディングプロジェクト",
      "lead": "創業50年を迎える老舗製造業の、次の50年に向けたブランド刷新を担当しました。",
      "thumbnail": "/images/case/abc/thumbnail.jpg",
      "mainImage": "/images/case/abc/main.jpg",
      "images": [
        "/images/case/abc/result-01.jpg",
        "/images/case/abc/result-02.jpg",
        "/images/case/abc/result-03.jpg"
      ],
      "challenge": "創業当時から変わらないロゴとビジュアルアイデンティティは、社員の高齢化とともに「古い会社」という印象を与えていました。\n\n特に採用面で苦戦しており、若い世代に「働きたい」と思われるブランドイメージへの刷新が急務でした。",
      "approach": [
        {
          "numberEn": "01",
          "title": "ヒアリング・現状分析",
          "description": "経営層、社員、顧客へのインタビューを実施し、現状の課題と理想の姿を明確化しました。"
        },
        {
          "numberEn": "02",
          "title": "コンセプト設計",
          "description": "「伝統と革新の融合」をコンセプトに、老舗の信頼感を活かしながら新しさを表現する方向性を策定しました。"
        },
        {
          "numberEn": "03",
          "title": "ビジュアル開発",
          "description": "ロゴ、カラー、フォントの刷新を行い、統一感のあるビジュアルアイデンティティを構築しました。"
        },
        {
          "numberEn": "04",
          "title": "展開・浸透",
          "description": "名刺、ウェブサイト、社内ツールへの展開を行い、社員向けのブランド研修も実施しました。"
        }
      ],
      "result": "採用応募数が前年比180%に増加。社内アンケートでは「会社に誇りを持てるようになった」という声が多数寄せられました。",
      "resultMetrics": [
        { "value": "180%", "label": "採用応募数の増加" },
        { "value": "92%", "label": "社員満足度" }
      ],
      "testimonial": {
        "quote": "正直、最初は半信半疑でした。でも、プロセスを通じて社員の意識が変わり、今では全員がこのブランドに誇りを持っています。",
        "author": "株式会社ABC 代表取締役 佐藤 様"
      },
      "featured": true,
      "order": 1
    }
  ]
}
```

---

## 6. columns（コラム）

```json
{
  "columns": [
    {
      "slug": "why-price-competition-fails",
      "title": "なぜ「安さ」で勝負すると負けるのか",
      "subtitle": "価格競争から脱却するためのブランディング戦略",
      "date": "2024-01-15",
      "category": "branding",
      "author": "yamada",
      "thumbnail": null,
      "content": "多くの企業が「価格で勝負」しようとします。しかし、それは最も危険な戦略です。\n\n## 価格競争の本当の問題\n\n価格競争の問題は、利益率の低下だけではありません...",
      "relatedSlugs": ["rebranding-timing", "design-evaluation"],
      "featured": true
    }
  ]
}
```

---

## TypeScript型定義

```typescript
// types/site.ts

export interface SiteData {
  meta: Meta;
  company: Company;
  navigation: Navigation;
  pages: Pages;
  cases: Case[];
  columns: Column[];
}

export interface Meta {
  siteName: string;
  siteNameEn?: string;
  tagline: string;
  taglineEn?: string;
  description: string;
  ogImage: string;
  favicon: string;
  themeColor: string;
  googleAnalyticsId?: string;
}

export interface Company {
  name: string;
  nameEn?: string;
  representative: {
    name: string;
    nameEn: string;
    title: string;
    image: string;
  };
  established: string;
  address: {
    postalCode: string;
    prefecture: string;
    city: string;
    street: string;
    building?: string;
    full: string;
  };
  contact: {
    phone?: string;
    email: string;
    businessHours: string;
  };
  business: string[];
  capital?: string;
  employees?: string;
  history?: { year: number; event: string }[];
  access?: {
    station: string;
    walkMinutes: number;
    mapEmbedUrl?: string;
    mapImageUrl?: string;
  };
}

export interface Case {
  slug: string;
  client: string;
  industry: string;
  year: number;
  scope: string[];
  title: string;
  lead: string;
  thumbnail: string;
  mainImage: string;
  images: string[];
  challenge: string;
  approach: {
    numberEn: string;
    title: string;
    description: string;
  }[];
  result: string;
  resultMetrics?: { value: string; label: string }[];
  testimonial?: {
    quote: string;
    author: string;
  };
  featured: boolean;
  order: number;
}

export interface Column {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  category: string;
  author: string;
  thumbnail?: string | null;
  content: string;
  relatedSlugs?: string[];
  featured: boolean;
}
```

---

## データの配置

```
data/
└── site.json          # 上記構造のJSONファイル

content/
├── cases/             # 事例の詳細（必要に応じてMDファイル化）
│   ├── abc-corporation.md
│   └── xyz-company.md
└── columns/           # コラム記事（MDファイル）
    ├── why-price-competition-fails.md
    └── rebranding-timing.md
```

---

*このデータ構造に基づき、site.jsonを作成し、各ページで参照する。*
