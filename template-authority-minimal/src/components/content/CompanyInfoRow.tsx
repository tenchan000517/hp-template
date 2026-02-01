interface CompanyInfoRowProps {
  label: string;
  value: string | string[];
}

export default function CompanyInfoRow({ label, value }: CompanyInfoRowProps) {
  const displayValue = Array.isArray(value) ? value.join('\n') : value;

  return (
    <div className="flex flex-col lg:flex-row py-5 border-b border-border">
      <dt className="flex-shrink-0 lg:w-[140px] text-[14px] text-light mb-2 lg:mb-0">
        {label}
      </dt>
      <dd className="text-[15px] text-body-color whitespace-pre-line">
        {displayValue}
      </dd>
    </div>
  );
}
