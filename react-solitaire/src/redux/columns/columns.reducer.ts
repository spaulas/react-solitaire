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

interface InitialColumns {
  cardDragging?: CardType;
  cardDraggingCol?: string;
  sendBack?: boolean;
  column1Pile: Array<CardType>;
  column2Pile: Array<CardType>;
  column3Pile: Array<CardType>;
  column4Pile: Array<CardType>;
  column5Pile: Array<CardType>;
  column6Pile: Array<CardType>;
  column7Pile: Array<CardType>;
}

const INITIAL_COLUMNS: InitialColumns = {
  cardDragging: undefined,
  cardDraggingCol: undefined,
  sendBack: undefined,
  column1Pile: [],
  column2Pile: [],
  column3Pile: [],
  column4Pile: [],
  column5Pile: [],
  column6Pile: [],
  column7Pile: []
};

const columnsReducer = (state = INITIAL_COLUMNS, action: ActionsCreators) => {
  switch (action.type) {
    case ColumnsActionTypes.SET_INITIAL_COLUMNS:
      return {
        ...createColumns(action.columns),
        cardDragging: undefined,
        cardDraggingCol: undefined,
        sendBack: undefined
      };

    case ColumnsActionTypes.SWAP_COLUMNS:
      const result = swapColumns(
        state as any,
        state.cardDraggingCol || "column1Pile",
        action.finalIndex,
        action.nCards
      );
      return { ...state, ...result };

    case ColumnsActionTypes.SET_CARD_DRAGGING:
      const draggingResult = setCardDragging(
        state as any,
        action.nCards,
        action.columnId
      );
      return {
        ...state,
        ...draggingResult,
        cardDraggingPosition: action.position
      };

    case ColumnsActionTypes.REMOVE_CARD_DRAGGING:
      return {
        ...state,
        cardDragging: undefined,
        cardDraggingCol: undefined,
        cardDraggingPosition: undefined,
        sendBack: undefined
      };

    case ColumnsActionTypes.ADD_TO_COLUMN:
      return {
        ...state,
        ...addToColumn(state as any, action.finalIndex, action.cardDragging)
      };
    default:
      return state;
  }
};

export default columnsReducer;
