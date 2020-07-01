import { CardType } from "../gameBoard/gameBoard.types";

// ********************************************************
// HELPER FUNCTIONS

/**
 * Checks if the movement respects the game rules
 * @param firstCard card of the pile to add to a goal
 * @param finalCard top card of the goal to add the first card
 */
export const isValidMovement = (firstCard: CardType, finalCard?: CardType) => {
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

// ********************************************************
// SWAPPING FUNCTIONS

/**
 * Swap cards from one goal to the other
 * @param goals
 * @param cardsDragging cards that were being dragged from another goal
 * @param initialId id of the goal the cards were being dragged from
 * @param finalId id of the target goal
 */
export const swapGoals = (
  goals: Record<string, Array<CardType>>,
  cardsDragging: Array<CardType> = [],
  initialId = "goal1Pile",
  finalId: string
) => {
  // create copy of the goal pile the cards come from
  const initialGoal = [...goals[initialId]];
  // get the index of the goal "break"
  const indexToDelete = initialGoal.length - 1;
  // remove the cards from the initial goal
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

    // return the changes made in the initial and final goal piles
    return {
      goals: {
        ...goals,
        [finalId]: finalGoal,
        [initialId]: initialGoal
      },
      sendBack: false
    };
  }

  // if the movement was invalid, then put the card back in the initial goal pile
  cardsSwapping.map((card: CardType) => initialGoal.push(card));

  // no changes were made in the initial and final goal piles
  // so simply return the send back flag signaling that the movement was not done
  return {
    sendBack: true,
    cardDragging: undefined,
    cardDraggingGoal: undefined
  };
};

/**
 * Undo the swap movement between 2 goals
 * @param goals
 * @param initialId id of the goal the cards will be removed from
 * @param finalId id of the goal the cards will be added to
 */
export const undoSwapGoals = (
  goals: Record<string, Array<CardType>>,
  initialId: string,
  finalId: string
) => {
  // get copy of the initial goal
  const initialGoal = [...goals[initialId]];
  // get copy of the final goal
  const finalGoal = [...goals[finalId]];

  // get top cards from the initial goal pile
  const cardsSwapping = initialGoal.pop();

  // add it to the final goal pile
  finalGoal.push({ ...cardsSwapping, cardField: finalId } as CardType);

  // return the changes made in the initial and final goal
  return {
    goals: { ...goals, [initialId]: initialGoal, [finalId]: finalGoal }
  };
};

// ********************************************************
// DRAGGING FUNCTIONS

/**
 * Sets the cards that are currently being dragged
 * @param goals
 * @param goalId id of the goal the cards come from
 */
export const setCardDragging = (
  goals: Record<string, Array<CardType>>,
  goalId: string
) => {
  // create copy of the flipped pile
  const tempGoalPile = [...goals[goalId]];
  // get the top card
  const cardDragging = tempGoalPile.pop();

  return {
    cardDragging: [cardDragging],
    cardDraggingGoal: goalId
  };
};

/**
 * Adds the cards being dragged to the destination goal
 * @param goals
 * @param finalId id of the goal the cards will be added to
 * @param cardDragging cards that are being dragged
 */
export const addDragginCardsToGoal = (
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

    // get an array with the goal piles ids
    const goalIds = Object.keys(goals);

    // it stops at the first comparison that is true, so it does not check the other piles without need
    // since the game is only over when all the four piles are full
    const gameOver = !goalIds.some((key: string) => {
      if (finalId === key) {
        // because it was not added yet
        return goals[key].length + 1 < 13;
      }
      return goals[key].length < 13;
    });

    // returns the changes in the destination goal pile and, since the movement was valid, there is no need to send them back
    return {
      goals: { ...goals, [finalId]: finalGoal },
      sendBack: false,
      gameOver
    };
  }

  // since the movement was invalid, it is necessary to send the card back to the correct place
  return {
    sendBack: true
  };
};

// ********************************************************
// REMOVE/ADD CARDS FUNCTIONS

/**
 * Adds back to a goal, a card from a undo/redo movement
 * @param goals
 * @param goalId id of the goal to add the card to
 * @param card card to be added
 */
export const addCardToGoal = (
  goals: Record<string, Array<CardType>>,
  goalId: string,
  card: CardType
) => {
  // create a copy of the goal
  const goal = [...goals[goalId]];

  // add the cards to the final goal
  goal.push({ ...card, flipped: true, cardField: goalId });

  // return the changes in the goal
  return {
    goals: {
      ...goals,
      [goalId]: goal
    },
    doubleClickTarget: undefined
  };
};

/**
 * Removes back 1 card from a goal (the cards are from a undo-redo movement)
 * @param goals
 * @param goalId id of the goal the cards will be removed from
 */
export const removeCardFromGoal = (
  goals: Record<string, Array<CardType>>,
  goalId: string
) => {
  // get copy of the goal
  const goal = [...goals[goalId]];
  // remove the top card
  goal.pop();

  return {
    goals: {
      ...goals,
      [goalId]: goal
    }
  };
};

// ********************************************************
// DOUBLE CLICK FUNCTIONS

/**
 * Get the first valid target goal
 * @param goals
 * @param card card to move
 */
export const getValidTarget = (
  goals: Record<string, Array<CardType>>,
  card: CardType
) => {
  // get the first valid spot
  return Object.keys(goals).find((goal: string) => {
    const goalCards = goals[goal].length - 1;
    return isValidMovement(
      card,
      goalCards < 0 ? undefined : goals[goal][goalCards]
    );
  });
};

/**
 * Checks if there is a valid move to a goal
 * @param goals
 * @param card card to be moved
 * @param doubleClickTarget current value store at the doubleClickTarget state
 */
export const checkDoubleClickValid = (
  goals: Record<string, Array<CardType>>,
  card: CardType,
  doubleClickTarget?: boolean | string
) => {
  // get the first possible target goal id
  const targetId = getValidTarget(goals, card);

  // if there is no valid target goal, toggle the doubleClickTarget
  // if there is a valid target goal, save its id
  return {
    doubleClickTarget: targetId === undefined ? !doubleClickTarget : targetId
  };
};

/**
 * Checks if there is a valid move to another goal, if so swap the cards
 * @param goals
 * @param sourceId id of the source goal
 * @param card card to swap
 * @param doubleClickTarget current value store at the doubleClickTarget state
 */
export const checkGoalSwapDoubleClickValid = (
  goals: Record<string, Array<CardType>>,
  sourceId: string,
  card: CardType,
  doubleClickTarget?: boolean | string
) => {
  // get the first possible target goal id
  const targetId = getValidTarget(goals, card);
  // saves the result of the goal piles that will be swapped
  let swapResult = {};
  // if there is a valid goal target do the swap of goals
  if (targetId) {
    swapResult = swapGoals(goals, [card], sourceId, targetId);
  }

  // if there is no valid target goal and toggle the doubleClickTarget  (the swap result holds nothing)
  // if there is a valid target goal, then save it, the cards that were swapped and the respective goals final result
  return {
    doubleClickTarget: targetId === undefined ? !doubleClickTarget : targetId,
    ...swapResult
  };
};
