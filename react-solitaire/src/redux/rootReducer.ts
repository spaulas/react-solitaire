import { combineReducers } from "redux";
import deckReducer from "./deck/deck.reducer";
import gameBoardReducer from "./gameBoard/gameBoard.reducer";

export const rootReducer = {
  Deck: deckReducer,
  GameBoard: gameBoardReducer
};

export default combineReducers(rootReducer);
