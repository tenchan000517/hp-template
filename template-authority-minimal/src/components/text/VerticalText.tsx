interface VerticalTextProps {
  children: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function VerticalText({
  children,
  size = 'medium',
  className = '',
}: VerticalTextProps) {
  const sizeClasses = {
    small: 'text-[14px]',
    medium: 'text-[24px]',
    large: 'text-[36px]',
  };

  return (
    <span
      className={`vertical-text font-mincho ${sizeClasses[size]} text-main tracking-[0.1em] ${className}`}
    >
      {children}
    </span>
  );
}
