// Game Board Actions
const GameBoardActionTypes = {
  CREATE_GAME: "CREATE_GAME",
  TOGGLE_GAME_FLAG: "TOGGLE_GAME_FLAG",
  ADD_GAME_MOVE: "ADD_GAME_MOVE",
  REMOVE_GAME_MOVE: "REMOVE_GAME_MOVE",
  RE_ADD_GAME_MOVE: "RE_ADD_GAME_MOVE",
  TIME_GAME: "TIME_GAME"
};

// number of the initial cards of each field of the game
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

// type of a card
export interface CardType {
  id: number; // 0 to 51 (number of cards)
  image: string; // image associated with the card
  flipped?: boolean; // when true, the face of the card is shown
  cardColor: "red" | "black"; // color of the suit
  cardSuit: string;
  cardNumber: number; // actual number of the card, goes from 1 to 13
  cardField: string;
}

export default GameBoardActionTypes;
