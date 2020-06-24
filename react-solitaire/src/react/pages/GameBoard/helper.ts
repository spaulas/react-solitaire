/* eslint-disable no-console */
import { ExplicitAny } from "../../../global";
import columnsActions from "../../../redux/columns/columns.actions";
import deckActions from "../../../redux/deck/deck.actions";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";
import goalActions from "../../../redux/goal/goal.actions";

// get the column the card was dropped to
export const getColumnToDrop = ({ x, y }: ExplicitAny) => {
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
    // any other result is invalid
    return undefined;
  } else {
    // should drop in a column pile
    const columnNumber = Math.ceil((x || 1) / columnSizes);
    return `column${columnNumber || 1}Pile`;
  }
};

// handle the drop of a card
export const onDrop = (
  monitor: ExplicitAny,
  setColumnDroppedTo: (column: string) => void,
  cardsDragging: ExplicitAny,
  dispatch: ExplicitAny
) => {
  // get the id of the column the card is going to
  const columnDropedToTemp = getColumnToDrop(monitor.getClientOffset());
  setColumnDroppedTo(columnDropedToTemp || "");

  if (!!columnDropedToTemp) {
    // if the card came from the deck
    if (cardsDragging[0].cardField === "deckPile") {
      if (columnDropedToTemp.indexOf("column") === 0) {
        // call the column action that adds the dragging cards to the column
        dispatch(
          columnsActions.addDraggingCardsToColumn(
            columnDropedToTemp,
            cardsDragging
          )
        );
      } else {
        // call the goal action that adds the dragging cards to the goal
        dispatch(
          goalActions.addDraggingCardsToGoal(columnDropedToTemp, cardsDragging)
        );
      }
      // then reset the values at the deck redux
      dispatch(deckActions.resetCardDragging());
    } else if (cardsDragging[0].cardField.includes("goal")) {
      // if the cards came from the goal piles
      // should handle go to column
      if (columnDropedToTemp.indexOf("column") === 0) {
        // call the column action that adds the dragging cards to the column
        dispatch(
          columnsActions.addDraggingCardsToColumn(
            columnDropedToTemp,
            cardsDragging
          )
        );
      } else {
        // and go to another goal pile
        // call the goal action that adds the dragging cards to the goal

        // if it was a column swap, then swap the cards from one column to the other
        dispatch(goalActions.swapGoals(columnDropedToTemp));
        // then reset
        dispatch(goalActions.resetCardDragging());
      }
    } else {
      if (columnDropedToTemp.indexOf("column") === 0) {
        // if it was a column swap, then swap the cards from one column to the other
        dispatch(columnsActions.swapColumns(columnDropedToTemp));
        // then reset
        dispatch(columnsActions.resetCardDragging());
      } else {
        // call the goal action that adds the dragging cards to the goal
        dispatch(
          goalActions.addDraggingCardsToGoal(columnDropedToTemp, cardsDragging)
        );
      }
    }
  }
  // if it dropped in an invalid place, then it should return the cards to the original spot
  else {
    console.log("RETURN INVALID");
  }
};

// handle a deck exchange
export const removeDeckCard = (
  cardsDragging: ExplicitAny,
  columnDropedTo: ExplicitAny,
  columnSource: ExplicitAny,
  movementWithFlip: ExplicitAny,
  goalSource: ExplicitAny,
  dispatch: ExplicitAny,
  sendBack?: boolean
) => {
  if (sendBack === false) {
    if (cardsDragging[0].cardField === "deckPile") {
      // add game move
      dispatch(
        gameBoardActions.addGameMove({
          source: "deckPile",
          target: columnDropedTo,
          cards: cardsDragging
        })
      );
      dispatch(deckActions.removeCardFromFlipped());
    } else {
      // add game move
      dispatch(
        gameBoardActions.addGameMove({
          source: columnSource || goalSource,
          target: columnDropedTo,
          cards: cardsDragging,
          movementWithFlip
        })
      );

      // only remove goal card if it came from one goal pile
      if (cardsDragging[0].cardField.includes("goal")) {
        dispatch(goalActions.removeCardFromGoal());
      }
    }
    // then reset
    dispatch(columnsActions.resetCardDragging());
    dispatch(goalActions.resetCardDragging());
  }
};

// handle a column to goal exchange
export const removeColumnCard = (
  cardsDragging: ExplicitAny,
  columnDropedTo: ExplicitAny,
  goalSource: ExplicitAny,
  columnSource: ExplicitAny,
  movementWithFlip: ExplicitAny,
  dispatch: ExplicitAny,
  sendBack?: boolean
) => {
  if (sendBack === false) {
    if (cardsDragging[0].cardField === "deckPile") {
      // add game move
      dispatch(
        gameBoardActions.addGameMove({
          source: "deckPile",
          target: columnDropedTo,
          cards: cardsDragging
        })
      );
      dispatch(deckActions.removeCardFromFlipped());
    } else {
      const finalSource = goalSource || columnSource;
      // add game move
      dispatch(
        gameBoardActions.addGameMove({
          source: finalSource,
          target: columnDropedTo,
          cards: cardsDragging,
          movementWithFlip
        })
      );

      if (finalSource.indexOf("column") === 0) {
        dispatch(columnsActions.removeDraggedCardsFromColumn());
      }
    }
  }
  // then reset
  dispatch(columnsActions.resetCardDragging());
  dispatch(goalActions.resetCardDragging());
};
