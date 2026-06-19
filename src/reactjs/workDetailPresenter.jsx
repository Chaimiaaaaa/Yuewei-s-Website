// reactjs/workDetailPresenter.jsx
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { WorkDetailView } from "../views/workDetailView.jsx";
import { projects } from "../data/index.js";

export const WorkDetail = observer(function WorkDetail({ model }) {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id) || null;
  return <WorkDetailView project={project} />;
});
