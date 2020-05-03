const GameBoardActionTypes = {
  CREATE_DECK: "CREATE_DECK"
};

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

export interface CardsPile {
  id: number;
  image: string;
}

export default GameBoardActionTypes;
