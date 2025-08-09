"use client";
import { useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { useProgressStore } from '@/store/useProgressStore';

export default function StatsBar() {
  const { t } = useI18n();
  const { learnedCount, todayCount, loadProgress } = useProgressStore();
  useEffect(() => {
    loadProgress();
  }, [loadProgress]);
  return (
    <div className="grid grid-cols-3 gap-2 text-center text-sm">
      <div className="rounded border p-2">
        <div className="text-xs text-neutral-500">{t('stats.learned')}</div>
        <div className="text-base font-semibold">{learnedCount}</div>
      </div>
      <div className="rounded border p-2">
        <div className="text-xs text-neutral-500">{t('stats.today')}</div>
        <div className="text-base font-semibold">{todayCount}</div>
      </div>
      <div className="rounded border p-2">
        <div className="text-xs text-neutral-500">{t('stats.remaining')}</div>
        <div className="text-base font-semibold">—</div>
      </div>
    </div>
  );
}