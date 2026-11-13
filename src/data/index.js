// ─────────────────────────────────────────
//  data/index.js  –  assembles all content
//  To add content: edit the relevant file in this folder
//  Image paths are written as "/images/..."; withBase() adds the site's
//  base path when deployed to GitHub Pages (see src/asset.js).
// ─────────────────────────────────────────
import { withBase } from "../asset.js";

// ── WORKS ──
// Every file in ./works/ is loaded automatically — just add a new .js file.
// On the site, projects are shown newest year first (see workPresenter /
// sidebarPresenter). Within the same year, `order` decides who comes first
// (smaller = earlier); projects without `order` go last in their year.
const workModules = import.meta.glob("./works/*.js", { eager: true });

export const projects = withBase(
  Object.values(workModules)
    .flatMap((mod) => Object.values(mod))
    .filter((p) => p && typeof p === "object" && p.id)
    .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
);

// ── ART ──
import { kpop } from "./art/kpop.js";
import { doll } from "./art/doll.js";

export const artworks = withBase([ ...kpop, ...doll ]);

// ── NOW ──
import { now2026 } from "./now/2026.js";
import { now2025 } from "./now/2025.js";
import { now2024 } from "./now/2024.js";
import { now2023 } from "./now/2023.js";

export const nowEntries = withBase([ ...now2026, ...now2025, ...now2024, ...now2023 ]);

// ── ABOUT ──
import { about as aboutRaw } from "./about.js";
export const about = withBase(aboutRaw);