// views/homeView.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DECORATIVE = [
  { key: "desk",   src: "/images/home/desk.png",   style: { left: "-5%",  top: "-4%", width: "100%" } },
  { key: "chichi", src: "/images/home/chichi.png", style: { left: "-5%",  top: "35%",  width: "25%"  } },
  { key: "drink",  src: "/images/home/drink.png",  style: { left: "35%",  top: "-40%", width: "26%"  } },
  { key: "tuniu",  src: "/images/home/tuniu.png",  style: { left: "65%",  top: "-5%",  width: "22%"  } },
];

const INTERACTIVE = [
  { key: "about", src: "/images/home/about.png", label: "About", route: "/about", style: { left: "10%", top: "5%",  width: "25%" } },
  { key: "work",  src: "/images/home/work.png",  label: "Work",  route: "/work",  style: { left: "5%",  top: "30%", width: "32%" } },
  { key: "now",   src: "/images/home/now.png",   label: "Now",   route: "/now",   style: { left: "33%", top: "27%", width: "25%" } },
  { key: "art",   src: "/images/home/art.png",   label: "Art",   route: "/art",   style: { left: "40%", top: "42%", width: "30%" } },
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

        {INTERACTIVE.map((item) => (
          <div
            key={item.key}
            className="home-item-wrap"
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
