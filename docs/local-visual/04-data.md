# Local Visual site.json 構造設計

template-fullorder の site.json をベースに、Local Visual テンプレート固有の追加フィールドを定義する。

---

## 完全な site.json 構造

```json
{
  "navigation": {
    "main": [
      { "label": "サービス", "href": "/service" },
      { "label": "施工事例", "href": "/works" },
      { "label": "対応エリア", "href": "/area" },
      { "label": "会社概要", "href": "/about" }
    ],
    "footer": [
      { "label": "サービス", "href": "/service" },
      { "label": "施工事例", "href": "/works" },
      { "label": "対応エリア", "href": "/area" },
      { "label": "会社概要", "href": "/about" },
      { "label": "お問い合わせ", "href": "/contact" },
      { "label": "プライバシーポリシー", "href": "/privacy" }
    ],
    "cta": {
      "label": "お問い合わせ",
      "href": "/contact"
    }
  },

  "company": {
    "name": "株式会社〇〇塗装",
    "nameShort": "〇〇塗装",
    "nameEn": "Marumaru Tosou Co., Ltd.",
    "id": "marumaru-tosou",
    "ceo": "〇〇 〇〇",
    "ceoTitle": "代表取締役",
    "established": "1994年4月",
    "capital": "1,000万円",
    "employees": "15名",
    "business": "外壁塗装、屋根工事、リフォーム、防水工事",
    "license": "建設業許可 愛知県知事 第XXXXX号",
    "associations": ["〇〇塗装工業組合", "〇〇商工会議所"],
    "catchphrase": "地域に根ざして30年。お客様の住まいを守り続けます。",
    "mission": "お客様の住まいと暮らしを守り続ける",
    "vision": "地域No.1の信頼を獲得し、住まいのことなら何でも相談されるパートナーになる"
  },

  "contact": {
    "phone": "0120-XXX-XXX",
    "phoneFormatted": "0120-XXX-XXX",
    "phoneTel": "tel:0120XXXXXX",
    "fax": "0XXX-XX-XXXX",
    "email": "info@example.com",
    "hours": "9:00〜18:00（日祝除く）",
    "hoursNote": "フォームは24時間受付"
  },

  "locations": {
    "headquarters": {
      "name": "本社",
      "zipCode": "444-0000",
      "prefecture": "愛知県",
      "city": "岡崎市",
      "address": "〇〇町X-XX-XX",
      "fullAddress": "愛知県岡崎市〇〇町X-XX-XX",
      "access": [
        "JR東海道本線「岡崎駅」から車で10分",
        "名鉄名古屋本線「東岡崎駅」から車で15分"
      ],
      "parking": "駐車場5台完備",
      "mapUrl": "https://maps.google.com/maps?...",
      "mapEmbed": "<iframe src=\"https://www.google.com/maps/embed?...\"></iframe>",
      "lat": 34.9513,
      "lng": 137.1622
    },
    "branches": []
  },

  "social": {
    "instagram": "https://instagram.com/marumaru_tosou",
    "facebook": "",
    "twitter": "",
    "youtube": "",
    "line": "https://line.me/R/ti/p/..."
  },

  "images": {
    "logo": "/images/logo.png",
    "logoWhite": "/images/logo-white.png",
    "logoSquare": "/images/logo-square.png",
    "logoOnly": "/images/logo-only.png",
    "ogImage": "/images/og-image.jpg",
    "heroMain": "/images/hero-main.jpg",
    "companyExterior": "/images/company-exterior.jpg",
    "ceoPortrait": "/images/ceo-portrait.jpg",
    "areaMap": "/images/area-map.svg"
  },

  "seo": {
    "titleSuffix": " | 〇〇塗装",
    "defaultTitle": "〇〇市の外壁塗装・リフォームなら【〇〇塗装】",
    "defaultDescription": "〇〇市・△△市エリアで外壁塗装・リフォームをお考えなら【〇〇塗装】へ。創業30年、地域密着で施工実績500件以上。"
  },

  "stats": {
    "yearsInBusiness": 30,
    "yearsInBusinessLabel": "創業",
    "yearsInBusinessUnit": "年",
    "projectsCompleted": 500,
    "projectsCompletedLabel": "施工実績",
    "projectsCompletedUnit": "件+",
    "localYears": 30,
    "localYearsLabel": "地域密着",
    "localYearsUnit": "年",
    "employees": 15,
    "repeatRate": 60,
    "repeatRateLabel": "リピート・紹介率",
    "repeatRateUnit": "%"
  },

  "localVisual": {
    "mainRegion": "岡崎市",
    "regions": [
      {
        "name": "岡崎市",
        "isMain": true,
        "worksCount": 150,
        "districts": ["〇〇町", "△△町", "□□地区", "◎◎町"]
      },
      {
        "name": "豊田市",
        "isMain": false,
        "worksCount": 50
      },
      {
        "name": "安城市",
        "isMain": false,
        "worksCount": 40
      },
      {
        "name": "刈谷市",
        "isMain": false,
        "worksCount": 30
      },
      {
        "name": "西尾市",
        "isMain": false,
        "worksCount": 35
      },
      {
        "name": "幸田町",
        "isMain": false,
        "worksCount": 20
      }
    ],
    "areaNote": "本社から車で約30分圏内が主な対応エリアです",
    "areaOutsideNote": "記載のない地域もお気軽にご相談ください"
  },

  "services": [
    {
      "id": "painting",
      "title": "外壁塗装",
      "description": "建物の美観回復と保護を同時に実現。お客様のご予算と建物の状態に合わせた塗料選定から、下地処理、塗装、仕上げまで一貫して対応します。",
      "features": ["10年以上の耐久性", "下地処理を丁寧に", "色彩提案も可能"],
      "image": "/images/service-painting.jpg",
      "icon": "paint-brush",
      "priceRange": "50万円〜150万円",
      "priceNote": "延床面積・塗料グレードにより変動"
    },
    {
      "id": "roofing",
      "title": "屋根工事",
      "description": "葺き替え、カバー工法、部分補修まで対応。雨漏りの原因を特定し、根本から解決します。屋根の状態を無料で診断し、最適な工法をご提案。",
      "features": ["雨漏り完全対応", "無料屋根診断", "各種屋根材対応"],
      "image": "/images/service-roofing.jpg",
      "icon": "home",
      "priceRange": "30万円〜200万円",
      "priceNote": "工法・屋根材により変動"
    },
    {
      "id": "reform",
      "title": "リフォーム",
      "description": "キッチン、浴室、トイレなど水回りから、内装、外構まで、住まいのことなら何でもご相談ください。部分リフォームから全面改装まで対応。",
      "features": ["水回り専門職人在籍", "バリアフリー対応", "補助金申請サポート"],
      "image": "/images/service-reform.jpg",
      "icon": "wrench",
      "priceRange": "10万円〜",
      "priceNote": "内容により変動"
    }
  ],

  "additionalServices": [
    { "id": "waterproofing", "title": "防水工事", "icon": "droplet" },
    { "id": "floor-coating", "title": "塗床工事", "icon": "square" },
    { "id": "exterior", "title": "外構工事", "icon": "fence" },
    { "id": "siding", "title": "サイディング", "icon": "layers" },
    { "id": "gutter", "title": "雨樋交換", "icon": "arrow-down" },
    { "id": "sealing", "title": "シーリング", "icon": "package" },
    { "id": "insulation", "title": "断熱工事", "icon": "thermometer" },
    { "id": "other", "title": "その他", "icon": "plus" }
  ],

  "pricing": [
    {
      "service": "外壁塗装（30坪程度）",
      "price": "50万円〜150万円",
      "note": "塗料グレードにより変動"
    },
    {
      "service": "屋根塗装",
      "price": "30万円〜80万円",
      "note": "屋根面積・形状による"
    },
    {
      "service": "屋根葺き替え",
      "price": "80万円〜200万円",
      "note": "屋根材により変動"
    },
    {
      "service": "屋根カバー工法",
      "price": "60万円〜150万円",
      "note": "既存屋根の状態による"
    },
    {
      "service": "雨樋交換",
      "price": "15万円〜40万円",
      "note": "足場が必要な場合は別途"
    },
    {
      "service": "防水工事",
      "price": "5万円/坪〜",
      "note": "工法により変動"
    }
  ],

  "process": [
    {
      "step": 1,
      "title": "お問い合わせ",
      "description": "お電話またはメールでお気軽にご連絡ください",
      "icon": "phone",
      "badge": "無料"
    },
    {
      "step": 2,
      "title": "現地調査",
      "description": "専門スタッフが建物の状態を詳しく確認します",
      "icon": "search",
      "badge": "無料"
    },
    {
      "step": 3,
      "title": "お見積り",
      "description": "調査結果をもとに、詳細なお見積りをご提示",
      "icon": "file-text",
      "badge": "無料"
    },
    {
      "step": 4,
      "title": "ご契約",
      "description": "内容にご納得いただいてからのご契約。強引な営業はいたしません",
      "icon": "handshake"
    },
    {
      "step": 5,
      "title": "施工・完了",
      "description": "丁寧に施工し、完了後は保証書を発行。アフターフォローも万全",
      "icon": "check-circle",
      "badge": "保証付き"
    }
  ],

  "reasons": [
    {
      "number": "01",
      "title": "地域密着30年の信頼と実績",
      "description": "〇〇市で創業して30年。地域の気候や建物の特性を熟知しているからこそ、最適な提案ができます。これまでに500件以上の施工実績があり、ご紹介やリピートのお客様が全体の60%を占めています。",
      "icon": "award"
    },
    {
      "number": "02",
      "title": "自社施工だから中間マージン0",
      "description": "下請けに丸投げしないので、余計なコストがかかりません。職人との直接コミュニケーションで、細かなご要望にも柔軟に対応。「思っていたのと違う」というトラブルを防ぎます。",
      "icon": "users"
    },
    {
      "number": "03",
      "title": "アフターフォロー10年保証",
      "description": "施工後も安心。10年間の保証期間中は、無料で点検・補修を行います。地域密着だからこそ、いつでも駆けつけられる距離感。「何かあったらすぐ来てくれる」という安心感をお届けします。",
      "icon": "shield-check"
    }
  ],

  "history": [
    { "year": "1994", "content": "〇〇市〇〇町にて創業" },
    { "year": "2000", "content": "法人化。株式会社〇〇塗装を設立" },
    { "year": "2005", "content": "外壁塗装専門から総合リフォームへ事業拡大" },
    { "year": "2010", "content": "現在地に本社移転。施工実績300件突破" },
    { "year": "2015", "content": "地域貢献活動開始（〇〇清掃ボランティア等）" },
    { "year": "2020", "content": "施工実績500件突破" },
    { "year": "現在", "content": "地域密着で住まいのサービスを提供中", "isCurrent": true }
  ],

  "certifications": [
    {
      "name": "建設業許可",
      "detail": "愛知県知事 第XXXXX号",
      "image": "/images/cert-kensetsu.png"
    },
    {
      "name": "一級塗装技能士",
      "detail": "国家資格",
      "image": "/images/cert-tosoushi.png"
    },
    {
      "name": "日本ペイント認定施工店",
      "detail": "",
      "image": "/images/cert-nippon-paint.png"
    },
    {
      "name": "〇〇商工会議所会員",
      "detail": "",
      "image": "/images/cert-shoukou.png"
    }
  ],

  "ceo": {
    "name": "〇〇 〇〇",
    "nameKana": "まるまる まるまる",
    "title": "代表取締役",
    "image": "/images/ceo-portrait.jpg",
    "greeting": {
      "catchphrase": "地域の皆様に選ばれ続けて30年。これからも、お客様の住まいと暮らしを守り続けてまいります。",
      "paragraphs": [
        "私たちが大切にしているのは「地域密着」です。〇〇市で創業して30年。地元のお客様に支えられ、ここまで歩んでくることができました。",
        "外壁塗装やリフォームは、お客様にとって大きな決断です。だからこそ、私たちは「顔の見える関係」を大切にしています。下請けに任せきりにせず、自社の職人が責任を持って施工する。困ったことがあればすぐに駆けつける。そんな当たり前のことを、愚直に続けています。",
        "お客様の住まいは、人生を過ごす大切な場所です。その住まいを守ることが、私たちの使命だと考えています。",
        "これからも地域の皆様に信頼される会社であり続けるため、社員一同、精進してまいります。住まいのことでお困りの際は、どうぞお気軽にご相談ください。"
      ]
    }
  },

  "faq": [
    {
      "question": "見積もりは本当に無料ですか？",
      "answer": "はい、お見積もりは完全無料です。現地調査を行い、詳細なお見積書をお渡しします。ご契約を強制することはございませんので、お気軽にご依頼ください。"
    },
    {
      "question": "対応エリア外でも相談できますか？",
      "answer": "対応エリア外でも、内容によってはお伺いできる場合がございます。まずはお気軽にご相談ください。"
    },
    {
      "question": "見積もり後、必ず契約しなければいけませんか？",
      "answer": "いいえ、ご契約を強制することは一切ございません。ご納得いただいた上でご判断ください。"
    },
    {
      "question": "問い合わせから工事完了までどれくらいかかりますか？",
      "answer": "工事内容により異なりますが、お問い合わせから現地調査まで1週間以内、お見積り提出から工事着工まで2〜4週間程度が目安です。"
    },
    {
      "question": "土日祝日でも対応していますか？",
      "answer": "電話受付は平日9:00-18:00ですが、フォームは24時間受け付けております。土日祝日にいただいたお問い合わせは、翌営業日に対応いたします。"
    }
  ],

  "works": [],

  "news": []
}
```

