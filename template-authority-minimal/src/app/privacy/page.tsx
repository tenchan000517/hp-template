import { pages, company } from '@/lib/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | Privacy Policy',
  description: `${company.name}の個人情報保護方針をご確認いただけます。`,
};

export default function PrivacyPage() {
  const { privacy } = pages;

  return (
    <>
      {/* セクション1: ページタイトル */}
      <section className="pt-[50vh] min-h-[60vh] lg:pt-[55vh] pb-16 lg:pb-20">
        <div className="container-content">
          <span className="block font-serif-en text-[12px] lg:text-[14px] tracking-[0.2em] text-light">
            {privacy.title.en}
          </span>
          <h1 className="mt-4 font-mincho text-[28px] lg:text-[40px] tracking-[0.1em] text-main">
            {privacy.title.ja}
          </h1>
        </div>
      </section>

      {/* セクション2: 本文 */}
      <section className="section-normal">
        <div className="container-content max-w-[800px]">
          {/* 前文 */}
          <p className="text-body leading-[1.9]">
            {privacy.preamble}
          </p>

          {/* 各セクション */}
          <div className="mt-16 space-y-12">
            {privacy.sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-[18px] font-medium text-main mb-4">
                  {index + 1}. {section.title}
                </h2>
                <p className="text-body leading-[1.9] whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* 制定・改定日 */}
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-[14px] text-sub">
              制定日：{privacy.enactedDate}
            </p>
            <p className="text-[14px] text-sub mt-1">
              改定日：{privacy.revisedDate}
            </p>
          </div>

          {/* 問い合わせ先 */}
          <div className="mt-8">
            <p className="text-[14px] text-sub">
              個人情報に関するお問い合わせ
            </p>
            <p className="text-[14px] text-body-color mt-2">
              {company.name}<br />
              個人情報保護管理者：{privacy.contact.manager}<br />
              Email：{privacy.contact.email}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
