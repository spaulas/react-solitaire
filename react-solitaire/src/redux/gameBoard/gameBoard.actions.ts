import GameBoardActionTypes from "./gameBoard.types";
import { ValueOf } from "../../global";

/**
 * Creates an initial distribution of the cards
 */
const createGame = () => ({
  type: GameBoardActionTypes.CREATE_GAME
});

const actionsCreators = Object.freeze({
  createGame
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
