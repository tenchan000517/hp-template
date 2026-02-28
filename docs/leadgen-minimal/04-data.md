# LeadGen Minimal site.json 構造

## 概要

このドキュメントでは、LeadGen Minimal テンプレートで使用する site.json のデータ構造を定義する。
Standard テンプレートの site.json をベースに、このテンプレート固有のフィールドを追加する。

---

## site.json 完全構造

```json
{
  "meta": {
    "siteName": "株式会社〇〇",
    "siteUrl": "https://example.com",
    "description": "〇〇を通じて、企業の成長をサポートします",
    "ogImage": "/images/og-image.jpg",
    "favicon": "/favicon.ico",
    "gtmId": "GTM-XXXXXXX"
  },
  "company": {
    "name": "株式会社〇〇",
    "nameEn": "Example Inc.",
    "postalCode": "100-0001",
    "address": "東京都千代田区〇〇1-2-3",
    "phone": "03-1234-5678",
    "email": "info@example.com",
    "establishedYear": 2010,
    "capital": "1,000万円",
    "employees": "50名",
    "ceo": "山田 太郎",
    "description": "企業の課題解決を支援するコンサルティング会社です。"
  },
  "navigation": {
    "main": [
      { "label": "サービス", "href": "/service" },
      { "label": "事例", "href": "/case" }
    ],
    "cta": {
      "label": "お問い合わせ",
      "href": "/contact"
    },
    "footer": [
      { "label": "サービス", "href": "/service" },
      { "label": "事例", "href": "/case" },
      { "label": "お問い合わせ", "href": "/contact" },
      { "label": "プライバシーポリシー", "href": "/privacy" }
    ]
  },
  "theme": {
    "colors": {
      "primary": "#1a1a2e",
      "accent": "#c45c3e",
      "background": "#FFFFFF",
      "backgroundAlt": "#f8f8f8",
      "text": "#1a1a2e",
      "textLight": "#6b7280"
    },
    "fonts": {
      "heading": "\"Noto Sans JP\", sans-serif",
      "body": "\"Noto Sans JP\", sans-serif"
    }
  },
  "pages": {
    "top": {
      "hero": {
        "catchCopy": "あなたの事業を、次のステージへ。",
        "subCopy": "課題整理から実装まで、一貫してサポートします"
      },
      "problem": {
        "heading": "こんな課題を抱えていませんか？",
        "items": [
          {
            "number": "01",
            "title": "属人化から脱却できない",
            "description": "ノウハウが特定の担当者に依存し、組織としての成長が止まっている。"
          },
          {
            "number": "02",
            "title": "リソースが足りない",
            "description": "採用は難しく、育成には時間がかかる。外注しても品質が安定しない。"
          },
          {
            "number": "03",
            "title": "何から始めればいいかわからない",
            "description": "課題は認識しているが、どこから手をつければいいか見えない。"
          }
        ]
      },
      "solution": {
        "heading": "私たちが、解決します。",
        "points": [
          {
            "title": "課題の本質を見極める",
            "description": "表面的な対処ではなく、根本原因にアプローチします。"
          },
          {
            "title": "貴社に最適な形で提供",
            "description": "標準パッケージではなく、状況に合わせたカスタマイズ。"
          },
          {
            "title": "成果が出るまで伴走",
            "description": "納品して終わりではなく、継続的にサポートします。"
          }
        ]
      },
      "results": {
        "heading": "成果の一例",
        "items": [
          { "number": 32, "unit": "%", "description": "導入企業の平均売上向上率" },
          { "number": 150, "unit": "社", "description": "累計導入企業数" },
          { "number": 98, "unit": "%", "description": "お客様満足度" }
        ]
      },
      "cta": {
        "heading": "まずは、お話しませんか。",
        "subText": "無料でご相談いただけます。お気軽にどうぞ。",
        "buttonText": "お問い合わせ",
        "buttonLink": "/contact"
      }
    },
    "service": {
      "header": {
        "title": "サービス",
        "description": "私たちが提供する価値と、その実現方法をご紹介します。"
      },
      "overview": {
        "heading": "サービス内容",
        "categories": [
          {
            "number": "01",
            "name": "戦略策定",
            "description": "現状を正確に把握し、目指すべきゴールを明確にします。そこから逆算して、最適なロードマップを策定します。",
            "items": [
              "現状診断・課題抽出",
              "ゴール設定・KPI定義",
              "ロードマップ作成"
            ]
          },
          {
            "number": "02",
            "name": "実行支援",
            "description": "策定した戦略を、具体的なアクションに落とし込みます。必要に応じてリソースを提供し、確実に実行します。",
            "items": [
              "プロジェクト管理",
              "専門人材の提供",
              "進捗管理・軌道修正"
            ]
          },
          {
            "number": "03",
            "name": "定着化",
            "description": "一過性の成果ではなく、持続的な仕組みを構築します。貴社の力だけで運用できる状態を目指します。",
            "items": [
              "マニュアル・ドキュメント整備",
              "社内研修・ナレッジ移管",
              "効果測定・改善提案"
            ]
          }
        ]
      },
      "whyChooseUs": {
        "heading": "選ばれる理由",
        "reasons": [
          {
            "keyword": "本質への集中",
            "description": "表面的な対処ではなく、課題の根本原因にアプローチします。一時的な解決ではなく、持続的な成果を追求します。"
          },
          {
            "keyword": "柔軟な対応",
            "description": "標準パッケージを押し付けるのではなく、貴社の状況に合わせて最適な形にカスタマイズします。"
          },
          {
            "keyword": "成果へのコミット",
            "description": "納品して終わりではありません。成果が出るまで、責任を持って伴走します。"
          }
        ]
      },
      "process": {
        "heading": "ご依頼の流れ",
        "steps": [
          {
            "number": "01",
            "name": "お問い合わせ",
            "description": "フォームからお問い合わせください。1営業日以内にご返信いたします。"
          },
          {
            "number": "02",
            "name": "ヒアリング",
            "description": "オンラインで60分程度、現状の課題やご要望をお聞きします。費用はかかりません。"
          },
          {
            "number": "03",
            "name": "ご提案",
            "description": "ヒアリング内容をもとに、具体的な提案書をお送りします。"
          },
          {
            "number": "04",
            "name": "ご契約",
            "description": "提案内容にご納得いただけましたら、契約を締結します。"
          },
          {
            "number": "05",
            "name": "プロジェクト開始",
            "description": "キックオフミーティングを実施し、プロジェクトを開始します。"
          }
        ]
      },
      "cta": {
        "heading": "ご相談から、始めませんか。",
        "subText": "まずはお気軽にお問い合わせください。",
        "buttonText": "お問い合わせ",
        "buttonLink": "/contact",
        "caseLink": {
          "text": "事例を見る",
          "href": "/case"
        }
      }
    },
    "case": {
      "header": {
        "title": "導入事例",
        "description": "お客様の課題解決をサポートした事例をご紹介します。"
      },
      "cases": [
        {
          "id": "manufacturing",
          "industry": "製造業",
          "title": "製造業 × 業務改善",
          "problemSummary": "業務の属人化による生産性低下",
          "background": "従業員300名の精密機器メーカー。創業40年、業界内でのシェアは高いものの、ベテラン社員への依存度が高く、ノウハウの属人化が課題となっていた。",
          "problem": "製造ラインの最適化は特定のベテラン社員に依存。退職リスクへの対策が急務だった。また、若手社員への技術継承が進まず、生産性が徐々に低下していた。",
          "solution": "まず、ベテラン社員へのヒアリングを実施し、暗黙知を言語化。その上で、作業手順のマニュアル化と、若手向け研修プログラムを設計・実施した。",
          "result": {
            "number": "45",
            "unit": "%",
            "label": "生産性向上",
            "description": "導入から6ヶ月で生産性が45%向上。また、若手社員の離職率が20%改善した。"
          }
        },
        {
          "id": "it-telecom",
          "industry": "IT・通信",
          "title": "IT・通信 × 営業強化",
          "problemSummary": "新規顧客獲得の頭打ち",
          "background": "従業員50名のSaaS企業。プロダクトは好評だが、新規顧客獲得が頭打ちになっていた。営業チームの拡大が必要だが、採用は難航。",
          "problem": "営業活動が属人的で、成果にばらつきがあった。また、マーケティングとの連携が弱く、リードの質が安定しなかった。",
          "solution": "営業プロセスを分解し、各フェーズでのKPIを設定。マーケティング部門と連携し、リードの定義と評価基準を統一した。",
          "result": {
            "number": "2.3",
            "unit": "倍",
            "label": "問い合わせ数",
            "description": "導入から3ヶ月で問い合わせ数が2.3倍に。商談化率も15%向上した。"
          }
        },
        {
          "id": "retail",
          "industry": "小売・流通",
          "title": "小売・流通 × EC強化",
          "problemSummary": "EC売上の伸び悩み",
          "background": "従業員100名の食品メーカー。直販EC事業を始めたが、伸び悩んでいた。実店舗での知名度はあるが、オンラインでの認知が低い。",
          "problem": "EC担当者が1名しかおらず、マーケティングもカスタマーサポートも兼任。戦略的な施策を打つ余裕がなかった。",
          "solution": "まず、EC運営の業務を整理し、外部リソースを活用できる体制を構築。その上で、SEOとコンテンツマーケティングを強化した。",
          "result": {
            "number": "180",
            "unit": "%",
            "label": "売上成長",
            "description": "導入から12ヶ月でEC売上が180%成長。担当者の業務負荷も大幅に軽減した。"
          }
        }
      ],
      "cta": {
        "heading": "あなたの課題も、解決できます。",
        "subText": "まずは現状をお聞かせください。最適なご提案をいたします。",
        "buttonText": "お問い合わせ",
        "buttonLink": "/contact"
      }
    },
    "contact": {
      "header": {
        "title": "お問い合わせ",
        "description": "ご相談は無料です。1営業日以内にご返信いたします。"
      },
      "form": {
        "fields": [
          {
            "name": "name",
            "label": "お名前",
            "type": "text",
            "required": true,
            "placeholder": "山田 太郎"
          },
          {
            "name": "email",
            "label": "メールアドレス",
            "type": "email",
            "required": true,
            "placeholder": "example@company.co.jp"
          },
          {
            "name": "company",
            "label": "会社名",
            "type": "text",
            "required": false,
            "placeholder": "株式会社〇〇"
          },
          {
            "name": "phone",
            "label": "電話番号",
            "type": "tel",
            "required": false,
            "placeholder": "03-1234-5678"
          },
          {
            "name": "message",
            "label": "ご相談内容",
            "type": "textarea",
            "required": true,
            "placeholder": "ご相談内容をお書きください"
          }
        ],
        "privacyPolicyLink": "/privacy",
        "submitButtonText": "送信する",
        "note": "※ 1営業日以内にご返信いたします"
      },
      "thankYou": {
        "heading": "お問い合わせを受け付けました",
        "description": "ご入力いただいたメールアドレスに確認メールをお送りしました。\n1営業日以内に担当者よりご連絡いたします。",
        "backLink": {
          "text": "TOPページへ戻る",
          "href": "/"
        }
      }
    },
    "privacy": {
      "header": {
        "title": "プライバシーポリシー",
        "lastUpdated": "2024年1月1日"
      },
      "content": "## 1. 個人情報の定義\n\n本ポリシーにおいて「個人情報」とは、個人情報保護法に定める個人情報を指し、生存する個人に関する情報であって、当該情報に含まれる氏名、メールアドレス、電話番号その他の記述等により特定の個人を識別できるもの（他の情報と容易に照合することで特定の個人を識別できるものを含む）を指します。\n\n## 2. 個人情報の収集\n\n当社は、以下の方法で個人情報を収集することがあります。\n\n・お問い合わせフォームからのご連絡\n・メールでのお問い合わせ\n・お電話でのお問い合わせ\n\n## 3. 個人情報の利用目的\n\n当社は、収集した個人情報を以下の目的で利用します。\n\n・お問い合わせへの回答\n・サービスに関するご案内\n・サービスの改善・開発\n・その他、上記利用目的に付随する目的\n\n## 4. 個人情報の第三者提供\n\n当社は、以下の場合を除き、お客様の個人情報を第三者に提供しません。\n\n・お客様の同意がある場合\n・法令に基づく場合\n・人の生命、身体または財産の保護のために必要がある場合であって、お客様の同意を得ることが困難な場合\n\n## 5. 個人情報の管理\n\n当社は、お客様の個人情報を正確かつ最新の状態に保ち、個人情報への不正アクセス、紛失、破損、改ざん、漏洩などを防止するため、セキュリティシステムの維持、管理体制の整備等、必要な措置を講じます。\n\n## 6. 個人情報の開示・訂正・削除\n\nお客様は、当社が保有するご自身の個人情報について、開示、訂正、削除を求めることができます。ご希望の場合は、下記のお問い合わせ先までご連絡ください。\n\n## 7. Cookieの使用\n\n当社のウェブサイトでは、サービス向上のためにCookieを使用しています。Cookieとは、ウェブサイトがお客様のコンピュータに保存する小さなデータファイルです。お客様はブラウザの設定により、Cookieの受け取りを拒否することができますが、その場合、一部のサービスが利用できなくなる可能性があります。\n\n## 8. 本ポリシーの変更\n\n当社は、必要に応じて本ポリシーを変更することがあります。変更後のポリシーは、当ウェブサイトに掲載した時点から効力を生じます。\n\n## 9. お問い合わせ先\n\n本ポリシーに関するお問い合わせは、下記までご連絡ください。"
    }
  }
}
```

