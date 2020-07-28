import { ExplicitAny, ValueOf } from "../../global";
import GameBoardActionTypes, { GameMove } from "./gameBoard.types";

// ********************************************************
// INITIAL SETTINGS ACTIONS

/**
 * Creates an initial distribution of the cards
 */
const createGame = () => ({
  type: GameBoardActionTypes.CREATE_GAME
});

const setInitialSavedGame = (savedGame: ExplicitAny) => ({
  type: GameBoardActionTypes.SET_INITIAL_GAME,
  savedGame
});

const exitGame = () => ({
  type: GameBoardActionTypes.EXIT_GAME
});

// ********************************************************
// GAME INFO/OPTIONS ACTIONS

/**
 * Toggles the game flag to reset the game
 */
const toggleGameFlag = () => ({
  type: GameBoardActionTypes.TOGGLE_GAME_FLAG
});

/**
 * Pauses and Resumes the game
 */
const timeGame = () => ({
  type: GameBoardActionTypes.TIME_GAME
});

/**
 * Stores the game current time
 */
const saveGameTime = (time: number) => ({
  type: GameBoardActionTypes.SAVE_GAME_TIME,
  time
});

const savingGame = () => ({
  type: GameBoardActionTypes.SAVING_GAME
});

/**
 * Counts the number of hints given in a game
 */
const addGameHint = (source?: string, target?: string) => ({
  type: GameBoardActionTypes.ADD_GAME_HINT,
  source,
  target
});

// ********************************************************
// GAME MOVES' HISTORY ACTIONS

/**
 * Adds a move to the total moves of the game
 * @param source field where the move started
 * @param target field where the move ended
 * @param cards cards that where exchanged (can be undefined for deck reset moves)
 * @param movementWithFlip flag indicating if the move caused a card to flip
 */
const addGameMove = (move: GameMove) => ({
  type: GameBoardActionTypes.ADD_GAME_MOVE,
  move
});

/**
 * Removes a move from the list of game moves
 */
const removeGameMove = () => ({
  type: GameBoardActionTypes.REMOVE_GAME_MOVE
});

/**
 * Adds a move that was redone to the list of game moves
 */
const reAddGameMove = () => ({
  type: GameBoardActionTypes.RE_ADD_GAME_MOVE
});

// ********************************************************

const actionsCreators = Object.freeze({
  createGame,
  setInitialSavedGame,
  exitGame,
  toggleGameFlag,
  timeGame,
  saveGameTime,
  savingGame,
  addGameHint,
  addGameMove,
  removeGameMove,
  reAddGameMove
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
