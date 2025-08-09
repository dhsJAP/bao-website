export type ReviewQuality = 0 | 1 | 2 | 3 | 4 | 5;

export interface SRSState {
  easinessFactor: number; // EF
  intervalDays: number; // I
  repetition: number; // n
  dueAt: number; // epoch ms
}

export function initSRS(): SRSState {
  return { easinessFactor: 2.5, intervalDays: 0, repetition: 0, dueAt: Date.now() };
}

export function scheduleNext(state: SRSState, quality: ReviewQuality): SRSState {
  let { easinessFactor: EF, repetition: n, intervalDays: I } = state;

  // Update EF
  EF = Math.max(1.3, EF + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

  if (quality < 3) {
    n = 0;
    I = 1;
  } else {
    n += 1;
    if (n === 1) I = 1;
    else if (n === 2) I = 6;
    else I = Math.round(I * EF);
  }

  const dueAt = Date.now() + I * 24 * 60 * 60 * 1000;
  return { easinessFactor: EF, repetition: n, intervalDays: I, dueAt };
}