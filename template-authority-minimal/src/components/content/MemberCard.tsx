import Image from 'next/image';

interface MemberCardProps {
  image: string;
  nameJa: string;
  nameEn: string;
  title: string;
  isRepresentative?: boolean;
}

export default function MemberCard({
  image,
  nameJa,
  nameEn,
  title,
  isRepresentative = false,
}: MemberCardProps) {
  return (
    <div className={`text-center ${isRepresentative ? '' : ''}`}>
      {/* 写真 */}
      <div
        className={`relative ${
          isRepresentative
            ? 'w-full max-w-[320px] lg:max-w-[400px] mx-auto'
            : ''
        }`}
      >
        <div className="relative aspect-[3/4] bg-gray">
          {/* 実際の画像がある場合は Image コンポーネントを使用 */}
          <div className="absolute inset-0 flex items-center justify-center text-light text-sm">
            Photo
          </div>
        </div>
      </div>

      {/* 名前と肩書き */}
      <div className="mt-4 lg:mt-6">
        <p
          className={`font-serif-en tracking-[0.15em] text-light ${
            isRepresentative ? 'text-[12px] lg:text-[13px]' : 'text-[11px] lg:text-[12px]'
          }`}
        >
          {nameEn}
        </p>
        <p
          className={`mt-1 lg:mt-2 font-medium text-main ${
            isRepresentative ? 'text-[18px] lg:text-[20px]' : 'text-[16px] lg:text-[18px]'
          }`}
        >
          {nameJa}
        </p>
        <p
          className={`mt-1 lg:mt-2 text-sub ${
            isRepresentative ? 'text-[13px] lg:text-[14px]' : 'text-[12px] lg:text-[13px]'
          }`}
        >
          {title}
        </p>
      </div>
    </div>
  );
}
