import Link from 'next/link';
import { navigation, meta, company } from '@/lib/site';

export default function FooterMinimal() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-footer text-white">
      <div className="container-content py-16 lg:py-20">
        <div className="flex flex-col items-center">
          {/* ロゴ */}
          <Link
            href="/"
            className="font-mincho text-lg tracking-[0.1em] text-white mb-8"
          >
            {meta.siteName}
          </Link>

          {/* フッターリンク */}
          <ul className="flex flex-wrap justify-center gap-6 mb-10">
            {navigation.footer.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs tracking-[0.05em] text-white/80 hover:text-white/60 transition-opacity duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* コピーライト */}
          <p className="text-xs tracking-[0.05em] text-white/50">
            &copy; {currentYear} {company.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
