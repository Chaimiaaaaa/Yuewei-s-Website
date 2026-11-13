// ─────────────────────────────────────────
//  Fanart  –  every image in public/images/art/kpop/ shows up automatically.
//  Order: most recently added first (see src/data/imageOrder.json).
//
//  Optional: add a year / description for a painting below,
//  using its file name WITHOUT the extension, e.g. "art-12".
// ─────────────────────────────────────────
import { listImages } from "../imageFolders.js";

const info = {
  "art-1": { year: "2026.5.23" },
  "art-2": { year: "2026.5.23" },
  "art-3": { year: "2026.5.23" },
  "art-4": { year: "2026.5.23" },
  "art-6": { year: "2026.5.23" },
  // "art-12": { year: "2026.11", description: "..." },
};

export const kpop = listImages("art/kpop").map((img) => ({
  id: img.id,
  title: "Fanart",
  category: "kpop",
  image: img.src,
  year: "",
  description: "",
  ...info[img.id],
}));
