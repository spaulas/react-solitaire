import { RefAny, ValueOf } from "../../global";
import DeckActionTypes from "./deck.types";

const getDeckCards = () => ({
  type: DeckActionTypes.GET_DECK_CARDS
});

const flipDeckPile = (cardId: number) => ({
  type: DeckActionTypes.FLIP_DECK_PILE,
  cardId
});

const setRefs = (deckRef: RefAny, flippedRef: RefAny) => ({
  type: DeckActionTypes.SET_REFS,
  deckRef,
  flippedRef
});

const setTranslation = (translation: number) => ({
  type: DeckActionTypes.SET_TRANSLATION,
  translation
});

const actionsCreators = Object.freeze({
  getDeckCards,
  flipDeckPile,
  setRefs,
  setTranslation
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
