import { CardsPile } from "../gameBoard/gameBoard.types";

export const popDeckCard = (
  deckPile: Array<CardsPile>,
  flippedPile: Array<CardsPile>
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

export const popFlippedCard = (flippedPile: Array<CardsPile>) => {
  const tempFlippedPile = [...flippedPile];
  const cardFlipped = tempFlippedPile.pop();

  return {
    cardDragging: [cardFlipped],
    flippedPile: tempFlippedPile
  };
};

export const getTranslationY = (
  deckPile: Array<CardsPile>,
  flippedPile: Array<CardsPile>
) => {
  const nDeckCards = deckPile.length;
  const nFlippedCards = flippedPile.length;

  const diffCards = nDeckCards - nFlippedCards;

  return diffCards;
};

export const addFlippedCard = (
  card: Array<CardsPile>,
  flippedPile: Array<CardsPile>
) => {
  const tempFlippedPile = [...flippedPile, ...card];

  return { flippedPile: tempFlippedPile };
};
