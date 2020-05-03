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

export const getTranslationY = (
  deckPile: Array<CardsPile>,
  flippedPile: Array<CardsPile>
) => {
  const nDeckCards = deckPile.length;
  const nFlippedCards = flippedPile.length;

  const diffCards = nDeckCards - nFlippedCards;

  return diffCards;
};
