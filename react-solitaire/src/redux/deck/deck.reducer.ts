/* eslint-disable indent */
import DeckActionTypes, { CardsPile } from "./deck.types";
import { ActionsCreators } from "./deck.actions";
import { popDeckCard } from "./deck.utils";

interface InitialDeck {
  deckPile: Array<CardsPile>;
  turnedPile: Array<CardsPile>;
}

const INITIAL_DECK: InitialDeck = {
  deckPile: [
    { cardType: "spot", name: "deckSpot" },
    { cardType: "deck", translation: 80, name: "deckMiddle" },
    { cardType: "deck", translation: 80, name: "deckTop" }
  ],
  turnedPile: [{ cardType: "spot", name: "flippedSpot" }]
};

const deckReducer = (state = INITIAL_DECK, action: ActionsCreators) => {
  switch (action.type) {
    // to be changed once it has the connection to firebase
    case DeckActionTypes.GET_DECK_CARDS:
      return state;
    case DeckActionTypes.SEND_DECK_TOP_TO_TURNED_PILE:
      const { deckPile, turnedPile } = popDeckCard(
        state.deckPile,
        state.turnedPile
      );
      return {
        ...state,
        deckPile,
        turnedPile
      };
    default:
      return state;
  }
};

export default deckReducer;
