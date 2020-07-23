/* eslint-disable import/no-named-as-default */
import "./styles/index.less";
import React, { memo } from "react";
import { persistor, store } from "./redux/store";
import BaseApplication from "./react/App/index";
import { BrowserRouter } from "react-router-dom";
import IntlProvider from "./react/HocWrappers/IntlProvider/IntlProvider.component";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="react-solitaire">
      <Provider store={store}>
        <BrowserRouter>
          <PersistGate persistor={persistor}>
            <IntlProvider>
              <BaseApplication />
            </IntlProvider>
          </PersistGate>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default memo(App);