---

## フィールド詳細説明

### meta

| フィールド | 型 | 必須 | 説明 |
|-----------|---|------|------|
| siteName | string | ◯ | サイト名（タイトルタグに使用） |
| siteUrl | string | ◯ | サイトURL（OGP用） |
| description | string | ◯ | サイト説明（meta description） |
| ogImage | string | ◯ | OGP画像パス |
| favicon | string | ◯ | ファビコンパス |
| gtmId | string | - | Google Tag Manager ID |

### company

| フィールド | 型 | 必須 | 説明 |
|-----------|---|------|------|
| name | string | ◯ | 会社名 |
| nameEn | string | - | 会社名（英語） |
| postalCode | string | ◯ | 郵便番号 |
| address | string | ◯ | 住所 |
| phone | string | ◯ | 電話番号 |
| email | string | ◯ | メールアドレス |
| establishedYear | number | - | 設立年 |
| capital | string | - | 資本金 |
| employees | string | - | 従業員数 |
| ceo | string | - | 代表者名 |
| description | string | - | 会社説明 |

### navigation

| フィールド | 型 | 必須 | 説明 |
|-----------|---|------|------|
| main | array | ◯ | メインナビゲーション項目 |
| cta | object | ◯ | CTAボタン（お問い合わせ） |
| footer | array | ◯ | フッターナビゲーション |

