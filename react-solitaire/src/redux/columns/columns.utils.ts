/* eslint-disable no-console */
import { CardType } from "../gameBoard/gameBoard.types";

export const createColumns = (columns: Record<string, Array<CardType>>) => {
  const columnValues: Array<Array<CardType>> = Object.values(columns);

  const cardsFlippedSet = columnValues.map(
    (values: Array<CardType>, columnIndex: number) =>
      values.map((value: CardType, valueIndex: number) => {
        return { ...value, flipped: valueIndex === columnIndex };
      })
  );

  // create array with all the cards piles needed
  const CardTypes = Object.keys(columns);

  // add to each pile the corresponding cards
  let finalResult = {};
  CardTypes.map(
    (pile: string, index: number) =>
      (finalResult = {
        ...finalResult,
        [pile]: cardsFlippedSet[index]
      })
  );

  return finalResult;
};

export const isValidMovement = (
  cardsToSwap: Array<CardType>,
  finalCard: CardType
) => {
  console.log("isValidMovement cardsToSwap  = ", cardsToSwap);
  console.log("isValidMovement finalCard  = ", finalCard);

  const firstCard = cardsToSwap[0];

  if (!finalCard) {
    return true;
  }

  if (firstCard.cardColor === finalCard.cardColor) {
    return false;
  }
  if (finalCard.cardNumber - 1 !== firstCard.cardNumber) {
    return false;
  }
  return true;
};

export const swapColumns = (
  columns: Record<string, Array<CardType>>,
  cardDraggingColIndex: string,
  finalIndex: string,
  nCards: number
) => {
  const initialCol = [...columns[cardDraggingColIndex]];
  // get from what index to slice
  const indexToDelete = initialCol.length;
  // get the cards that will swap and also remove th
  const finalCol = [...columns[finalIndex]];
  const cardDragging = [...columns.cardDragging];

  if (isValidMovement(cardDragging, finalCol[finalCol.length - 1])) {
    // add the swapped cards to the final column
    cardDragging.map((card: CardType) => finalCol.push(card));

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
      return {
        [cardDraggingColIndex]: initialCol,
        [finalIndex]: finalCol,
        cardsDragging: undefined,
        cardsDraggingCol: undefined
      };
    }
    return {
      [finalIndex]: finalCol,
      cardsDragging: undefined,
      cardsDraggingCol: undefined
    };
  }

  // if the movement was invalid, then put the card back
  cardDragging.map((card: CardType) => initialCol.push(card));
  return {
    [cardDraggingColIndex]: initialCol,
    cardsDragging: undefined,
    cardsDraggingCol: undefined
  };
};

export const addToColumn = (
  columns: Record<string, Array<CardType>>,
  finalIndex: string,
  cardDragging: Array<CardType>
) => {
  // get the cards that will swap and also remove th
  const finalCol = [...columns[finalIndex]];

  if (isValidMovement(cardDragging, finalCol[finalCol.length - 1])) {
    // add the swapped cards to the final column
    cardDragging.map((card: CardType) =>
      finalCol.push({ ...card, flipped: true })
    );

    return {
      [finalIndex]: finalCol,
      sendBack: false
    };
  }

  return {
    sendBack: true
  };
};

export const setCardDragging = (
  columns: Record<string, Array<CardType>>,
  nCards: number,
  columnId: string
) => {
  const initialCol = [...columns[columnId]];
  // get from what index to slice
  const indexToDelete = initialCol.length - nCards;
  // get the cards that will swap and also remove them from the initial column
  const cardsToSwap = initialCol.splice(indexToDelete, nCards);

  return {
    cardDragging: cardsToSwap,
    cardDraggingCol: columnId,
    [columnId]: initialCol
  };
};
