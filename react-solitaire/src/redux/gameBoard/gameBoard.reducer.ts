/* eslint-disable indent */
import GameBoardActionTypes, { CardType, GameMove } from "./gameBoard.types";
import {
  addGameHint,
  addGameMove,
  createRandomGame,
  removeGameMove,
  resetGameStatus,
  setInitialValues
} from "./gameBoard.utils";
import { ActionsCreators } from "./gameBoard.actions";

interface InitialGameBoard {
  // initial cards of each pile
  deckPile: Array<CardType>;
  flippedPile: Array<CardType>;
  column1Pile: Array<CardType>;
  column2Pile: Array<CardType>;
  column3Pile: Array<CardType>;
  column4Pile: Array<CardType>;
  column5Pile: Array<CardType>;
  column6Pile: Array<CardType>;
  column7Pile: Array<CardType>;
  goal1Pile: Array<CardType>;
  goal2Pile: Array<CardType>;
  goal3Pile: Array<CardType>;
  goal4Pile: Array<CardType>;
  gameFlag: boolean; // is toggled when a new game starts
  gameMoves: number; // number of moves a player has done throughout the game
  gamePaused: boolean; // flag indicating if the game is paused
  gameTime: number;
  gameHints: Array<Record<string, string>>;
  nHints: number;
  gamePreviousMoves: Array<GameMove>; // list of moves that can be undone
  gameNextMoves: Array<GameMove>; // list of moves that can be redone
  savingGame: boolean;
  leavingGame: boolean;
}

const INITIAL_GAME_BOARD: InitialGameBoard = {
  deckPile: [],
  flippedPile: [],
  column1Pile: [],
  column2Pile: [],
  column3Pile: [],
  column4Pile: [],
  column5Pile: [],
  column6Pile: [],
  column7Pile: [],
  goal1Pile: [],
  goal2Pile: [],
  goal3Pile: [],
  goal4Pile: [],
  gameFlag: false,
  gameMoves: 0,
  gamePaused: true,
  gameTime: 0,
  gameHints: [],
  nHints: 0,
  gamePreviousMoves: [],
  gameNextMoves: [],
  savingGame: false,
  leavingGame: false
};

const gameBoardReducer = (
  state = INITIAL_GAME_BOARD,
  action: ActionsCreators
) => {
  switch (action.type) {
    // ********************************************************
    // INITIAL SETTINGS ACTIONS

    /**
     * Creates an initial distribution of the cards and reset the game status
     */
    case GameBoardActionTypes.CREATE_GAME:
      return {
        ...createRandomGame(),
        ...resetGameStatus(state.gameFlag)
      };

    case GameBoardActionTypes.SET_INITIAL_GAME:
      const initialValues = setInitialValues(action.savedGame, state.gameFlag);
      return initialValues;

    case GameBoardActionTypes.EXIT_GAME:
      return {
        ...state,
        ...resetGameStatus(state.gameFlag),
        leavingGame: true
      };

    // ********************************************************
    //  GAME INFO/OPTIONS ACTIONS

    /**
     *  Resets the game and resets all the game values
     */
    case GameBoardActionTypes.TOGGLE_GAME_FLAG:
      return {
        ...state,
        ...resetGameStatus(state.gameFlag)
      };

    /**
     * Toggles the game paused flag (to pause/resume the game)
     */
    case GameBoardActionTypes.TIME_GAME:
      return { ...state, gamePaused: !state.gamePaused };

    /**
     * Save the game time
     */
    case GameBoardActionTypes.SAVE_GAME_TIME:
      return { ...state, gameTime: action.time, gamePaused: true };

    case GameBoardActionTypes.SAVING_GAME:
      return { ...state, savingGame: true };

    /**
     * Adds a hint
     */
    case GameBoardActionTypes.ADD_GAME_HINT:
      const addGameHintResult = addGameHint(
        state.gameHints,
        state.nHints,
        action.source,
        action.target
      );
      return { ...state, ...addGameHintResult };

    // ********************************************************
    // GAME MOVES' HISTORY ACTIONS

    /**
     * Adds a move to the list of previous moves and reset the list of next moves
     */
    case GameBoardActionTypes.ADD_GAME_MOVE:
      const addResult = addGameMove(
        state.gamePreviousMoves,
        action.move,
        state.gameMoves
      );

      return {
        ...state,
        ...addResult
      };

    /**
     * Adds the top move from the list of previous moves to the list of next moves
     */
    case GameBoardActionTypes.REMOVE_GAME_MOVE:
      const removeResult = removeGameMove(
        "gamePreviousMoves",
        "gameNextMoves",
        state.gamePreviousMoves,
        state.gameNextMoves,
        state.gameMoves
      );
      return { ...state, ...removeResult };

    /**
     * Adds the top move from the list of next moves to the list of previous moves
     */
    case GameBoardActionTypes.RE_ADD_GAME_MOVE:
      const reAddResult = removeGameMove(
        "gameNextMoves",
        "gamePreviousMoves",
        state.gameNextMoves,
        state.gamePreviousMoves,
        state.gameMoves
      );
      return { ...state, ...reAddResult };

    // ********************************************************

    default:
      return state;
  }
};

export default gameBoardReducer;
