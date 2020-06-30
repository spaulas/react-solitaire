import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardType } from "../../../../redux/gameBoard/gameBoard.types";
import DraggableCard from "../DragHandlers/DraggableCard.component";
import { RootReducerState } from "../../../../global";
import columnsActions from "../../../../redux/columns/columns.actions";
import gameBoardActions from "../../../../redux/gameBoard/gameBoard.actions";
import goalActions from "../../../../redux/goal/goal.actions";

interface GoalDoubleClickHandlerProps {
  goalId: string;
  card: CardType;
}

function GoalDoubleClickHandler({ goalId, card }: GoalDoubleClickHandlerProps) {
  const dispatch = useDispatch();

  const { goalMoveTarget, columnMoveTarget } = useSelector(
    ({ Goal, Columns }: RootReducerState) => ({
      goalMoveTarget: Goal.doubleClickTarget,
      columnMoveTarget: Columns.doubleClickTarget
    })
  );

  const [handlingMove, setHandlingMove] = useState<boolean>(false);

  const handleDoubleClick = () => {
    if (handlingMove) {
      // try to move the card to a valid column
      // check if can move to another column (and do the swapping)
      dispatch(columnsActions.checkDoubleClickValid(card));
    }
  };
  useEffect(handleDoubleClick, [handlingMove]);

  /**
   * Checks the value of the column move result
   * If it is a string (the target column pile id), then remove the goal card from its pile and add it to the respective column
   */
  const handleColumnDoubleClickResult = () => {
    if (handlingMove) {
      // if the move to a goal was valid (result is the target goal id)
      // @todo add another condition?
      if (typeof columnMoveTarget === "string") {
        // remove card from goal
        dispatch(goalActions.removeCardFromGoal(goalId));
        // add removed card to the corresponding column
        dispatch(columnsActions.addCardToColumn(columnMoveTarget, card, false));

        // add game move
        dispatch(
          gameBoardActions.addGameMove({
            source: goalId,
            target: columnMoveTarget,
            cards: [card],
            movementWithFlip: false
          })
        );

        setHandlingMove(false);
      } // if the move was not valid
      else {
        dispatch(goalActions.checkGoalSwapDoubleClickValid(goalId, card));
      }
    }
  };
  useEffect(handleColumnDoubleClickResult, [columnMoveTarget]);

  const handleGoalDoubleClickResult = () => {
    if (handlingMove) {
      if (typeof goalMoveTarget === "string") {
        // add game move
        dispatch(
          gameBoardActions.addGameMove({
            source: goalId,
            target: goalMoveTarget,
            cards: [card],
            movementWithFlip: true
          })
        );
        setHandlingMove(false);
      }
    }
  };

  useEffect(handleGoalDoubleClickResult, [goalMoveTarget]);

  return (
    <DraggableCard
      card={card}
      nCards={1}
      key={card.id}
      onDoubleClick={() => setHandlingMove(true)}
    />
  );
}

export default memo(GoalDoubleClickHandler);
