// ─────────────────────────────────────────
//  Lightbox.jsx  –  full-screen enlarged image preview.
//  <Lightbox src={...} caption="..." onClose={() => ...} />
//  Closes on: a click anywhere (on the image or around it), the ×, or Esc.
//  Rendered straight into <body> (a "portal") so it covers the top nav too.
// ─────────────────────────────────────────
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { SmartImg } from "./SmartImg.jsx";

export function Lightbox({ src, alt = "enlarged", caption, onClose }) {
  useEffect(() => {
    function onKeyDownCB(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDownCB);
    return () => window.removeEventListener("keydown", onKeyDownCB);
  }, [onClose]);

  if (!src) return null;

  return createPortal(
    <div className="lightbox" onClick={onClose}>
      <figure className="lightbox__figure">
        {/* clicking the image itself also closes (click bubbles to the backdrop) */}
        <SmartImg
          lazy={false}
          className="lightbox__img"
          src={src}
          alt={alt}
        />
        {caption && <figcaption className="lightbox__caption">{caption}</figcaption>}
      </figure>
      <button className="lightbox__close" onClick={onClose}>×</button>
    </div>,
    document.body
  );
}
