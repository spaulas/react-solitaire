import { RefAny, ValueOf } from "../../global";
import { CardType } from "../gameBoard/gameBoard.types";
import DeckActionTypes from "./deck.types";

// ********************************************************
// INITIAL SETTINGS ACTIONS

/**
 * Stores the initial deck in the Redux State
 * @param deckPile
 */
const setInitialDeck = (deckPile: Array<CardType>) => ({
  type: DeckActionTypes.SET_INITIAL_DECK,
  deckPile
});

/**
 * Stores the ref for the deck and the flipped piles
 * @param deckRef
 * @param flippedRef
 */
const setRefs = (deckRef: RefAny, flippedRef: RefAny) => ({
  type: DeckActionTypes.SET_REFS,
  deckRef,
  flippedRef
});

/**
 * Sets the translation x value for the deck pile to the flipped pile
 * @param translation
 */
const setTranslation = (translation: number) => ({
  type: DeckActionTypes.SET_TRANSLATION,
  translation
});

// ********************************************************
// FLIPPING ACTIONS

/**
 * Flips one card from the deck pile to the flipped pile
 * @param cardId id of the card to be flipped
 */
const flipDeckPile = (cardId: number) => ({
  type: DeckActionTypes.FLIP_DECK_PILE,
  cardId
});

/**
 * Resets the deck, setting all the flipped cards back to the deck
 */
const resetDeck = () => ({
  type: DeckActionTypes.RESET_DECK
});

// ********************************************************
// DRAGGING ACTIONS

/**
 * Starts dragging the top card of the flipped pile
 * @param position initial position of the flipped pile (in case it is send to an invalid place)
 */
const dragFlippedCard = () => ({
  type: DeckActionTypes.DRAG_FLIPPED_CARD
});

/**
 * Restore card to flipped deck (after dragging and letting go in an invalid place)
 */
const restoreFlippedCard = () => ({
  type: DeckActionTypes.RESTORE_FLIPPED_CARD
});

/**
 * Resets the currently saved card that was been dragged and its position
 */
const resetCardDragging = () => ({
  type: DeckActionTypes.RESET_FLIPPED_CARD_DRAGGING
});

/**
 * After a successful action, pop the top card of the flipped card pile
 */
const popFlippedCard = () => ({
  type: DeckActionTypes.POP_FLIPPED_CARD
});

// ********************************************************

const actionsCreators = Object.freeze({
  setInitialDeck,
  setRefs,
  setTranslation,
  flipDeckPile,
  resetDeck,
  dragFlippedCard,
  restoreFlippedCard,
  resetCardDragging,
  popFlippedCard
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
