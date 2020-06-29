import {
  CardType,
  GameMove
} from "../../../../redux/gameBoard/gameBoard.types";
import { Dispatch } from "redux/index";
import columnsActions from "../../../../redux/columns/columns.actions";
import deckActions from "../../../../redux/deck/deck.actions";
import gameBoardActions from "../../../../redux/gameBoard/gameBoard.actions";
import goalActions from "../../../../redux/goal/goal.actions";

interface CardMove {
  source: string;
  target: string;
  card: Array<CardType>;
  movementWithFlip?: boolean;
}

class GoalDrop {
  dispatch: Dispatch;

  constructor(dispatch: Dispatch) {
    this.dispatch = dispatch;
  }

  /**
   * Handles the drop of a card
   * @param move the card move that was initiated
   * @param fieldDropedTo field the card was dropped to (should be a goal field)
   */
  onDrop(move: CardMove, fieldDropedTo: string) {
    const cardsDragging = move.card || [];
    if (cardsDragging[0].cardField.includes("goal")) {
      // goal -> goal
      // if it was a goal swap, then swap the cards from one column to the other
      this.dispatch(goalActions.swapGoals(fieldDropedTo));
      // then reset
      this.dispatch(goalActions.resetCardDragging());
    }
    // if the card came from the deck or from a column
    else {
      // deck -> goal | column -> goal
      // call the goal action that adds the dragging cards to the goal
      this.dispatch(
        goalActions.addDraggingCardsToGoal(fieldDropedTo, cardsDragging)
      );

      // then reset the values at the deck redux
      this.dispatch(deckActions.resetCardDragging());
      // then reset the values at the deck redux
      this.dispatch(columnsActions.resetCardDragging());
    }
  }

  /**
   * When the sendBackGoal changes, it means that a move to a goal has finished
      - if it is true, then the move should not happen (do nothing)
      - if it is false, then the move should happen:
        - send the cardsDragging to the corresponding target (goal or column);
        - remove the card from the goal it came from
  */
  handleRemoveCard(finalMove: GameMove) {
    // if the card came from the deck pile
    if (finalMove.card && finalMove.card?.cardField === "deckPile") {
      // then remove the card that still is in the flipped pile and clear cardDragging state
      this.dispatch(deckActions.removeCardFromFlipped());
    } else {
      // if the card came from a column
      if (finalMove.source.indexOf("column") === 0) {
        // then remove the card that still is in the column pile and clear cardDragging state
        this.dispatch(columnsActions.removeDraggedCardsFromColumn());
      }
      // the goal -> goal move is handled at the goal redux
    }
    // clear goal's send back state
    this.dispatch(goalActions.resetCardDragging());
    // add game move
    this.dispatch(gameBoardActions.addGameMove(finalMove));
  }
}

export default GoalDrop;
