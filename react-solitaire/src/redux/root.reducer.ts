import { combineReducers } from "redux";
import deckReducer from "./deck/deck.reducer";

export const rootReducer = {
  Deck: deckReducer
};

export default combineReducers(rootReducer);
