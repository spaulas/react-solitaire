import columnsReducer from "./columns/columns.reducer";
import { combineReducers } from "redux";
import deckReducer from "./deck/deck.reducer";
import gameBoardReducer from "./gameBoard/gameBoard.reducer";
import goalReducer from "./goal/goal.reducer";

export const rootReducer = {
  Columns: columnsReducer,
  Deck: deckReducer,
  GameBoard: gameBoardReducer,
  Goal: goalReducer
};

export default combineReducers(rootReducer);
