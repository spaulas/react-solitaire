/* eslint-disable import/no-named-as-default */
import "./styles/index.less";
import React, { memo } from "react";
import { persistor, store } from "./redux/store";
import BaseApplication from "./react/App/index";
import { HashRouter } from "react-router-dom";
import IntlProvider from "./react/HocWrappers/IntlProvider/IntlProvider.component";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import packageJson from "../package.json";

const currentVersion = localStorage.getItem("version");

if (currentVersion !== packageJson.version) {
  localStorage.clear();
  localStorage.setItem("version", packageJson.version);
}

function App() {
  return (
    <div className="react-solitaire">
      <Provider store={store}>
        <HashRouter basename="/react-solitaire">
          <PersistGate persistor={persistor}>
            <IntlProvider>
              <BaseApplication />
            </IntlProvider>
          </PersistGate>
        </HashRouter>
      </Provider>
    </div>
  );
}

export default memo(App);
