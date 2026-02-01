interface PageTitleProps {
  titleEn: string;
  titleJa: string;
  lead?: string;
}

export default function PageTitle({ titleEn, titleJa, lead }: PageTitleProps) {
  return (
    <section className="pt-[50vh] min-h-[70vh] lg:pt-[55vh] pb-20 lg:pb-[120px]">
      <div className="container-content">
        <span className="block font-serif-en text-[12px] lg:text-[14px] tracking-[0.2em] text-light">
          {titleEn}
        </span>
        <h1 className="mt-4 font-mincho text-[32px] lg:text-[48px] tracking-[0.1em] text-main">
          {titleJa}
        </h1>
        {lead && (
          <p className="mt-12 font-mincho text-[18px] lg:text-[24px] leading-[1.8] text-body-color whitespace-pre-line max-w-[480px]">
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
