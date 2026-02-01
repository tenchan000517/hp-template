import siteData from '@data/site.json';

// === 型定義 ===

export interface NavItem {
  label: string;
  href: string;
}

export interface Meta {
  siteName: string;
  siteNameEn?: string;
  tagline: string;
  taglineEn?: string;
  description: string;
  siteUrl: string;
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

export interface Navigation {
  header: NavItem[];
  footer: NavItem[];
}

export interface PageTitle {
  en: string;
  ja: string;
}

export interface TopPage {
  catchphrase: {
    main: string;
    sub: string;
  };
  philosophyTeaser: {
    quote: string;
    linkText: string;
    linkHref: string;
  };
  services: {
    numberEn: string;
    titleEn: string;
    titleJa: string;
  }[];
  cta: {
    text: string;
    buttonText: string;
    buttonHref: string;
  };
}

export interface PhilosophyPage {
  title: PageTitle;
  portrait: {
    image: string;
    caption: string;
  };
  message: {
    heading: string;
    body: string;
    signature: {
      title: string;
      name: string;
    };
  };
  profile: {
    nameJa: string;
    nameEn: string;
    items: string[];
  };
}

export interface ServiceItem {
  numberEn: string;
  titleEn: string;
  titleJa: string;
  description: string;
  details: string[];
}

export interface ProcessStep {
  numberEn: string;
  title: string;
  description: string;
}

export interface ServicePage {
  title: PageTitle;
  lead: string;
  philosophy: {
    text: string;
  };
  services: ServiceItem[];
  process: ProcessStep[];
  cta: {
    text: string;
    links: { text: string; href: string }[];
  };
}

export interface TeamMember {
  id: string;
  nameJa: string;
  nameEn: string;
  title: string;
  image: string;
  isRepresentative: boolean;
}

export interface TeamPage {
  title: PageTitle;
  lead: string;
  members: TeamMember[];
}

export interface AboutPage {
  title: PageTitle;
  showHistory: boolean;
  showAccess: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface ContactPage {
  title: PageTitle;
  lead: string;
  responseTime: string;
  inquiryTypes: SelectOption[];
  budgetOptions: SelectOption[];
  timelineOptions: SelectOption[];
  thanks: {
    title: PageTitle;
    message: string;
    backLink: {
      text: string;
      href: string;
    };
  };
}

export interface PrivacySection {
  title: string;
  content: string;
}

export interface PrivacyPage {
  title: PageTitle;
  preamble: string;
  sections: PrivacySection[];
  enactedDate: string;
  revisedDate: string;
  contact: {
    manager: string;
    email: string;
  };
}

export interface Pages {
  top: TopPage;
  philosophy: PhilosophyPage;
  service: ServicePage;
  team: TeamPage;
  about: AboutPage;
  contact: ContactPage;
  privacy: PrivacyPage;
}

export interface CaseApproach {
  numberEn: string;
  title: string;
  description: string;
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
  approach: CaseApproach[];
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

export interface SiteData {
  meta: Meta;
  company: Company;
  navigation: Navigation;
  pages: Pages;
  cases: Case[];
  columns: Column[];
}

// サイトデータをエクスポート
export const site: SiteData = siteData as SiteData;

// よく使うデータへのショートカット
export const meta = site.meta;
export const company = site.company;
export const navigation = site.navigation;
export const pages = site.pages;
export const cases = site.cases;
export const columns = site.columns;

// ヘルパー関数
export function getCaseBySlug(slug: string): Case | undefined {
  return cases.find((c) => c.slug === slug);
}

export function getColumnBySlug(slug: string): Column | undefined {
  return columns.find((c) => c.slug === slug);
}

export function getFeaturedCases(): Case[] {
  return cases.filter((c) => c.featured).sort((a, b) => a.order - b.order);
}

export function getFeaturedColumns(): Column[] {
  return columns.filter((c) => c.featured);
}

export function getRelatedColumns(currentSlug: string): Column[] {
  const current = getColumnBySlug(currentSlug);
  if (!current || !current.relatedSlugs) return [];
  return current.relatedSlugs
    .map((slug) => getColumnBySlug(slug))
    .filter((c): c is Column => c !== undefined);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}
