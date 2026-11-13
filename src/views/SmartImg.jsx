// ─────────────────────────────────────────
//  SmartImg.jsx  –  an <img> that shows a light-pink "loading>3<..."
//  placeholder until the picture has arrived.
//
//  <SmartImg src={...} alt="" />              lazy (loads when scrolled near)
//  <SmartImg src={...} alt="" lazy={false} /> loads right away
//  Any other prop (className, onClick, style…) is passed to the <img>.
//
//  The placeholder is the img's own background (see .is-loading in
//  style.css), so no extra wrapper element changes the layout.
// ─────────────────────────────────────────
import { useState, useRef, useEffect } from "react";
import { lazyImg, sizeProps } from "./lazyImg.js";

export function SmartImg({ src, lazy = true, className = "", alt = "", ...rest }) {
  const [loadedSrc, setLoadedSrc] = useState(null);
  const ref = useRef(null);
  const isLoading = loadedSrc !== src;

  // image already in the browser cache → may be complete before onLoad
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth > 0) setLoadedSrc(src);
  }, [src]);

  const base = lazy ? lazyImg(src) : sizeProps(src);

  return (
    <img
      ref={ref}
      {...base}
      {...rest}
      alt={alt}
      className={(className + (isLoading ? " is-loading" : "")).trim() || undefined}
      onLoad={(e) => { setLoadedSrc(src); rest.onLoad?.(e); }}
      onError={(e) => { setLoadedSrc(src); rest.onError?.(e); }}
    />
  );
}
