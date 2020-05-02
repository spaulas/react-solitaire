import { CardsPile } from "./deck.types";

export const popDeckCard = (
  deckPile: Array<CardsPile>,
  flippedPile: Array<CardsPile>
) => {
  const topCard = deckPile.pop() as CardsPile;
  flippedPile.push(topCard);

  return { deckPile, flippedPile };
};
