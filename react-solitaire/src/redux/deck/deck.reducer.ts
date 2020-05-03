/* eslint-disable indent */
import { CardsPile, cardsConfigurations } from "../gameBoard/gameBoard.types";
import { getTranslationY, popDeckCard } from "./deck.utils";
import { ActionsCreators } from "./deck.actions";
import DeckActionTypes from "./deck.types";
import { RefAny } from "../../global";

interface InitialDeck {
  deckPile: Array<CardsPile>;
  flippedPile: Array<CardsPile>;
  translationX: number;
  translationY: number;
  deckRef: RefAny;
  flippedRef: RefAny;
}

const INITIAL_DECK: InitialDeck = {
  deckPile: [],
  flippedPile: [],
  translationX: 243.75,
  translationY: cardsConfigurations.deck,
  deckRef: undefined,
  flippedRef: undefined
};

const deckReducer = (state = INITIAL_DECK, action: ActionsCreators) => {
  switch (action.type) {
    case DeckActionTypes.FLIP_DECK_PILE:
      const { deckPile, flippedPile } = popDeckCard(
        state.deckPile,
        state.flippedPile
      );
      const translationY = getTranslationY(deckPile, flippedPile);
      return {
        ...state,
        deckPile,
        flippedPile,
        translationY
      };
    case DeckActionTypes.SET_REFS:
      return {
        ...state,
        deckRef: action.deckRef,
        flippedRef: action.flippedRef
      };
    case DeckActionTypes.SET_TRANSLATION:
      return { ...state, translationX: action.translation };
    default:
      return state;
  }
};

export default deckReducer;
