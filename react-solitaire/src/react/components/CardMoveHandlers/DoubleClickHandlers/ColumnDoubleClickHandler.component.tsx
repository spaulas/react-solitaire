import { CardType } from "../../../../redux/gameBoard/gameBoard.types";
import { Dispatch } from "redux/index";
import columnsActions from "../../../../redux/columns/columns.actions";
import gameBoardActions from "../../../../redux/gameBoard/gameBoard.actions";
import goalActions from "../../../../redux/goal/goal.actions";

class ColumnDoubleClickHandler {
  dispatch: Dispatch;
  columnId: string;
  card: CardType;
  nCards: number;

  constructor(
    dispatch: Dispatch,
    columnId: string,
    card: CardType,
    nCards: number
  ) {
    this.dispatch = dispatch;
    this.columnId = columnId;
    this.card = card;
    this.nCards = nCards;
  }

  /**
   * Function called when the draggable card is double clicked
   * If there is only one card for the move, then first try to move it to a valid goal pile
   * If there is more cards, then try to move it to a valid column
   */
  handleDoubleClick() {
    // if only one card was clicked
    if (this.nCards === 1) {
      // then check first if it can go to a goal pile
      this.dispatch(goalActions.checkDoubleClickValid(this.card));
    } else {
      // if there is more than one, then check if it can go to a column pile
      // this function handles the swap of columns as well
      this.dispatch(
        columnsActions.checkColumnSwapDoubleClickValid(
          this.columnId,
          this.nCards
        )
      );
    }
  }

  /**
   * Checks the value of the goal move result
   * If it is a string (the target goal pile id), then remove the card from the column and send it to the respective goal
   * Anything else is read as a unsuccessful result, trying this time to move the card to a valid column pile
   */
  handleGoalDoubleClickResult(goalMoveTarget?: string | boolean) {
    // if the move to a goal was valid (result is the target goal id)
    if (typeof goalMoveTarget === "string") {
      // remove card from column
      this.dispatch(
        columnsActions.removeNCardsFromColumn(this.columnId, 1, true)
      );
      // add removed card to the corresponding goal
      this.dispatch(goalActions.addCardToGoal(goalMoveTarget, this.card));

      // add game move
      this.dispatch(
        gameBoardActions.addGameMove({
          source: this.columnId,
          target: goalMoveTarget,
          cards: [this.card],
          movementWithFlip: true
        })
      );
      return true;
    } // if the move to a goal was not valid
    else {
      // check if can move to another column (and do the swapping)
      this.dispatch(
        columnsActions.checkColumnSwapDoubleClickValid(
          this.columnId,
          this.nCards
        )
      );
    }
  }

  /**
   * Checks the value of the column move result
   * If it is a string (the target column pile id), then simply add the game move to the history, since it was already done at the redux
   * Anything else is ignored
   */
  handleColumnDoubleClickResult(
    columnMoveTarget?: string | boolean,
    columnMoveCards?: Array<CardType>,
    movementWithFlip?: boolean
  ) {
    // if the move to a column was valid (result is the target column id) and the card moving field is the same as the columnId
    if (
      typeof columnMoveTarget === "string" &&
      columnMoveCards &&
      columnMoveCards[0].cardField === this.columnId
    ) {
      // add game move
      this.dispatch(
        gameBoardActions.addGameMove({
          source: this.columnId,
          target: columnMoveTarget,
          cards: columnMoveCards,
          movementWithFlip
        })
      );
      return true;
    }
  }
}

export default ColumnDoubleClickHandler;
