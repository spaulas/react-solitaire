import { RootReducerState } from "../../global";
import { createSelector } from "reselect";

const selectDeck = (state: RootReducerState) => state.Deck;

export const selectDeckPile = createSelector(
  [selectDeck],
  Deck => Deck.deckPile
);

export const selectFlippedPile = createSelector(
  [selectDeck],
  Deck => Deck.flippedPile
);
