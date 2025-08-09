"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import levels from '@/data/levels.json';

export default function LevelPage() {
  const params = useParams<{ locale: string; level: string }>();
  const cats = (levels as Record<string, string[]>)[String(params.level)] ?? [];
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">{String(params.level)}</h1>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {cats.map((c) => (
          <Link key={c} href={`/${params.locale}/levels/${params.level}/${encodeURIComponent(c)}`} className="rounded border p-3 hover:shadow">
            {c}
          </Link>
        ))}
      </div>
    </div>
  );
}