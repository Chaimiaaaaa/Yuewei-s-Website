// views/artDetailView.jsx
import { useGoBack } from "./useGoBack.js";
import { SmartImg } from "./SmartImg.jsx";

export function ArtDetailView({ artwork }) {
  const goBack = useGoBack("/art");

  if (!artwork) return <main className="main"><p className="state-msg">Artwork not found.</p></main>;

  return (
    <main className="main">
      <span className="detail-back" onClick={goBack}>←︎ Back</span>

      <div className="detail-image-wrap">
        {artwork.image
          ? <SmartImg lazy={false} src={artwork.image} alt={artwork.title} />
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
