const DeckActionTypes = {
  GET_DECK_CARDS: "GET_DECK_CARDS",
  SEND_DECK_TOP_TO_FLIPPED_PILE: "SEND_DECK_TOP_TO_FLIPPED_PILE"
};

export interface CardsPile {
  name: string;
  cardType: "deck" | "spot";
  translation?: number;
}

export default DeckActionTypes;
