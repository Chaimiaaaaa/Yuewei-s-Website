// ─────────────────────────────────────────
//  lazyImg.js  –  props for an <img> that loads only when scrolled near.
//  Usage:  <img {...lazyImg(src)} alt="" />
//  Also sets width/height (read from the file at build time) so the page
//  reserves the right space before the image arrives — no layout jumps,
//  and lazy loading works in the art grid.
// ─────────────────────────────────────────
import imageSizes from "virtual:image-sizes";

export function lazyImg(src) {
  const size = imageSizes[src];
  return {
    src,
    loading: "lazy",
    decoding: "async",
    ...(size && { width: size[0], height: size[1] }),
  };
}
