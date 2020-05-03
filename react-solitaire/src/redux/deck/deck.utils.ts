/* eslint-disable indent */
import { CardsPile, cardsConfigurations } from "./deck.types";

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

export const createRandomDeck = () => {
  const cardsArray = shuffle(getAllCards());
  const deckCards: Array<CardsPile> = [];

  for (let i = 0; i < cardsConfigurations.deck; i++) {
    deckCards.push({
      id: i,
      image: cardsArray[i]
    });
  }

  // eslint-disable-next-line no-console
  console.log("final deck cards - ", deckCards);

  return deckCards;
};

export const shuffle = (array: Array<string>) => {
  for (
    let j, x, i = array.length;
    i;
    j = Math.floor(Math.random() * i),
      x = array[--i],
      array[i] = array[j],
      array[j] = x
  );
  return array;
};

export const getAllCards = () => {
  const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  const cards = [];

  for (let i = 0; i < suits.length; i++) {
    for (let j = 1; j <= 13; j++) {
      cards.push(`${suits[i]}/${suits[i].toLowerCase()}${j}.png`);
    }
  }

  // eslint-disable-next-line no-console
  console.log("CARDS = ", cards);
  return cards;
};
