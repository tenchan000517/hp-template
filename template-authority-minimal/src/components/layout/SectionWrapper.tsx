import { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  bgColor?: 'white' | 'gray';
  spacing?: 'normal' | 'large' | 'small';
  maxWidth?: 'full' | 'content' | 'narrow';
  id?: string;
}

export default function SectionWrapper({
  children,
  bgColor = 'white',
  spacing = 'normal',
  maxWidth = 'content',
  id,
}: SectionWrapperProps) {
  const bgClasses = {
    white: '',
    gray: 'bg-gray',
  };

  const spacingClasses = {
    normal: 'section-normal',
    large: 'section-large',
    small: 'section-small',
  };

  const maxWidthClasses = {
    full: '',
    content: 'container-content',
    narrow: 'container-narrow',
  };

  return (
    <section id={id} className={`${bgClasses[bgColor]} ${spacingClasses[spacing]}`}>
      <div className={maxWidthClasses[maxWidth]}>{children}</div>
    </section>
  );
}
