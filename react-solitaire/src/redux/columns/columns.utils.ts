/* eslint-disable no-console */
import { CardType } from "../gameBoard/gameBoard.types";

/**
 * Sets additional info for the column cards
 * @param columns
 */
export const createColumns = (columns: Record<string, Array<CardType>>) => {
  // get the cards of each column
  const columnValues: Array<Array<CardType>> = Object.values(columns);

  // add the flipped value to each card (the last one of each column will receive the value true)
  const cardsFlippedSet = columnValues.map(
    (values: Array<CardType>, columnIndex: number) =>
      values.map((value: CardType, valueIndex: number) => {
        return { ...value, flipped: valueIndex === columnIndex };
      })
  );

  // create array with all the cards columns needed
  const columnKeys = Object.keys(columns);

  // add to each column the corresponding cards
  let finalResult = {};
  columnKeys.map(
    (pile: string, index: number) =>
      (finalResult = {
        ...finalResult,
        [pile]: cardsFlippedSet[index]
      })
  );

  return finalResult;
};

/**
 * Checks if the movement respects the game rules
 * @param firstCard
 * @param finalCard
 */
export const isValidMovement = (firstCard: CardType, finalCard: CardType) => {
  // if the column has no cards, then simply return true
  if (!finalCard) {
    return true;
  }

  // if the cards have the same color, then return false
  if (firstCard.cardColor === finalCard.cardColor) {
    return false;
  }
  // if the card being added has a number that is not one value higher, then return false
  if (finalCard.cardNumber - 1 !== firstCard.cardNumber) {
    return false;
  }

  // if both rules were respected, return true
  return true;
};

export const swapColumns = (
  columns: Record<string, Array<CardType>>,
  cardsDragging: Array<CardType> = [],
  cardInitialColId = "column1Pile",
  finalId: string
) => {
  // create copy of the column the cards come from
  const initialCol = [...columns[cardInitialColId]];
  const indexToDelete = initialCol.length - cardsDragging.length;
  initialCol.splice(indexToDelete, cardsDragging.length);

  // get the number of cards left in the initial column
  const cardsLeft = initialCol.length;
  // create copy of the destination column
  const finalCol = [...columns[finalId]];
  // create copy of the cards that have to be swapped
  const cardsSwapping = [...cardsDragging];

  // check if the movement respects the rules of the game (compare the first card to add with the last card of the destination column)
  if (isValidMovement(cardsSwapping[0], finalCol[finalCol.length - 1])) {
    // add the swapped cards to the final column
    cardsSwapping.map((card: CardType) =>
      finalCol.push({ ...card, cardField: finalId })
    );

    // if the cardsLeft is bigger than 0, there are more cards in the initial column
    if (cardsLeft > 0) {
      // get the last card of the initial column
      const lastCard = cardsLeft - 1;

      // if the last card has flipped = false, then make it true
      if (!initialCol[lastCard].flipped) {
        initialCol[lastCard] = {
          ...initialCol[lastCard],
          flipped: true
        };
      }

      // return all the changes made in the initial and final columns
      return {
        columns: {
          ...columns,
          [cardInitialColId]: initialCol,
          [finalId]: finalCol
        }
      };
    }

    // no changes were made in the initial column, so simply return the changes in the final column
    return {
      columns: {
        ...columns,
        [finalId]: finalCol,
        [cardInitialColId]: initialCol
      }
    };
  }

  // if the movement was invalid, then put the card back in the initial column
  cardsSwapping.map((card: CardType) => initialCol.push(card));

  // no changes were made in the final column, so simply return the changes in the initial column
  return {
    columns: {
      ...columns,
      [cardInitialColId]: initialCol,
      cardsDragging: undefined
    }
  };
};

/**
 * Adds the cards being dragged to the destination column
 * @param columns
 * @param finalId
 * @param cardDragging
 */
export const addToColumn = (
  columns: Record<string, Array<CardType>>,
  finalId: string,
  cardDragging: Array<CardType>
) => {
  // create a copy of the destination column
  const finalCol = [...columns[finalId]];

  // check if the movement respects the game rules
  if (isValidMovement(cardDragging[0], finalCol[finalCol.length - 1])) {
    // add the swapped cards to the final column
    cardDragging.map((card: CardType) =>
      finalCol.push({ ...card, flipped: true, cardField: finalId })
    );

    // returns the changes in the destination column and, since the movement was valid, there is no need to send them back
    return {
      columns: { ...columns, [finalId]: finalCol },
      cardDragging: undefined,
      sendBack: false
    };
  }

  // since the movement was invalid, it is necessary to send the card back to the correct place
  return {
    sendBack: true
  };
};

/**
 * Sets the cards that are currently being dragged
 * @param columns
 * @param columnId
 * @param nCards
 */
export const setCardDragging = (
  columns: Record<string, Array<CardType>>,
  columnId: string,
  nCards: number
) => {
  console.log("setCardDragging columns = ", columns);
  console.log("setCardDragging columnId = ", columnId);
  console.log("setCardDragging nCards = ", nCards);
  // create copy of the initial column
  const initialCol = [...columns[columnId]];
  // get from what index to slice
  const indexToDelete = initialCol.length - nCards;
  // get the cards that will swap and also remove them from the initial column
  const cardsToSwap = initialCol.splice(indexToDelete, nCards);

  console.log("cardsToSwap = ", cardsToSwap);

  return {
    cardDragging: cardsToSwap,
    cardDraggingCol: columnId
    // columns: { ...columns, [columnId]: initialCol } @todo check if this change can be completely deleted!
  };
};
