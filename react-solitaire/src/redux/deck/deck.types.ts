const DeckActionTypes = {
  GET_DECK_CARDS: "GET_DECK_CARDS",
  FLIP_DECK_PILE: "FLIP_DECK_PILE"
};

export interface CardsPile {
  id: number;
  pos: number;
  name: string;
  cardType: "deck" | "spot" | "flipped";
  translation?: number;
}

export default DeckActionTypes;
