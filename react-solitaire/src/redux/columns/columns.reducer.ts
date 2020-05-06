/* eslint-disable indent */
import { createColumns, swapColumns } from "./columns.utils";
import { ActionsCreators } from "./columns.actions";
import { CardsPile } from "../gameBoard/gameBoard.types";
import ColumnsActionTypes from "./columns.types";

interface InitialColumns {
  column1Pile: Array<CardsPile>;
  column2Pile: Array<CardsPile>;
  column3Pile: Array<CardsPile>;
  column4Pile: Array<CardsPile>;
  column5Pile: Array<CardsPile>;
  column6Pile: Array<CardsPile>;
  column7Pile: Array<CardsPile>;
}

const INITIAL_COLUMNS: InitialColumns = {
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
      return createColumns(action.columns);
    case ColumnsActionTypes.SWAP_COLUMNS:
      const result = swapColumns(
        state as any,
        action.initialIndex,
        action.finalIndex,
        action.nCards
      );
      return { ...state, ...result };
    default:
      return state;
  }
};

export default columnsReducer;
