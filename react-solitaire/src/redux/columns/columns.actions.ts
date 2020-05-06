import { CardsPile } from "../gameBoard/gameBoard.types";
import ColumnActionTypes from "./columns.types";
import { ValueOf } from "../../global";

const setInitialColumns = (columns: Record<string, Array<CardsPile>>) => ({
  type: ColumnActionTypes.SET_INITIAL_COLUMNS,
  columns
});

const swapColumns = (
  initialIndex: string,
  finalIndex: string,
  nCards: number
) => ({
  type: ColumnActionTypes.SWAP_COLUMNS,
  initialIndex,
  finalIndex,
  nCards
});

const actionsCreators = Object.freeze({
  setInitialColumns,
  swapColumns
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
