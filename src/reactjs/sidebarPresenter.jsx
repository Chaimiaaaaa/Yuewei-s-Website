// reactjs/sidebarPresenter.jsx
import { observer } from "mobx-react-lite";
import { useNavigate, useLocation } from "react-router-dom";
import { SidebarView } from "../views/sidebarView.jsx";
import { projects, artworks, nowEntries } from "../data/index.js";

const nowYears = [...new Set(nowEntries.map((e) => e.year))].sort((a, b) => b - a);
const sortedProjects = [...projects].sort((a, b) => Number(b.year) - Number(a.year));
const workYears = [...new Set(projects.map((p) => String(p.year)))].sort((a, b) => b - a);

// all possible sub-items per page
const EXPANDED_ITEMS = {
  home:  [],
  work:  workYears.map((y) => ({ label: y, value: y })),
  art:   [
    { label: "Fanart",       value: "kpop" },
    { label: "Side Quests",  value: "doll" },
  ],
  now:   nowYears.map((y) => ({ label: String(y), value: String(y) })),
  about: [
    { label: "Profile", value: "profile" },
    { label: "Ask me",  value: "ask"     },
  ],
};

const PAGE_ROUTES = {
  home:  "/",
  work:  "/work",
  art:   "/art",
  now:   "/now",
  about: "/about",
};

export const Sidebar = observer(function Sidebar({ model }) {
  const navigate = useNavigate();
  const { pathname, search } = useLocation ? useLocation() : { pathname: "", search: "" };

  // read active sub tab from URL
  const searchParams = new URLSearchParams(search);
  const urlTab = searchParams.get("tab");
  const activeSubItem = urlTab || model.currentSubTab;

  function onPageClickCB(pageKey) {
    model.setCurrentPage(pageKey);
    model.setCurrentSubTab(null);
    navigate(PAGE_ROUTES[pageKey]);
  }

  function onSubItemClickCB(value) {
    model.setCurrentSubTab(value);
    if (model.currentPage === "work") {
      navigate("/work?tab=" + value);
    } else if (model.currentPage === "art") {
      navigate("/art?tab=" + value);
    } else if (model.currentPage === "now") {
      navigate("/now?tab=" + value);
    } else if (model.currentPage === "about") {
      navigate("/about?tab=" + value);
    }
  }

  return (
    <SidebarView
      currentPage={model.currentPage}
      expandedItems={EXPANDED_ITEMS}
      activeSubItem={activeSubItem}
      onPageClickCB={onPageClickCB}
      onSubItemClickCB={onSubItemClickCB}
    />
  );
});
