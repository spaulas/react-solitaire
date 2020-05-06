/* eslint-disable no-console */
/* eslint-disable indent */
import { CardsPile, cardsConfigurations } from "./gameBoard.types";

export const createRandomGame = () => {
  // get all the cards images and shuffle them
  const cardsImages = shuffle(getAllCards());
  // at each index, sum all the previous ones
  let sum: number;
  let indexArray = Object.values(cardsConfigurations).map(
    (elem: number) => (sum = (sum || 0) + elem)
  );
  // add an extra 0 at the start
  indexArray = [0, ...indexArray];
  // create array with all the cards piles needed
  const cardsPiles = [
    "deckPile",
    "column1Pile",
    "column2Pile",
    "column3Pile",
    "column4Pile",
    "column5Pile",
    "column6Pile",
    "column7Pile"
  ];

  // add to each pile the correct number of cards
  let finalResult = {};
  cardsPiles.map(
    (pile: string, index: number) =>
      (finalResult = {
        ...finalResult,
        [pile]: createCardsArray(
          cardsImages,
          indexArray[index],
          indexArray[index + 1]
        )
      })
  );

  return finalResult;
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

export const createCardsArray = (
  cardsImages: Array<string>,
  min: number,
  max: number
) => {
  const cardsArray: Array<CardsPile> = [];
  for (let i = min; i < max; i++) {
    cardsArray.push({
      id: i,
      image: cardsImages[i]
    });
  }
  return cardsArray;
};