### theme.colors

| フィールド | 型 | 必須 | 説明 |
|-----------|---|------|------|
| primary | string | ◯ | メインカラー（ダークネイビー） |
| accent | string | ◯ | アクセントカラー（CTAボタン） |
| background | string | ◯ | 背景色（白） |
| backgroundAlt | string | ◯ | 背景色（オフホワイト） |
| text | string | ◯ | テキスト色 |
| textLight | string | ◯ | サブテキスト色 |

### pages.top

| フィールド | 型 | 必須 | 説明 |
|-----------|---|------|------|
| hero | object | ◯ | ヒーローセクション |
| hero.catchCopy | string | ◯ | キャッチコピー |
| hero.subCopy | string | ◯ | サブコピー |
| problem | object | ◯ | 課題セクション |
| problem.heading | string | ◯ | 見出し |
| problem.items | array | ◯ | 課題項目（3つ推奨） |
| solution | object | ◯ | 解決策セクション |
| results | object | ◯ | 実績セクション |
| cta | object | ◯ | CTAセクション |

### pages.service

| フィールド | 型 | 必須 | 説明 |
|-----------|---|------|------|
| header | object | ◯ | ページヘッダー |
| overview | object | ◯ | サービス概要 |
| overview.categories | array | ◯ | サービスカテゴリ（3つ推奨） |
| whyChooseUs | object | ◯ | 選ばれる理由 |
| whyChooseUs.reasons | array | ◯ | 理由項目（3つ推奨） |
| process | object | ◯ | プロセス |
| process.steps | array | ◯ | ステップ項目（5つ推奨） |
| cta | object | ◯ | CTAセクション |

