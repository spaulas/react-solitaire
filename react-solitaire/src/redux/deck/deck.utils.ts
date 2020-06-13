import { CardType } from "../gameBoard/gameBoard.types";

/**
 * Flips one deck card to the flipped pile
 * @param deckPile
 * @param flippedPile
 */
export const flipDeckCard = (
  deckPile: Array<CardType>,
  flippedPile: Array<CardType>
) => {
  // create copy of the deck pile
  const tempDeckPile = [...deckPile];
  // get the top card of the deck pile
  const cardFlipped = tempDeckPile.pop();
  // get copy of the flipped pile
  const tempFlippedPile = [...flippedPile];

  // if there was indeed a card to be flipped, then add it to the flipped pile
  if (cardFlipped) {
    tempFlippedPile.push(cardFlipped);
  }

  return {
    deckPile: tempDeckPile,
    flippedPile: tempFlippedPile
  };
};

/**
 * Gets the top card of the flipped pile
 * @param flippedPile
 */
export const popFlippedCard = (flippedPile: Array<CardType>) => {
  // create copy of the flipped pile
  const tempFlippedPile = [...flippedPile];
  // get the top card
  const cardFlipped = tempFlippedPile.pop();

  return {
    cardDragging: [cardFlipped]
    // flippedPile: tempFlippedPile
  };
};

/**
 * Restore the flipped deck pile that was being dragged
 * @param card it needs to be an array simply to simplify, because in the columns, more than one card can be dragged at once
 * @param flippedPile
 */
export const restoreFlippedCard = (
  card: Array<CardType> = [],
  flippedPile: Array<CardType>
) => {
  // add the card back to the flipped pile
  const tempFlippedPile = [...flippedPile, ...card];

  return { flippedPile: tempFlippedPile };
};

/**
 * Gets the current Y translation from the deck pile to the flipped pile
 * @param pilesObject
 */
export const getTranslationY = ({
  deckPile,
  flippedPile
}: {
  deckPile: Array<CardType>;
  flippedPile: Array<CardType>;
}) => {
  // get the number of cards of each pile
  const nDeckCards = deckPile.length;
  const nFlippedCards = flippedPile.length;

  // get the difference
  const diffCards = nDeckCards - nFlippedCards * 2;

  return diffCards;
};
