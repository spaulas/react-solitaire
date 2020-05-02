import { CardsPile } from "./deck.types";

export const popDeckCard = (deckPile: Array<CardsPile>, cardId: number) => {
  const tempDeckPile = deckPile.map(card =>
    card.id === cardId ? { ...card, cardType: "flipped" } : card
  );

  // eslint-disable-next-line no-console
  console.log("CURRENT = ", tempDeckPile);

  const topDeck = tempDeckPile.find(
    card => card.cardType === "deck"
  ) as CardsPile;

  return {
    deckPile: tempDeckPile,
    topDeck: topDeck ? topDeck.id : null,
    topFlipped: cardId
  };
};
