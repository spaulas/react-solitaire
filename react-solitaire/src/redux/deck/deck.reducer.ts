/* eslint-disable indent */
import DeckActionTypes, { CardsPile } from "./deck.types";
import { ActionsCreators } from "./deck.actions";
import { popDeckCard } from "./deck.utils";

interface InitialDeck {
  deckPile: Array<CardsPile>;
  topDeck: number;
  topFlipped?: number;
  translation: number;
}

const INITIAL_DECK: InitialDeck = {
  deckPile: [
    { id: 0, pos: 2, cardType: "deck", translation: 243.75, name: "deckTop" },
    {
      id: 1,
      pos: 1,
      cardType: "deck",
      translation: 243.75,
      name: "deckMiddle"
    },
    {
      id: 2,
      pos: 0,
      cardType: "deck",
      translation: 243.75,
      name: "deckBottom"
    }
  ],
  translation: 243.75,
  topDeck: 0,
  topFlipped: undefined
};

const deckReducer = (state = INITIAL_DECK, action: ActionsCreators) => {
  switch (action.type) {
    // to be changed once it has the connection to firebase
    case DeckActionTypes.GET_DECK_CARDS:
      return state;
    case DeckActionTypes.FLIP_DECK_PILE:
      const { deckPile, topDeck, topFlipped } = popDeckCard(
        state.deckPile,
        action.cardId
      );
      return {
        ...state,
        deckPile,
        topDeck,
        topFlipped
      };
    default:
      return state;
  }
};

export default deckReducer;