### pages.case

| フィールド | 型 | 必須 | 説明 |
|-----------|---|------|------|
| header | object | ◯ | ページヘッダー |
| cases | array | ◯ | 事例リスト（3つ推奨） |
| cases[].id | string | ◯ | 事例ID（ユニーク） |
| cases[].industry | string | ◯ | 業種 |
| cases[].title | string | ◯ | 事例タイトル |
| cases[].problemSummary | string | ◯ | 課題サマリー |
| cases[].background | string | ◯ | 背景 |
| cases[].problem | string | ◯ | 課題詳細 |
| cases[].solution | string | ◯ | 解決策 |
| cases[].result | object | ◯ | 成果 |
| cta | object | ◯ | CTAセクション |

### pages.contact

| フィールド | 型 | 必須 | 説明 |
|-----------|---|------|------|
| header | object | ◯ | ページヘッダー |
| form | object | ◯ | フォーム設定 |
| form.fields | array | ◯ | フィールド定義 |
| form.privacyPolicyLink | string | ◯ | プライバシーポリシーURL |
| form.submitButtonText | string | ◯ | 送信ボタンテキスト |
| thankYou | object | ◯ | 送信完了画面 |

### pages.privacy

| フィールド | 型 | 必須 | 説明 |
|-----------|---|------|------|
| header | object | ◯ | ページヘッダー |
| header.lastUpdated | string | ◯ | 最終更新日 |
| content | string | ◯ | ポリシー本文（Markdown） |