---

## フィールド説明

### 基本フィールド（template-fullorder から継承）

| フィールド | 必須/任意 | 説明 |
|-----------|----------|------|
| navigation | 必須 | ナビゲーションメニュー |
| company | 必須 | 会社基本情報 |
| contact | 必須 | 連絡先情報 |
| locations | 必須 | 所在地情報 |
| social | 任意 | SNSリンク |
| images | 必須 | ロゴ等の画像パス |
| seo | 必須 | SEO設定 |

### Local Visual 固有フィールド

#### stats（実績数字）

| フィールド | 型 | 必須 | 説明 |
|-----------|---|------|------|
| yearsInBusiness | number | 必須 | 創業年数 |
| yearsInBusinessLabel | string | 必須 | ラベル（「創業」） |
| yearsInBusinessUnit | string | 必須 | 単位（「年」） |
| projectsCompleted | number | 必須 | 施工実績件数 |
| projectsCompletedLabel | string | 必須 | ラベル（「施工実績」） |
| projectsCompletedUnit | string | 必須 | 単位（「件+」） |
| localYears | number | 必須 | 地域密着年数 |
| localYearsLabel | string | 必須 | ラベル（「地域密着」） |
| localYearsUnit | string | 必須 | 単位（「年」） |
| repeatRate | number | 任意 | リピート・紹介率（%） |

