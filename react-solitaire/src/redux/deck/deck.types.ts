const DeckActionTypes = {
  GET_DECK_CARDS: "GET_DECK_CARDS",
  FLIP_DECK_PILE: "FLIP_DECK_PILE",
  SET_REFS: "SET_REFS",
  SET_TRANSLATION: "SET_TRANSLATION",
  CREATE_DECK: "CREATE_DECK"
};

export interface CardsPile {
  id: number;
  image: string;
}

export const cardsConfigurations = {
  deck: 24,
  column1: 1,
  column2: 2,
  column3: 3,
  column4: 4,
  column5: 5,
  column6: 6,
  column7: 7
};

export default DeckActionTypes;
