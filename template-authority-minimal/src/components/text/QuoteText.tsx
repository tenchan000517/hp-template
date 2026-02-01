import Link from 'next/link';

interface QuoteTextProps {
  children: string;
  author?: string;
  withLink?: {
    text: string;
    href: string;
  };
}

export default function QuoteText({ children, author, withLink }: QuoteTextProps) {
  return (
    <div className="flex flex-col items-center text-center px-6">
      <blockquote className="font-mincho text-[18px] lg:text-[24px] leading-[2.0] tracking-[0.05em] text-body-color max-w-[600px]">
        {children}
      </blockquote>

      {author && (
        <p className="mt-8 text-[14px] text-sub text-right w-full max-w-[600px]">
          {author}
        </p>
      )}

      {withLink && (
        <Link
          href={withLink.href}
          className="mt-12 text-link text-link-arrow"
        >
          {withLink.text}
        </Link>
      )}
    </div>
  );
}
