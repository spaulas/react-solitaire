import { CardsPile } from "./deck.types";

export const popDeckCard = (
  deckPile: Array<CardsPile>,
  flippedPile: Array<CardsPile>,
  cardId: number
) => {
  const cardFlipped = deckPile.find(card => card.id === cardId) as CardsPile;
  const tempDeckPile = [...deckPile];
  tempDeckPile.filter(card => card.id !== cardId);
  const tempFlippedPile = [...flippedPile];
  tempFlippedPile.push(cardFlipped);

  return {
    deckPile: tempDeckPile,
    flippedPile: tempFlippedPile
  };
};
