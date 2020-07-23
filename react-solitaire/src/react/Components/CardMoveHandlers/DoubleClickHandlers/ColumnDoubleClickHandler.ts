import { CardType } from "../../../../redux/gameBoard/gameBoard.types";
import { Dispatch } from "redux";
import columnsActions from "../../../../redux/columns/columns.actions";
import gameBoardActions from "../../../../redux/gameBoard/gameBoard.actions";
import goalActions from "../../../../redux/goal/goal.actions";

/**
 * Class for the column pile double click handler
 */
class ColumnDoubleClickHandler {
  dispatch: Dispatch; // dispatch function
  columnId: string; // id of the source column
  card: CardType; // card that is being double clicked
  nCards: number; // number of cards to move

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
   * Anything else is read as a unsuccessful result, therefore try to move the card to a valid column pile
   * @param goalMoveTarget check result for a goal pile
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
      // sets the move as over
      return true;
    }
    // if the move to a goal was not valid
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
   * If it is a string (the target column pile id), then add the game move to the history and swap the columns
   * Anything else is ignored
   * @param columnMoveTarget check result for a column pile
   * @param columnMoveCards cards that were moved during the colum swap
   * @param movementWithFlip move resulted in a flip or not
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

      // exchange column cards
      this.dispatch(
        columnsActions.swapDoubleClick(
          this.columnId,
          columnMoveTarget,
          columnMoveCards
        )
      );
    }
    // sets the move as over
    return true;
  }
}

export default ColumnDoubleClickHandler;
