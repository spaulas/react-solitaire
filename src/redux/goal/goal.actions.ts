import { CardType } from "../gameBoard/gameBoard.types";
import GoalActionTypes from "./goal.types";
import { ValueOf } from "../../global";

// ********************************************************
// INITIAL SETTINGS ACTIONS

/**
 * Stores the initial goals in the Redux State
 * @param v
 */
const setInitialGoals = (goals: Record<string, Array<CardType>>) => ({
  type: GoalActionTypes.SET_INITIAL_GOALS,
  goals
});

// ********************************************************
// SWAPPING ACTIONS

/**
 * Swap 1 card from one goal to the other
 * @param finalId id of the destination goal pile
 */
const swapGoals = (finalId: string) => ({
  type: GoalActionTypes.SWAP_GOALS,
  finalId
});

/**
 * Undo swap of goals, sends back 1 card from the target goal to the source goal
 * @param source goal where the cards originally came from
 * @param target goal where the cards originally were sent to
 */
const undoSwapGoals = (source: string, target: string) => ({
  type: GoalActionTypes.UNSWAP_GOALS,
  source,
  target
});

// ********************************************************
// DRAGGING ACTIONS

/**
 * Starts dragging N cards and saves its initial goal id
 * @param goalId goal which the cards come from
 */
const dragGoalCards = (goalId: string) => ({
  type: GoalActionTypes.DRAG_GOAL_CARDS,
  goalId
});

/**
 * Adds the cards that were being dragged to the selected goal
 * @param finalId id of the destination goal
 * @param cardDragging cards that were being dragged
 */
const addDraggingCardsToGoal = (
  finalId: string,
  cardDragging: Array<CardType>
) => ({
  type: GoalActionTypes.ADD_DRAGGING_CARDS_TO_GOAL,
  finalId,
  cardDragging
});

/**
 * Resets the currently saved card that was being dragged and its initial goal id
 */
const resetCardDragging = () => ({
  type: GoalActionTypes.RESET_GOAL_CARD_DRAGGING
});

// ********************************************************
// REMOVE/ADD CARDS ACTIONS

/**
 * Sends a card to a goal pile
 * @param goalId id of the goal receiving the card
 * @param card card to be added to a goal pile
 */
const addCardToGoal = (goalId: string, card: CardType) => ({
  type: GoalActionTypes.ADD_CARD_TO_GOAL,
  goalId,
  card
});

/**
 * Removes 1 cards from a goal pile
 * @param goalId id of the column to be reduced of cards
 */
const removeCardFromGoal = (goalId?: string) => ({
  type: GoalActionTypes.REMOVE_CARD_FROM_GOAL,
  goalId
});

// ********************************************************
// DOUBLE CLICK ACTIONS

/**
 * Checks if there is a goal pile a card from another type of pile can be moved to
 * @param card card from the other type pile to be moved
 */
const checkDoubleClickValid = (card: CardType) => ({
  type: GoalActionTypes.CHECK_DOUBLE_CLICK_VALID,
  card
});

/**
 * Checks if there is a goal pile a goal pile card can be moved to and do the swapping
 * @param sourceId id of the source goal
 * @param card cards from the source goal to be swapped
 */
const checkGoalSwapDoubleClickValid = (sourceId: string, card: CardType) => ({
  type: GoalActionTypes.CHECK_GOAL_SWAP_DOUBLE_CLICK_VALID,
  sourceId,
  card
});

const checkMoveFromAnyColumn = (
  columns: Record<string, Array<CardType>>,
  previousHints: Array<Record<string, string>> = []
) => ({
  type: GoalActionTypes.CHECK_MOVE_FROM_ANY_COLUMN,
  columns,
  previousHints
});
// ********************************************************

const actionsCreators = Object.freeze({
  setInitialGoals,
  swapGoals,
  undoSwapGoals,
  dragGoalCards,
  addDraggingCardsToGoal,
  resetCardDragging,
  addCardToGoal,
  removeCardFromGoal,
  checkDoubleClickValid,
  checkGoalSwapDoubleClickValid,
  checkMoveFromAnyColumn
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;
