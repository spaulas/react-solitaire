/* eslint-disable indent */
import DeckActionTypes, { CardsPile } from "./deck.types";
import { ActionsCreators } from "./deck.actions";
import { popDeckCard } from "./deck.utils";

interface InitialDeck {
  deckPile: Array<CardsPile>;
  flippedPile: Array<CardsPile>;
}

const INITIAL_DECK: InitialDeck = {
  deckPile: [
    { cardType: "spot", name: "deckSpot" },
    { cardType: "deck", translation: 80, name: "deckMiddle" },
    { cardType: "deck", translation: 80, name: "deckTop" }
  ],
  flippedPile: [{ cardType: "spot", name: "flippedSpot" }]
};

const deckReducer = (state = INITIAL_DECK, action: ActionsCreators) => {
  switch (action.type) {
    // to be changed once it has the connection to firebase
    case DeckActionTypes.GET_DECK_CARDS:
      return state;
    case DeckActionTypes.SEND_DECK_TOP_TO_FLIPPED_PILE:
      const { deckPile, flippedPile } = popDeckCard(
        state.deckPile,
        state.flippedPile
      );
      return {
        ...state,
        deckPile,
        flippedPile
      };
    default:
      return state;
  }
};

export default deckReducer;
