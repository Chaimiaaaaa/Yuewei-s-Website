// ─────────────────────────────────────────
//  asset.js  –  turn "/images/..." into the real URL of the deployed site.
//  Locally (and on Netlify) the site lives at "/", so nothing changes.
//  On GitHub Pages it lives at "/Yuewei-s-Website/", so paths get that prefix.
//  (The prefix comes from `base` in vite.config.js.)
// ─────────────────────────────────────────
const BASE = import.meta.env.BASE_URL; // "/" or "/Yuewei-s-Website/"

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
