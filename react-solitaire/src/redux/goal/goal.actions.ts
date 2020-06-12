import { CardType } from "../gameBoard/gameBoard.types";
import GoalActionTypes from "./goal.types";
import { ValueOf } from "../../global";

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
 * @param cardDragging cards that were being dragged
 * @param finalId id of the destination goal
 */
const addDraggingCardsToGoal = (
  cardDragging: Array<CardType>,
  finalId: string
) => ({
  type: GoalActionTypes.ADD_DRAGGING_CARDS_TO_GOAL,
  cardDragging,
  finalId
});

/**
 * Resets the currently saved card that was been dragged, its position and initial goal ids
 */
const removeGoalCard = () => ({
  type: GoalActionTypes.REMOVE_GOAL_CARD
});

/**
 * Resets the currently saved card that was been dragged, its position and initial goal ids
 */
const resetCardDragging = () => ({
  type: GoalActionTypes.RESET_GOAL_CARD_DRAGGING
});

// ********************************************************

const actionsCreators = Object.freeze({
  dragGoalCards,
  addDraggingCardsToGoal,
  removeGoalCard,
  resetCardDragging
});

export type ActionsCreators = ReturnType<ValueOf<typeof actionsCreators>>;
export default actionsCreators;