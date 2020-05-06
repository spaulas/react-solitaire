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

  // get the cards that will swap
  const cardsToSwap = initialCol.splice(indexToDelete, nCards);

  cardsToSwap.map((card: CardsPile) => finalCol.push(card));

  return { [initialIndex]: initialCol, [finalIndex]: finalCol };
};
