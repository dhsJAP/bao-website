"use client";
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import Flashcard from '@/components/Flashcard';
import StatsBar from '@/components/StatsBar';
import type { VocabItem } from '@/lib/db';

async function loadVocab(level: string, category: string): Promise<VocabItem[]> {
  const path = `/data/${level}/${encodeURIComponent(category)}.json`;
  const res = await fetch(path);
  if (!res.ok) return [];
  const items = (await res.json()) as VocabItem[];
  return items;
}

export default function CategoryPage() {
  const params = useParams<{ locale: string; level: string; category: string }>();
  const [items, setItems] = useState<VocabItem[]>([]);
  const [q, setQ] = useState('');
  const [view, setView] = useState<'flash'|'list'>('flash');

  useEffect(() => {
    const level = String(params.level);
    const category = String(params.category);
    loadVocab(level, category).then(setItems);
  }, [params.level, params.category]);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return items;
    return items.filter(it =>
      it.kanji.toLowerCase().includes(qq) ||
      it.kana.toLowerCase().includes(qq) ||
      (it.meaningVi ?? '').toLowerCase().includes(qq)
    );
  }, [items, q]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">{decodeURIComponent(String(params.category))}</h1>
        <div className="flex items-center gap-2">
          <button className={`rounded border px-2 py-1 text-xs ${view==='flash'?'bg-neutral-100':''}`} onClick={() => setView('flash')}>Flashcard</button>
          <button className={`rounded border px-2 py-1 text-xs ${view==='list'?'bg-neutral-100':''}`} onClick={() => setView('list')}>List</button>
        </div>
      </div>

      <SearchBar onChange={setQ} />
      <StatsBar />

      {view === 'flash' ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filtered.map((it) => (
            <Flashcard key={it.id} item={it} />
          ))}
        </div>
      ) : (
        <div className="divide-y rounded border">
          {filtered.map((it) => (
            <div key={it.id} className="flex items-center justify-between gap-3 p-3">
              <div>
                <div className="text-base font-medium">{it.kanji} <span className="text-xs text-neutral-500">{it.kana}</span></div>
                <div className="text-sm text-neutral-700">{it.meaningVi}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}