import { RefAny, ValueOf } from "../../global";
import { CardsPile } from "../gameBoard/gameBoard.types";
import DeckActionTypes from "./deck.types";

const setInitialDeck = (deckPile: Array<CardsPile>) => ({
  type: DeckActionTypes.SET_INITIAL_DECK,
  deckPile
});

const flipDeckPile = (cardId: number) => ({
  type: DeckActionTypes.FLIP_DECK_PILE,
  cardId
});

const setRefs = (deckRef: RefAny, flippedRef: RefAny) => ({
  type: DeckActionTypes.SET_REFS,
  deckRef,
  flippedRef
});

const setTranslation = (translation: number) => ({
  type: DeckActionTypes.SET_TRANSLATION,
  translation
});

const resetDeck = () => ({
  type: DeckActionTypes.RESET_DECK
});

const removeFlippedCard = (position: { x: number; y: number }) => ({
  type: DeckActionTypes.REMOVE_FLIPPED_CARD,
  position
});

const actionsCreators = Object.freeze({
  setInitialDeck,
  flipDeckPile,
  setRefs,
  setTranslation,
  resetDeck,
  removeFlippedCard
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
