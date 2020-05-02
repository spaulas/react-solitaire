/* eslint-disable import/no-named-as-default */
import { createStore } from "redux";
import rootReducer from "./rootReducer";

export const store = createStore(rootReducer);

export default store;
