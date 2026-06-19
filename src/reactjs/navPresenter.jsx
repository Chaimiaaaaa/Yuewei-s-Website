// reactjs/navPresenter.jsx
import { observer } from "mobx-react-lite";
import { NavView } from "../views/navView.jsx";

export const Nav = observer(function Nav({ model }) {
  return <NavView name="Chaimi" />;
});
