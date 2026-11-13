// ─────────────────────────────────────────
//  imageFolders.js  –  list the images inside public/images/<folder>
//  (built automatically by the plugin in vite.config.js)
//
//  Order: most recently ADDED image first. The order is remembered in
//  src/data/imageOrder.json — edit that file by hand to reorder.
// ─────────────────────────────────────────
import imageFolders from "virtual:image-folders";

/**
 * listImages("art/kpop")
 * → [{ file: "art-14.jpg", id: "art-14", src: "/images/art/kpop/art-14.jpg" }, ...]
 */
export function listImages(folder) {
  return (imageFolders[folder] || []).map((file) => ({
    file,
    id: file.replace(/\.[^.]+$/, ""),
    src: `/images/${folder}/${file}`,
  }));
}
