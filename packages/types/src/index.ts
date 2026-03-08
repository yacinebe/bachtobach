export interface User {
  id: string;
  email: string;
  display_name: string;
  avatar_url?: string;
  provider: "email" | "apple" | "google";
  provider_id?: string;
  created_at: string;
}

export interface Note {
  pitch: string; // e.g. "C4", "D#5"
  duration: number; // in beats
  startBeat: number;
}

export interface Level {
  id: string;
  level_number: number;
  title: string;
  composer: string;
  image_url?: string;
  bpm: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  time_limit_seconds: number;
  piece: Note[];
  source?: string;
  created_at: string;
}

export interface Progress {
  id: string;
  user_id: string;
  level_id: string;
  completed: boolean;
  perfect: boolean;
  best_score: number;
  attempts: number;
  last_played_at: string;
}

export interface Score {
  id: string;
  user_id: string;
  level_id: string;
  score: number;
  combo_max: number;
  accuracy: number;
  played_at: string;
}
