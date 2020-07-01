import { CardType } from "../../../../redux/gameBoard/gameBoard.types";
import { Dispatch } from "redux/index";
import columnsActions from "../../../../redux/columns/columns.actions";
import deckActions from "../../../../redux/deck/deck.actions";
import gameBoardActions from "../../../../redux/gameBoard/gameBoard.actions";
import goalActions from "../../../../redux/goal/goal.actions";

class DeckDoubleClickHandler {
  dispatch: Dispatch;
  card: CardType;

  constructor(dispatch: Dispatch, card: CardType) {
    this.dispatch = dispatch;
    this.card = card;
  }

  /**
   * Function called when the draggable card is double clicked
   * If there is only one card for the move, then first try to move it to a valid goal pile
   * If there is more cards, then try to move it to a valid column
   */
  handleDoubleClick() {
    // try to move the card to a valid column
    // check if can move to another column (and do the swapping)
    // then check first if it can go to a goal pile
    this.dispatch(goalActions.checkDoubleClickValid(this.card));
  }

  /**
   * Checks the value of the goal move result
   * If it is a string (the target goal pile id), then remove the card from the column and send it to the respective goal
   * Anything else is read as a unsuccessful result, trying this time to move the card to a valid column pile
   */
  handleGoalDoubleClickResult(goalMoveTarget?: string | boolean) {
    // if the move to a goal was valid (result is the target goal id)
    if (typeof goalMoveTarget === "string") {
      // remove card from flipped
      this.dispatch(deckActions.removeCardFromFlipped());
      // add removed card to the corresponding goal
      this.dispatch(goalActions.addCardToGoal(goalMoveTarget, this.card));

      // add game move
      this.dispatch(
        gameBoardActions.addGameMove({
          source: "deckPile",
          target: goalMoveTarget,
          cards: [this.card]
        })
      );
      return true;
    } // if the move to a goal was not valid
    else {
      // check if can move to another column (and do the swapping)
      this.dispatch(columnsActions.checkDoubleClickValid(this.card));
    }
  }

  /**
   * Checks the value of the column move result
   * If it is a string (the target column pile id), then simply add the game move to the history, since it was already done at the redux
   * Anything else is ignored
   */
  handleColumnDoubleClickResult(columnMoveTarget?: string) {
    // if the move to a column was valid (result is the target column id) and the card moving field is the same as the columnId
    if (typeof columnMoveTarget === "string") {
      // remove card from flipped
      this.dispatch(deckActions.removeCardFromFlipped());
      // add removed card to the corresponding column
      this.dispatch(
        columnsActions.addCardToColumn(columnMoveTarget, this.card, false)
      );
      // add game move
      this.dispatch(
        gameBoardActions.addGameMove({
          source: "deckPile",
          target: columnMoveTarget,
          cards: [this.card]
        })
      );
      return true;
    }
  }
}

export default DeckDoubleClickHandler;
