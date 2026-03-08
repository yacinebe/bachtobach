import type { Note } from "@bachtobach/types";

export interface NoteResult {
  expected: Note;
  played: string | null;
  hit: boolean;
  latencyMs: number;
}

/**
 * Compare a played pitch against the expected note.
 * Returns whether it was a hit and the latency in ms.
 */
export function compareNote(
  expected: Note,
  played: string | null,
  latencyMs: number
): NoteResult {
  const hit = played !== null && played === expected.pitch;
  return { expected, played, hit, latencyMs };
}
