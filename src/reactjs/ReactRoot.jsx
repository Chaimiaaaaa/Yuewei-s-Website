// reactjs/ReactRoot.jsx
import { observer } from "mobx-react-lite";
import { createHashRouter, RouterProvider, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { Nav }            from "./navPresenter.jsx";
import { Sidebar }        from "./sidebarPresenter.jsx";
import { Work }           from "./workPresenter.jsx";
import { WorkDetail }     from "./workDetailPresenter.jsx";
import { Art }            from "./artPresenter.jsx";
import { ArtDetail }      from "./artDetailPresenter.jsx";
import { Now }            from "./nowPresenter.jsx";
import { NowDetail }      from "./nowDetailPresenter.jsx";
import { About }          from "./aboutPresenter.jsx";
import { HomeView }       from "../views/homeView.jsx";

// Shell wraps every page: nav + sidebar + content
const Shell = observer(function Shell({ model }) {
  const { pathname } = useLocation();

  // sync model.currentPage when route changes
  useEffect(() => {
    const page = pathname.split("/")[1] || "home";
    model.setCurrentPage(page);
  }, [pathname]);

  return (
    <div className="layout">
      <Nav model={model} />
      <div className="body">
        <Sidebar model={model} />
        <Outlet />
      </div>
    </div>
  );
});

function makeRouter(model) {
  return createHashRouter([
    {
      path: "/",
      element: <Shell model={model} />,
      children: [
        { index: true,          element: <HomeView /> },
        { path: "work",         element: <Work model={model} /> },
        { path: "work/:id",     element: <WorkDetail model={model} /> },
        { path: "art",          element: <Art model={model} /> },
        { path: "art/:id",      element: <ArtDetail model={model} /> },
        { path: "now",          element: <Now model={model} /> },
        { path: "now/:id",      element: <NowDetail model={model} /> },
        { path: "about",        element: <About model={model} /> },
      ],
    },
  ]);
}

export const ReactRoot = observer(function ReactRoot({ model }) {
  return <RouterProvider router={makeRouter(model)} />;
});
