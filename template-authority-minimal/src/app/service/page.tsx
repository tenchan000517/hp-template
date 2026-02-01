import Link from 'next/link';
import { pages } from '@/lib/site';
import FadeInSection from '@/components/animation/FadeInSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'サービス | Services',
  description: '戦略設計、デザイン、ブランディング。本質的な課題に向き合い、持続的な価値を生み出します。',
};

export default function ServicePage() {
  const { service } = pages;

  return (
    <>
      {/* セクション1: ページタイトル */}
      <section className="pt-[50vh] min-h-[70vh] lg:pt-[55vh] pb-20 lg:pb-[120px]">
        <div className="container-content">
          <span className="block font-serif-en text-[12px] lg:text-[14px] tracking-[0.2em] text-light">
            {service.title.en}
          </span>
          <h1 className="mt-4 font-mincho text-[32px] lg:text-[48px] tracking-[0.1em] text-main">
            {service.title.ja}
          </h1>
          <p className="mt-12 font-mincho text-[18px] lg:text-[24px] leading-[1.8] text-body-color whitespace-pre-line max-w-[480px]">
            {service.lead}
          </p>
        </div>
      </section>

      {/* セクション2: 私たちの哲学 */}
      <section className="section-normal">
        <FadeInSection className="flex flex-col items-center text-center px-6">
          <p className="font-mincho text-[17px] lg:text-[20px] leading-[2.2] text-body-color whitespace-pre-line max-w-[520px]">
            {service.philosophy.text}
          </p>
        </FadeInSection>
      </section>

      {/* セクション3: サービス詳細 */}
      <section className="bg-gray section-large">
        <div className="container-content">
          <div className="space-y-20 lg:space-y-32">
            {service.services.map((item, index) => (
              <FadeInSection
                key={item.numberEn}
                className={`lg:flex lg:gap-16 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* 番号とタイトル */}
                <div className="lg:w-1/3 mb-8 lg:mb-0">
                  <span className="block font-serif-en text-[12px] lg:text-[14px] tracking-[0.15em] text-lighter">
                    {item.numberEn}
                  </span>
                  <span className="block mt-1 font-serif-en text-[12px] lg:text-[14px] tracking-[0.15em] text-light">
                    {item.titleEn}
                  </span>
                  <h2 className="mt-4 font-mincho text-[24px] lg:text-[28px] tracking-[0.08em] text-main">
                    {item.titleJa}
                  </h2>
                </div>

                {/* 説明と詳細 */}
                <div className="lg:w-2/3">
                  <p className="text-body leading-[1.9] whitespace-pre-line">
                    {item.description}
                  </p>
                  <ul className="mt-8 space-y-2">
                    {item.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className="text-[14px] lg:text-[15px] text-sub before:content-['—'] before:mr-3 before:text-lighter"
                      >
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* セクション4: 進め方 */}
      <section className="section-normal">
        <div className="container-content">
          {/* セクションタイトル */}
          <FadeInSection className="mb-16 lg:mb-20">
            <span className="block font-serif-en text-[12px] lg:text-[14px] tracking-[0.2em] text-light">
              Process
            </span>
            <h2 className="mt-2 font-mincho text-[24px] lg:text-[28px] tracking-[0.08em] text-main">
              進め方
            </h2>
          </FadeInSection>

          {/* プロセスステップ */}
          <div className="space-y-12 lg:space-y-16 max-w-[680px]">
            {service.process.map((step, index) => (
              <FadeInSection key={step.numberEn} delay={index * 100} className="flex gap-6 lg:gap-10">
                <span className="flex-shrink-0 font-serif-en text-[14px] tracking-[0.15em] text-lighter">
                  {step.numberEn}
                </span>
                <div>
                  <h3 className="text-[18px] font-medium text-main">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[15px] text-sub leading-[1.8] whitespace-pre-line">
                    {step.description}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* セクション5: CTA */}
      <section className="bg-gray section-small">
        <FadeInSection className="flex flex-col items-center text-center px-6">
          <p className="text-[16px] lg:text-[18px] text-body-color">
            {service.cta.text}
          </p>
          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:gap-8">
            {service.cta.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-link text-link-arrow"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </FadeInSection>
      </section>
    </>
  );
}
