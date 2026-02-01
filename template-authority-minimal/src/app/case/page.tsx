import Link from 'next/link';
import { cases } from '@/lib/site';
import FadeInSection from '@/components/animation/FadeInSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '事例 | Case Studies',
  description: 'これまでに手掛けたプロジェクトの事例をご紹介します。',
};

export default function CasePage() {
  // featuredを先に、その後orderでソート
  const sortedCases = [...cases].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return a.order - b.order;
  });

  const featuredCase = sortedCases.find((c) => c.featured);
  const otherCases = sortedCases.filter((c) => c !== featuredCase);

  return (
    <>
      {/* セクション1: ページタイトル */}
      <section className="pt-[50vh] min-h-[60vh] lg:pt-[55vh] pb-16 lg:pb-20">
        <div className="container-content">
          <span className="block font-serif-en text-[12px] lg:text-[14px] tracking-[0.2em] text-light">
            Case Studies
          </span>
          <h1 className="mt-4 font-mincho text-[32px] lg:text-[48px] tracking-[0.1em] text-main">
            事例
          </h1>
        </div>
      </section>

      {/* セクション2: メイン事例 */}
      {featuredCase && (
        <section className="section-normal">
          <FadeInSection className="container-content">
            <Link href={`/case/${featuredCase.slug}`} className="group block">
              <div className="relative aspect-[16/9] bg-gray overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-light text-sm">
                  Main Case Image
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </div>
              <div className="mt-6">
                <p className="text-[13px] text-light">
                  {featuredCase.client} / {featuredCase.scope.join('、')}
                </p>
                <h2 className="mt-2 font-mincho text-[20px] lg:text-[24px] text-main group-hover:text-sub transition-colors">
                  {featuredCase.title}
                </h2>
              </div>
            </Link>
          </FadeInSection>
        </section>
      )}

      {/* セクション3: その他の事例 */}
      {otherCases.length > 0 && (
        <section className="bg-gray section-normal">
          <div className="container-content">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {otherCases.map((caseItem, index) => (
                <FadeInSection
                  key={caseItem.slug}
                  delay={index * 100}
                >
                  <Link
                    href={`/case/${caseItem.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/3] bg-white overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-light text-sm">
                        Case Image
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                    </div>
                    <div className="mt-5">
                      <p className="text-[12px] text-light">
                        {caseItem.client} / {caseItem.scope.join('、')}
                      </p>
                      <h3 className="mt-2 font-mincho text-[18px] lg:text-[20px] text-main group-hover:text-sub transition-colors">
                        {caseItem.title}
                      </h3>
                    </div>
                  </Link>
                </FadeInSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* セクション4: CTA */}
      <section className="section-normal">
        <FadeInSection className="flex flex-col items-center text-center px-6">
          <p className="text-[16px] lg:text-[18px] text-body-color">
            プロジェクトについてお聞かせください。
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center px-12 py-4 border border-main text-main font-serif-en text-[14px] tracking-[0.1em] hover:bg-main hover:text-white transition-colors duration-200"
          >
            Contact
          </Link>
        </FadeInSection>
      </section>
    </>
  );
}
