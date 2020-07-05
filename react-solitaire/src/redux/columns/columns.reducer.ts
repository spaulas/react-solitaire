/* eslint-disable indent */
import {
  addCardToColumn,
  addDragginCardsToColumn,
  checkColumnSwapDoubleClickValid,
  checkDoubleClickValid,
  checkMoveFromAnyColumn,
  createColumns,
  removeDraggedCard,
  removeNCardsFromColumn,
  setCardDragging,
  swapColumns,
  undoSwapColumns
} from "./columns.utils";
import { ActionsCreators } from "./columns.actions";
import { CardType } from "../gameBoard/gameBoard.types";
import ColumnsActionTypes from "./columns.types";

export interface InitialColumns {
  columns: {
    // cards array of each column
    column1Pile: Array<CardType>;
    column2Pile: Array<CardType>;
    column3Pile: Array<CardType>;
    column4Pile: Array<CardType>;
    column5Pile: Array<CardType>;
    column6Pile: Array<CardType>;
    column7Pile: Array<CardType>;
  };
  cardDragging?: Array<CardType>; // cards original from the columns that are being dragged
  cardDraggingCol?: string; // id of the cards dragging's column
  sendBack?: boolean; // flag that announces if the movement to the column, was invalid
  movementWithFlip?: boolean; // indicates if the movement to or from the column caused a card to be flipped
  doubleClickTarget?: boolean | string;
  hintSource?: boolean | string;
  movingCards?: Array<CardType>;
  columnMoveSource?: string;
}

const INITIAL_COLUMNS: InitialColumns = {
  columns: {
    column1Pile: [],
    column2Pile: [],
    column3Pile: [],
    column4Pile: [],
    column5Pile: [],
    column6Pile: [],
    column7Pile: []
  },
  cardDragging: undefined,
  cardDraggingCol: undefined,
  sendBack: undefined,
  movementWithFlip: undefined,
  doubleClickTarget: undefined,
  hintSource: undefined,
  movingCards: undefined,
  columnMoveSource: undefined
};

