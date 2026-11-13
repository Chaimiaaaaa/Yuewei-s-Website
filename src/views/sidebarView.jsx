// views/sidebarView.jsx
import { asset } from "../asset.js";

const NAV_PAGES = ["Home", "Work", "Art", "Now", "About"];

export function SidebarView({ currentPage, expandedItems, activeSubItem, onPageClickCB, onSubItemClickCB }) {
  return (
    <aside className="sidebar">
      {/* Avatar icon at the top */}
      <div className="sidebar-avatar-wrap">
        <img
          className="sidebar-avatar"
          src={asset("/images/avatar.png")}
          alt="avatar"
        />
      </div>

      <div className="sidebar-nav">
        {NAV_PAGES.map((page) => {
          const pageKey = page.toLowerCase();
          const isActive = currentPage === pageKey;
          const subItems = expandedItems[pageKey] || [];

          return (
            <div key={pageKey} className="sidebar-section">
              <span
                className={"sidebar-page" + (isActive ? " sidebar-page--active" : " sidebar-page--dim")}
                onClick={() => onPageClickCB(pageKey)}
              >
                {page}
              </span>

              {isActive && subItems.length > 0 && (
                <div className="sidebar-subitems">
                  {subItems.map((item) => (
                    <span
                      key={item.value}
                      className={"sidebar-subitem" + (activeSubItem === item.value ? " sidebar-subitem--active" : "")}
                      onClick={() => onSubItemClickCB(item.value)}
                    >
                      {item.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
