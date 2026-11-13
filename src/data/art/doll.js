// ─────────────────────────────────────────
//  Side Quests  –  every image in public/images/art/doll/ shows up automatically.
//  Order: most recently added first (see src/data/imageOrder.json).
//
//  Optional: add a title / year / description for a photo below,
//  using its file name WITHOUT the extension, e.g. "doll-3".
// ─────────────────────────────────────────
import { listImages } from "../imageFolders.js";

const info = {
  // "doll-3": { title: "...", year: "2026", description: "..." },
};

export const doll = listImages("art/doll").map((img) => ({
  id: img.id,
  title: "",
  category: "doll",
  image: img.src,
  year: "",
  description: "",
  ...info[img.id],
}));
