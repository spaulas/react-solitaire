import { CardType } from "../../../../redux/gameBoard/gameBoard.types";
import { Dispatch } from "redux/index";
import columnsActions from "../../../../redux/columns/columns.actions";
import gameBoardActions from "../../../../redux/gameBoard/gameBoard.actions";
import goalActions from "../../../../redux/goal/goal.actions";

/**
 * Class for the goal pile double click handler
 */
class GoalDoubleClickHandler {
  dispatch: Dispatch; // dispatch function
  goalId: string; // id of the source goal
  card: CardType; // card that is being double clicked

  constructor(dispatch: Dispatch, goalId: string, card: CardType) {
    this.dispatch = dispatch;
    this.goalId = goalId;
    this.card = card;
  }

  /**
   * Function called when the draggable card is double clicked
   * Try to move it to a column pile first
   */
  handleDoubleClick() {
    // try to move the card to a valid column
    // check first if it can go to a column
    this.dispatch(columnsActions.checkDoubleClickValid(this.card));
  }

  /**
   * Checks the value of the column move result
   * If it is a string (the target column pile id), then remove the goal card from its pile and add it to the respective column
   * Anything else is read as a unsuccessful result, therefore try to move the card to another goal pile (and do the swapping)
   * @param columnMoveTarget check result for a column pile
   */
  handleColumnDoubleClickResult(columnMoveTarget?: string | boolean) {
    // if the move to a goal was valid (result is the target goal id)
    if (typeof columnMoveTarget === "string") {
      // remove card from goal
      this.dispatch(goalActions.removeCardFromGoal(this.goalId));
      // add removed card to the corresponding column
      this.dispatch(
        columnsActions.addCardToColumn(columnMoveTarget, this.card, false)
      );

      // add game move
      this.dispatch(
        gameBoardActions.addGameMove({
          source: this.goalId,
          target: columnMoveTarget,
          cards: [this.card],
          movementWithFlip: false
        })
      );
      // sets the move as over
      return true;
    }
    // if the move was not valid
    else {
      // check if it can go to another goal pile (and do the swapping as well)
      this.dispatch(
        goalActions.checkGoalSwapDoubleClickValid(this.goalId, this.card)
      );
    }
  }

  /**
   * Checks the value of the goal move result
   * If it is a string (the target goal pile id), then simply add the game move to the history, since it was already done at the redux
   * Anything else is ignored
   * @param goalMoveTarget check result for a goal pile
   */
  handleGoalDoubleClickResult(goalMoveTarget?: string | boolean) {
    if (typeof goalMoveTarget === "string") {
      // add game move
      this.dispatch(
        gameBoardActions.addGameMove({
          source: this.goalId,
          target: goalMoveTarget,
          cards: [this.card],
          movementWithFlip: true
        })
      );
      // sets the move as over
      return true;
    }
  }
}

export default GoalDoubleClickHandler;
