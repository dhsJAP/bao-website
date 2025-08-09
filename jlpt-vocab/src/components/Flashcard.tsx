"use client";
import { useState } from 'react';
import AudioButton from './AudioButton';
import { useProgressStore } from '@/store/useProgressStore';
import type { VocabItem } from '@/lib/db';

function Ruby({ kanji, kana }: { kanji: string; kana: string }) {
  return (
    <ruby>
      {kanji}
      <rt className="text-xs text-neutral-500">{kana}</rt>
    </ruby>
  );
}

export default function Flashcard({ item }: { item: VocabItem }) {
  const [flipped, setFlipped] = useState(false);
  const review = useProgressStore((s) => s.review);

  return (
    <div className="relative h-56 w-full cursor-pointer select-none rounded-xl border p-4 transition-transform [perspective:1000px]" onClick={() => setFlipped(!flipped)}>
      <div className={`absolute inset-0 grid place-items-center rounded-xl bg-white p-4 text-center [backface-visibility:hidden] [transform-style:preserve-3d] transition-transform duration-300 ${flipped ? '[transform:rotateY(180deg)]' : ''}`}>
        <div className="space-y-3">
          <div className="text-2xl font-semibold">
            <Ruby kanji={item.kanji} kana={item.kana} />
          </div>
          <AudioButton text={item.kana || item.kanji} />
        </div>
      </div>
      <div className={`absolute inset-0 grid place-items-center rounded-xl bg-neutral-50 p-4 text-center [backface-visibility:hidden] [transform-style:preserve-3d] [transform:rotateY(180deg)] transition-transform duration-300 ${flipped ? '' : '[transform:rotateY(0deg)]'}`}>
        <div className="space-y-2">
          <div className="text-lg font-medium">{item.meaningVi}</div>
          {item.exampleJa && (
            <div className="text-sm text-neutral-700">{item.exampleJa}</div>
          )}
          {item.exampleVi && (
            <div className="text-xs text-neutral-500">{item.exampleVi}</div>
          )}
          <div className="mt-3 flex items-center justify-center gap-2">
            <button className="rounded border px-2 py-1 text-xs" onClick={(e) => { e.stopPropagation(); review(item, 2); }}>Khó</button>
            <button className="rounded border px-2 py-1 text-xs" onClick={(e) => { e.stopPropagation(); review(item, 4); }}>Tốt</button>
            <button className="rounded border px-2 py-1 text-xs" onClick={(e) => { e.stopPropagation(); review(item, 5); }}>Đã nhớ</button>
          </div>
        </div>
      </div>
    </div>
  );
}