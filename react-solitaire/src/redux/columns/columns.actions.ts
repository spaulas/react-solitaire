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
const swapColumns = (finalId: string) => ({
  type: ColumnActionTypes.SWAP_COLUMNS,
  finalId
});

/**
 * Undo swap of columns, sends back nCards from the target to the source columns
 * @param source column where the cards originally came from
 * @param target column where the cards originally were sent to
 * @param nCards number of cards that were swapped
 */
const undoSwapColumns = (
  source: string,
  target: string,
  nCards: number,
  movementWithFlip: boolean
) => ({
  type: ColumnActionTypes.UNDO_SWAP_COLUMNS,
  source,
  target,
  nCards,
  movementWithFlip
});

// ********************************************************
// UNDO ACTIONS

const sendUndoCardToColumn = (card: CardType, columnId: string) => ({
  type: ColumnActionTypes.SEND_UNDO_CARDS_TO_COLUMN,
  card,
  columnId
});

const setUndoColumnCards = (columnId: string) => ({
  type: ColumnActionTypes.SET_UNDO_COLUMN_CARDS,
  columnId
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

/**
 * Resets the currently saved card that was been dragged, its position and initial column ids
 */
const removeCard = () => ({
  type: ColumnActionTypes.REMOVE_CARD
});

// ********************************************************

const actionsCreators = Object.freeze({
  setInitialColumns,
  swapColumns,
  undoSwapColumns,
  sendUndoCardToColumn,
  setUndoColumnCards,
  dragColumnCards,
  resetCardDragging,
  addDraggingCardsToColumn,
  removeCard
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
