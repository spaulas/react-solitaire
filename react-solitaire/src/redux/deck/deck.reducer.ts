/* eslint-disable indent */
import { CardType, cardsConfigurations } from "../gameBoard/gameBoard.types";
import {
  addCardToFlipped,
  flipDeckCard,
  resetDeck,
  setCardDragging,
  unflipDeckCard
} from "./deck.utils";
import { ActionsCreators } from "./deck.actions";
import DeckActionTypes from "./deck.types";
import { ExplicitAny } from "../../global";

interface InitialDeck {
  deckRef: ExplicitAny; // ref for the deck pile component
  flippedRef: ExplicitAny; // ref for the flipped pile component
  deckPile: Array<CardType>; // array of deck cards
  flippedPile: Array<CardType>; // array of flipped cards
  translationX: number; // x translation for the animation
  translationY: number; // y translation for the animation
  cardDragging?: Array<CardType>; // cards original from the flipped pile that are being dragged
  doubleClickTarget?: string;
  startBackAnimation: boolean;
}

const INITIAL_DECK: InitialDeck = {
  deckRef: undefined,
  flippedRef: undefined,
  deckPile: [],
  flippedPile: [],
  translationX: 243.75,
  translationY: cardsConfigurations.deck,
  cardDragging: undefined,
  startBackAnimation: false
};

const deckReducer = (state = INITIAL_DECK, action: ActionsCreators) => {
  switch (action.type) {
    // ********************************************************
    // INITIAL SETTINGS ACTIONS

    /**
     * Stores the initial deck cards, the flipped pile is empty
     */
    case DeckActionTypes.SET_INITIAL_DECK:
      return {
        ...state,
        deckPile: action.deckPile,
        flippedPile: action.flippedPile,
        translationY: cardsConfigurations.deck
      };

    /**
     * Stores the ref for the deck and the flipped piles
     */
    case DeckActionTypes.SET_REFS:
      return {
        ...state,
        deckRef: action.deckRef,
        flippedRef: action.flippedRef
      };

    /**
     * Sets the translation x value for the deck pile to the flipped pile
     * The translation y is the diference of cards between the two piles
     */
    case DeckActionTypes.SET_TRANSLATION:
      return { ...state, translationX: action.translation };

    // ********************************************************
    // FLIPPING ACTIONS

    /**
     * Flips one card from the deck pile to the flipped pile
     *    - removes the top card of the deck pile;
     *    - adds it to the flipped pile;
     *    - calculates the difference of cards between the two piles and updates the translation y
     */
    case DeckActionTypes.FLIP_DECK_PILE:
      const flipResult = flipDeckCard(state.deckPile, state.flippedPile);
      return {
        ...state,
        ...flipResult
      };

    /**
     * Flips one card back from the flipped pile to the deck pile
     *    - removes the top card of the deck pile;
     *    - adds it to the flipped pile;
     *    - calculates the difference of cards between the two piles and updates the translation y;
     */
    case DeckActionTypes.UNDO_FLIP_DECK_PILE:
      const unflipResult = unflipDeckCard(state.deckPile, state.flippedPile);
      return {
        ...state,
        ...unflipResult
      };

    /**
     * Resets the deck, setting all the flipped cards back to the deck
     *    - sends all the flipped cards to the deck (reversed);
     *    - empties the flipped pile;
     *    - the y translation is the current number of cards of the flipped pile;
     */
    case DeckActionTypes.RESET_DECK:
      const resetResult = resetDeck(
        "flippedPile",
        "deckPile",
        state.flippedPile
      );
      return {
        ...state,
        ...resetResult
      };

    /**
     * Undoes the deck reset, setting all the deck cards back to the flipped
     *    - sends all the deck cards to the flipped pile (reversed);
     *    - empties the deck pile;
     *    - the y translation is the current number of cards of the deck pile;
     */
    case DeckActionTypes.UNDO_RESET_DECK:
      const undoResetResult = resetDeck(
        "deckPile",
        "flippedPile",
        state.deckPile
      );
      return {
        ...state,
        ...undoResetResult
      };

    // ********************************************************
    // DRAGGING ACTIONS

    /**
     * Starts dragging one card
     *    - gets the card from the top of the flipped pile and save it in the cardsDragging state;
     */
    case DeckActionTypes.DRAG_FLIPPED_CARD:
      const dragResult = setCardDragging(state.flippedPile);
      return {
        ...state,
        ...dragResult
      };

    /**
     * After a successful action, remove the top card of the flipped card pile
     */
    case DeckActionTypes.REMOVE_CARD_FROM_FLIPPED:
      const tempFlipped = [...state.flippedPile];
      tempFlipped.pop();
      return {
        ...state,
        flippedPile: tempFlipped
      };

    /**
     * Resets the currently saved card that was being dragged
     */
    case DeckActionTypes.RESET_FLIPPED_CARD_DRAGGING:
      return {
        ...state,
        cardDragging: undefined,
        cardDraggingPosition: undefined
      };
    // ********************************************************
    // ADD ACTIONS

    /**
     * Sends a card to a flipped pile
     *    - adds the card to the flipped pile
     */
    case DeckActionTypes.ADD_CARD_TO_FLIPPED:
      const addResult = addCardToFlipped(state.flippedPile, action.card);
      return {
        ...state,
        ...addResult
      };

    case DeckActionTypes.START_BACK_ANIMATION:
      return { ...state, startBackAnimation: true };

    // ********************************************************

    default:
      return state;
  }
};

export default deckReducer;
