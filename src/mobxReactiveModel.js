// ─────────────────────────────────────────
//  mobxReactiveModel.js
// ─────────────────────────────────────────
import { model } from "./portfolioModel.js";
import { observable } from "mobx";

export const reactiveModel = observable(model);

window.myModel = reactiveModel; // debug
