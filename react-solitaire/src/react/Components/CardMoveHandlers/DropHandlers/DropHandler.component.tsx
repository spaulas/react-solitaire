import React, { PropsWithChildren, memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardType } from "../../../../redux/gameBoard/gameBoard.types";
import ColumnDrop from "./ColumnDropHandler";
import GoalDrop from "./GoalDropHandler";
import { RootReducerState } from "../../../../global";
import { useDrop } from "react-dnd";

interface DropHandlerProps {
  className?: string;
}

/**
 * Handles the main functionalities of a drop of a card
 */
const DropHandler = ({
  children,
  className = ""
}: PropsWithChildren<DropHandlerProps>) => {
  const dispatch = useDispatch();
  const ColumnInstance = new ColumnDrop(dispatch);
  const GoalInstance = new GoalDrop(dispatch);

  // get the move object
  const { move, sendBackColumn, sendBackGoal } = useSelector(
    ({ Columns, Deck, Goal }: RootReducerState) => {
      const source =
        Columns.cardDraggingCol || Goal.cardDraggingGoal || "deckPile";
      const cards =
        Columns.cardDragging || Deck.cardDragging || Goal.cardDragging || [];
      const movementWithFlip = Boolean(Columns.movementWithFlip);

      return {
        move: {
          source,
          cards: cards as Array<CardType>,
          movementWithFlip,
          target: ""
        },
        sendBackColumn: Columns.sendBack,
        sendBackGoal: Goal.sendBack
      };
    }
  );

  // stores the field the card was dropped to
  const [fieldDropedTo, setFieldDropedTo] = useState<string | undefined>(
    undefined
  );

  /**
   * Gets the field the card was dropped on
   * @param position {x, y} of the card when it was dropped
   */
  const getFieldToDrop = ({ x, y }: { x: number; y: number }) => {
    // get page dimension
    const innerWidth =
      document.getElementById("baseEmptySpots")?.offsetWidth || 1;
    const innerHeight = window.innerHeight;
    // get column size
    const initialOffset = ((innerWidth / 24) * 3) / 8;
    const columnSizes = (innerWidth - initialOffset) / 7;

    // should drop in one of the goal spots
    if (y < innerHeight / 3.8) {
      if (x > columnSizes * 3 + initialOffset) {
        const goalNumber =
          Math.ceil((x - initialOffset || 1) / columnSizes) - 3;
        return `goal${goalNumber || 1}Pile`;
      }
      // any other result is invalid for this height
      return undefined;
    } else {
      // should drop in a column pile
      const columnNumber = Math.ceil((x - initialOffset || 1) / columnSizes);
      return `column${columnNumber || 1}Pile`;
    }
  };

  /**
   * Gets the field the card was dropped to and calls the parent's onDrop function with it and the move done
   * @param position {x, y} of the card when it was dropped
   */
  const handleOnDrop = (position: { x: number; y: number } | null) => {
    // get the id of the field the card is going to
    const fieldDropedToTemp = getFieldToDrop(position || { x: 0, y: 0 });
    // if it was a valid field (not an empty space in the game board)
    if (fieldDropedToTemp) {
      // save the field it was dropped to
      setFieldDropedTo(fieldDropedToTemp);
      // call the parent's onDrop function
      if (fieldDropedToTemp.includes("column")) {
        ColumnInstance.onDrop(move, fieldDropedToTemp);
      } else {
        GoalInstance.onDrop(move, fieldDropedToTemp);
      }
    }
  };

  /**
   * If the movement was valid, completes the card move object and calls the parent's handleRemoveCard function,
   * to remove the card from the position it was previously on
   * Then adds the move to the game
   * It is called when the sendBack value changes
   */
  const handleSendBack = () => {
    // if the field is not undefined, then can add move (if one of the sendBack variables is false)
    if (fieldDropedTo) {
      const finalMove = {
        ...move,
        target: fieldDropedTo
      };
      // if the movement to the column pile was successful
      if (sendBackColumn === false) {
        ColumnInstance.handleRemoveCard(finalMove);
      } else if (sendBackGoal === false) {
        GoalInstance.handleRemoveCard(finalMove);
      }
    }
  };
  useEffect(handleSendBack, [sendBackColumn, sendBackGoal]);

  // create drop reference and associate functions
  const [, drop] = useDrop({
    accept: "cardframe",
    drop: (card, monitor) => handleOnDrop(monitor.getClientOffset())
  });

  return (
    <div ref={drop} className={className}>
      {children}
    </div>
  );
};

export default memo(DropHandler);
