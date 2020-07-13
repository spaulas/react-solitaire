import { ExplicitAny, ValueOf } from "../../global";
import { CardType } from "../gameBoard/gameBoard.types";
import DeckActionTypes from "./deck.types";

// ********************************************************
// INITIAL SETTINGS ACTIONS

/**
 * Stores the initial deck in the Redux State
 * @param deckPile
 */
const setInitialDeck = (
  deckPile: Array<CardType>,
  flippedPile: Array<CardType>
) => ({
  type: DeckActionTypes.SET_INITIAL_DECK,
  deckPile,
  flippedPile
});

/**
 * Stores the ref for the deck and the flipped piles
 * @param deckRef
 * @param flippedRef
 */
const setRefs = (deckRef: ExplicitAny, flippedRef: ExplicitAny) => ({
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
 */
const flipDeckPile = () => ({
  type: DeckActionTypes.FLIP_DECK_PILE
});

/**
 * Flips one card back from the flipped pile to the deck pile
 */
const undoFlipDeckPile = () => ({
  type: DeckActionTypes.UNDO_FLIP_DECK_PILE
});

/**
 * Resets the deck, setting all the flipped cards back to the deck
 */
const resetDeck = () => ({
  type: DeckActionTypes.RESET_DECK
});

/**
 * Undoes the deck reset, setting all the deck cards to the flipped pile
 */
const undoResetDeck = () => ({
  type: DeckActionTypes.UNDO_RESET_DECK
});

// ********************************************************
// DRAGGING ACTIONS

/**
 * Starts dragging the top card of the flipped pile
 */
const dragFlippedCard = () => ({
  type: DeckActionTypes.DRAG_FLIPPED_CARD
});

/**
 * After a successful action, remove the top card of the flipped card pile
 */
const removeCardFromFlipped = () => ({
  type: DeckActionTypes.REMOVE_CARD_FROM_FLIPPED
});

/**
 * Resets the currently saved card that was being dragged
 */
const resetCardDragging = () => ({
  type: DeckActionTypes.RESET_FLIPPED_CARD_DRAGGING
});

// ********************************************************
// ADD ACTIONS

/**
 * Sends a card to a flipped pile
 * @param card card to be added to the flipepd pile
 */
const addCardToFlipped = (card: CardType) => ({
  type: DeckActionTypes.ADD_CARD_TO_FLIPPED,
  card
});

const startUndoAnimation = () => ({
  type: DeckActionTypes.START_UNDO_ANIMATION
});

const startRedoAnimation = () => ({
  type: DeckActionTypes.START_REDO_ANIMATION
});

// ********************************************************

const actionsCreators = Object.freeze({
  setInitialDeck,
  setRefs,
  setTranslation,
  flipDeckPile,
  undoFlipDeckPile,
  addCardToFlipped,
  resetDeck,
  undoResetDeck,
  dragFlippedCard,
  removeCardFromFlipped,
  resetCardDragging,
  startUndoAnimation,
  startRedoAnimation
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
