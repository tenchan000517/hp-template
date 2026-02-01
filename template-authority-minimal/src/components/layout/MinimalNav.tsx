'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation, meta } from '@/lib/site';

export default function MinimalNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // モバイルメニューが開いているときはスクロールを無効化
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isCurrentPage = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-[0_1px_0_rgba(0,0,0,0.05)]' : 'bg-transparent'
        }`}
      >
        <div className="container-content">
          <nav className="flex items-center justify-between h-20 lg:h-[80px]">
            {/* ロゴ */}
            <Link
              href="/"
              className="font-mincho text-lg tracking-[0.1em] text-main"
            >
              {meta.siteName}
            </Link>

            {/* デスクトップナビゲーション */}
            <ul className="hidden lg:flex items-center gap-8">
              {navigation.header.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-[13px] tracking-[0.05em] text-body-color link-hover ${
                      isCurrentPage(item.href) ? 'link-current' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* モバイルメニューボタン */}
            <button
              type="button"
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`block w-6 h-[1px] bg-main transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-[1px]' : ''
                }`}
              />
              <span
                className={`block w-6 h-[1px] bg-main mt-1.5 transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''
                }`}
              />
            </button>
          </nav>
        </div>
      </header>

      {/* モバイルメニュー */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full">
          <ul className="flex flex-col items-center gap-8">
            {navigation.header.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-base tracking-[0.1em] font-mincho text-main ${
                    isCurrentPage(item.href) ? 'opacity-50' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
