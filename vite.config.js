import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

// ─────────────────────────────────────────
//  imageFolders plugin
//  Lets data files ask "which images are in public/images/<folder>?"
//  via:  import imageFolders from "virtual:image-folders";
//  → { "art/kpop": ["art-14.jpg", ...], "art/doll": [...], ... }
//  New/deleted images show up automatically (dev server reloads).
//
//  Order = the order images were ADDED, newest first. It is remembered in
//  src/data/imageOrder.json: any image not listed there yet is put at the
//  top and the file is updated. You can also edit that file by hand to
//  reorder. (File dates can't be used: they reset on resize / deploy.)
// ─────────────────────────────────────────
const IMAGE_EXT = /\.(jpe?g|png|gif|webp|avif)$/i;
const VIRTUAL_ID = "virtual:image-folders";
const RESOLVED_ID = "\0" + VIRTUAL_ID;
// { "/images/work/ar/cover.jpg": [3000, 1687], ... } for every image, so
// <img> tags can reserve their space (needed for lazy loading + no layout jump)
const SIZES_ID = "virtual:image-sizes";
const RESOLVED_SIZES_ID = "\0" + SIZES_ID;
const ORDER_FILE = path.resolve("src/data/imageOrder.json");
// Only folders under these (inside public/images/) are auto-listed.
// Add e.g. "now" here if another section should work the same way.
const AUTO_FOLDERS = ["art"];

// Natural sort: art-2 < art-10
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

function scanImageFolders(root) {
  const result = {};
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const images = entries
      .filter((e) => e.isFile() && IMAGE_EXT.test(e.name))
      .map((e) => e.name);
    if (images.length) {
      result[path.relative(root, dir).split(path.sep).join("/")] = images;
    }
    entries.filter((e) => e.isDirectory()).forEach((e) => walk(path.join(dir, e.name)));
  }
  for (const sub of AUTO_FOLDERS) {
    const dir = path.join(root, sub);
    if (fs.existsSync(dir)) walk(dir);
  }
  return result;
}

function scanImageSizes(publicDir) {
  const sizes = {};
  function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) { walk(full); continue; }
      if (!IMAGE_EXT.test(e.name)) continue;
      try {
        const { width, height, orientation } = imageSize(full);
        const rotated = orientation >= 5 && orientation <= 8; // EXIF 90° turns
        const key = "/" + path.relative(publicDir, full).split(path.sep).join("/");
        sizes[key] = rotated ? [height, width] : [width, height];
      } catch { /* unreadable image: just skip it */ }
    }
  }
  const root = path.join(publicDir, "images");
  if (fs.existsSync(root)) walk(root);
  return sizes;
}

function readOrder() {
  try { return JSON.parse(fs.readFileSync(ORDER_FILE, "utf8")); }
  catch { return {}; }
}

// Newest-first order per folder: newly found images go on top,
// deleted ones are dropped. Saves imageOrder.json if anything changed.
function orderedImageFolders(root) {
  const found = scanImageFolders(root);
  const saved = readOrder();
  const result = {};
  for (const [folder, files] of Object.entries(found)) {
    const present = new Set(files);
    const known = (saved[folder] || []).filter((f) => present.has(f));
    const knownSet = new Set(known);
    // several new at once → higher number / later name first
    const added = files.filter((f) => !knownSet.has(f)).sort(collator.compare).reverse();
    result[folder] = [...added, ...known];
  }
  const next = JSON.stringify(result, null, 2) + "\n";
  let prev = "";
  try { prev = fs.readFileSync(ORDER_FILE, "utf8"); } catch {}
  if (next !== prev) fs.writeFileSync(ORDER_FILE, next);
  return result;
}

function imageFoldersPlugin() {
  let imagesRoot, publicDir;
  return {
    name: "image-folders",
    configResolved(config) {
      publicDir = config.publicDir;
      imagesRoot = path.join(publicDir, "images");
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
      if (id === SIZES_ID) return RESOLVED_SIZES_ID;
    },
    load(id) {
      if (id === RESOLVED_ID) {
        return "export default " + JSON.stringify(orderedImageFolders(imagesRoot));
      }
      if (id === RESOLVED_SIZES_ID) {
        return "export default " + JSON.stringify(scanImageSizes(publicDir));
      }
    },
    configureServer(server) {
      server.watcher.add(imagesRoot);
      function onChange(file) {
        const isImage = file.startsWith(imagesRoot) && IMAGE_EXT.test(file);
        const isOrderEdit = path.resolve(file) === ORDER_FILE;
        if (!isImage && !isOrderEdit) return;
        for (const id of [RESOLVED_ID, RESOLVED_SIZES_ID]) {
          const mod = server.moduleGraph.getModuleById(id);
          if (mod) server.moduleGraph.invalidateModule(mod);
        }
        server.ws.send({ type: "full-reload" });
      }
      server.watcher.on("add", onChange);
      server.watcher.on("unlink", onChange);
      server.watcher.on("change", onChange); // order edits + replaced images
    },
  };
}

export default defineConfig({
  plugins: [react(), imageFoldersPlugin()],
});
