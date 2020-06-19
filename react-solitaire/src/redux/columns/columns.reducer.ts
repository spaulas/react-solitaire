/* eslint-disable indent */
import {
  addToColumn,
  createColumns,
  removeCard,
  sendUndoCardsToColumun,
  setCardDragging,
  setUndoGoalCards,
  swapColumns,
  undoSwapColumns
} from "./columns.utils";
import { ActionsCreators } from "./columns.actions";
import { CardType } from "../gameBoard/gameBoard.types";
import ColumnsActionTypes from "./columns.types";

export interface InitialColumns {
  columns: {
    column1Pile: Array<CardType>;
    column2Pile: Array<CardType>;
    column3Pile: Array<CardType>;
    column4Pile: Array<CardType>;
    column5Pile: Array<CardType>;
    column6Pile: Array<CardType>;
    column7Pile: Array<CardType>;
  };
  cardDragging?: Array<CardType>;
  cardDraggingCol?: string;
  cardUndo?: CardType;
  sendBack?: boolean;
  movementWithFlip?: boolean;
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
  cardUndo: undefined,
  sendBack: undefined,
  movementWithFlip: undefined
};

const columnsReducer = (state = INITIAL_COLUMNS, action: ActionsCreators) => {
  switch (action.type) {
    // ********************************************************
    // INITIAL SETTINGS ACTIONS

    case ColumnsActionTypes.SET_INITIAL_COLUMNS:
      return {
        columns: createColumns(action.columns),
        cardDragging: undefined,
        cardDraggingCol: undefined,
        sendBack: undefined
      };

    // ********************************************************
    // SWAPPING ACTIONS

    case ColumnsActionTypes.SWAP_COLUMNS:
      if (!action.finalId.includes(state.cardDraggingCol)) {
        const resultSwap = swapColumns(
          state.columns,
          state.cardDragging,
          state.cardDraggingCol,
          action.finalId
        );
        return { ...state, ...resultSwap };
      }
      return state;

    case ColumnsActionTypes.UNDO_SWAP_COLUMNS:
      const resultUnswap = undoSwapColumns(
        state.columns,
        action.target,
        action.source,
        action.nCards,
        action.movementWithFlip
      );
      return { ...state, ...resultUnswap };

    // ********************************************************
    // UNDO ACTIONS

    case ColumnsActionTypes.SET_UNDO_COLUMN_CARDS:
      const resultUndo = setUndoGoalCards(state.columns, action.columnId);
      return { ...state, ...resultUndo };

    case ColumnsActionTypes.SEND_UNDO_CARDS_TO_COLUMN:
      const sendUndoResult = sendUndoCardsToColumun(
        state.columns,
        action.columnId,
        action.card
      );
      return {
        ...state,
        ...sendUndoResult
      };

    // ********************************************************
    // DRAGGING ACTIONS

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

    case ColumnsActionTypes.ADD_DRAGGING_CARDS_TO_COLUMN:
      const addResult = addToColumn(
        state.columns,
        action.finalId,
        action.cardDragging
      );
      return {
        ...state,
        cardDragging: undefined,
        ...addResult
      };

    case ColumnsActionTypes.RESET_COLUMN_CARD_DRAGGING:
      return {
        ...state,
        cardDragging: undefined,
        cardDraggingCol: undefined,
        cardDraggingPosition: undefined,
        sendBack: undefined,
        movementWithFlip: undefined
      };

    case ColumnsActionTypes.REMOVE_CARD:
      const removeResult = removeCard(
        state.columns,
        state.cardDraggingCol as string
      );
      return {
        ...state,
        ...removeResult,
        cardDragging: undefined
      };

    // ********************************************************

    default:
      return state;
  }
};

export default columnsReducer;
