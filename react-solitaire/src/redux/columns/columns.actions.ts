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
 * Swap N cards (number of cards that were being dragged) from one column (id store at drag) to the other (finalId)
 * @param finalId id of the destination column
 */
const swapColumns = (finalId: string) => ({
  type: ColumnActionTypes.SWAP_COLUMNS,
  finalId
});

/**
 * Undo swap of columns, sends back nCards from the target column to the source column
 * @param source column where the cards originally came from
 * @param target column where the cards originally were sent to
 * @param nCards number of cards that were swapped
 * @param flip previous swap caused a flip of the other column card
 * @param typeRedoMovement if true, than the type of movement is redo (could have been undo)
 */
const undoSwapColumns = (
  source: string,
  target: string,
  nCards: number,
  flip: boolean,
  typeRedoMovement?: boolean
) => ({
  type: ColumnActionTypes.UNDO_SWAP_COLUMNS,
  source,
  target,
  nCards,
  flip,
  typeRedoMovement
});

// ********************************************************
// DRAGGING ACTIONS

/**
 * Starts dragging N cards and saves its initial column id
 * @param columnId columns which the cards come from
 * @param nCards cards that are being dragged
 */
const dragColumnCards = (columnId: string, nCards: number) => ({
  type: ColumnActionTypes.DRAG_COLUMN_CARDS,
  columnId,
  nCards
});

/**
 * Adds the cards that were being dragged to the selected column
 * @param finalId id of the destination column
 * @param cardDragging cards that were being dragged
 */
const addDraggingCardsToColumn = (
  finalId: string,
  cardDragging: Array<CardType>
) => ({
  type: ColumnActionTypes.ADD_DRAGGING_CARDS_TO_COLUMN,
  finalId,
  cardDragging
});

/**
 * When a dragging operation from a column is successful, then remove the cards that were dragged from that column
 */
const removeDraggedCardsFromColumn = () => ({
  type: ColumnActionTypes.REMOVE_DRAGGED_CARDS_FROM_COLUMN
});

/**
 * Resets the currently saved card that was been dragge and its initial column id
 */
const resetCardDragging = () => ({
  type: ColumnActionTypes.RESET_COLUMN_CARD_DRAGGING
});
// ********************************************************
// REMOVE/ADD CARDS ACTIONS

/**
 * Sends a card to a column pile
 * @param columnId id of the column receiving the card
 * @param card card to be added to a column pile
 * @param flip previous move caused a flip of the column
 */
const addCardToColumn = (columnId: string, card: CardType, flip = true) => ({
  type: ColumnActionTypes.ADD_CARD_TO_COLUMN,
  columnId,
  card,
  flip
});

/**
 * Removes N cards from a column pile
 * @param columnId id of the column to remove the cards from
 * @param nCards number of cards to remove
 * @param flip previous move caused a flip of the column
 */
const removeNCardsFromColumn = (
  columnId: string,
  nCards: number,
  flip: boolean
) => ({
  type: ColumnActionTypes.REMOVE_N_CARDS_FROM_COLUMN,
  columnId,
  nCards,
  flip
});

// ********************************************************
// DOUBLE CLICK ACTIONS

/**
 * Checks if there is a column pile a card from another type of pile can be moved to
 * @param card card from the other type pile to be moved
 */
const checkDoubleClickValid = (card: CardType) => ({
  type: ColumnActionTypes.CHECK_DOUBLE_CLICK_VALID,
  card
});

/**
 * Checks if there is a column pile a column pile card can be moved to and do the swapping
 * @param sourceId id of the source column
 * @param nCards number of cards from the source column to be swapped\
 */
const checkColumnSwapDoubleClickValid = (sourceId: string, nCards: number) => ({
  type: ColumnActionTypes.CHECK_COLUM_SWAP_DOUBLE_CLICK_VALID,
  sourceId,
  nCards
});

const checkMoveFromAnyColumn = () => ({
  type: ColumnActionTypes.CHECK_MOVE_FROM_ANY_COLUMN
});

// ********************************************************

const actionsCreators = Object.freeze({
  setInitialColumns,
  swapColumns,
  undoSwapColumns,
  dragColumnCards,
  addDraggingCardsToColumn,
  removeDraggedCardsFromColumn,
  resetCardDragging,
  addCardToColumn,
  removeNCardsFromColumn,
  checkDoubleClickValid,
  checkColumnSwapDoubleClickValid,
  checkMoveFromAnyColumn
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
