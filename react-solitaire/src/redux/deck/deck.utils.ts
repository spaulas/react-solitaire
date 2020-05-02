import { CardsPile } from "./deck.types";

export const popDeckCard = (
  deckPile: Array<CardsPile>,
  turnedPile: Array<CardsPile>
) => {
  const topCard = deckPile.pop() as CardsPile;
  turnedPile.push(topCard);

  return { deckPile, turnedPile };
};
