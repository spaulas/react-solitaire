import { CardType } from "../gameBoard/gameBoard.types";

export const setCardDragging = (
  goals: Record<string, Array<CardType>>,
  goalId: string
) => {
  // create copy of the flipped pile
  const tempGoalPile = [...goals[goalId]];
  // get the top card
  const cardDragging = tempGoalPile.pop();

  return {
    cardDragging: [cardDragging]
  };
};

/**
 * Checks if the movement respects the game rules
 * @param firstCard
 * @param finalCard
 */
export const isValidMovement = (firstCard: CardType, finalCard: CardType) => {
  // if the goal has no cards, then it should be the first number
  if (!finalCard) {
    if (firstCard.cardNumber === 1) {
      return true;
    }
    return false;
  }

  // if the cards have different colors, then return false
  if (firstCard.cardSuit.indexOf(finalCard.cardSuit) !== 0) {
    return false;
  }
  // if the card being added has a number that is not one value higher, then return false
  if (finalCard.cardNumber + 1 !== firstCard.cardNumber) {
    return false;
  }

  // if both rules were respected, return true
  return true;
};

/**
 * Adds the cards being dragged to the destination goal pile
 * @param goals
 * @param finalId
 * @param cardDragging
 */
export const addToGoal = (
  goals: Record<string, Array<CardType>>,
  finalId: string,
  cardDragging: Array<CardType>
) => {
  // create a copy of the destination goal pile
  const finalGoal = [...goals[finalId]];

  // check if the movement respects the game rules
  if (isValidMovement(cardDragging[0], finalGoal[finalGoal.length - 1])) {
    // add the swapped cards to the final goal pile
    cardDragging.map((card: CardType) =>
      finalGoal.push({ ...card, flipped: true, cardField: finalId })
    );

    const goalKeys = Object.keys(goals);

    // it stops at the first comparison that is true, so it does not check the other piles without need
    // since the game is only over when all the four piles are full
    const gameOver = !goalKeys.some((key: string) => {
      if (finalId === key) {
        // because it was not added yet
        return goals[key].length + 1 < 13;
      }
      return goals[key].length < 13;
    });

    // returns the changes in the destination goal pile and, since the movement was valid, there is no need to send them back
    return {
      goals: { ...goals, [finalId]: finalGoal },
      cardDragging: undefined,
      cardDraggingGoal: undefined,
      sendBack: false,
      gameOver
    };
  }

  // since the movement was invalid, it is necessary to send the card back to the correct place
  return {
    sendBack: true
  };
};

export const swapGoals = (
  goals: Record<string, Array<CardType>>,
  cardsDragging: Array<CardType> = [],
  cardInitialGoalId = "goal1Pile",
  finalId: string
) => {
  // create copy of the goal pile the cards come from
  const initialGoal = [...goals[cardInitialGoalId]];
  const indexToDelete = initialGoal.length - 1;
  initialGoal.splice(indexToDelete, 1);

  // create copy of the destination goal pile
  const finalGoal = [...goals[finalId]];
  // create copy of the cards that have to be swapped
  const cardsSwapping = [...cardsDragging];

  // check if the movement respects the rules of the game (compare the first card to add with the last card of the destination goal pile)
  if (isValidMovement(cardsSwapping[0], finalGoal[finalGoal.length - 1])) {
    // add the swapped cards to the final goal pile
    cardsSwapping.map((card: CardType) =>
      finalGoal.push({ ...card, cardField: finalId })
    );

    // no changes were made in the initial goal pile, so simply return the changes in the final goal pile
    return {
      goals: {
        ...goals,
        [finalId]: finalGoal,
        [cardInitialGoalId]: initialGoal
      },
      sendBack: false
    };
  }

  // if the movement was invalid, then put the card back in the initial goal pile
  cardsSwapping.map((card: CardType) => initialGoal.push(card));

  // no changes were made in the final goal pile, so simply return the changes in the initial goal pile
  return {
    goals: {
      ...goals,
      [cardInitialGoalId]: initialGoal
    },
    cardsDragging: undefined,
    sendBack: true
  };
};

export const unswapGoals = (
  goals: Record<string, Array<CardType>>,
  initialGoalId: string,
  finalGoalId: string
) => {
  // get copy of the initial goal
  const initialGoal = [...goals[initialGoalId]];
  // get copy of the final goal
  const finalGoal = [...goals[finalGoalId]];

  // get top cards from the initial goal pile
  const cardsSwapping = initialGoal.pop();

  // add it to the final goal pile
  finalGoal.push({ ...cardsSwapping, cardField: finalGoalId } as CardType);

  return {
    goals: { ...goals, [initialGoalId]: initialGoal, [finalGoalId]: finalGoal }
  };
};
