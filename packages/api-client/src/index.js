const BASE_URL =
  typeof process !== "undefined"
    ? (process.env.API_URL ?? "http://localhost:3001")
    : "http://localhost:3001";

async function request(path, options = {}) {
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
  return res.json();
}

// Auth
const auth = {
  register: (email, password, display_name) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, display_name }),
    }),
  login: (email, password) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  refresh: () => request("/auth/refresh", { method: "POST" }),
};

// Levels
const levels = {
  list: () => request("/levels"),
  get: (id) => request(`/levels/${id}`),
};

// Progress
const progress = {
  save: (data) =>
    request("/progress", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  mine: () => request("/me/progress"),
};

// Scores
const scores = {
  submit: (data) =>
    request("/scores", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  leaderboard: (levelId, limit) => {
    const params = new URLSearchParams();
    if (levelId) params.set("level_id", levelId);
    if (limit)   params.set("limit", String(limit));
    const qs = params.toString();
    return request(`/leaderboard${qs ? `?${qs}` : ""}`);
  },
};

// Me
const me = {
  profile: () => request("/me"),
};

module.exports = { auth, levels, progress, scores, me };