---

## globals.css @theme 設定

```css
@theme {
  /* ブランドカラー */
  --color-primary: #1a1a2e;
  --color-accent: #c45c3e;

  /* 背景色 */
  --color-background: #FFFFFF;
  --color-background-alt: #f8f8f8;

  /* テキスト色 */
  --color-text: #1a1a2e;
  --color-text-light: #6b7280;

  /* フォント */
  --font-family-base: "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;

  /* フォントサイズ */
  --font-size-h1: 72px;
  --font-size-h2: 48px;
  --font-size-h3: 28px;
  --font-size-body: 17px;
  --font-size-caption: 14px;

  /* 余白 */
  --spacing-section-sm: 80px;
  --spacing-section-md: 120px;
  --spacing-section-lg: 160px;
  --spacing-section-xl: 200px;

  /* アニメーション */
  --duration-default: 0.6s;
  --duration-fast: 0.2s;
  --ease-default: ease-out;
}
```

---

## TypeScript 型定義

```typescript
// src/types/site.ts

export interface SiteData {
  meta: Meta;
  company: Company;
  navigation: Navigation;
  theme: Theme;
  pages: Pages;
}

export interface Meta {
  siteName: string;
  siteUrl: string;
  description: string;
  ogImage: string;
  favicon: string;
  gtmId?: string;
}

export interface Company {
  name: string;
  nameEn?: string;
  postalCode: string;
  address: string;
  phone: string;
  email: string;
  establishedYear?: number;
  capital?: string;
  employees?: string;
  ceo?: string;
  description?: string;
}

export interface Navigation {
  main: NavItem[];
  cta: NavItem;
  footer: NavItem[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Theme {
  colors: ThemeColors;
  fonts: ThemeFonts;
}

export interface ThemeColors {
  primary: string;
  accent: string;
  background: string;
  backgroundAlt: string;
  text: string;
  textLight: string;
}

export interface ThemeFonts {
  heading: string;
  body: string;
}

export interface Pages {
  top: TopPage;
  service: ServicePage;
  case: CasePage;
  contact: ContactPage;
  privacy: PrivacyPage;
}

// 各ページの型定義は省略（上記JSONの構造に準拠）
```

---

## データ読み込み方法

```typescript
// src/lib/site.ts

import siteData from '@/data/site.json';
import type { SiteData } from '@/types/site';

export function getSiteData(): SiteData {
  return siteData as SiteData;
}

export function getPageData<K extends keyof SiteData['pages']>(
  page: K
): SiteData['pages'][K] {
  return siteData.pages[page] as SiteData['pages'][K];
}

// 使用例
// const topPageData = getPageData('top');
// const heroData = topPageData.hero;
```

---

## 実装チェックリスト

- [ ] site.json が上記構造で作成されているか
- [ ] 全ての必須フィールドが入力されているか
- [ ] globals.css の @theme が設定されているか
- [ ] TypeScript 型定義が作成されているか
- [ ] 各ページから正しくデータを読み込めるか
