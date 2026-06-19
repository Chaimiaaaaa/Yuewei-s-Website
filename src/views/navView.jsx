// views/navView.jsx
import { Link, useLocation } from "react-router-dom";

const PAGES = [
  { path: "/",      label: "Home"  },
  { path: "/work",  label: "Work"  },
  { path: "/art",   label: "Art"   },
  { path: "/now",   label: "Now"   },
  { path: "/about", label: "About" },
];

export function NavView({ name }) {
  const { pathname } = useLocation();

  return (
    <nav className="nav">
      <span className="nav-name">{name}</span>
      <ul className="nav-links">
        {PAGES.map(({ path, label }) => (
          <li key={path}>
            <Link
              to={path}
              className={"nav-link" + (pathname === path ? " active" : "")}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