const columnsReducer = (state = INITIAL_COLUMNS, action: ActionsCreators) => {
  switch (action.type) {
    // ********************************************************
    // INITIAL SETTINGS ACTIONS

    /**
     * Stores the initial columns in the Redux State:
     *    - stores the column object created at createColumns function
     *    - resets cardDragging, cardDraggingCol and sendBack;
     */
    case ColumnsActionTypes.SET_INITIAL_COLUMNS:
      return {
        columns: createColumns(action.columns),
        cardDragging: undefined,
        cardDraggingCol: undefined,
        sendBack: undefined
      };

    // ********************************************************
    // SWAPPING ACTIONS

    /**
     * Swap N cards (number of cards that were being dragged) from one column (id store at drag) to the other (finalId)
     *    - saves the changes in the initialCol and finalCol;
     *    - if the movement is not valid, then sendBack is set to true, if not, to false;
     *    - if the movement is valid and a card was flipped, than movementWithFlip is set to true, if not, to false;
     */
    case ColumnsActionTypes.SWAP_COLUMNS:
      // only if the finalId is not the same id of the cards that are being dragged, that the swapping can happen
      if (!action.finalId.includes(state.cardDraggingCol)) {
        const resultSwap = swapColumns(
          state.columns,
          state.cardDragging,
          state.cardDraggingCol,
          action.finalId
        );
        return { ...state, ...resultSwap };
      }
      // if the finalId is the same id of the cards that are being dragged,
      // then simply return the state, because no changes were caused
      return state;

    /**
     * Undo swap of columns, sends back nCards from the target column to the source column
     *    - apply the necessary changes to the cards fields, according to the type of movement (undo or redo) and if a card was flipped
     *    - save the changes done at the source and target columns
     */
    case ColumnsActionTypes.UNDO_SWAP_COLUMNS:
      const resultUnswap = undoSwapColumns(
        state.columns,
        action.target,
        action.source,
        action.nCards,
        action.flip,
        action.typeRedoMovement
      );
      return { ...state, ...resultUnswap };

    // ********************************************************
    // DRAGGING ACTIONS

    /**
     * Starts dragging N cards and saves its initial column id
     *    - gets the cards that are being dragged from the column and save it in the cardsDragging state;
     *    - save the id of the column in the cardsDraggingCol state;
     *    - save if the movement caused a flip in the movementWithFlip state;
     */
    case ColumnsActionTypes.DRAG_COLUMN_CARDS:
      const draggingResult = setCardDragging(
        state.columns,
        action.columnId,
        action.nCards
      );
      return {
        ...state,
        ...draggingResult
      };

    /**
     * Adds the cards that were being dragged to the selected column
     *    - if the movement was valid, then:
     *        - add the cards to the corresponding column pile;
     *        - sets sendBack to false;
     *        - resets cardsDragging;
     *    - if the movement was invalid, then simply set the sendBack value to true;
     */
    case ColumnsActionTypes.ADD_DRAGGING_CARDS_TO_COLUMN:
      const addResult = addDragginCardsToColumn(
        state.columns,
        action.finalId,
        action.cardDragging
      );
      return {
        ...state,
        ...addResult
      };

    case ColumnsActionTypes.REMOVE_DRAGGED_CARDS_FROM_COLUMN:
      const removeResult = removeDraggedCard(
        state.columns,
        state.cardDraggingCol as string
      );
      return {
        ...state,
        ...removeResult
      };

    case ColumnsActionTypes.RESET_COLUMN_CARD_DRAGGING:
      return {
        ...state,
        cardDragging: undefined,
        cardDraggingCol: undefined,
        sendBack: undefined,
        movementWithFlip: undefined,
        doubleClickTarget: undefined,
        movingCards: undefined,
        columnMoveSource: undefined
      };

    // ********************************************************
    // REMOVE/ADD CARDS ACTIONS

    /**
     * Sends a card to a column pile
     *    - adds the card to the correspoding column, flipping or not the cards on top
     */
    case ColumnsActionTypes.ADD_CARD_TO_COLUMN:
      const sendUndoResult = addCardToColumn(
        state.columns,
        action.columnId,
        action.card,
        action.flip
      );
      return {
        ...state,
        ...sendUndoResult
      };

    /**
     * Removes N cards from a column pile
     *    - removes N cards from a column and, if the top cards were not flipped, then will flip them
     */
    case ColumnsActionTypes.REMOVE_N_CARDS_FROM_COLUMN:
      const removeNCardsResult = removeNCardsFromColumn(
        state.columns,
        action.columnId,
        action.nCards,
        action.flip
      );
      return {
        ...state,
        ...removeNCardsResult
      };

    // ********************************************************
    // DOUBLE CLICK ACTIONS

    /**
     * Checks if there is a column pile a card from another type of pile can be moved to
     *    - check if there is any valid spot (if more than one option is available, first choice is a not empty pile)
     *    - save the target column id result
     *    - if there were no possible moves, the target result works as a flag
     */
    case ColumnsActionTypes.CHECK_DOUBLE_CLICK_VALID:
      const checkDoubleClickResult = checkDoubleClickValid(
        state.columns,
        action.card,
        state.doubleClickTarget
      );
      return { ...state, ...checkDoubleClickResult };

    /**
     * Checks if there is a column pile a column pile card can be moved to:
     *    - check if there is any valid spot (if more than one option is available, first choice is a not empty pile)
     *    - if there is a possible move, then swap the cards
     *    - save the target column id result, the cards that were swapped and the swapping result
     *    - if there were no possible moves, the target result works as a flag
     */
    case ColumnsActionTypes.CHECK_COLUM_SWAP_DOUBLE_CLICK_VALID:
      const checkColumnSwapDoubleClickResult = checkColumnSwapDoubleClickValid(
        state.columns,
        action.sourceId,
        action.nCards,
        state.doubleClickTarget
      );
      return { ...state, ...checkColumnSwapDoubleClickResult };

    case ColumnsActionTypes.SWAP_DOUBLE_CLICK:
      if (state.movingCards) {
        const swapColumnsDoubleClick = swapColumns(
          state.columns,
          action.movingCards,
          action.sourceId,
          action.targetId
        );

        return {
          ...state,
          ...swapColumnsDoubleClick,
          doubleClickTarget: undefined,
          movingCards: undefined
        };
      }
      return state;

    case ColumnsActionTypes.CHECK_MOVE_FROM_ANY_COLUMN:
      const checkMoveFromAnyColumnResult = checkMoveFromAnyColumn(
        state.columns,
        action.deckPile,
        action.previousHints,
        state.doubleClickTarget
      );
      return { ...state, ...checkMoveFromAnyColumnResult };

    // ********************************************************

    default:
      return state;
  }
};

export default columnsReducer;
