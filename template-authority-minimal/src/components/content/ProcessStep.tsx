interface ProcessStepProps {
  steps: {
    number: string;
    title: string;
    description: string;
  }[];
}

export default function ProcessStep({ steps }: ProcessStepProps) {
  return (
    <div className="space-y-12 lg:space-y-16">
      {steps.map((step) => (
        <div key={step.number} className="flex gap-6 lg:gap-10">
          <span className="flex-shrink-0 font-serif-en text-[14px] tracking-[0.15em] text-lighter">
            {step.number}
          </span>
          <div>
            <h3 className="text-[18px] font-medium text-main">
              {step.title}
            </h3>
            <p className="mt-3 text-[15px] text-sub leading-[1.8] whitespace-pre-line">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
