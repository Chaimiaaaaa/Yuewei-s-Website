// views/mobileSubnavView.jsx
// Phone only (the sidebar is hidden there): a row of tabs under the top nav
// with the current page's sub-sections, e.g. Art → All · Fanart · Side Quests.
// Uses the same items as the sidebar. Scrolls sideways if there are many.

export function MobileSubnavView({ currentPage, expandedItems, activeSubItem, onPageClickCB, onSubItemClickCB }) {
  const subItems = expandedItems[currentPage] || [];
  if (subItems.length === 0) return null;

  // About has no "All" view — Profile is its default page
  const hasAll = currentPage !== "about";
  const isActive = (value) =>
    activeSubItem ? activeSubItem === value : !hasAll && value === subItems[0].value;

  return (
    <nav className="mobile-subnav" aria-label="Sections">
      {hasAll && (
        <button
          className={"mobile-subnav__tab" + (!activeSubItem ? " mobile-subnav__tab--active" : "")}
          onClick={() => onPageClickCB(currentPage)}
        >
          All
        </button>
      )}
      {subItems.map((item) => (
        <button
          key={item.value}
          className={"mobile-subnav__tab" + (isActive(item.value) ? " mobile-subnav__tab--active" : "")}
          onClick={() => onSubItemClickCB(item.value)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
