/* eslint-disable indent */
import { CardType, cardsConfigurations } from "./gameBoard.types";

// part of the CardType interface
interface RawCardType {
  cardColor: CardType["cardColor"];
  cardNumber: CardType["cardNumber"];
  image: CardType["image"];
}

// creates all the cards and randomly distributes them throughout the game fields
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
  const cardsFields = [
    "deckPile",
    "column1Pile",
    "column2Pile",
    "column3Pile",
    "column4Pile",
    "column5Pile",
    "column6Pile",
    "column7Pile"
  ];

  // add to each pile the correct number of cards by creating an object (the key is the field name and the value is an array of the respective cards)
  let finalResult = {};
  cardsFields.map(
    (pile: string, index: number) =>
      (finalResult = {
        ...finalResult,
        [pile]: createCardsArray(
          cardsImages,
          pile,
          indexArray[index],
          indexArray[index + 1]
        )
      })
  );

  return finalResult;
};

// creates an array of objects for each card
export const getAllCards = () => {
  // array for the suits available
  const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  // array that will contain all the cards
  const cards = [];

  // for each suit available
  for (let i = 0; i < suits.length; i++) {
    // and for each card number
    for (let j = 1; j <= 13; j++) {
      cards.push({
        cardColor: i < 2 ? "red" : "black", // for i = 0 and i = 1, the suits are red, the are two are black
        cardNumber: j,
        image: `${suits[i]}/${suits[i].toLowerCase()}${
          j < 10 ? `0${j}` : j
        }.png` // get the corresponding image for the card created
      } as const);
    }
  }

  return cards;
};

// randomly shuffles the cards created
export const shuffle = (array: Array<RawCardType>) => {
  for (
    let j, temp, i = array.length;
    i;
    j = Math.floor(Math.random() * i),
      temp = array[--i],
      array[i] = array[j],
      array[j] = temp
  );
  return array;
};

// separates the cards array in parts from min to max and adds its id
export const createCardsArray = (
  cardsRawArray: Array<RawCardType>,
  cardField: string,
  min: number,
  max: number
) => {
  const cardsArray: Array<CardType> = [];
  for (let i = min; i < max; i++) {
    cardsArray.push({
      id: i,
      cardField,
      ...cardsRawArray[i]
    });
  }
  return cardsArray;
};
