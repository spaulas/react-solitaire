/* eslint-disable indent */
import { CardType, GameMove, cardsConfigurations } from "./gameBoard.types";
import { ExplicitAny } from "../../global";

// part of the CardType interface
interface RawCardType {
  cardColor: CardType["cardColor"];
  cardSuit: string;
  cardNumber: CardType["cardNumber"];
  image: CardType["image"];
}

// ********************************************************
// HELPER FUNCTIONS

/**
 * Creates an array of objects for each card
 */
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
        cardSuit: suits[i],
        cardNumber: j,
        image: `${suits[i]}/${suits[i].toLowerCase()}${
          j < 10 ? `0${j}` : j
        }.png` // get the corresponding image for the card created
      } as const);
    }
  }

  return cards;
};

/**
 * Randomly shuffles the cards created
 */
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

/**
 * Separates the cards array in parts from min to max and adds its id
 */
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

// ********************************************************
// INITIAL SETTINGS FUNCTIONS

/**
 * Creates all the cards and randomly distributes them throughout the game fields
 */
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

  return {
    ...finalResult,
    goal1Pile: [],
    goal2Pile: [],
    goal3Pile: [],
    goal4Pile: [],
    flippedPile: []
  };
};

/**
 * When a game starts, it is necessary to reset a few states
 * @param gameFlag current game flag (to be toggled)
 */
export const resetGameStatus = (gameFlag: boolean) => {
  return {
    gameFlag: !gameFlag, // toggle game flag
    gameMoves: 0, // resets the counting of moves
    gamePaused: true, // the game is not paused at start
    gameTime: 0,
    gameHints: [],
    nHints: 0,
    gamePreviousMoves: [], // there are no moves to be undone
    gameNextMoves: [], // there are  no moves to be redone
    showingConfirm: false
  };
};

export const setInitialValues = (savedGame: ExplicitAny, gameFlag: boolean) => {
  return {
    gameFlag: !gameFlag, // toggle game flag
    gamePaused: false,
    gameHints: [],
    gamePreviousMoves: [], // there are no moves to be undone
    gameNextMoves: [], // there are  no moves to be redone
    deckPile: savedGame.deckPile,
    flippedPile: savedGame.flippedPile,
    nHints: savedGame.nHints,
    gameMoves: savedGame.gameMoves,
    gameTime: savedGame.gameTime,
    column1Pile: savedGame.columns.column1Pile,
    column2Pile: savedGame.columns.column2Pile,
    column3Pile: savedGame.columns.column3Pile,
    column4Pile: savedGame.columns.column4Pile,
    column5Pile: savedGame.columns.column5Pile,
    column6Pile: savedGame.columns.column6Pile,
    column7Pile: savedGame.columns.column7Pile,
    goal1Pile: savedGame.goals.goal1Pile,
    goal2Pile: savedGame.goals.goal2Pile,
    goal3Pile: savedGame.goals.goal3Pile,
    goal4Pile: savedGame.goals.goal4Pile,
    showingConfirm: false
  };
};

// ********************************************************
// GAME INFO/OPTIONS

export const addGameHint = (
  gameHints: Array<Record<string, string>>,
  nHints: number,
  source?: string,
  target?: string
) => {
  if (source) {
    return {
      gameHints: [...gameHints, { source, target }],
      nHints: nHints + 1
    };
  }
  return {
    nHints: nHints + 1
  };
};

// ********************************************************
// GAME MOVES' HISTORY FUNCTIONS

/**
 * Adds a move to the list of previous moves
 * @param gamePreviousMoves list of previous moves stored
 * @param move game move to add
 * @param gameMoves current count of game moves
 */
export const addGameMove = (
  gamePreviousMoves: Array<GameMove>,
  move: GameMove,
  gameMoves: number
) => {
  // add the move to the list of previous moves
  const tempPreviousMoves = [...gamePreviousMoves];
  tempPreviousMoves.push(move);

  return {
    gamePreviousMoves: tempPreviousMoves,
    gameMoves: gameMoves + 1, // add a new game move
    gameNextMoves: [], // reset the game next moves
    gameHints: [],
    gamePaused: false
  };
};

/**
 * Remove a move from a source list to the target list
 * @param gameMoveSource
 * @param gameMoveTarget
 * @param gameMoves
 */
export const removeGameMove = (
  sourceId: string,
  targetId: string,
  gameMoveSource: Array<GameMove>,
  gameMoveTarget: Array<GameMove>,
  gameMoves: number
) => {
  // create copy of the list of moves
  const tempGameMoveSource = [...gameMoveSource];
  const tempGameMoveTarget = [...gameMoveTarget];
  // remove the top move of the source list
  const moveUndone = tempGameMoveSource.pop();
  // add that move to the target list
  tempGameMoveTarget.push(moveUndone as GameMove);

  return {
    [sourceId]: tempGameMoveSource,
    [targetId]: tempGameMoveTarget,
    gameMoves: gameMoves + 1, // add a new game move
    gameHints: []
  };
};
