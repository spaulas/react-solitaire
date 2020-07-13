import columnsReducer from "./columns/columns.reducer";
import { combineReducers } from "redux";
import deckReducer from "./deck/deck.reducer";
import gameBoardReducer from "./gameBoard/gameBoard.reducer";
import goalReducer from "./goal/goal.reducer";
import highscoreReducer from "./highScores/highscores.reducer";
import joyrideReducer from "./joyride/joyride.reducer";
import pagesReducer from "./pages/pages.reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/user.reducer";

export const rootReducer = {
  Columns: columnsReducer,
  Deck: deckReducer,
  GameBoard: gameBoardReducer,
  Goal: goalReducer,
  Pages: pagesReducer,
  User: userReducer,
  HighScores: highscoreReducer,
  Joyride: joyrideReducer
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["GameBoard", "Pages", "Joyride"]
};
const combinedRootReducer = combineReducers(rootReducer);

export default persistReducer(persistConfig, combinedRootReducer);
