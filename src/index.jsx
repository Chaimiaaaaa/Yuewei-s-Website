// index.jsx  –  entry point
import React from "react";
import { createRoot } from "react-dom/client";
import { ReactRoot } from "./reactjs/ReactRoot.jsx";
import { reactiveModel } from "./mobxReactiveModel.js";
import "./style.css";

createRoot(document.getElementById("root")).render(
  <ReactRoot model={reactiveModel} />
);
