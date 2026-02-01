import Link from 'next/link';
import { columns, formatDate } from '@/lib/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'コラム | Column',
  description: 'ブランディング、デザイン、戦略に関するコラムをお届けします。',
};

export default function ColumnPage() {
  // 日付でソート（新しい順）
  const sortedColumns = [...columns].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      {/* セクション1: ページタイトル */}
      <section className="pt-[50vh] min-h-[60vh] lg:pt-[55vh] pb-16 lg:pb-20">
        <div className="container-content">
          <span className="block font-serif-en text-[12px] lg:text-[14px] tracking-[0.2em] text-light">
            Column
          </span>
          <h1 className="mt-4 font-mincho text-[32px] lg:text-[48px] tracking-[0.1em] text-main">
            コラム
          </h1>
        </div>
      </section>

      {/* セクション2: 記事一覧 */}
      <section className="section-normal">
        <div className="container-content max-w-[800px]">
          <div className="divide-y divide-border">
            {sortedColumns.map((column) => (
              <Link
                key={column.slug}
                href={`/column/${column.slug}`}
                className="group block py-10 first:pt-0"
              >
                <p className="font-serif-en text-[13px] tracking-[0.1em] text-light">
                  {formatDate(column.date)}
                </p>
                <h2 className="mt-3 font-mincho text-[20px] lg:text-[24px] text-main group-hover:text-sub transition-colors leading-[1.6]">
                  {column.title}
                </h2>
                {column.subtitle && (
                  <p className="mt-2 text-[14px] text-sub">
                    {column.subtitle}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
