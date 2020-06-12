/* eslint-disable indent */
import { addToGoal, setCardDragging } from "./goal.utils";
import { ActionsCreators } from "./goal.actions";
import { CardType } from "../gameBoard/gameBoard.types";
import GoalActionTypes from "./goal.types";

export interface InitialGoal {
  goals: {
    goal1Pile: Array<CardType>;
    goal2Pile: Array<CardType>;
    goal3Pile: Array<CardType>;
    goal4Pile: Array<CardType>;
  };
  cardDragging?: Array<CardType>;
  cardDraggingGoal?: string;
}

const INITIAL_GOAL: InitialGoal = {
  goals: {
    goal1Pile: [],
    goal2Pile: [],
    goal3Pile: [],
    goal4Pile: []
  },
  cardDragging: undefined,
  cardDraggingGoal: undefined
};

const goalReducer = (state = INITIAL_GOAL, action: ActionsCreators) => {
  switch (action.type) {
    // ********************************************************
    // DRAGGING ACTIONS

    case GoalActionTypes.DRAG_GOAL_CARDS:
      const draggingResult = setCardDragging(state.goals, action.goalId);
      return {
        ...state,
        ...draggingResult,
        cardDraggingGoal: action.goalId
      };

    case GoalActionTypes.ADD_DRAGGING_CARDS_TO_GOAL:
      const addResult = addToGoal(
        state.goals,
        action.finalId,
        action.cardDragging
      );
      return {
        ...state,
        cardDragging: undefined,
        ...addResult
      };

    case GoalActionTypes.RESET_GOAL_CARD_DRAGGING:
      return {
        ...state,
        cardDragging: undefined,
        cardDraggingGoal: undefined,
        cardDraggingPosition: undefined
      };

    case GoalActionTypes.REMOVE_GOAL_CARD:
      const goalPile = [
        ...(state.goals as any)[state.cardDraggingGoal || "goal1Pile"]
      ];
      goalPile.splice(-1, 1);
      return {
        ...state,
        cardDragging: undefined,
        cardDraggingGoal: undefined,
        goals: {
          ...state.goals,
          [state.cardDraggingGoal || "goal1Pile"]: goalPile
        }
      };

    // ********************************************************

    default:
      return state;
  }
};

export default goalReducer;
