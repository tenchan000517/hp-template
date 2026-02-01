import Link from 'next/link';

interface ArticleListItemProps {
  date: string;
  title: string;
  subtitle?: string;
  href: string;
}

export default function ArticleListItem({
  date,
  title,
  subtitle,
  href,
}: ArticleListItemProps) {
  return (
    <Link href={href} className="group block py-10 first:pt-0">
      <p className="font-serif-en text-[13px] tracking-[0.1em] text-light">
        {date}
      </p>
      <h2 className="mt-3 font-mincho text-[20px] lg:text-[24px] text-main group-hover:text-sub transition-colors leading-[1.6]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-[14px] text-sub line-clamp-2">
          {subtitle}
        </p>
      )}
    </Link>
  );
}
