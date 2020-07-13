/* eslint-disable import/no-named-as-default */
import { createStore } from "redux";
import { persistStore } from "redux-persist";
import rootReducer from "./rootReducer";

const store = createStore(rootReducer);
const persistor = persistStore(store);

export default { store, persistor };