#### localVisual（地域設定）

| フィールド | 型 | 必須 | 説明 |
|-----------|---|------|------|
| mainRegion | string | 必須 | メイン対応地域名 |
| regions | array | 必須 | 対応地域リスト |
| regions[].name | string | 必須 | 地域名 |
| regions[].isMain | boolean | 必須 | メイン地域かどうか |
| regions[].worksCount | number | 任意 | その地域での施工件数 |
| regions[].districts | string[] | 任意 | 詳細地区名（メイン地域のみ） |
| areaNote | string | 任意 | エリアに関する補足 |
| areaOutsideNote | string | 任意 | エリア外に関する補足 |

#### services（サービス）

| フィールド | 型 | 必須 | 説明 |
|-----------|---|------|------|
| id | string | 必須 | サービスID（URLに使用） |
| title | string | 必須 | サービス名 |
| description | string | 必須 | サービス説明 |
| features | string[] | 任意 | 特徴リスト（3つ程度） |
| image | string | 必須 | サービス画像パス |
| icon | string | 任意 | アイコン名 |
| priceRange | string | 任意 | 料金目安 |
| priceNote | string | 任意 | 料金に関する注釈 |

#### additionalServices（追加サービス）

| フィールド | 型 | 必須 | 説明 |
|-----------|---|------|------|
| id | string | 必須 | サービスID |
| title | string | 必須 | サービス名 |
| icon | string | 任意 | アイコン名 |

