// ─────────────────────────────────────────
//  lazyImg.js  –  props for an <img> that loads only when scrolled near.
//  Usage:  <img {...lazyImg(src)} alt="" />
//  Also sets width/height (read from the file at build time) so the page
//  reserves the right space before the image arrives — no layout jumps,
//  and lazy loading works in the art grid.
//  (Most views use <SmartImg>, which builds on this and adds the
//   "loading>3<..." placeholder.)
// ─────────────────────────────────────────
import imageSizes from "virtual:image-sizes";

// width/height only (for images that should load right away)
export function sizeProps(src) {
  const size = imageSizes[src];
  return { src, ...(size && { width: size[0], height: size[1] }) };
}

export function lazyImg(src) {
  return { ...sizeProps(src), loading: "lazy", decoding: "async" };
}

// Small version of a project cover for the book pages and year cards:
// ".../cover.jpg" → ".../cover.book.webp" if that file exists (made by
// `npm run book-covers`), otherwise the original cover.
export function bookCoverSrc(cover) {
  if (!cover) return cover;
  const small = cover.replace(/\.[^./]+$/, ".book.webp");
  return imageSizes[small] ? small : cover;
}
