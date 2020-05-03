/* eslint-disable import/no-named-as-default */
import "./styles/index.less";
import React, { memo } from "react";
import BaseApplication from "./react/index";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  // eslint-disable-next-line no-console
  console.log("DOCUMENT = ", document.body);
  return (
    <div className="react-solitaire">
      <Provider store={store}>
        <BaseApplication />
      </Provider>
    </div>
  );
}

export default memo(App);