#### pricing（料金表）

| フィールド | 型 | 必須 | 説明 |
|-----------|---|------|------|
| service | string | 必須 | サービス名 |
| price | string | 必須 | 料金範囲 |
| note | string | 任意 | 注釈 |

#### process（ご依頼の流れ）

| フィールド | 型 | 必須 | 説明 |
|-----------|---|------|------|
| step | number | 必須 | ステップ番号 |
| title | string | 必須 | ステップ名 |
| description | string | 必須 | 説明 |
| icon | string | 任意 | アイコン名 |
| badge | string | 任意 | バッジテキスト（「無料」等） |

#### reasons（選ばれる理由）

| フィールド | 型 | 必須 | 説明 |
|-----------|---|------|------|
| number | string | 必須 | 番号（「01」等） |
| title | string | 必須 | タイトル |
| description | string | 必須 | 説明 |
| icon | string | 任意 | アイコン名 |

#### history（沿革）

| フィールド | 型 | 必須 | 説明 |
|-----------|---|------|------|
| year | string | 必須 | 年（「2020」または「現在」） |
| content | string | 必須 | 出来事 |
| isCurrent | boolean | 任意 | 現在の項目かどうか |

#### certifications（資格・認定）

| フィールド | 型 | 必須 | 説明 |
|-----------|---|------|------|
| name | string | 必須 | 資格・認定名 |
| detail | string | 任意 | 詳細（許可番号等） |
| image | string | 任意 | ロゴ画像パス |

