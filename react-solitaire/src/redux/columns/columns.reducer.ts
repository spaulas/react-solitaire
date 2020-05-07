/* eslint-disable indent */
import { createColumns, setCardDragging, swapColumns } from "./columns.utils";
import { ActionsCreators } from "./columns.actions";
import { CardsPile } from "../gameBoard/gameBoard.types";
import ColumnsActionTypes from "./columns.types";

interface InitialColumns {
  cardDragging?: CardsPile;
  cardDraggingCol?: string;
  column1Pile: Array<CardsPile>;
  column2Pile: Array<CardsPile>;
  column3Pile: Array<CardsPile>;
  column4Pile: Array<CardsPile>;
  column5Pile: Array<CardsPile>;
  column6Pile: Array<CardsPile>;
  column7Pile: Array<CardsPile>;
}

const INITIAL_COLUMNS: InitialColumns = {
  cardDragging: undefined,
  cardDraggingCol: undefined,
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
        cardDraggingCol: undefined
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
        cardDraggingPosition: undefined
      };
    default:
      return state;
  }
};

export default columnsReducer;
