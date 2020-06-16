/* eslint-disable indent */
import {
  addToGoal,
  setCardDragging,
  swapGoals,
  unswapGoals
} from "./goal.utils";
import { ActionsCreators } from "./goal.actions";
import { CardType } from "../gameBoard/gameBoard.types";
import { ExplicitAny } from "../../global";
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
  gameOver: boolean;
}

const INITIAL_GOAL: InitialGoal = {
  goals: {
    goal1Pile: [],
    goal2Pile: [],
    goal3Pile: [],
    goal4Pile: []
  },
  cardDragging: undefined,
  cardDraggingGoal: undefined,
  gameOver: false
};

const goalReducer = (state = INITIAL_GOAL, action: ActionsCreators) => {
  switch (action.type) {
    // ********************************************************
    // SWAPPING ACTIONS

    case GoalActionTypes.SWAP_GOALS:
      const swapResult = swapGoals(
        state.goals,
        state.cardDragging,
        state.cardDraggingGoal,
        action.finalId
      );

      return { ...state, ...swapResult };

    case GoalActionTypes.UNSWAP_GOALS:
      const unswapResult = unswapGoals(
        state.goals,
        action.target,
        action.source
      );
      return { ...state, ...unswapResult };

    // ********************************************************
    // UNDO ACTIONS

    case GoalActionTypes.UNDO_TO_GOAL:
      return {
        ...state,
        goals: {
          ...state.goals,
          [action.goalId]: [
            ...action.goalId,
            { ...action.card, cardField: action.goalId }
          ]
        }
      };

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
        cardDraggingPosition: undefined,
        sendBack: undefined
      };

    case GoalActionTypes.REMOVE_GOAL_CARD:
      const goalPile = [
        ...(state.goals as ExplicitAny)[state.cardDraggingGoal || "goal1Pile"]
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
