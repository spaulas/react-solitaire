import DeckActionTypes from "./deck.types";
import { ValueOf } from "../../global";

const getDeckCards = () => ({
  type: DeckActionTypes.GET_DECK_CARDS
});

const sendDeckTopToFlippedPile = () => ({
  type: DeckActionTypes.SEND_DECK_TOP_TO_FLIPPED_PILE
});

const actionsCreators = Object.freeze({
  getDeckCards,
  sendDeckTopToFlippedPile
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
