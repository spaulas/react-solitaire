import { CardType } from "../gameBoard/gameBoard.types";
import ColumnActionTypes from "./columns.types";
import { ValueOf } from "../../global";

// ********************************************************
// INITIAL SETTINGS ACTIONS

/**
 * Stores the initial columns in the Redux State
 * @param columns
 */
const setInitialColumns = (columns: Record<string, Array<CardType>>) => ({
  type: ColumnActionTypes.SET_INITIAL_COLUMNS,
  columns
});

// ********************************************************
// SWAPPING ACTIONS

/**
 * Swapping N cards from one column to the other
 * @param finalId id of the destination column
 * @param nCards number of cards to be swapped
 */
const swapColumns = (finalId: string, nCards: number) => ({
  type: ColumnActionTypes.SWAP_COLUMNS,
  finalId
});

// ********************************************************
// DRAGGING ACTIONS

/**
 * Starts dragging N cards and saves its initial column and position
 * @param nCards cards that are being dragged
 * @param columnId columns which the cards come from
 * @param position the initial position of the cards
 */
const dragColumnCards = (nCards: number, columnId: string) => ({
  type: ColumnActionTypes.DRAG_COLUMN_CARDS,
  nCards,
  columnId
});

/**
 * Adds the cards that were being dragged to the selected column
 * @param cardDragging cards that were being dragged
 * @param finalId id of the destination column
 */
const addDraggingCardsToColumn = (
  cardDragging: Array<CardType>,
  finalId: string
) => ({
  type: ColumnActionTypes.ADD_DRAGGING_CARDS_TO_COLUMN,
  cardDragging,
  finalId
});

/**
 * Resets the currently saved card that was been dragged, its position and initial column ids
 */
const resetCardDragging = () => ({
  type: ColumnActionTypes.RESET_COLUMN_CARD_DRAGGING
});

// ********************************************************

const actionsCreators = Object.freeze({
  setInitialColumns,
  swapColumns,
  dragColumnCards,
  resetCardDragging,
  addDraggingCardsToColumn
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
