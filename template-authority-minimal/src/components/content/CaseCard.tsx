import Link from 'next/link';
import Image from 'next/image';

interface CaseCardProps {
  image: string;
  client: string;
  scope: string[];
  title: string;
  href: string;
  isMain?: boolean;
}

export default function CaseCard({
  image,
  client,
  scope,
  title,
  href,
  isMain = false,
}: CaseCardProps) {
  return (
    <Link href={href} className="group block">
      <div
        className={`relative ${
          isMain ? 'aspect-[16/9]' : 'aspect-[4/3]'
        } bg-gray overflow-hidden`}
      >
        {/* 実際の画像がある場合は Image コンポーネントを使用 */}
        <div className="absolute inset-0 flex items-center justify-center text-light text-sm">
          {isMain ? 'Main Case Image' : 'Case Image'}
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>
      <div className={isMain ? 'mt-6' : 'mt-5'}>
        <p className={`text-light ${isMain ? 'text-[13px]' : 'text-[12px]'}`}>
          {client} / {scope.join('、')}
        </p>
        <h3
          className={`mt-2 font-mincho text-main group-hover:text-sub transition-colors ${
            isMain
              ? 'text-[20px] lg:text-[24px]'
              : 'text-[18px] lg:text-[20px]'
          }`}
        >
          {title}
        </h3>
      </div>
    </Link>
  );
}
