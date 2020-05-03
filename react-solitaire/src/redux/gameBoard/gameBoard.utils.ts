/* eslint-disable indent */
import { CardsPile, cardsConfigurations } from "./gameBoard.types";

export const createRandomDeck = () => {
  const cardsArray = shuffle(getAllCards());
  const deckCards: Array<CardsPile> = [];

  for (let i = 0; i < cardsConfigurations.deck; i++) {
    deckCards.push({
      id: i,
      image: cardsArray[i]
    });
  }

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
      cards.push(
        `${suits[i]}/${suits[i].toLowerCase()}${j < 10 ? `0${j}` : j}.png`
      );
    }
  }

  return cards;
};
