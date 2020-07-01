import { ExplicitAny, RootReducerState } from "../../../../global";
import React, { memo, useEffect, useState } from "react";
import { CardType } from "../../../../redux/gameBoard/gameBoard.types";
import DraggableCard from "../DragHandlers/DraggableCard.component";
import { useSelector } from "react-redux";

interface DoubleClickHandlerProps {
  handler: ExplicitAny;
  card: CardType;
  nCards?: number;
  index?: number;
}

/**
 * Component that handles the flow of a double click
 */
function DoubleClickHandler({
  handler,
  card,
  nCards = 1,
  index
}: DoubleClickHandlerProps) {
  const [handlingMove, setHandlingMove] = useState<boolean>(false);

  const {
    goalMoveTarget,
    columnMoveTarget,
    columnMoveCards,
    movementWithFlip
  } = useSelector(({ Goal, Columns }: RootReducerState) => ({
    goalMoveTarget: Goal.doubleClickTarget,
    columnMoveTarget: Columns.doubleClickTarget,
    columnMoveCards: Columns.movingCards,
    movementWithFlip: Columns.movementWithFlip
  }));

  // call the first handler of the double click when the handling move changes to true
  const handleDoubleClick = () => {
    if (handlingMove) {
      handler.handleDoubleClick();
    }
  };
  useEffect(handleDoubleClick, [handlingMove]);

  // if the columnTarget changed, call the function which deals with it
  const handleColumnDoubleClickResult = () => {
    if (handlingMove) {
      const result = handler.handleColumnDoubleClickResult(
        columnMoveTarget,
        columnMoveCards,
        movementWithFlip
      );
      if (result) {
        setHandlingMove(false);
      }
    }
  };
  useEffect(handleColumnDoubleClickResult, [columnMoveTarget]);

  // if the goalMoveTarget changed, call the function which deals with it
  const handleGoalDoubleClickResult = () => {
    if (handlingMove) {
      const result = handler.handleGoalDoubleClickResult(goalMoveTarget);
      if (result) {
        setHandlingMove(false);
      }
    }
  };
  useEffect(handleGoalDoubleClickResult, [goalMoveTarget]);

  return (
    <DraggableCard
      card={card}
      nCards={nCards}
      index={index}
      onDoubleClick={() => setHandlingMove(true)}
    />
  );
}

export default memo(DoubleClickHandler);
