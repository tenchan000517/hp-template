import Link from 'next/link';
import { notFound } from 'next/navigation';
import { columns, getColumnBySlug, getRelatedColumns, formatDate } from '@/lib/site';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return columns.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const column = getColumnBySlug(slug);
  if (!column) return { title: '記事が見つかりません' };

  return {
    title: `${column.title} | Column`,
    description: column.subtitle || column.title,
  };
}

export default async function ColumnDetailPage({ params }: Props) {
  const { slug } = await params;
  const column = getColumnBySlug(slug);

  if (!column) {
    notFound();
  }

  const relatedColumns = getRelatedColumns(slug);

  // Markdown の簡易変換（実際はライブラリを使用推奨）
  const renderContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      // 見出し
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="mt-12 mb-4 font-mincho text-[20px] lg:text-[24px] text-main">
            {paragraph.replace('## ', '')}
          </h2>
        );
      }
      if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="mt-8 mb-3 text-[18px] font-medium text-main">
            {paragraph.replace('### ', '')}
          </h3>
        );
      }
      // リスト
      if (paragraph.startsWith('- ')) {
        const items = paragraph.split('\n').filter((line) => line.startsWith('- '));
        return (
          <ul key={index} className="my-4 space-y-2">
            {items.map((item, idx) => (
              <li key={idx} className="text-body leading-[1.9] before:content-['—'] before:mr-3 before:text-lighter">
                {item.replace('- ', '')}
              </li>
            ))}
          </ul>
        );
      }
      // 通常の段落
      return (
        <p key={index} className="my-4 text-body leading-[1.9]">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <>
      {/* セクション1: ページタイトル */}
      <section className="pt-[50vh] min-h-[50vh] lg:pt-[55vh] pb-12 lg:pb-16">
        <div className="container-content max-w-[800px]">
          <p className="font-serif-en text-[13px] tracking-[0.1em] text-light">
            {formatDate(column.date)}
          </p>
          <h1 className="mt-4 font-mincho text-[28px] lg:text-[36px] tracking-[0.08em] text-main leading-[1.5]">
            {column.title}
          </h1>
          {column.subtitle && (
            <p className="mt-4 text-[15px] text-sub">
              {column.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* セクション2: 本文 */}
      <section className="pb-20 lg:pb-32">
        <div className="container-content max-w-[800px]">
          <article className="prose-custom">
            {renderContent(column.content)}
          </article>
        </div>
      </section>

      {/* セクション3: 関連記事 */}
      {relatedColumns.length > 0 && (
        <section className="bg-gray section-normal">
          <div className="container-content max-w-[800px]">
            <div className="mb-10">
              <span className="block font-serif-en text-[12px] lg:text-[14px] tracking-[0.2em] text-light">
                Related
              </span>
              <h2 className="mt-2 font-mincho text-[20px] lg:text-[24px] tracking-[0.08em] text-main">
                関連記事
              </h2>
            </div>

            <div className="space-y-8">
              {relatedColumns.map((related) => (
                <Link
                  key={related.slug}
                  href={`/column/${related.slug}`}
                  className="group block"
                >
                  <p className="font-serif-en text-[12px] tracking-[0.1em] text-light">
                    {formatDate(related.date)}
                  </p>
                  <p className="mt-2 text-[16px] lg:text-[18px] text-main group-hover:text-sub transition-colors">
                    {related.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* セクション4: ナビゲーション */}
      <section className="section-small">
        <div className="container-content max-w-[800px]">
          <Link href="/column" className="text-link">
            ← コラム一覧
          </Link>
        </div>
      </section>
    </>
  );
}
