/* eslint-disable indent */
import GameBoardActionTypes, { CardsPile } from "./gameBoard.types";
import { ActionsCreators } from "./gameBoard.actions";
import { createRandomDeck } from "./gameBoard.utils";

interface InitialDeck {
  deckPile: Array<CardsPile>;
  flippedPile: Array<CardsPile>;
  column1Pile: Array<CardsPile>;
  column2Pile: Array<CardsPile>;
  column3Pile: Array<CardsPile>;
  column4Pile: Array<CardsPile>;
  column5Pile: Array<CardsPile>;
  column6Pile: Array<CardsPile>;
  column7Pile: Array<CardsPile>;
}

const INITIAL_DECK: InitialDeck = {
  deckPile: [],
  flippedPile: [],
  column1Pile: [],
  column2Pile: [],
  column3Pile: [],
  column4Pile: [],
  column5Pile: [],
  column6Pile: [],
  column7Pile: []
};

const gameBoardReducer = (state = INITIAL_DECK, action: ActionsCreators) => {
  switch (action.type) {
    case GameBoardActionTypes.CREATE_DECK:
      const newDeckPile = createRandomDeck();
      return newDeckPile;
    default:
      return state;
  }
};

export default gameBoardReducer;
