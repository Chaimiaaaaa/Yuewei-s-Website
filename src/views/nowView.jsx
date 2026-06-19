// views/nowView.jsx
import { useState } from "react";

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
        <img src={block.src} alt="" />
        {block.caption && <p className="gl-img__caption">{block.caption}</p>}
      </div>
    );
  }
  if (block.type === "row") {
    return (
      <div key={i} className="gl-row">
        {block.images.map((img, j) => (
          <div key={j} className="gl-img" style={{ flex: 1, minWidth: 0 }}>
            <img src={img.src} alt="" />
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
            <img src={img.src} alt="" />
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export function NowView({ entries }) {
  const [activeItem, setActiveItem] = useState(null);
  const [visible, setVisible]       = useState(false);
  const [panelOpen, setPanelOpen]   = useState(false);

  const [panelClosing, setPanelClosing] = useState(false);

  function openItemACB(item) {
    if (activeItem?.id === item.id) return;

    if (panelOpen) {
      setVisible(false);
      setTimeout(() => {
        setActiveItem(item);
        setVisible(true);
      }, 180);
    } else {
      setActiveItem(item);
      setPanelOpen(true);
      setTimeout(() => setVisible(true), 50);
    }
  }

  function closeACB() {
    setVisible(false);
    setPanelClosing(true);
    setTimeout(() => {
      setPanelOpen(false);
      setPanelClosing(false);
      setActiveItem(null);
    }, 380);
  }

  return (
    <div className={"now-layout" + (panelOpen ? " now-layout--open" : "")}>

      {/* ── LIST ── */}
      <div className="now-list">
        {entries.map((entry) => (
          <div key={entry.id} className="now-entry">
            <p className="now-month">{entry.month}</p>
            {entry.items.map((item, i) => {
              const clickable = !!item.id;
              const isActive  = activeItem?.id === item.id;
              return (
                <div
                  key={i}
                  className={
                    "now-item" +
                    (clickable ? " now-item--clickable" : "") +
                    (isActive  ? " now-item--active"    : "")
                  }
                  onClick={() => clickable && openItemACB(item)}
                >
                  <span className="now-tag">{item.tag}</span>
                  <span className="now-text">
                    {item.text}
                    {clickable && <span className="now-arrow"> →</span>}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* ── DETAIL PANEL ── */}
      {panelOpen && (
        <div className={"now-detail-panel" + (panelClosing ? " now-detail-panel--closing" : "")}>
          <button className="now-detail__close" onClick={closeACB}>×</button>
          <div className={"now-detail__inner" + (visible ? " now-detail__inner--visible" : "")}>
            {activeItem && (
              <>
                <div className="now-detail__header">
                  <span className="now-tag">{activeItem.tag}</span>
                  <h1 className="now-detail__title">{activeItem.text}</h1>
                </div>
                <div className="now-detail__content">
                  {(activeItem.content || []).map((block, i) => renderContentCB(block, i))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
