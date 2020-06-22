/* eslint-disable indent */
import GameBoardActionTypes, { CardType } from "./gameBoard.types";
import { ActionsCreators } from "./gameBoard.actions";
import { createRandomGame } from "./gameBoard.utils";

interface InitialGameBoard {
  deckPile: Array<CardType>;
  flippedPile: Array<CardType>;
  column1Pile: Array<CardType>;
  column2Pile: Array<CardType>;
  column3Pile: Array<CardType>;
  column4Pile: Array<CardType>;
  column5Pile: Array<CardType>;
  column6Pile: Array<CardType>;
  column7Pile: Array<CardType>;
  gameFlag: boolean;
  gameMoves: number;
  gamePaused: boolean;
  gamePreviousMoves: Array<{ source: string; target: string }>;
  gameNextMoves: Array<{ source: string; target: string }>;
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
  gameFlag: false,
  gameMoves: 0,
  gamePaused: false,
  gamePreviousMoves: [],
  gameNextMoves: []
};

const gameBoardReducer = (
  state = INITIAL_GAME_BOARD,
  action: ActionsCreators
) => {
  switch (action.type) {
    case GameBoardActionTypes.CREATE_GAME:
      return {
        ...createRandomGame(),
        gameFlag: !state.gameFlag,
        gameMoves: 0,
        gamePaused: false,
        gamePreviousMoves: [],
        gameNextMoves: []
      };
    case GameBoardActionTypes.TOGGLE_GAME_FLAG:
      return {
        ...state,
        gameFlag: !state.gameFlag,
        gameMoves: 0,
        gamePaused: false,
        gamePreviousMoves: [],
        gameNextMoves: []
      };
    case GameBoardActionTypes.ADD_GAME_MOVE:
      return {
        ...state,
        gameMoves: state.gameMoves + 1,
        gamePreviousMoves: [
          ...state.gamePreviousMoves,
          {
            source: action.source,
            target: action.target,
            cards: action.cards,
            movementWithFlip: action.movementWithFlip
          }
        ],
        gameNextMoves: []
      };
    case GameBoardActionTypes.REMOVE_GAME_MOVE:
      const tempGamePreviousMoves = [...state.gamePreviousMoves];
      const moveUndone = tempGamePreviousMoves.pop();

      return {
        ...state,
        gamePreviousMoves: tempGamePreviousMoves,
        gameNextMoves: [...state.gameNextMoves, moveUndone],
        gameMoves: state.gameMoves + 1
      };

    case GameBoardActionTypes.RE_ADD_GAME_MOVE:
      const tempGameNextMoves = [...state.gameNextMoves];
      const moveRedone = tempGameNextMoves.pop();

      return {
        ...state,
        gameNextMoves: tempGameNextMoves,
        gamePreviousMoves: [...state.gamePreviousMoves, moveRedone],
        gameMoves: state.gameMoves + 1
      };

    case GameBoardActionTypes.TIME_GAME:
      return { ...state, gamePaused: !state.gamePaused };
    default:
      return state;
  }
};

export default gameBoardReducer;
