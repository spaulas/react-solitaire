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
const addGameMove = (
  source: string,
  target: string,
  nCards = 0,
  movementWithFlip?: boolean
) => ({
  type: GameBoardActionTypes.ADD_GAME_MOVE,
  source,
  target,
  nCards,
  movementWithFlip
});

/**
 * Removes a move from the list of game moves
 */
const removeGameMove = () => ({
  type: GameBoardActionTypes.REMOVE_GAME_MOVE
});

/**
 * Pauses and Resumes the game
 */
const timeGame = () => ({
  type: GameBoardActionTypes.TIME_GAME
});

const actionsCreators = Object.freeze({
  createGame,
  toggleGameFlag,
  addGameMove,
  removeGameMove,
  timeGame
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
