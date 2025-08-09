"use client";
import { create } from 'zustand';
import { db, type VocabItem } from '@/lib/db';
import { initSRS, scheduleNext, type ReviewQuality } from '@/lib/spacedRepetition';

interface ProgressState {
  learnedCount: number;
  todayCount: number;
  loading: boolean;
  loadProgress: () => Promise<void>;
  review: (item: VocabItem, quality: ReviewQuality) => Promise<void>;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  learnedCount: 0,
  todayCount: 0,
  loading: false,
  loadProgress: async () => {
    set({ loading: true });
    const all = await db.reviews.toArray();
    const learnedCount = all.length;
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const today = all.filter(r => r.lastReviewedAt >= start.getTime()).length;
    set({ learnedCount, todayCount: today, loading: false });
  },
  review: async (item, quality) => {
    const id = item.id;
    const existing = await db.reviews.get(id);
    const srs = scheduleNext(existing?.srs ?? initSRS(), quality);
    await db.reviews.put({
      id,
      srs,
      lastReviewedAt: Date.now(),
      correctCount: (existing?.correctCount ?? 0) + (quality >= 3 ? 1 : 0),
      wrongCount: (existing?.wrongCount ?? 0) + (quality < 3 ? 1 : 0),
    });
    await get().loadProgress();
  }
}));