import { CardType } from "../gameBoard/gameBoard.types";
import ColumnActionTypes from "./columns.types";
import { ValueOf } from "../../global";

const setInitialColumns = (columns: Record<string, Array<CardType>>) => ({
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

const addToColumn = (
  cardDragging: Array<CardType>,
  finalIndex: string,
  nCards: number
) => ({
  type: ColumnActionTypes.ADD_TO_COLUMN,
  cardDragging,
  finalIndex,
  nCards
});

const actionsCreators = Object.freeze({
  setInitialColumns,
  swapColumns,
  setCardDragging,
  removeCardDragging,
  addToColumn
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
