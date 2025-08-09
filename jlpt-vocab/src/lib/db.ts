import Dexie, { Table } from 'dexie';
import type { SRSState } from './spacedRepetition';

export interface VocabItem {
  id: string; // level:category:kanji
  level: 'N5' | 'N4' | 'N3' | 'N2' | 'N1';
  category: string;
  kanji: string;
  kana: string;
  romaji?: string;
  meaningVi: string;
  meaningJa?: string;
  exampleJa?: string;
  exampleVi?: string;
}

export interface ReviewRecord {
  id: string; // vocab id
  srs: SRSState;
  lastReviewedAt: number;
  correctCount: number;
  wrongCount: number;
}

export interface UserProfile {
  id: string; // single row: 'me'
  name?: string;
  dailyGoal?: number; // reviews per day
  locale?: 'vi' | 'ja';
}

export class JLPTDB extends Dexie {
  vocabItems!: Table<VocabItem, string>;
  reviews!: Table<ReviewRecord, string>;
  profiles!: Table<UserProfile, string>;

  constructor() {
    super('jlptVocabDB');
    this.version(1).stores({
      vocabItems: '&id, level, category, kanji, kana',
      reviews: '&id, lastReviewedAt, [srs.dueAt]',
      profiles: '&id'
    });
  }
}

export const db = new JLPTDB();