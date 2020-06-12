/* eslint-disable indent */
import { CardType, cardsConfigurations } from "../gameBoard/gameBoard.types";
import {
  flipDeckCard,
  getTranslationY,
  popFlippedCard,
  restoreFlippedCard
} from "./deck.utils";
import { ActionsCreators } from "./deck.actions";
import DeckActionTypes from "./deck.types";
import { RefAny } from "../../global";

interface InitialDeck {
  deckRef: RefAny;
  flippedRef: RefAny;
  deckPile: Array<CardType>;
  flippedPile: Array<CardType>;
  translationX: number;
  translationY: number;
  cardDragging?: Array<CardType>;
  cardDraggingPosition?: { x: number; y: number };
}

const INITIAL_DECK: InitialDeck = {
  deckRef: undefined,
  flippedRef: undefined,
  deckPile: [],
  flippedPile: [],
  translationX: 243.75,
  translationY: cardsConfigurations.deck,
  cardDragging: undefined,
  cardDraggingPosition: undefined
};

const deckReducer = (state = INITIAL_DECK, action: ActionsCreators) => {
  switch (action.type) {
    // ********************************************************
    // INITIAL SETTINGS ACTIONS

    case DeckActionTypes.SET_INITIAL_DECK:
      return { ...state, deckPile: action.deckPile };

    case DeckActionTypes.SET_REFS:
      return {
        ...state,
        deckRef: action.deckRef,
        flippedRef: action.flippedRef
      };

    case DeckActionTypes.SET_TRANSLATION:
      return { ...state, translationX: action.translation };

    // ********************************************************
    // FLIPPING ACTIONS

    case DeckActionTypes.FLIP_DECK_PILE:
      const flipResult = flipDeckCard(state.deckPile, state.flippedPile);
      const translationY = getTranslationY(flipResult);

      return {
        ...state,
        ...flipResult,
        translationY
      };

    case DeckActionTypes.RESET_DECK:
      // set the deck pile to have the flipped pile cards and reset the flipped pile
      return { ...state, deckPile: state.flippedPile, flippedPile: [] };

    // ********************************************************
    // DRAGGING ACTIONS

    case DeckActionTypes.DRAG_FLIPPED_CARD:
      const dragResult = popFlippedCard(state.flippedPile);

      return {
        ...state,
        ...dragResult
      };

    case DeckActionTypes.RESTORE_FLIPPED_CARD:
      const restoreResult = restoreFlippedCard(
        state.cardDragging,
        state.flippedPile
      );

      return {
        ...state,
        ...restoreResult
      };

    case DeckActionTypes.RESET_FLIPPED_CARD_DRAGGING:
      return {
        ...state,
        cardDragging: undefined,
        cardDraggingPosition: undefined
      };

    // ********************************************************

    default:
      return state;
  }
};

export default deckReducer;
