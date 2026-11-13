// views/nowDetailView.jsx
import { lazyImg } from "./lazyImg.js";
import { useNavigate } from "react-router-dom";

export function NowDetailView({ item }) {
  const navigate = useNavigate();

  if (!item) return (
    <main className="main">
      <p className="state-msg">Entry not found.</p>
    </main>
  );

  function renderContentCB(block, i) {
    if (block.type === "text") {
      return <p key={i} className="now-detail__text">{block.value}</p>;
    }
    if (block.type === "img") {
      const widthClass = {
        "full":       "gl-img--full",
        "two-thirds": "gl-img--two-thirds",
        "half":       "gl-img--half",
      }[block.width] || "gl-img--full";
      return (
        <div key={i} className={"gl-img " + widthClass + (block.blend ? " gl-img--blend" : "")}>
          <img {...lazyImg(block.src)} alt="" />
          {block.caption && <p className="gl-img__caption">{block.caption}</p>}
        </div>
      );
    }
    if (block.type === "row") {
      return (
        <div key={i} className="gl-row">
          {block.images.map((img, j) => (
            <div key={j} className="gl-img" style={{ flex: 1, minWidth: 0 }}>
              <img {...lazyImg(img.src)} alt="" />
            </div>
          ))}
        </div>
      );
    }
    if (block.type === "scroll") {
      return (
        <div key={i} className="gl-scroll">
          {block.images.map((img, j) => (
            <div key={j} className="gl-scroll__item">
              <img {...lazyImg(img.src)} alt="" />
            </div>
          ))}
        </div>
      );
    }
    return null;
  }

  return (
    <main className="main">
      <span className="detail-back" onClick={() => navigate("/now")}>←︎ Back</span>

      <div className="now-detail__header">
        <span className="now-tag">{item.tag}</span>
        <h1 className="now-detail__title">{item.text}</h1>
      </div>

      <div className="now-detail__content">
        {(item.content || []).map((block, i) => renderContentCB(block, i))}
      </div>
    </main>
  );
}
