import GameBoardActionTypes from "./gameBoard.types";
import { ValueOf } from "../../global";

/**
 * Creates an initial distribution of the cards
 */
const createGame = () => ({
  type: GameBoardActionTypes.CREATE_GAME
});

/**
 * Toggles the timer flag to reset the game timer
 */
const toggleTimerFlag = () => ({
  type: GameBoardActionTypes.TOGGLE_TIMER_FLAG
});

const actionsCreators = Object.freeze({
  createGame,
  toggleTimerFlag
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
