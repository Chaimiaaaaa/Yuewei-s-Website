// views/artView.jsx
// Clicking a picture opens it enlarged on top of the grid (no new page).
// Click anywhere around the picture, the ×, or press Esc to go back.
import { useState } from "react";
import { SmartImg } from "./SmartImg.jsx";
import { Lightbox } from "./Lightbox.jsx";

export function ArtView({ artworks }) {
  const [openArt, setOpenArt] = useState(null);

  const caption = openArt && [openArt.year, openArt.description].filter(Boolean).join(" · ");

  return (
    <main className="main">
      <div className="masonry-grid">
        {artworks.map((a) => (
          <div key={a.id} className="card" onClick={() => a.image && setOpenArt(a)}>
            <div className="card-thumb">
              {a.image
                ? <SmartImg src={a.image} alt={a.title} />
                : <div className="card-placeholder">no image yet</div>
              }
            </div>
          </div>
        ))}
      </div>

      {openArt && (
        <Lightbox
          src={openArt.image}
          alt={openArt.title}
          caption={caption}
          onClose={() => setOpenArt(null)}
        />
      )}
    </main>
  );
}
