// views/artView.jsx
import { lazyImg } from "./lazyImg.js";
import { useNavigate } from "react-router-dom";

export function ArtView({ artworks }) {
  const navigate = useNavigate();

  function goToDetailACB(id) {
    navigate("/art/" + id);
  }

  return (
    <main className="main">
      <div className="masonry-grid">
        {artworks.map((a) => (
          <div key={a.id} className="card" onClick={() => goToDetailACB(a.id)}>
            <div className="card-thumb">
              {a.image
                ? <img {...lazyImg(a.image)} alt={a.title} />
                : <div className="card-placeholder">no image yet</div>
              }
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
