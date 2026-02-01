import Link from 'next/link';

interface TextLinkProps {
  children: string;
  href: string;
  withArrow?: boolean;
  size?: 'small' | 'medium';
}

export default function TextLink({
  children,
  href,
  withArrow = true,
  size = 'medium',
}: TextLinkProps) {
  const sizeClasses = {
    small: 'text-[13px]',
    medium: 'text-[14px]',
  };

  return (
    <Link
      href={href}
      className={`text-link ${sizeClasses[size]} ${withArrow ? 'text-link-arrow' : ''}`}
    >
      {children}
    </Link>
  );
}
