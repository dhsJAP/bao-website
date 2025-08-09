"use client";
import { Volume2, Square } from 'lucide-react';
import { speakJa, stopSpeak } from '@/lib/tts';
import { useI18n } from '@/lib/i18n';

export default function AudioButton({ text }: { text: string }) {
  const { t } = useI18n();
  return (
    <div className="flex items-center gap-2">
      <button
        className="rounded border px-2 py-1 text-xs hover:bg-neutral-50"
        onClick={() => speakJa(text)}
        aria-label={t('tts.play')}
      >
        <Volume2 size={16} />
      </button>
      <button
        className="rounded border px-2 py-1 text-xs hover:bg-neutral-50"
        onClick={stopSpeak}
        aria-label={t('tts.stop')}
      >
        <Square size={14} />
      </button>
    </div>
  );
}