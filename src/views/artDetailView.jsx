// views/artDetailView.jsx
import { useNavigate } from "react-router-dom";

export function ArtDetailView({ artwork }) {
  const navigate = useNavigate();

  if (!artwork) return <main className="main"><p className="state-msg">Artwork not found.</p></main>;

  return (
    <main className="main">
      <span className="detail-back" onClick={() => navigate("/art")}>←︎ Back</span>

      <div className="detail-image-wrap">
        {artwork.image
          ? <img src={artwork.image} alt={artwork.title} />
          : <span className="home-placeholder">image goes here</span>
        }
      </div>

      <p className="detail-title">{artwork.title}</p>
      <p className="detail-meta">{artwork.year}</p>

      {artwork.description && (
        <p className="detail-description">{artwork.description}</p>
      )}
    </main>
  );
}
