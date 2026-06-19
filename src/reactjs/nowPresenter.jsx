// reactjs/nowPresenter.jsx
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";
import { NowView } from "../views/nowView.jsx";
import { nowEntries } from "../data/index.js";

export const Now = observer(function Now({ model }) {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || model.currentSubTab;

  const filtered = tab
    ? nowEntries.filter((e) => String(e.year) === tab)
    : nowEntries;

  return (
    <main className="main main--now">
      <NowView entries={filtered} />
    </main>
  );
});
