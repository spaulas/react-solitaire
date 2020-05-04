import { CardsPile } from "../gameBoard/gameBoard.types";
import ColumnActionTypes from "./columns.types";
import { ValueOf } from "../../global";

const setInitialColumns = (columns: Record<string, Array<CardsPile>>) => ({
  type: ColumnActionTypes.SET_INITIAL_COLUMNS,
  columns
});

const actionsCreators = Object.freeze({
  setInitialColumns
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
