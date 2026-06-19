// reactjs/nowDetailPresenter.jsx
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { NowDetailView } from "../views/nowDetailView.jsx";
import { nowEntries } from "../data/index.js";

// flatten all items from all entries to find by id
const allItems = nowEntries.flatMap((entry) => entry.items);

export const NowDetail = observer(function NowDetail({ model }) {
  const { id } = useParams();
  const item = allItems.find((item) => item.id === id) || null;
  return <NowDetailView item={item} />;
});
