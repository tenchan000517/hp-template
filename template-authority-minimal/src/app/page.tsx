import Link from 'next/link';
import { pages, meta, navigation } from '@/lib/site';
import FadeInSection from '@/components/animation/FadeInSection';

export default function Home() {
  const { top } = pages;

  return (
    <>
      {/* セクション1: ファーストビュー */}
      <section className="relative min-h-screen flex items-start pt-[40vh] lg:pt-[35vh]">
        <div className="container-content w-full">
          {/* メインキャッチコピー */}
          <h1 className="font-mincho text-[36px] lg:text-[72px] leading-[1.6] tracking-[0.15em] text-main whitespace-pre-line">
            {top.catchphrase.main}
          </h1>
        </div>

        {/* 英語タグライン - 右下配置 */}
        <div className="absolute right-[5%] lg:right-[10%] bottom-[15%]">
          <p className="font-serif-en text-[12px] lg:text-[14px] tracking-[0.2em] text-light text-right">
            {top.catchphrase.sub}
          </p>
        </div>

        {/* スクロールインジケーター - PC のみ */}
        <div className="hidden lg:block absolute bottom-[5%] left-1/2 -translate-x-1/2">
          <div className="w-px h-10 bg-[#CCCCCC]" />
        </div>
      </section>

      {/* セクション2: 理念の導入 */}
      <section className="section-large">
        <FadeInSection className="flex flex-col items-center text-center px-6">
          <blockquote className="font-mincho text-[18px] lg:text-[24px] leading-[2.0] tracking-[0.05em] text-body-color max-w-[600px]">
            {top.philosophyTeaser.quote}
          </blockquote>

          <Link
            href={top.philosophyTeaser.linkHref}
            className="mt-12 text-link text-link-arrow"
          >
            {top.philosophyTeaser.linkText}
          </Link>
        </FadeInSection>
      </section>

      {/* セクション3: 事業の暗示 */}
      <section className="bg-gray section-normal">
        <div className="container-content">
          {/* PC: 斜め配置、SP: 縦積み */}
          <div className="flex flex-col gap-12 lg:gap-0 lg:relative lg:min-h-[500px]">
            {top.services.map((service, index) => {
              // PC での位置計算（左からの%、上からの%）
              const positions = [
                { left: '0%', top: '0%' },
                { left: '35%', top: '35%' },
                { left: '60%', top: '65%' },
              ];
              const pos = positions[index] || positions[0];

              return (
                <FadeInSection
                  key={service.numberEn}
                  className="lg:absolute"
                  delay={index * 150}
                  style={{
                    left: pos.left,
                    top: pos.top,
                  }}
                >
                  <span className="block font-serif-en text-[12px] lg:text-[14px] tracking-[0.15em] text-light">
                    {service.titleEn}
                  </span>
                  <span className="block mt-2 text-[18px] lg:text-[20px] font-medium text-main">
                    {service.titleJa}
                  </span>
                </FadeInSection>
              );
            })}
          </div>

          {/* サービス詳細リンク */}
          <FadeInSection className="mt-20 lg:mt-32 text-center lg:text-left" delay={450}>
            <Link
              href="/service"
              className="text-link text-link-arrow"
            >
              サービス詳細
            </Link>
          </FadeInSection>
        </div>
      </section>

      {/* セクション4: お問い合わせ導線 */}
      <section className="section-large">
        <FadeInSection className="flex flex-col items-center text-center px-6">
          <p className="font-mincho text-[22px] lg:text-[28px] leading-[1.6] text-body-color whitespace-pre-line">
            {top.cta.text}
          </p>

          <Link
            href={top.cta.buttonHref}
            className="mt-12 inline-flex items-center justify-center px-12 py-4 border border-main text-main font-serif-en text-[14px] tracking-[0.1em] hover:bg-main hover:text-white transition-colors duration-200"
          >
            {top.cta.buttonText}
          </Link>
        </FadeInSection>
      </section>
    </>
  );
}
