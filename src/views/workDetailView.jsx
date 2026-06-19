// views/workDetailView.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function WorkDetailView({ project }) {
  const navigate = useNavigate();
  const [lightboxSrc, setLightboxSrc] = useState(null);

  // close on ESC
  useEffect(() => {
    function onKeyDownCB(e) {
      if (e.key === "Escape") setLightboxSrc(null);
    }
    window.addEventListener("keydown", onKeyDownCB);
    return () => window.removeEventListener("keydown", onKeyDownCB);
  }, []);

  if (!project) return <main className="main"><p className="state-msg">Project not found.</p></main>;

  return (
    <main className="main">
      <span className="detail-back" onClick={() => navigate("/work?open=" + project.id)}>← Back</span>

      <p className="detail-title">{project.title}</p>
      <p className="detail-meta">{project.year} · {project.category}</p>

      {project.description && (
        <p className="detail-description">{project.description}</p>
      )}

      <div className="gallery">
        {project.images && project.images.filter(img => typeof img === "string").length > 0
          ? project.images.filter(img => typeof img === "string").map((src, i) => (
              <div key={i} className="gallery-img" onClick={() => setLightboxSrc(src)}>
                <img src={src} alt={project.title + " " + (i + 1)} />
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
      {lightboxSrc && (
        <div className="lightbox" onClick={() => setLightboxSrc(null)}>
          <img
            className="lightbox__img"
            src={lightboxSrc}
            alt="enlarged"
            onClick={(e) => e.stopPropagation()}
          />
          <button className="lightbox__close" onClick={() => setLightboxSrc(null)}>×</button>
        </div>
      )}
    </main>
  );
}
