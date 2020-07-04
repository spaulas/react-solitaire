/* eslint-disable no-console */
import { CardType } from "../../../../redux/gameBoard/gameBoard.types";
import { Dispatch } from "redux/index";
import columnsActions from "../../../../redux/columns/columns.actions";
import goalActions from "../../../../redux/goal/goal.actions";

/**
 * Class for the column pile double click handler
 */
class HintHandler {
  dispatch: Dispatch; // dispatch function
  columns: Record<string, Array<CardType>>;
  goals: Record<string, Array<CardType>>;
  flippedPile: Array<CardType>;

  constructor(
    dispatch: Dispatch,
    columns: Record<string, Array<CardType>>,
    goals: Record<string, Array<CardType>>,
    flippedPile: Array<CardType>
  ) {
    this.dispatch = dispatch;
    this.columns = columns;
    this.goals = goals;
    this.flippedPile = flippedPile;
  }

  /**
   * Function called when the hint button is clicked
   * First try to move a column card to a goal pile
   */
  handleDoubleClick() {
    console.log("-----> try goal");
    // then check first if it can go to a goal pile
    this.dispatch(
      goalActions.checkMoveFromAnyColumn({
        ...this.columns,
        deckPile: this.flippedPile
      })
    );
  }

  handleGoalDoubleClickResult(
    goalMoveTarget?: string | boolean,
    hintSource?: string
  ) {
    // if a move from a column to a goal is possible
    if (typeof goalMoveTarget === "string" && hintSource) {
      // eslint-disable-next-line no-console
      console.log("GOAL MOVE SOURCE = ", hintSource);
      // eslint-disable-next-line no-console
      console.log("GOAL MOVE TARGET = ", goalMoveTarget);
      this.dispatch(goalActions.resetCardDragging());
      // sets the move as over
      return true;
    }
    // if there was no move from a column to a goal, try moving from one column to another
    else {
      console.log("----> try column");
      this.dispatch(columnsActions.checkMoveFromAnyColumn(this.flippedPile));
    }
  }

  handleColumnDoubleClickResult(
    columnMoveTarget?: string | boolean,
    columnMoveCards?: Array<CardType>,
    movementWithFlip?: boolean,
    hintSource?: string
  ) {
    // if the move to a column was valid (result is the target column id) and the card moving field is the same as the columnId
    if (typeof columnMoveTarget === "string" && hintSource) {
      // eslint-disable-next-line no-console
      console.log("COLUMN MOVE SOURCE = ", hintSource);
      // eslint-disable-next-line no-console
      console.log("COLUMN MOVE TARGET = ", columnMoveTarget);
    } // sets the move as over
    return true;
  }
}

export default HintHandler;
