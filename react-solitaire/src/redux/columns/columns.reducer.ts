/* eslint-disable indent */
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
      return action.columns;
    default:
      return state;
  }
};

export default columnsReducer;
