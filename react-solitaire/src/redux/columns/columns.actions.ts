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
 * Swapping N cards (number of cards that were being dragged) from one column (id store at drag) to the other (finalId)
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
 * @param nCards cards that are being dragged
 * @param columnId columns which the cards come from
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
// REMOVE/ADD CARDS ACTIONS

/**
 * Sends a card to a column pile
 * @param card card to be added to a column pile
 * @param columnId id of the column that will receive the card
 * @param flip previous move caused a flip of the column
 */
const addCardToColumn = (card: CardType, columnId: string, flip = true) => ({
  type: ColumnActionTypes.ADD_CARD_TO_COLUMN,
  card,
  columnId,
  flip
});

/**
 * Removes N cards from a column pile
 * @param columnId id of the column that will be reduced of cards
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

const actionsCreators = Object.freeze({
  setInitialColumns,
  swapColumns,
  undoSwapColumns,
  addCardToColumn,
  dragColumnCards,
  resetCardDragging,
  addDraggingCardsToColumn,
  removeCard,
  removeNCardsFromColumn
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
