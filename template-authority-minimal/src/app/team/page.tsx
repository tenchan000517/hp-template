import Image from 'next/image';
import { pages } from '@/lib/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'チーム | Team',
  description: '私たちと一緒に、本質的な価値を生み出しましょう。',
};

export default function TeamPage() {
  const { team } = pages;

  const representative = team.members.find((m) => m.isRepresentative);
  const otherMembers = team.members.filter((m) => !m.isRepresentative);

  return (
    <>
      {/* セクション1: ページタイトル */}
      <section className="pt-[50vh] min-h-[70vh] lg:pt-[55vh] pb-20 lg:pb-[120px]">
        <div className="container-content">
          <span className="block font-serif-en text-[12px] lg:text-[14px] tracking-[0.2em] text-light">
            {team.title.en}
          </span>
          <h1 className="mt-4 font-mincho text-[32px] lg:text-[48px] tracking-[0.1em] text-main">
            {team.title.ja}
          </h1>
          <p className="mt-12 font-mincho text-[18px] lg:text-[24px] leading-[1.8] text-body-color whitespace-pre-line max-w-[480px]">
            {team.lead}
          </p>
        </div>
      </section>

      {/* セクション2: 代表者 */}
      {representative && (
        <section className="section-normal">
          <div className="flex flex-col items-center px-6">
            {/* 代表者写真 */}
            <div className="w-full max-w-[320px] lg:max-w-[400px]">
              <div className="relative aspect-[3/4] bg-gray">
                <div className="absolute inset-0 flex items-center justify-center text-light text-sm">
                  Photo
                </div>
              </div>
            </div>

            {/* 名前と肩書き */}
            <div className="mt-6 text-center">
              <p className="font-serif-en text-[12px] lg:text-[13px] tracking-[0.15em] text-light">
                {representative.nameEn}
              </p>
              <p className="mt-2 text-[18px] lg:text-[20px] font-medium text-main">
                {representative.nameJa}
              </p>
              <p className="mt-2 text-[13px] lg:text-[14px] text-sub">
                {representative.title}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* セクション3: その他メンバー */}
      {otherMembers.length > 0 && (
        <section className="bg-gray section-normal">
          <div className="container-content">
            <div className="grid grid-cols-2 gap-8 lg:gap-12 max-w-[800px] mx-auto">
              {otherMembers.map((member) => (
                <div key={member.id} className="text-center">
                  {/* メンバー写真 */}
                  <div className="relative aspect-[3/4] bg-white">
                    <div className="absolute inset-0 flex items-center justify-center text-light text-sm">
                      Photo
                    </div>
                  </div>

                  {/* 名前と肩書き */}
                  <div className="mt-4">
                    <p className="font-serif-en text-[11px] lg:text-[12px] tracking-[0.15em] text-light">
                      {member.nameEn}
                    </p>
                    <p className="mt-1 text-[16px] lg:text-[18px] font-medium text-main">
                      {member.nameJa}
                    </p>
                    <p className="mt-1 text-[12px] lg:text-[13px] text-sub">
                      {member.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
