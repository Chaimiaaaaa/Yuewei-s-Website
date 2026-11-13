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
      {/* "Chai" in pink, "mi" in green */}
      <span className="nav-name">
        <span className="nav-name__pink">{name.slice(0, 4)}</span>
        <span className="nav-name__green">{name.slice(4)}</span>
      </span>
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
