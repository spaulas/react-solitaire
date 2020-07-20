import { CardType } from "../../../../redux/gameBoard/gameBoard.types";
import { Dispatch } from "redux";
import columnsActions from "../../../../redux/columns/columns.actions";
import deckActions from "../../../../redux/deck/deck.actions";
import gameBoardActions from "../../../../redux/gameBoard/gameBoard.actions";
import goalActions from "../../../../redux/goal/goal.actions";

/**
 * Class for the deck pile double click handler
 */
class DeckDoubleClickHandler {
  dispatch: Dispatch; // dispatch function
  card: CardType; // card that is being double clicked

  constructor(dispatch: Dispatch, card: CardType) {
    this.dispatch = dispatch;
    this.card = card;
  }

  /**
   * Function called when the draggable card is double clicked
   * Try to move it to a goal pile first
   */
  handleDoubleClick() {
    // check first if it can go to a goal pile
    this.dispatch(goalActions.checkDoubleClickValid(this.card));
  }

  /**
   * Checks the value of the goal move result
   * If it is a string (the target goal pile id), then remove the card from the deck pile and send it to the respective goal
   * Anything else is read as a unsuccessful result, therefore try to move the card to a column pile
   * @param goalMoveTarget check result for a goal pile
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
      // sets the move as over
      return true;
    }
    // if the move to a goal was not valid
    else {
      // check if can move to a column
      this.dispatch(columnsActions.checkDoubleClickValid(this.card));
    }
  }

  /**
   * Checks the value of the column move result
   * If it is a string (the target column pile id), then remove the deck card and add to the respective column
   * Anything else is ignored
   * @param columnMoveTarget check result for a column pile
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
    }
    // sets the move as over
    return true;
  }
}

export default DeckDoubleClickHandler;
