import DeckActionTypes from "./deck.types";
import { ValueOf } from "../../global";

const getDeckCards = () => ({
  type: DeckActionTypes.GET_DECK_CARDS
});

const sendDeckTopToTurnedPile = () => ({
  type: DeckActionTypes.SEND_DECK_TOP_TO_TURNED_PILE
});

const actionsCreators = Object.freeze({
  getDeckCards,
  sendDeckTopToTurnedPile
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
