/* eslint-disable no-console */
import { ExplicitAny } from "../../../global";
import { GameMove } from "../../../redux/gameBoard/gameBoard.types";

/**
 * Get the field the card was dropped on
 * @param position {x, y} of the card when it was dropped
 */
//
export const getFieldToDrop = ({ x, y }: ExplicitAny) => {
  // get page dimension
  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;
  // get column size
  const columnSizes = innerWidth / 7;

  // should drop in one of the goal spots
  if (y < innerHeight / 3.8) {
    if (x > columnSizes * 3) {
      const goalNumber = Math.ceil((x || 1) / columnSizes) - 3;
      return `goal${goalNumber || 1}Pile`;
    }
    // any other result is invalid for this height
    return undefined;
  } else {
    // should drop in a column pile
    const columnNumber = Math.ceil((x || 1) / columnSizes);
    return `column${columnNumber || 1}Pile`;
  }
};

/**
 * Handles the drop of a card
 * @param offset
 * @param setColumnDroppedTo
 * @param cardsDragging
 * @param actions
 */
export const onDrop = (
  offset: ExplicitAny,
  setFieldDroppedTo: (field: string) => void,
  cardsDragging: ExplicitAny,
  actions: ExplicitAny
) => {
  // get the id of the column the card is going to
  const fieldDropedToTemp = getFieldToDrop(offset);

  if (fieldDropedToTemp) {
    setFieldDroppedTo(fieldDropedToTemp);

    // @TODO CHANGE THIS LOGIC!
    // if the card came from the deck
    if (cardsDragging[0].cardField === "deckPile") {
      // and is being on a column (deck -> column)
      if (fieldDropedToTemp.indexOf("column") === 0) {
        // call the column action that adds the dragging cards to the column
        actions.addDraggingCardsToColumn(fieldDropedToTemp, cardsDragging);
      } else {
        // else is being on a goal (deck -> goal)
        // call the goal action that adds the dragging cards to the goal
        actions.addDraggingCardsToGoal(fieldDropedToTemp, cardsDragging);
      }
      // then reset the values at the deck redux
      actions.resetCardDragging();
    } else if (cardsDragging[0].cardField.includes("goal")) {
      // if the cards came from the goal piles
      // should handle go to column
      if (fieldDropedToTemp.indexOf("column") === 0) {
        // call the column action that adds the dragging cards to the column
        actions.addDraggingCardsToColumn(fieldDropedToTemp, cardsDragging);
      } else {
        // and go to another goal pile
        // call the goal action that adds the dragging cards to the goal

        // if it was a column swap, then swap the cards from one column to the other
        actions.swapGoals(fieldDropedToTemp);
        // then reset
        actions.resetCardDragging();
      }
    } else {
      if (fieldDropedToTemp.indexOf("column") === 0) {
        // if it was a column swap, then swap the cards from one column to the other
        actions.swapColumns(fieldDropedToTemp);
        // then reset
        actions.resetCardDragging();
      } else {
        // call the goal action that adds the dragging cards to the goal
        actions.addDraggingCardsToGoal(fieldDropedToTemp, cardsDragging);
      }
    }
  }
  // if it dropped in an invalid place, then it should return the cards to the original spot
};

/**
 * Handle a successful card move to a column pile
 * If the move was successful¸ the column's state sendBack is set to false
 * So it should remove the card that was being dragged from the proper redux pile and also clear its cardDragging state
 * @param dispatch
 * @param move
 * @param sendBack
 */
export const finishMoveToColumn = (
  actions: ExplicitAny,
  move: GameMove,
  sendBack?: boolean
) => {
  // if the movement to the column pile was successful
  if (sendBack === false) {
    // if the card came from the deck pile
    if (move.card?.cardField === "deckPile") {
      // then remove the card that still is in the flipped pile and clear cardDragging state
      actions.removeCardFromFlipped();
    } else {
      // if the card came from a goal
      if (move.card?.cardField.includes("goal")) {
        // then remove the card that still is in the goal pile and clear cardDragging state
        actions.removeCardFromGoal();
      }
      // the column -> column move is handled at the goal redux
    }
    // add game move
    actions.addGameMove(move);
    // clear columns's send back state
    actions.resetColumn();
  }
};

/**
 * Handle a successful card move to a goal pile
 * If the move was successful¸ the goal's state sendBack is set to false
 * So it should remove the card that was being dragged from the proper redux pile and also clear its cardDragging state
 * @param dispatch
 * @param move
 * @param sendBack
 */
export const finishMoveToGoal = (
  actions: ExplicitAny,
  move: GameMove,
  sendBack?: boolean
) => {
  // if the movement to the goal pile was successful
  if (sendBack === false) {
    // if the card came from the deck pile
    if (move.card?.cardField === "deckPile") {
      // then remove the card that still is in the flipped pile and clear cardDragging state
      actions.removeCardFromFlipped();
    } else {
      // if the card came from a column
      if (move.source.indexOf("column") === 0) {
        // then remove the card that still is in the column pile and clear cardDragging state
        actions.removeDraggedCardsFromColumn();
      }
      // the goal -> goal move is handled at the goal redux
    }
    // add game move
    actions.addGameMove(move);
    // clear goal's send back state
    actions.resetGoal();
  }
};
