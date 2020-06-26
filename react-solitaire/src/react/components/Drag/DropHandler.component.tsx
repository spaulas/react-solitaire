import React, { PropsWithChildren, memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDragLayer from "./CustomDragLayer.component";
import { RootReducerState } from "../../../global";
import columnsActions from "../../../redux/columns/columns.actions";
import deckActions from "../../../redux/deck/deck.actions";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";
import goalActions from "../../../redux/goal/goal.actions";
import { useDrop } from "react-dnd";

interface DropHandlerProps {
  className?: string;
}

const DropHandler = ({
  children,
  className = ""
}: PropsWithChildren<DropHandlerProps>) => {
  const dispatch = useDispatch();

  // get all necessary elements from redux
  const { sendBackColumn, sendBackGoal, move } = useSelector(
    ({ GameBoard, Columns, Deck, Goal }: RootReducerState) => {
      const source =
        Columns.cardDraggingCol || Goal.cardDraggingGoal || "deckPile";
      const card =
        Columns.cardDragging || Deck.cardDragging || Goal.cardDragging;
      const movementWithFlip = Columns.movementWithFlip;

      return {
        deckPile: GameBoard.deckPile,
        column1Pile: GameBoard.column1Pile,
        column2Pile: GameBoard.column2Pile,
        column3Pile: GameBoard.column3Pile,
        column4Pile: GameBoard.column4Pile,
        column5Pile: GameBoard.column5Pile,
        column6Pile: GameBoard.column6Pile,
        column7Pile: GameBoard.column7Pile,
        sendBackColumn: Columns.sendBack,
        sendBackGoal: Goal.sendBack,
        move: { source, card, movementWithFlip }
      };
    }
  );

  // save the field where the cards were dropped to
  const [fieldDropedTo, setFieldDroppedTo] = useState<string>("");

  /**
   * Get the field the card was dropped on
   * @param position {x, y} of the card when it was dropped
   */
  const getFieldToDrop = ({ x, y }: { x: number; y: number }) => {
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
   */
  const onDrop = (offset: { x: number; y: number }) => {
    // get the id of the column the card is going to
    const fieldDropedToTemp = getFieldToDrop(offset);

    if (fieldDropedToTemp) {
      setFieldDroppedTo(fieldDropedToTemp);
      const cardsDragging = move.card || [];

      // @TODO CHANGE THIS LOGIC!
      // if the card came from the deck
      if (cardsDragging[0].cardField === "deckPile") {
        // and is being on a column (deck -> column)
        if (fieldDropedToTemp.indexOf("column") === 0) {
          // call the column action that adds the dragging cards to the column
          dispatch(
            columnsActions.addDraggingCardsToColumn(
              fieldDropedToTemp,
              cardsDragging
            )
          );
        } else {
          // else is being on a goal (deck -> goal)
          // call the goal action that adds the dragging cards to the goal
          dispatch(
            goalActions.addDraggingCardsToGoal(fieldDropedToTemp, cardsDragging)
          );
        }
        // then reset the values at the deck redux
        dispatch(deckActions.resetCardDragging());
      } else if (cardsDragging[0].cardField.includes("goal")) {
        // if the cards came from the goal piles
        // should handle go to column
        if (fieldDropedToTemp.indexOf("column") === 0) {
          // call the column action that adds the dragging cards to the column
          dispatch(
            columnsActions.addDraggingCardsToColumn(
              fieldDropedToTemp,
              cardsDragging
            )
          );
        } else {
          // and go to another goal pile
          // call the goal action that adds the dragging cards to the goal

          // if it was a column swap, then swap the cards from one column to the other
          dispatch(goalActions.swapGoals(fieldDropedToTemp));
          // then reset
          dispatch(goalActions.resetCardDragging());
        }
      } else {
        if (fieldDropedToTemp.indexOf("column") === 0) {
          // if it was a column swap, then swap the cards from one column to the other
          dispatch(columnsActions.swapColumns(fieldDropedToTemp));
          // then reset
          dispatch(columnsActions.resetCardDragging());
        } else {
          // call the goal action that adds the dragging cards to the goal
          dispatch(
            goalActions.addDraggingCardsToGoal(fieldDropedToTemp, cardsDragging)
          );
        }
      }
    }
    // if it dropped in an invalid place, then it should return the cards to the original spot
  };

  /**
   * When the sendBackColumn changes, it means that a move to a column has finished
      - if it is true, then the move should not happen (do nothing)
      - if it is false, then the move should happen:
        - send the cardsDragging to the corresponding target (goal or column);
        - remove the card from the column it came from
  */
  const handleMoveToColumn = () => {
    const finalCard = move.card ? move.card[0] : move.card;
    const finalMove = { ...move, card: finalCard, target: fieldDropedTo };

    // if the movement to the column pile was successful
    if (sendBackColumn === false) {
      // if the card came from the deck pile
      if (finalMove.card?.cardField === "deckPile") {
        // then remove the card that still is in the flipped pile and clear cardDragging state
        dispatch(deckActions.removeCardFromFlipped());
      } else {
        // if the card came from a goal
        if (finalMove.card?.cardField.includes("goal")) {
          // then remove the card that still is in the goal pile and clear cardDragging state
          dispatch(goalActions.removeCardFromGoal());
        }
        // the column -> column move is handled at the goal redux
      }
      // add game move
      dispatch(gameBoardActions.addGameMove(finalMove));
      // clear columns's send back state
      dispatch(columnsActions.resetCardDragging());
    }
  };
  useEffect(handleMoveToColumn, [sendBackColumn]);

  /**
   * When the sendBackGoal changes, it means that a move from a goal has finished
      - if it is true, then the move should not happen (do nothing)
      - if it is false, then the move should happen:
        - send the cardsDragging to the corresponding target (goal or column);
        - remove the card from the goal it came from
  */
  const handleRemoveColumnCard = () => {
    const finalCard = move.card ? move.card[0] : move.card;
    const finalMove = { ...move, card: finalCard, target: fieldDropedTo };

    // if the movement to the goal pile was successful
    if (sendBackGoal === false) {
      // if the card came from the deck pile
      if (finalMove.card?.cardField === "deckPile") {
        // then remove the card that still is in the flipped pile and clear cardDragging state
        dispatch(deckActions.removeCardFromFlipped());
      } else {
        // if the card came from a column
        if (finalMove.source.indexOf("column") === 0) {
          // then remove the card that still is in the column pile and clear cardDragging state
          dispatch(columnsActions.removeDraggedCardsFromColumn());
        }
        // the goal -> goal move is handled at the goal redux
      }
      // add game move
      dispatch(gameBoardActions.addGameMove(finalMove));
      // clear goal's send back state
      dispatch(goalActions.resetCardDragging());
    }
  };
  useEffect(handleRemoveColumnCard, [sendBackGoal]);

  // create drop reference and associate functions
  const [, drop] = useDrop({
    accept: "cardframe",
    drop: (card, monitor) => onDrop(monitor.getClientOffset() || { x: 0, y: 0 })
  });

  return (
    <div className={className} ref={drop}>
      {children}
      {/* preview of the card being dragged */}
      <CustomDragLayer />
    </div>
  );
};

export default memo(DropHandler);
