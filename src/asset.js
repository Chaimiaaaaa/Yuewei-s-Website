// ─────────────────────────────────────────
//  asset.js  –  turn "/images/..." into the real URL of the deployed site.
//  The site lives at "/" (chaimiaaaaa.github.io, and locally), so nothing
//  changes now. If it is ever served from a sub-path like "/<repo>/", paths
//  get that prefix automatically. (The prefix comes from `base` in vite.config.js.)
// ─────────────────────────────────────────
const BASE = import.meta.env.BASE_URL; // "/" (or "/<repo>/" on a sub-path)

export function asset(path) {
  if (typeof path !== "string" || !path.startsWith("/images/")) return path;
  return BASE + path.slice(1);
}

// Apply asset() to every "/images/..." string inside data (objects/arrays).
export function withBase(value) {
  if (typeof value === "string") return asset(value);
  if (Array.isArray(value)) return value.map(withBase);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, withBase(v)]));
  }
  return value;
}
