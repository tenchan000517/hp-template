import Image from 'next/image';
import Link from 'next/link';
import { pages } from '@/lib/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '代表メッセージ | Philosophy',
  description: '代表者の考え方と価値観をお伝えします。本質を、かたちに。',
};

export default function PhilosophyPage() {
  const { philosophy } = pages;

  return (
    <>
      {/* セクション1: ページタイトル */}
      <section className="pt-[50vh] min-h-[70vh] lg:pt-[55vh] pb-20 lg:pb-[120px]">
        <div className="container-content">
          <span className="block font-serif-en text-[12px] lg:text-[14px] tracking-[0.2em] text-light">
            {philosophy.title.en}
          </span>
          <h1 className="mt-4 font-mincho text-[32px] lg:text-[48px] tracking-[0.1em] text-main">
            {philosophy.title.ja}
          </h1>
        </div>
      </section>

      {/* セクション2: 代表者ポートレート */}
      <section className="pb-20 lg:pb-[160px]">
        <div className="px-6 lg:px-0 lg:flex lg:justify-end lg:pr-[5%]">
          <div className="w-full max-w-[300px] mx-auto lg:mx-0 lg:max-w-none lg:w-[45%] lg:max-w-[600px]">
            <div className="relative aspect-[3/4] bg-gray">
              {/* 実際の写真がある場合は Image コンポーネントを使用 */}
              <div className="absolute inset-0 flex items-center justify-center text-light text-sm">
                Portrait Photo
              </div>
            </div>
            <p className="mt-2 text-caption text-center lg:text-left">
              {philosophy.portrait.caption}
            </p>
          </div>
        </div>
      </section>

      {/* セクション3: 代表メッセージ本文 */}
      <section className="bg-gray section-normal">
        <div className="container-content">
          {/* PC: 縦書き見出し + 横書き本文 */}
          <div className="lg:flex lg:gap-12">
            {/* 縦書き見出し - PC のみ */}
            <div className="hidden lg:block lg:flex-shrink-0 lg:w-[80px]">
              <h2 className="vertical-text font-mincho text-[36px] tracking-[0.1em] text-main leading-[1.4]">
                {philosophy.message.heading}
              </h2>
            </div>

            {/* SP: 横書き見出し */}
            <h2 className="lg:hidden font-mincho text-[24px] tracking-[0.1em] text-main mb-10">
              {philosophy.message.heading}
            </h2>

            {/* 本文 */}
            <div className="lg:flex-1 lg:max-w-[680px]">
              <div className="text-body whitespace-pre-line leading-[2.0]">
                {philosophy.message.body}
              </div>

              {/* 署名 */}
              <div className="mt-12 text-right">
                <p className="text-[14px] text-sub">
                  {philosophy.message.signature.title}
                </p>
                <p className="mt-1 font-mincho text-[16px] text-main">
                  {philosophy.message.signature.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* セクション4: プロフィール */}
      <section className="section-normal">
        <div className="flex flex-col items-center text-center px-6">
          {/* セクションタイトル */}
          <span className="block font-serif-en text-[12px] lg:text-[14px] tracking-[0.2em] text-light">
            Profile
          </span>
          <h2 className="mt-2 font-mincho text-[20px] lg:text-[24px] tracking-[0.1em] text-main">
            プロフィール
          </h2>

          {/* 氏名 */}
          <p className="mt-12 text-[18px] lg:text-[20px] font-medium text-main">
            {philosophy.profile.nameJa} / {philosophy.profile.nameEn}
          </p>

          {/* 経歴リスト */}
          <div className="mt-8">
            {philosophy.profile.items.map((item, index) => (
              <p
                key={index}
                className="text-[14px] lg:text-[15px] text-body-color leading-[2.2]"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* セクション5: 次への導線 */}
      <section className="bg-gray section-small">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:justify-center lg:gap-32 px-6">
          {/* 事例へ */}
          <Link href="/case" className="group text-center">
            <span className="block font-serif-en text-[12px] lg:text-[14px] tracking-[0.2em] text-light">
              Case Studies
            </span>
            <span className="mt-2 block text-[16px] lg:text-[18px] font-medium text-main group-hover:underline underline-offset-4">
              事例を見る →
            </span>
          </Link>

          {/* サービスへ */}
          <Link href="/service" className="group text-center">
            <span className="block font-serif-en text-[12px] lg:text-[14px] tracking-[0.2em] text-light">
              Services
            </span>
            <span className="mt-2 block text-[16px] lg:text-[18px] font-medium text-main group-hover:underline underline-offset-4">
              サービスを見る →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
