import GameBoardActionTypes from "./gameBoard.types";
import { ValueOf } from "../../global";

const createDeck = () => ({
  type: GameBoardActionTypes.CREATE_DECK
});

const actionsCreators = Object.freeze({
  createDeck
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