#### ceo（代表者情報）

| フィールド | 型 | 必須 | 説明 |
|-----------|---|------|------|
| name | string | 必須 | 代表者名 |
| nameKana | string | 任意 | 代表者名（ふりがな） |
| title | string | 必須 | 役職名 |
| image | string | 必須 | ポートレート画像パス |
| greeting.catchphrase | string | 必須 | キャッチフレーズ |
| greeting.paragraphs | string[] | 必須 | 挨拶文（段落配列） |

#### faq（よくある質問）

| フィールド | 型 | 必須 | 説明 |
|-----------|---|------|------|
| question | string | 必須 | 質問 |
| answer | string | 必須 | 回答 |

---

## 施工事例データ構造（works）

施工事例は件数が多いため、site.json ではなく別ファイル（`data/works.json`）または各ページのコンテンツデータ定数として管理する。

```typescript
// data/works.json または pages/works/[slug]/page.tsx 内の定数

interface WorkCase {
  slug: string;                    // URLスラッグ（例：「okazaki-gaiheki-2024-01」）
  title: string;                   // タイトル（SEO用）
  area: string;                    // 地域名（例：「岡崎市」）
  category: string;                // 工事種別（例：「外壁塗装」）
  buildingType: string;            // 建物種別（例：「戸建て住宅（2階建て）」）
  buildingAge: string;             // 築年数（例：「約25年」）
  workContent: string;             // 工事内容（例：「外壁塗装、屋根塗装、コーキング打ち替え」）
  materials: string[];             // 使用材料（例：["日本ペイント パーフェクトトップ"]）
  duration: string;                // 施工期間（例：「約2週間」）
  completedAt: string;             // 施工時期（例：「2024-05」）
  thumbnailImage: string;          // サムネイル画像パス
  beforeImage: string;             // Before写真パス
  afterImage: string;              // After写真パス
  galleryImages: string[];         // ギャラリー写真パス配列
  customerVoice?: {                // お客様の声（オプション）
    content: string;
    attribution: string;           // 「〇〇市 M様（50代）」等
  };
  staffComment?: {                 // 担当者コメント（オプション）
    content: string;
    staffName: string;
    staffTitle: string;
    staffImage?: string;
  };
}
```

---

## 使用例（lib/site.ts）

```typescript
import siteData from '@/data/site.json';

// 型定義
export type SiteData = typeof siteData;

// エクスポート
export const company = siteData.company;
export const contact = siteData.contact;
export const stats = siteData.stats;
export const localVisual = siteData.localVisual;
export const services = siteData.services;
export const reasons = siteData.reasons;
export const process = siteData.process;
export const history = siteData.history;
export const ceo = siteData.ceo;
export const faq = siteData.faq;

// ヘルパー関数
export function getMainRegion(): string {
  return siteData.localVisual.mainRegion;
}

export function getRegions() {
  return siteData.localVisual.regions;
}

export function getServiceById(id: string) {
  return siteData.services.find(s => s.id === id);
}
```
