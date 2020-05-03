const DeckActionTypes = {
  GET_DECK_CARDS: "GET_DECK_CARDS",
  FLIP_DECK_PILE: "FLIP_DECK_PILE",
  SET_REFS: "SET_REFS",
  SET_TRANSLATION: "SET_TRANSLATION"
};

export interface CardsPile {
  id: number;
  name: string;
}

export default DeckActionTypes;
