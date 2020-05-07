import { CardsPile } from "../gameBoard/gameBoard.types";
import ColumnActionTypes from "./columns.types";
import { ValueOf } from "../../global";

const setInitialColumns = (columns: Record<string, Array<CardsPile>>) => ({
  type: ColumnActionTypes.SET_INITIAL_COLUMNS,
  columns
});

const swapColumns = (finalIndex: string, nCards: number) => ({
  type: ColumnActionTypes.SWAP_COLUMNS,
  finalIndex,
  nCards
});

const setCardDragging = (
  nCards: number,
  columnId: string,
  position: { x: number; y: number }
) => ({
  type: ColumnActionTypes.SET_CARD_DRAGGING,
  nCards,
  columnId,
  position
});

const removeCardDragging = () => ({
  type: ColumnActionTypes.REMOVE_CARD_DRAGGING
});

const actionsCreators = Object.freeze({
  setInitialColumns,
  swapColumns,
  setCardDragging,
  removeCardDragging
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
