// views/workView.jsx
import { useState, useEffect, useRef } from "react";

export function WorkView({ projects, initialOpenIndex, yearTab, onReadMoreCB }) {
  const [isOpen, setIsOpen]             = useState(initialOpenIndex >= 0);
  const [isClosing, setIsClosing]       = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialOpenIndex >= 0 ? initialOpenIndex : 0);
  const [flipping, setFlipping]         = useState(false);
  const [flipDir, setFlipDir]           = useState(null);
  const [lightboxSrc, setLightboxSrc]   = useState(null);

  const dragStartX = useRef(null);
  const bookRef    = useRef(null);
  const detailRef  = useRef(null);
  const total      = projects.length;

  useEffect(() => {
    function onKeyDownCB(e) {
      if (e.key === "Escape") setLightboxSrc(null);
    }
    window.addEventListener("keydown", onKeyDownCB);
    return () => window.removeEventListener("keydown", onKeyDownCB);
  }, []);

  function openACB() { setIsOpen(true); setCurrentIndex(0); }

  function closeACB() {
    if (isClosing) return;
    setIsClosing(true);
   
    setTimeout(() => { setIsOpen(false); setIsClosing(false); setCurrentIndex(0); }, 480);
  }

  function goToACB(nextIndex) {
    if (flipping) return;
    if (nextIndex >= total) { closeACB(); return; }
    if (nextIndex < 0)      { closeACB(); return; }
    const dir = nextIndex > currentIndex ? "left" : "right";
    setFlipDir(dir);
    setFlipping(true);
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setFlipping(false);
      setFlipDir(null);
     
    }, 420);
  }

  function onDragStartCB(e) {
    dragStartX.current = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;
  }

  function onDragEndCB(e) {
    if (dragStartX.current === null) return;
    const endX = e.type === "touchend" ? e.changedTouches[0].clientX : e.clientX;
    const delta = dragStartX.current - endX;
    dragStartX.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta > 0) goToACB(currentIndex + 1);
    else           goToACB(currentIndex - 1);
  }

  // ── render a single image block ──
  function renderImgCB(img, key) {
    const widthClass = {
      "full":       "gl-img--full",
      "two-thirds": "gl-img--two-thirds",
      "half":       "gl-img--half",
    }[img.width] || "gl-img--full";

    const classes = ["gl-img", widthClass];
    if (img.blend)            classes.push("gl-img--blend");
    if (img.border === false) classes.push("gl-img--no-border");
    if (img.square)           classes.push("gl-img--square");

    return (
      <div key={key} className={classes.join(" ")} onClick={() => setLightboxSrc(img.src)}>
        <img src={img.src} alt={img.caption || ""} />
        {img.caption && <p className="gl-img__caption">{img.caption}</p>}
      </div>
    );
  }

  // ── render a video block ──
  //   { video: "/path.mp4", width, border, autoplay, poster, caption }
  function renderVideoCB(item, key) {
    const widthClass = {
      "full":       "gl-img--full",
      "two-thirds": "gl-img--two-thirds",
      "half":       "gl-img--half",
    }[item.width] || "gl-img--full";

    const classes = ["gl-img", "gl-video", widthClass];
    if (item.border === false) classes.push("gl-img--no-border");

    return (
      <div key={key} className={classes.join(" ")}>
        <video
          src={item.video}
          poster={item.poster}
          controls={!item.autoplay}
          autoPlay={!!item.autoplay}
          muted={!!item.autoplay}
          loop={!!item.autoplay}
          playsInline
          preload="metadata"
        />
        {item.caption && <p className="gl-img__caption">{item.caption}</p>}
      </div>
    );
  }

  // ── render horizontal scroll strip ──
  function renderScrollCB(items, key) {
    const stripRef = { current: null };
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    function onMouseDownCB(e) {
      isDown = true;
      startX = e.pageX - stripRef.current.offsetLeft;
      scrollLeft = stripRef.current.scrollLeft;
      stripRef.current.style.cursor = "grabbing";
    }
    function onMouseUpCB() {
      isDown = false;
      if (stripRef.current) stripRef.current.style.cursor = "grab";
    }
    function onMouseMoveCB(e) {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - stripRef.current.offsetLeft;
      stripRef.current.scrollLeft = scrollLeft - (x - startX);
    }

    return (
      <div
        key={key}
        className="gl-scroll"
        ref={(el) => { stripRef.current = el; }}
        onMouseDown={onMouseDownCB}
        onMouseUp={onMouseUpCB}
        onMouseLeave={onMouseUpCB}
        onMouseMove={onMouseMoveCB}
      >
        {items.map((img, i) => (
          <div
            key={i}
            className={"gl-scroll__item" + (img.border === true ? " gl-scroll__item--border" : "")}
            onClick={() => setLightboxSrc(img.src)}
          >
            <img src={img.src} alt={img.caption || ""} />
          </div>
        ))}
      </div>
    );
  }

  // ── render gallery from data.js images array ──
  function renderGalleryACB(images) {
    return images
      .filter((item) => !item.readMore && (item.src || item.video || item.row || item.scroll || item.group))
      .map((item, i) => {
        if (item.video) return renderVideoCB(item, i);
        if (item.group) {
          return (
            <div key={i} className="gl-group">
              {item.group.map((subItem, j) => {
                if (subItem.row) {
                  return (
                    <div key={j} className="gl-row">
                      {subItem.row.map((img, k) => renderImgCB(img, k))}
                    </div>
                  );
                }
                return renderImgCB(subItem, j);
              })}
            </div>
          );
        }
        if (item.scroll) return renderScrollCB(item.scroll, i);
        if (item.row) {
          return (
            <div key={i} className="gl-row">
              {item.row.map((img, j) => renderImgCB(img, j))}
            </div>
          );
        }
        return renderImgCB(item, i);
      });
  }

  // ── year cards view ──
  if (yearTab) {
    const yearProjects = projects.filter((p) => String(p.year) === yearTab);
    return (
      <main className="main work-main">
        <div className="work-cards-strip">
          {yearProjects.map((p) => (
            <div key={p.id} className="work-card" onClick={() => onReadMoreCB(p.id)}>
              <div className="work-card__img-wrap">
                {p.cover
                  ? <img src={p.cover} alt={p.title} />
                  : <div className="work-card__placeholder" />
                }
              </div>
              <p className="work-card__title">{p.title}</p>
              <p className="work-card__category">{p.category}</p>
            </div>
          ))}
        </div>
      </main>
    );
  }

  const project    = projects[currentIndex];
  const flipClass  = flipping ? " book__spread--flip-" + flipDir : "";
  const closeClass = isClosing ? " book__open--closing" : "";

  return (
    <main className="main work-main">
      <div className="book-wrap" ref={bookRef}>

        {!isOpen ? (
          <div className="book__closed" onClick={openACB}>
            <img src="/images/work/bookfront.webp" alt="Portfolio" className="book__cover-img" />
            <span className="book__closed-hint">tap to open</span>
          </div>
        ) : (
          <div
            className={"book__open" + closeClass}
            onMouseDown={onDragStartCB}
            onMouseUp={onDragEndCB}
            onTouchStart={onDragStartCB}
            onTouchEnd={onDragEndCB}
          >
            <div className={"book__spread" + flipClass}>
              <div className="book__spine" />
              <div className="book__half book__half--left"  onClick={() => goToACB(currentIndex - 1)} />
              <div className="book__half book__half--right" onClick={() => goToACB(currentIndex + 1)} />
              {project.cover
                ? <img className="book__img" src={project.cover} alt={project.title} />
                : <div className="book__placeholder">
                    <span className="book__placeholder-title">{project.title}</span>
                    <span className="book__placeholder-sub">{project.year} · {project.category}</span>
                  </div>
              }
              <button
                className="book__down-hint"
                onClick={() => detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
              >
                view details ↓︎
              </button>
            </div>

            <div className="book__caption">
              <span className="book__caption-title">{project.title}</span>
              <span className="book__caption-year">{project.year}</span>
            </div>

            <button className="book__close-btn" onClick={closeACB}>× close</button>
          </div>
        )}

        {isOpen && (
          <div className="book__indicator">
            <span className="book__arrow" onClick={() => goToACB(currentIndex - 1)}>←︎</span>
            <span className="book__page-label">{currentIndex + 1} / {total}</span>
            <span className="book__arrow" onClick={() => goToACB(currentIndex + 1)}>→︎</span>
          </div>
        )}

        {isOpen && (
          <button
            className="book__read-more"
            onClick={(e) => { e.stopPropagation(); onReadMoreCB(project.id); }}
          >
            Read more
          </button>
        )}
      </div>

      {isOpen && (
        <div className="work-detail" ref={detailRef}>
          <div className="work-detail__header">
            <p className="work-detail__title">{project.title}</p>
            <p className="work-detail__meta">{project.year} · {project.category}</p>
          </div>
          {project.description && (
            <p className="work-detail__desc">{project.description}</p>
          )}

          {project.links && project.links.length > 0 && (
            <div className="work-detail__links">
              {project.links.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noreferrer" className="work-detail__link">
                  {link.label} ↗︎
                </a>
              ))}
            </div>
          )}
          <div className="work-detail__gallery">
            {renderGalleryACB(project.images || [])}
          </div>
          <button
            className="work-detail__back-up"
            onClick={() => bookRef.current?.scrollIntoView({ behavior: "smooth" })}
          >
            ↑︎ back to book
          </button>
        </div>
      )}

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
