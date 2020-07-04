import { CardType } from "../../../../redux/gameBoard/gameBoard.types";
import { Dispatch } from "redux/index";
import columnsActions from "../../../../redux/columns/columns.actions";
import gameBoardActions from "../../../../redux/gameBoard/gameBoard.actions";
import goalActions from "../../../../redux/goal/goal.actions";
import { notification } from "antd";

/**
 * Class for the column pile double click handler
 */
class HintHandler {
  dispatch: Dispatch; // dispatch function
  columns: Record<string, Array<CardType>>;
  goals: Record<string, Array<CardType>>;
  deckPile: Array<CardType>;
  flippedPile: Array<CardType>;

  constructor(
    dispatch: Dispatch,
    columns: Record<string, Array<CardType>>,
    goals: Record<string, Array<CardType>>,
    deckPile: Array<CardType>,
    flippedPile: Array<CardType>
  ) {
    this.dispatch = dispatch;
    this.columns = columns;
    this.goals = goals;
    this.deckPile = deckPile;
    this.flippedPile = flippedPile;
  }

  /**
   * Function called when the hint button is clicked
   * First try to move a column card to a goal pile
   */
  handleDoubleClick() {
    // then check first if it can go to a goal pile
    this.dispatch(
      goalActions.checkMoveFromAnyColumn({
        ...this.columns,
        flippedPile: this.flippedPile
      })
    );
  }

  handleGoalDoubleClickResult(
    goalMoveTarget?: string | boolean,
    hintSource?: string
  ) {
    // if a move from a column to a goal is possible
    if (typeof goalMoveTarget === "string" && hintSource) {
      // add a hint
      this.dispatch(gameBoardActions.addGameHint(hintSource, goalMoveTarget));
      // reset goal states
      this.dispatch(goalActions.resetCardDragging());
      // sets the move as over
      return true;
    }
    // if there was no move from a column to a goal, try moving from one column to another
    else {
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
      // add a hint
      this.dispatch(gameBoardActions.addGameHint(hintSource, columnMoveTarget));
    } // sets the move as over
    else if (this.deckPile.length > 0 || this.flippedPile.length > 0) {
      // if there are cards to flip (even if it is a deck reset)
      // add a hint to flip the deck
      this.dispatch(gameBoardActions.addGameHint("deckPile"));
    } else {
      // send a notification
      this.dispatch(gameBoardActions.addGameHint());
      notification.error({
        message: "No more moves to do",
        description: "Either go back, restart this game or start a new one",
        duration: 5
      });
    }
    return true;
  }
}

export default HintHandler;
