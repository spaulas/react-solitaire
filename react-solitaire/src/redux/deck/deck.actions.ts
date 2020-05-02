import DeckActionTypes from "./deck.types";
import { ValueOf } from "../../global";

const getDeckCards = () => ({
  type: DeckActionTypes.GET_DECK_CARDS
});

const flipDeckPile = (cardId: number) => ({
  type: DeckActionTypes.FLIP_DECK_PILE,
  cardId
});

const actionsCreators = Object.freeze({
  getDeckCards,
  flipDeckPile
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
