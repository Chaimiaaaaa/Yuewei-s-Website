// reactjs/artDetailPresenter.jsx
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { ArtDetailView } from "../views/artDetailView.jsx";
import { artworks } from "../data/index.js";

export const ArtDetail = observer(function ArtDetail({ model }) {
  const { id } = useParams();
  const artwork = artworks.find((a) => a.id === id) || null;
  return <ArtDetailView artwork={artwork} />;
});
