// views/aboutView.jsx
import { about } from "../data/index.js";
import { SmartImg } from "./SmartImg.jsx";

export function AboutView() {
  return (
    <main className="main about-main">

      {/* ── TOP: photo + info side by side ── */}
      <div className="about-top">
        <div className="about-photo">
          {about.photo
            ? <SmartImg lazy={false} src={about.photo} alt={about.name} />
            : <span className="about-photo-placeholder">your photo</span>
          }
        </div>

        <div className="about-info">
          <p className="about-name">{about.name}</p>
          <p className="about-pronouns">{about.pronouns}</p>
          <p className="about-bio">{about.bio}</p>

          <div className="about-contact">
            <a href={"mailto:" + about.email}>{about.email}</a>
            <a href={about.instagram} target="_blank" rel="noreferrer">Instagram · CHAIMIAAAAAA</a>
            <a href={about.xiaohongshu} target="_blank" rel="noreferrer">小红书 · shaolaifanwo1</a>
          </div>
        </div>
      </div>

      {/* ── BOTTOM: education + awards ── */}
      <div className="about-bottom">

        <div className="about-section">
          <p className="about-section-title">Education</p>
          {about.education.map((e, i) => (
            <div key={i} className="about-row">
              <span className="about-period">{e.period}</span>
              <span>
                <span>{e.school}</span>
                {e.major && <span className="about-major">{e.major}</span>}
                {e.honors && (
                  <ul className="about-honors">
                    {e.honors.map((h, j) => (
                      <li key={j}>{h}</li>
                    ))}
                  </ul>
                )}
              </span>
            </div>
          ))}
        </div>

        <div className="about-section">
          <p className="about-section-title">Competition</p>
          {about.awards.map((a, i) => (
            <div key={i} className="about-row">
              <span className="about-period">{a.period}</span>
              <span>
                <span>{a.title}</span>
                {a.result && <span className="about-major">{a.result}</span>}
                {a.description && <span className="about-major">{a.description}</span>}
              </span>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
