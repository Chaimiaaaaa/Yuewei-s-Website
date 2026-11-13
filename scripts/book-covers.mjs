// ─────────────────────────────────────────
//  npm run book-covers
//  Makes a small, fast version of every project's cover for the book pages
//  and year cards:  cover.jpg  →  cover.book.webp  (next to it, ≤1600px wide)
//  The site uses the .book.webp automatically when it exists; the gallery
//  and the enlarged preview keep using the original.
//  Needs `cwebp` (brew install webp). Only (re)makes covers that are missing
//  or older than their original (add `-- --force` to remake all).
// ─────────────────────────────────────────
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const MAX_WIDTH = 1600; // book is ≤760px wide → 2× for sharp retina screens
const QUALITY = "90";
const FORCE = process.argv.includes("--force"); // npm run book-covers -- --force

const worksDir = path.resolve("src/data/works");
const covers = new Set();
for (const file of fs.readdirSync(worksDir).filter((f) => f.endsWith(".js"))) {
  const mod = await import(pathToFileURL(path.join(worksDir, file)).href);
  for (const p of Object.values(mod)) if (p && p.cover) covers.add(p.cover);
}

function widthOf(file) {
  // sips is built into macOS
  const out = execFileSync("sips", ["-g", "pixelWidth", file], { encoding: "utf8" });
  return Number(out.match(/pixelWidth: (\d+)/)[1]);
}

for (const cover of covers) {
  const src = path.join("public", cover);
  const out = src.replace(/\.[^.]+$/, ".book.webp");
  if (!fs.existsSync(src)) { console.log("missing original:", cover); continue; }
  if (!FORCE && fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs) {
    console.log("up to date:  ", path.relative("public", out));
    continue;
  }
  const resize = widthOf(src) > MAX_WIDTH ? ["-resize", String(MAX_WIDTH), "0"] : [];
  execFileSync("cwebp", ["-quiet", "-q", QUALITY, "-m", "6", ...resize, src, "-o", out]);
  const kb = (f) => Math.round(fs.statSync(f).size / 1024);
  console.log(`made:         ${path.relative("public", out)}  (${kb(src)}KB → ${kb(out)}KB)`);
}
