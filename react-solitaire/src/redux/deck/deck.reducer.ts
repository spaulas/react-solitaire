/* eslint-disable indent */
import DeckActionTypes, { CardsPile } from "./deck.types";
import { ActionsCreators } from "./deck.actions";
import { RefAny } from "../../global";
import { popDeckCard } from "./deck.utils";

interface InitialDeck {
  deckPile: Array<CardsPile>;
  flippedPile: Array<CardsPile>;
  translation: number;
  deckRef: RefAny;
  flippedRef: RefAny;
}

const INITIAL_DECK: InitialDeck = {
  deckPile: [
    { id: 0, name: "deckTop" },
    {
      id: 1,
      name: "deckMiddle"
    },
    {
      id: 2,
      name: "deckBottom"
    }
  ],
  flippedPile: [],
  translation: 0,
  deckRef: undefined,
  flippedRef: undefined
};

const deckReducer = (state = INITIAL_DECK, action: ActionsCreators) => {
  switch (action.type) {
    // to be changed once it has the connection to firebase
    case DeckActionTypes.GET_DECK_CARDS:
      return state;
    case DeckActionTypes.FLIP_DECK_PILE:
      const { deckPile, flippedPile } = popDeckCard(
        state.deckPile,
        state.flippedPile,
        action.cardId
      );
      return {
        ...state,
        deckPile,
        flippedPile
      };
    case DeckActionTypes.SET_REFS:
      return {
        ...state,
        deckRef: action.deckRef,
        flippedRef: action.flippedRef
      };
    case DeckActionTypes.SET_TRANSLATION:
      return { ...state, translation: action.translation };
    default:
      return state;
  }
};

export default deckReducer;
