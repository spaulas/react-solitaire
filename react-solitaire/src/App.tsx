/* eslint-disable import/no-named-as-default */
import "./styles/index.less";
import React, { memo } from "react";
import BaseApplication from "./react/App/index";
import IntlProvider from "./react/components/HocWrappers/IntlProvider/IntlProvider.component";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <div className="react-solitaire">
      <Provider store={store.store}>
        <PersistGate persistor={store.persistor}>
          <IntlProvider>
            <BaseApplication />
          </IntlProvider>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default memo(App);
