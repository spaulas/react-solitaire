import { CardsPile } from "../gameBoard/gameBoard.types";

export const createColumns = (columns: Record<string, Array<CardsPile>>) => {
  const columnValues: Array<Array<CardsPile>> = Object.values(columns);

  const cardsFlippedSet = columnValues.map(
    (values: Array<CardsPile>, columnIndex: number) =>
      values.map((value: CardsPile, valueIndex: number) => {
        return { ...value, flipped: valueIndex === columnIndex };
      })
  );

  // create array with all the cards piles needed
  const cardsPiles = Object.keys(columns);

  // add to each pile the corresponding cards
  let finalResult = {};
  cardsPiles.map(
    (pile: string, index: number) =>
      (finalResult = {
        ...finalResult,
        [pile]: cardsFlippedSet[index]
      })
  );

  return finalResult;
};

export const isValidMovement = (
  cardsToSwap: Array<CardsPile>,
  finalCard: CardsPile
) => {
  const firstCard = cardsToSwap[0];

  // eslint-disable-next-line no-console
  console.log("firstCard = ", firstCard);
  // eslint-disable-next-line no-console
  console.log("finalCard = ", finalCard);

  if (firstCard.cardColor === finalCard.cardColor) {
    return false;
  }
  if (finalCard.cardNumber - 1 !== firstCard.cardNumber) {
    return false;
  }
  return true;
};

export const swapColumns = (
  columns: Record<string, Array<CardsPile>>,
  initialIndex: string,
  finalIndex: string,
  nCards: number
) => {
  const initialCol = [...columns[initialIndex]];
  const finalCol = [...columns[finalIndex]];

  // get from what index to slice
  const indexToDelete = initialCol.length - nCards;

  // get the cards that will swap and also remove them from the initial column
  const cardsToSwap = initialCol.splice(indexToDelete, nCards);

  if (isValidMovement(cardsToSwap, finalCol[finalCol.length - 1])) {
    // eslint-disable-next-line no-console
    console.log("MOVEMENT IS VALID!!!!!!!!!!!!");
    // add the swapped cards to the final column
    cardsToSwap.map((card: CardsPile) => finalCol.push(card));

    // if the indexToDelete is bigger than 0, there are more cards in the initial column
    // if the last index has flipped = false, then make it true
    if (indexToDelete > 0) {
      const lastCard = indexToDelete - 1;
      if (!initialCol[lastCard].flipped) {
        initialCol[lastCard] = {
          ...initialCol[lastCard],
          flipped: true
        };
      }
      return { [initialIndex]: initialCol, [finalIndex]: finalCol };
    }
  }
  return {};
};
