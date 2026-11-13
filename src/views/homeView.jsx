// views/homeView.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { asset } from "../asset.js";

const DECORATIVE = [
  { key: "desk",   src: asset("/images/home/desk.webp"),   style: { left: "-1%",  top: "-3%", width: "95%" } },
  { key: "chichi", src: asset("/images/home/chichi.png"), style: { left: "-5%",  top: "35%",  width: "25%"  } },
  { key: "drink",  src: asset("/images/home/drink.webp"),  style: { left: "35%",  top: "-40%", width: "26%"  } },
  { key: "tuniu",  src: asset("/images/home/tuniu.webp"),  style: { left: "65%",  top: "-5%",  width: "22%"  } },
];

const INTERACTIVE = [
  { key: "about", src: asset("/images/home/about.webp"), label: "About", route: "/about", style: { left: "10%", top: "5%",  width: "25%" } },
  { key: "work",  src: asset("/images/home/work.webp"),  label: "Work",  route: "/work",  style: { left: "28.3%", top: "23%", width: "32%" } },
  { key: "now",   src: asset("/images/home/now.png"),   label: "Now",   route: "/now",   style: { left: "48%", top: "48%", width: "25%" } },
  { key: "art",   src: asset("/images/home/art.webp"),   label: "Art",   route: "/art",   style: { left: "5%", top: "36.0%", width: "30%" } },
];

export function HomeView() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  return (
    <main className="home-scene-wrap">
      <div className="home-scene">

        {DECORATIVE.map((d) => (
          <img
            key={d.key}
            className="home-layer"
            src={d.src}
            alt=""
            style={d.style}
          />
        ))}

        {/* clickable items sway gently (in sync, neighbours tilting opposite
            ways) so they look alive; decorations above stay still */}
        {INTERACTIVE.map((item, i) => (
          <div
            key={item.key}
            className={"home-item-wrap home-sway" + (i % 2 ? " home-sway--reverse" : "")}
            style={item.style}
            onMouseEnter={() => setHovered(item.key)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => navigate(item.route)}
          >
            <div style={{ position: "relative" }}>
              <img
                className={"home-item" + (hovered === item.key ? " home-item--hovered" : "")}
                src={item.src}
                alt={item.label}
              />
              {hovered === item.key && (
                <span className="home-item-label">{item.label}</span>
              )}
            </div>
          </div>
        ))}

      </div>
    </main>
  );
}
