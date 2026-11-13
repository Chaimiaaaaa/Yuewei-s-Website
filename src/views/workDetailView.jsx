// views/workDetailView.jsx
import { SmartImg } from "./SmartImg.jsx";
import { Lightbox } from "./Lightbox.jsx";
import { useState } from "react";
import { useGoBack } from "./useGoBack.js";

export function WorkDetailView({ project }) {
  const goBack = useGoBack("/work?open=" + project?.id);
  const [lightboxSrc, setLightboxSrc] = useState(null);


  if (!project) return <main className="main"><p className="state-msg">Project not found.</p></main>;

  // "Read more" page images: plain strings, or { src, readMore: true, border: false }
  const readMoreImages = (project.images || [])
    .filter((img) => typeof img === "string" || img.readMore)
    .map((img) => (typeof img === "string" ? { src: img } : img));

  return (
    <main className="main">
      <span className="detail-back" onClick={goBack}>←︎ Back</span>

      <p className="detail-title">{project.title}</p>
      <p className="detail-meta">{project.year} · {project.category}</p>

      {project.description && (
        <p className="detail-description">{project.description}</p>
      )}

      {/* website / repo / trailer links, same as on the Work page */}
      {project.links && project.links.length > 0 && (
        <div className="work-detail__links detail-links">
          {project.links.map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noreferrer" className="work-detail__link">
              {link.label} ↗︎
            </a>
          ))}
        </div>
      )}

      <div className="gallery">
        {readMoreImages.length > 0
          ? readMoreImages.map((img, i) => (
              <div
                key={i}
                className={"gallery-img" + (img.border === false ? " gallery-img--no-border" : "")}
                onClick={() => setLightboxSrc(img.src)}
              >
                <SmartImg src={img.src} alt={project.title + " " + (i + 1)} />
              </div>
            ))
          : Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="gallery-img">
                <div className="gallery-placeholder">image {i + 1}</div>
              </div>
            ))
        }
      </div>

      {/* lightbox */}
      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </main>
  );
}
