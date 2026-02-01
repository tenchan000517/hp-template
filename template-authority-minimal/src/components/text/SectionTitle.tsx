interface SectionTitleProps {
  titleEn: string;
  titleJa: string;
  withLine?: boolean;
  align?: 'left' | 'center';
}

export default function SectionTitle({
  titleEn,
  titleJa,
  withLine = false,
  align = 'left',
}: SectionTitleProps) {
  const alignClasses = align === 'center' ? 'text-center' : '';

  return (
    <div className={`mb-12 lg:mb-16 ${alignClasses}`}>
      <span className="block font-serif-en text-[12px] lg:text-[14px] tracking-[0.2em] text-light">
        {titleEn}
      </span>
      <h2 className="mt-2 font-mincho text-[24px] lg:text-[28px] tracking-[0.08em] text-main">
        {titleJa}
      </h2>
      {withLine && (
        <div className="mt-8 w-full h-px bg-border" />
      )}
    </div>
  );
}
