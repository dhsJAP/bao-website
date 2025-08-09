"use client";
import Link from 'next/link';

export function LocaleSwitcher({ currentLocale }: { currentLocale: string }) {
  const other = currentLocale === 'vi' ? 'ja' : 'vi';
  return (
    <Link
      href={`/${other}`}
      className="rounded border px-2 py-1 text-xs hover:bg-neutral-50"
    >
      {other.toUpperCase()}
    </Link>
  );
}