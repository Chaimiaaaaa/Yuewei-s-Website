// reactjs/artPresenter.jsx
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";
import { ArtView } from "../views/artView.jsx";
import { artworks } from "../data/index.js";

export const Art = observer(function Art({ model }) {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || model.currentSubTab;

  const filtered = tab
    ? artworks.filter((a) => a.category === tab)
    : artworks;

  return <ArtView artworks={filtered} />;
});
