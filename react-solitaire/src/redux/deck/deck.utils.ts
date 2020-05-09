import { CardType } from "../gameBoard/gameBoard.types";

export const popDeckCard = (
  deckPile: Array<CardType>,
  flippedPile: Array<CardType>
) => {
  const tempDeckPile = [...deckPile];
  const cardFlipped = tempDeckPile.pop();
  const tempFlippedPile = [...flippedPile];

  if (cardFlipped) {
    tempFlippedPile.push(cardFlipped);
  }

  return {
    deckPile: tempDeckPile,
    flippedPile: tempFlippedPile
  };
};

export const popFlippedCard = (flippedPile: Array<CardType>) => {
  const tempFlippedPile = [...flippedPile];
  const cardFlipped = tempFlippedPile.pop();

  return {
    cardDragging: [cardFlipped],
    flippedPile: tempFlippedPile
  };
};

export const getTranslationY = (
  deckPile: Array<CardType>,
  flippedPile: Array<CardType>
) => {
  const nDeckCards = deckPile.length;
  const nFlippedCards = flippedPile.length;

  const diffCards = nDeckCards - nFlippedCards;

  return diffCards;
};

export const addFlippedCard = (
  card: Array<CardType>,
  flippedPile: Array<CardType>
) => {
  const tempFlippedPile = [...flippedPile, ...card];

  return { flippedPile: tempFlippedPile };
};
