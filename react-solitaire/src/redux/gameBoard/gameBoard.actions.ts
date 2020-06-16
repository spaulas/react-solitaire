import GameBoardActionTypes from "./gameBoard.types";
import { ValueOf } from "../../global";

/**
 * Creates an initial distribution of the cards
 */
const createGame = () => ({
  type: GameBoardActionTypes.CREATE_GAME
});

/**
 * Toggles the game flag to reset the game
 */
const toggleGameFlag = () => ({
  type: GameBoardActionTypes.TOGGLE_GAME_FLAG
});

/**
 * Adds a move to the total moves of the game
 */
const addGameMove = () => ({
  type: GameBoardActionTypes.ADD_GAME_MOVE
});

const actionsCreators = Object.freeze({
  createGame,
  toggleGameFlag,
  addGameMove
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
