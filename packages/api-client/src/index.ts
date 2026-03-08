import type { Level, Progress, Score, User } from "@bachtobach/types";

// Base URL — override via environment variable
const BASE_URL = typeof process !== "undefined"
  ? (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001")
  : "http://localhost:3001";

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${await res.text()}`);
  return res.json() as Promise<T>;
}

// Auth
export const auth = {
  register: (email: string, password: string) =>
    request<{ token: string; user: User }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  login: (email: string, password: string) =>
    request<{ token: string; user: User }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  refresh: () =>
    request<{ token: string }>("/auth/refresh", { method: "POST" }),
};

// Levels
export const levels = {
  list: () => request<Level[]>("/levels"),
  get: (id: string) => request<Level>(`/levels/${id}`),
};

// Progress
export const progress = {
  save: (data: Omit<Progress, "id">) =>
    request<Progress>("/progress", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  mine: () => request<Progress[]>("/me/progress"),
};

// Scores
export const scores = {
  submit: (data: Omit<Score, "id">) =>
    request<Score>("/scores", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  leaderboard: () => request<Score[]>("/leaderboard"),
};

// Me
export const me = {
  profile: () => request<User>("/me"),
};
