/* eslint-disable indent */
import {
  addToColumn,
  createColumns,
  setCardDragging,
  swapColumns
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
  sendBack?: boolean;
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
  sendBack: undefined
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
      const result = swapColumns(
        state.columns,
        state.cardDragging,
        state.cardDraggingCol,
        action.finalId
      );
      return { ...state, ...result };

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
        sendBack: undefined
      };

    // DRAG COLUMN CARDS
    // SWAP COLUMNS
    // RESET COLUMNS

    // ********************************************************

    default:
      return state;
  }
};

export default columnsReducer;
