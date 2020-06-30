import React, { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardType } from "../../../../redux/gameBoard/gameBoard.types";
import DraggableCard from "../DragHandlers/DraggableCard.component";
import { RootReducerState } from "../../../../global";
import columnsActions from "../../../../redux/columns/columns.actions";
import gameBoardActions from "../../../../redux/gameBoard/gameBoard.actions";
import goalActions from "../../../../redux/goal/goal.actions";

interface ColumnDoubleClickHandlerProps {
  columnId: string;
  card: CardType;
  nCards: number;
  index: number;
}

function ColumnDoubleClickHandler({
  columnId,
  card,
  nCards,
  index
}: ColumnDoubleClickHandlerProps) {
  const dispatch = useDispatch();
  const handlingMove = useRef(false);

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

  /**
   * Function called when the draggable card is double clicked
   * If there is only one card for the move, then first try to move it to a valid goal pile
   * If there is more cards, then try to move it to a valid column
   */
  const doubleClick = () => {
    handlingMove.current = true;
    // if only one card was clicked
    if (nCards === 1) {
      // then check first if it can go to a goal pile
      dispatch(goalActions.checkDoubleClickValid(card));
    } else {
      // if there is more than one, then check if it can go to a column pile
      // this function handles the swap of columns as well
      dispatch(columnsActions.checkDoubleClickValid(columnId, nCards));
    }
  };

  /**
   * Checks the value of the goal move result
   * If it is a string (the target goal pile id), then remove the card from the column and send it to the respective goal
   * Anything else is read as a unsuccessful result, trying this time to move the card to a valid column pile
   */
  const handleGoalDoubleClickResult = () => {
    if (handlingMove.current) {
      // if the move to a goal was valid (result is the target goal id)
      if (typeof goalMoveTarget === "string") {
        // remove card from column
        dispatch(columnsActions.removeNCardsFromColumn(columnId, 1, true));
        // add removed card to the corresponding goal
        dispatch(goalActions.addCardToGoal(goalMoveTarget, card));

        // add game move
        dispatch(
          gameBoardActions.addGameMove({
            source: columnId,
            target: goalMoveTarget,
            cards: [card],
            movementWithFlip: true
          })
        );
        handlingMove.current = false;
      } // if the move to a goal was not valid
      else {
        // check if can move to another column (and do the swapping)
        dispatch(columnsActions.checkDoubleClickValid(columnId, nCards));
      }
    }
  };
  useEffect(handleGoalDoubleClickResult, [goalMoveTarget]);

  /**
   * Checks the value of the column move result
   * If it is a string (the target column pile id), then simply add the game move to the history, since it was already done at the redux
   * Anything else is ignored
   */
  const handleColumnDoubleClickResult = () => {
    // if the move to a column was valid (result is the target column id) and the card moving field is the same as the columnId
    if (
      typeof columnMoveTarget === "string" &&
      columnMoveCards[0].cardField === columnId
    ) {
      // add game move
      dispatch(
        gameBoardActions.addGameMove({
          source: columnId,
          target: columnMoveTarget,
          cards: columnMoveCards,
          movementWithFlip
        })
      );
    }
  };
  useEffect(handleColumnDoubleClickResult, [columnMoveTarget]);

  return (
    <DraggableCard
      key={`${columnId}_flipped_${card.id}`}
      card={card}
      nCards={nCards}
      index={index}
      onDoubleClick={doubleClick}
    />
  );
}

export default memo(ColumnDoubleClickHandler);
