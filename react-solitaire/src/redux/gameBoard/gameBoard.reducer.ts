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
  gameMoves: 0
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
        gameMoves: 0
      };
    case GameBoardActionTypes.TOGGLE_GAME_FLAG:
      return { ...state, gameFlag: !state.gameFlag, gameMoves: 0 };
    case GameBoardActionTypes.ADD_GAME_MOVE:
      return { ...state, gameMoves: state.gameMoves + 1 };
    default:
      return state;
  }
};

export default gameBoardReducer;
