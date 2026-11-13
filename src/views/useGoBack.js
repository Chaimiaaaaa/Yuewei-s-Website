// ─────────────────────────────────────────
//  useGoBack.js  –  "← Back" that returns to the page you came from
//  (e.g. Work → 2024 cards → project → Back lands on the 2024 cards again).
//  If the page was opened directly (shared link, refresh, new tab) there is
//  no previous page inside the site, so it goes to `fallback` instead.
// ─────────────────────────────────────────
import { useNavigate, useLocation } from "react-router-dom";

export function useGoBack(fallback) {
  const navigate = useNavigate();
  const location = useLocation();
  // React Router gives the very first page of a visit the key "default"
  const cameFromInsideSite = location.key !== "default";

  return () => {
    if (cameFromInsideSite) navigate(-1);
    else navigate(fallback, { replace: true });
  };
}
