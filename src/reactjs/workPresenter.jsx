// reactjs/workPresenter.jsx
import { observer } from "mobx-react-lite";
import { useSearchParams, useNavigate } from "react-router-dom";
import { WorkView } from "../views/workView.jsx";
import { projects } from "../data/index.js";

const sortedProjects = [...projects].sort((a, b) => Number(b.year) - Number(a.year));

export const Work = observer(function Work({ model }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const openId  = searchParams.get("open");
  const yearTab = searchParams.get("tab");
  const openIndex = openId ? sortedProjects.findIndex((p) => p.id === openId) : -1;

  function onReadMoreCB(projectId) {
    navigate("/work/" + projectId);
  }

  // Remember the open book page in the URL (?open=<project id>), so a
  // refresh — or coming back from "Read more" — lands on the same page.
  function onPageChangeCB(projectId) {
    const next = new URLSearchParams(searchParams);
    if (projectId) next.set("open", projectId);
    else next.delete("open");
    setSearchParams(next, { replace: true });
  }

  return (
    <WorkView
      projects={sortedProjects}
      initialOpenIndex={openIndex}
      yearTab={yearTab}
      onReadMoreCB={onReadMoreCB}
      onPageChangeCB={onPageChangeCB}
    />
  );
});
