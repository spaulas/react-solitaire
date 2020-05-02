import { RootReducerState } from "../../global";
import { createSelector } from "reselect";

const selectDeck = (state: RootReducerState) => state.Deck;

export const selectDeckPile = createSelector(
  [selectDeck],
  Deck => Deck.deckPile
);

export const selectTurnedPile = createSelector(
  [selectDeck],
  Deck => Deck.turnedPile
);
