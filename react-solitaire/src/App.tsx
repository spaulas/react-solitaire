import "./styles/index.less";
import React, { memo } from "react";
import BaseApplication from "./react/index";

function App() {
  return (
    <div className="react-solitaire">
      <BaseApplication />
    </div>
  );
}

export default memo(App);
