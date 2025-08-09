"use client";
import { useEffect, useState } from 'react';
import type { VocabItem } from '@/lib/db';

async function loadAll(): Promise<VocabItem[]> {
  const files = [
    '/data/N5/Gia%20%C4%91%C3%ACnh.json',
    '/data/N5/Th%E1%BB%9Di%20gian.json',
    '/data/N5/Du%20l%E1%BB%8Bch.json'
  ];
  const arrays = await Promise.all(files.map((f) => fetch(f).then(r => r.ok ? r.json() : [])));
  return arrays.flat();
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function QuizPage() {
  const [items, setItems] = useState<VocabItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [choices, setChoices] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    loadAll().then(setItems);
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    const target = items[idx % items.length];
    const wrong = shuffle(items.filter((i) => i.id !== target.id)).slice(0, 3).map((i) => i.meaningVi);
    setChoices(shuffle([target.meaningVi, ...wrong]));
    setSelected(null);
  }, [idx, items]);

  if (items.length === 0) return <div>Loading...</div>;
  const current = items[idx % items.length];

  return (
    <div className="space-y-4">
      <div className="text-center text-2xl font-semibold">{current.kanji} <span className="text-base text-neutral-500">{current.kana}</span></div>
      <div className="grid gap-2">
        {choices.map((c) => (
          <button
            key={c}
            className={`rounded border p-3 text-left ${selected ? (c === current.meaningVi ? 'border-green-500 bg-green-50' : c === selected ? 'border-red-500 bg-red-50' : '') : 'hover:bg-neutral-50'}`}
            onClick={() => setSelected(c)}
            disabled={!!selected}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="flex justify-end">
        <button className="rounded border px-3 py-2" onClick={() => setIdx((v) => v + 1)}>Tiếp</button>
      </div>
    </div>
  );
}