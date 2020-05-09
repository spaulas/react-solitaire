import { RefAny, ValueOf } from "../../global";
import { CardType } from "../gameBoard/gameBoard.types";
import DeckActionTypes from "./deck.types";

const setInitialDeck = (deckPile: Array<CardType>) => ({
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

const addFlippedCard = () => ({
  type: DeckActionTypes.ADD_FLIPPED_CARD
});

const removeCardDragging = () => ({
  type: DeckActionTypes.REMOVE_CARD_DRAGGING
});

const actionsCreators = Object.freeze({
  setInitialDeck,
  flipDeckPile,
  setRefs,
  setTranslation,
  resetDeck,
  removeFlippedCard,
  addFlippedCard,
  removeCardDragging
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
