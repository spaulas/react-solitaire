import columnsReducer from "./columns/columns.reducer";
import { combineReducers } from "redux";
import deckReducer from "./deck/deck.reducer";
import gameBoardReducer from "./gameBoard/gameBoard.reducer";
import goalReducer from "./goal/goal.reducer";
import pagesReducer from "./pages/pages.reducer";

export const rootReducer = {
  Columns: columnsReducer,
  Deck: deckReducer,
  GameBoard: gameBoardReducer,
  Goal: goalReducer,
  Pages: pagesReducer
};

export default combineReducers(rootReducer);
