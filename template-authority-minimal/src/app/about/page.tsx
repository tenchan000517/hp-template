import { pages, company } from '@/lib/site';
import FadeInSection from '@/components/animation/FadeInSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '会社概要 | About',
  description: `${company.name}の会社概要。所在地、事業内容、沿革をご紹介します。`,
};

export default function AboutPage() {
  const { about } = pages;

  // 会社情報の行データ
  const companyInfo = [
    { label: '会社名', value: company.name },
    { label: '代表者', value: `${company.representative.title} ${company.representative.name}` },
    { label: '設立', value: company.established },
    { label: '所在地', value: company.address.full },
    { label: '事業内容', value: company.business.join('、') },
    ...(company.capital ? [{ label: '資本金', value: company.capital }] : []),
    ...(company.employees ? [{ label: '従業員数', value: company.employees }] : []),
    { label: 'TEL', value: company.contact.phone || '-' },
    { label: 'Email', value: company.contact.email },
  ];

  return (
    <>
      {/* セクション1: ページタイトル */}
      <section className="pt-[50vh] min-h-[70vh] lg:pt-[55vh] pb-20 lg:pb-[120px]">
        <div className="container-content">
          <span className="block font-serif-en text-[12px] lg:text-[14px] tracking-[0.2em] text-light">
            {about.title.en}
          </span>
          <h1 className="mt-4 font-mincho text-[32px] lg:text-[48px] tracking-[0.1em] text-main">
            {about.title.ja}
          </h1>
        </div>
      </section>

      {/* セクション2: 会社情報 */}
      <section className="section-normal">
        <FadeInSection className="container-content max-w-[800px]">
          <div className="border-t border-border">
            {companyInfo.map((item, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row py-5 border-b border-border"
              >
                <dt className="flex-shrink-0 lg:w-[140px] text-[14px] text-light mb-2 lg:mb-0">
                  {item.label}
                </dt>
                <dd className="text-[15px] text-body-color">
                  {item.value}
                </dd>
              </div>
            ))}
          </div>
        </FadeInSection>
      </section>

      {/* セクション3: 沿革（showHistory が true の場合のみ） */}
      {about.showHistory && company.history && company.history.length > 0 && (
        <section className="bg-gray section-normal">
          <FadeInSection className="container-content max-w-[800px]">
            {/* セクションタイトル */}
            <div className="mb-12 lg:mb-16">
              <span className="block font-serif-en text-[12px] lg:text-[14px] tracking-[0.2em] text-light">
                History
              </span>
              <h2 className="mt-2 font-mincho text-[24px] lg:text-[28px] tracking-[0.08em] text-main">
                沿革
              </h2>
            </div>

            {/* 沿革リスト */}
            <div className="space-y-6">
              {company.history.map((item, index) => (
                <div key={index} className="flex gap-6 lg:gap-10">
                  <span className="flex-shrink-0 w-[60px] font-serif-en text-[14px] tracking-[0.05em] text-light">
                    {item.year}
                  </span>
                  <p className="text-[15px] text-body-color leading-[1.8]">
                    {item.event}
                  </p>
                </div>
              ))}
            </div>
          </FadeInSection>
        </section>
      )}

      {/* セクション4: アクセス（showAccess が true の場合のみ） */}
      {about.showAccess && company.access && (
        <section className="section-normal">
          <FadeInSection className="container-content max-w-[800px]">
            {/* セクションタイトル */}
            <div className="mb-12 lg:mb-16">
              <span className="block font-serif-en text-[12px] lg:text-[14px] tracking-[0.2em] text-light">
                Access
              </span>
              <h2 className="mt-2 font-mincho text-[24px] lg:text-[28px] tracking-[0.08em] text-main">
                アクセス
              </h2>
            </div>

            {/* アクセス情報 */}
            <div className="space-y-4">
              <p className="text-[15px] text-body-color">
                〒{company.address.postalCode}
              </p>
              <p className="text-[15px] text-body-color">
                {company.address.full}
              </p>
              <p className="text-[14px] text-sub">
                {company.access.station}より徒歩{company.access.walkMinutes}分
              </p>
            </div>

            {/* 地図プレースホルダー */}
            <div className="mt-10">
              <div className="relative aspect-[16/9] bg-gray flex items-center justify-center">
                <span className="text-light text-sm">Map</span>
              </div>
            </div>
          </FadeInSection>
        </section>
      )}
    </>
  );
}
