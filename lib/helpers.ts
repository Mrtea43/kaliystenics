import { MOVEMENT_KEYS } from '../data/movements';

export type Level = 'beginner' | 'medior' | 'pro';

export function levelFromRound(round: number): Level {
  if (round <= 3) return 'beginner';
  if (round <= 9) return 'medior';
  return 'pro';
}

export function setsForLevel(level: Level): { sets: number; reps: number } {
  return {
    beginner: { sets: 2, reps: 10 },
    medior: { sets: 2, reps: 20 },
    pro: { sets: 3, reps: 20 },
  }[level];
}

export type TimeOfDay = 'morning' | 'afternoon' | 'evening';

export function timeOfDay(): TimeOfDay {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 18) return 'afternoon';
  return 'evening';
}

export function pickMovement(round: number): string {
  return MOVEMENT_KEYS[(round - 1) % MOVEMENT_KEYS.length];
}
