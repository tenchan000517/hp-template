import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cases, getCaseBySlug } from '@/lib/site';
import FadeInSection from '@/components/animation/FadeInSection';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return cases.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseData = getCaseBySlug(slug);
  if (!caseData) return { title: '事例が見つかりません' };

  return {
    title: `${caseData.title} | Case Study`,
    description: caseData.lead,
  };
}

export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const caseData = getCaseBySlug(slug);

  if (!caseData) {
    notFound();
  }

  return (
    <>
      {/* セクション1: ページタイトル */}
      <section className="pt-[50vh] min-h-[60vh] lg:pt-[55vh] pb-16 lg:pb-20">
        <div className="container-content">
          <p className="text-[13px] text-light">
            {caseData.client} / {caseData.scope.join('、')} / {caseData.year}
          </p>
          <h1 className="mt-4 font-mincho text-[28px] lg:text-[40px] tracking-[0.08em] text-main leading-[1.5]">
            {caseData.title}
          </h1>
          <p className="mt-8 text-body leading-[1.9] max-w-[680px]">
            {caseData.lead}
          </p>
        </div>
      </section>

      {/* セクション2: メイン画像 */}
      <section className="pb-16 lg:pb-20">
        <FadeInSection className="container-content">
          <div className="relative aspect-[16/9] bg-gray">
            <div className="absolute inset-0 flex items-center justify-center text-light text-sm">
              Main Image
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* セクション3: 課題 */}
      <section className="section-normal bg-gray">
        <FadeInSection className="container-content max-w-[800px]">
          <div className="mb-10">
            <span className="block font-serif-en text-[12px] lg:text-[14px] tracking-[0.2em] text-light">
              Challenge
            </span>
            <h2 className="mt-2 font-mincho text-[24px] lg:text-[28px] tracking-[0.08em] text-main">
              課題
            </h2>
          </div>
          <p className="text-body leading-[1.9] whitespace-pre-line">
            {caseData.challenge}
          </p>
        </FadeInSection>
      </section>

      {/* セクション4: アプローチ */}
      <section className="section-normal">
        <div className="container-content max-w-[800px]">
          <FadeInSection className="mb-12 lg:mb-16">
            <span className="block font-serif-en text-[12px] lg:text-[14px] tracking-[0.2em] text-light">
              Approach
            </span>
            <h2 className="mt-2 font-mincho text-[24px] lg:text-[28px] tracking-[0.08em] text-main">
              アプローチ
            </h2>
          </FadeInSection>

          <div className="space-y-12 lg:space-y-16">
            {caseData.approach.map((step, index) => (
              <FadeInSection key={step.numberEn} delay={index * 100} className="flex gap-6 lg:gap-10">
                <span className="flex-shrink-0 font-serif-en text-[14px] tracking-[0.15em] text-lighter">
                  {step.numberEn}
                </span>
                <div>
                  <h3 className="text-[18px] font-medium text-main">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-[15px] text-sub leading-[1.8]">
                    {step.description}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* セクション5: 結果画像（ある場合） */}
      {caseData.images.length > 0 && (
        <section className="pb-16 lg:pb-20">
          <div className="container-content">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {caseData.images.map((_, index) => (
                <div key={index} className="relative aspect-[4/3] bg-gray">
                  <div className="absolute inset-0 flex items-center justify-center text-light text-sm">
                    Result Image {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* セクション6: 成果 */}
      <section className="section-normal bg-gray">
        <FadeInSection className="container-content max-w-[800px]">
          <div className="mb-10">
            <span className="block font-serif-en text-[12px] lg:text-[14px] tracking-[0.2em] text-light">
              Result
            </span>
            <h2 className="mt-2 font-mincho text-[24px] lg:text-[28px] tracking-[0.08em] text-main">
              成果
            </h2>
          </div>

          <p className="text-body leading-[1.9]">
            {caseData.result}
          </p>

          {/* 成果指標 */}
          {caseData.resultMetrics && caseData.resultMetrics.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-10 lg:gap-16">
              {caseData.resultMetrics.map((metric, index) => (
                <div key={index}>
                  <p className="font-serif-en text-[36px] lg:text-[48px] text-main tracking-[0.02em]">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-[14px] text-sub">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </FadeInSection>
      </section>

      {/* セクション7: クライアントの声（ある場合） */}
      {caseData.testimonial && (
        <section className="section-normal">
          <div className="container-content max-w-[800px]">
            <div className="mb-10">
              <span className="block font-serif-en text-[12px] lg:text-[14px] tracking-[0.2em] text-light">
                Client Voice
              </span>
              <h2 className="mt-2 font-mincho text-[24px] lg:text-[28px] tracking-[0.08em] text-main">
                クライアントの声
              </h2>
            </div>

            <blockquote className="font-mincho text-[18px] lg:text-[20px] leading-[2.0] text-body-color">
              {caseData.testimonial.quote}
            </blockquote>
            <p className="mt-6 text-[14px] text-sub text-right">
              {caseData.testimonial.author}
            </p>
          </div>
        </section>
      )}

      {/* セクション8: ナビゲーション */}
      <section className="bg-gray section-small">
        <div className="container-content">
          <div className="flex justify-between items-center">
            <Link href="/case" className="text-link">
              ← 事例一覧
            </Link>
            <Link href="/contact" className="text-link text-link-arrow">
              お問い合わせ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
