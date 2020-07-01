import { CardType } from "../../../../redux/gameBoard/gameBoard.types";
import { Dispatch } from "redux/index";
import columnsActions from "../../../../redux/columns/columns.actions";
import gameBoardActions from "../../../../redux/gameBoard/gameBoard.actions";
import goalActions from "../../../../redux/goal/goal.actions";

class GoalDoubleClickHandler {
  dispatch: Dispatch;
  goalId: string;
  card: CardType;

  constructor(dispatch: Dispatch, goalId: string, card: CardType) {
    this.dispatch = dispatch;
    this.goalId = goalId;
    this.card = card;
  }

  handleDoubleClick() {
    // try to move the card to a valid column
    // check if can move to another column (and do the swapping)
    this.dispatch(columnsActions.checkDoubleClickValid(this.card));
  }

  /**
   * Checks the value of the column move result
   * If it is a string (the target column pile id), then remove the goal card from its pile and add it to the respective column
   */
  handleColumnDoubleClickResult(columnMoveTarget?: string | boolean) {
    // if the move to a goal was valid (result is the target goal id)
    // @todo add another condition?
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

      return true;
    } // if the move was not valid
    else {
      this.dispatch(
        goalActions.checkGoalSwapDoubleClickValid(this.goalId, this.card)
      );
    }
  }

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
      return true;
    }
  }
}

export default GoalDoubleClickHandler;
