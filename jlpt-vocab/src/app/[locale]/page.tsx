"use client";
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

const levels = [
  { id: 'N5', desc: '≈800 từ' },
  { id: 'N4', desc: '≈1,500 từ' },
  { id: 'N3', desc: '≈3,750 từ' },
  { id: 'N2', desc: '≈6,000 từ' },
  { id: 'N1', desc: '10,000+ từ' },
];

export default function Home() {
  const { t, locale } = useI18n();

  return (
    <div className="space-y-8">
      <section>
        <h1 className="mb-3 text-2xl font-semibold">{t('levels.title')}</h1>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {levels.map((lvl) => (
            <Link
              key={lvl.id}
              href={`/${locale}/levels/${lvl.id}`}
              className="rounded-lg border p-4 hover:shadow"
            >
              <div className="text-lg font-semibold">{t(`levels.${lvl.id}`)}</div>
              <div className="text-xs text-neutral-500">{lvl.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-xl font-semibold">{t('guide.title')}</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-700">
          <li>{t('guide.tip1')}</li>
          <li>{t('guide.tip2')}</li>
        </ul>
      </section>
    </div>
  );
}