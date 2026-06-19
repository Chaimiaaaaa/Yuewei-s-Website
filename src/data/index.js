// ─────────────────────────────────────────
//  data/index.js  –  assembles all content
//  To add content: edit the relevant file in this folder
// ─────────────────────────────────────────

// ── WORKS ──
import { ar }           from "./works/ar.js";
import { iot }          from "./works/iot.js";
import { robotic }      from "./works/robotic.js";
import { architecture } from "./works/architecture.js";
import { frog }         from "./works/frog.js";
import { mobilePleasure }         from "./works/mobilePleasure.js";

export const projects = [ ar, iot, robotic, architecture, frog ,mobilePleasure];

// ── ART ──
import { kpop } from "./art/kpop.js";
import { doll } from "./art/doll.js";

export const artworks = [ ...kpop, ...doll ];

// ── NOW ──
import { now2026 } from "./now/2026.js";
import { now2025 } from "./now/2025.js";
import { now2024 } from "./now/2024.js";
import { now2023 } from "./now/2023.js";

export const nowEntries = [ ...now2026, ...now2025, ...now2024, ...now2023 ];

// ── ABOUT ──
export { about } from "./about.js";