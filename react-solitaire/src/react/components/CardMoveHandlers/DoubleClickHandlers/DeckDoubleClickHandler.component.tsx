import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardType } from "../../../../redux/gameBoard/gameBoard.types";
import DraggableCard from "../DragHandlers/DraggableCard.component";
import { RootReducerState } from "../../../../global";
import columnsActions from "../../../../redux/columns/columns.actions";
import deckActions from "../../../../redux/deck/deck.actions";
import gameBoardActions from "../../../../redux/gameBoard/gameBoard.actions";
import goalActions from "../../../../redux/goal/goal.actions";

interface DeckDoubleClickHandlerProps {
  card: CardType;
}

function DeckDoubleClickHandler({ card }: DeckDoubleClickHandlerProps) {
  const dispatch = useDispatch();

  const [handlingMove, setHandlingMove] = useState<boolean>(false);

  const { goalMoveTarget, columnMoveTarget } = useSelector(
    ({ Goal, Columns }: RootReducerState) => ({
      goalMoveTarget: Goal.doubleClickTarget,
      columnMoveTarget: Columns.doubleClickTarget
    })
  );

  /**
   * Function called when the draggable card is double clicked
   * If there is only one card for the move, then first try to move it to a valid goal pile
   * If there is more cards, then try to move it to a valid column
   */
  const handleDoubleClick = () => {
    if (handlingMove) {
      // try to move the card to a valid column
      // check if can move to another column (and do the swapping)
      // then check first if it can go to a goal pile
      dispatch(goalActions.checkDoubleClickValid(card));
    }
  };
  useEffect(handleDoubleClick, [handlingMove]);

  /**
   * Checks the value of the goal move result
   * If it is a string (the target goal pile id), then remove the card from the column and send it to the respective goal
   * Anything else is read as a unsuccessful result, trying this time to move the card to a valid column pile
   */
  const handleGoalDoubleClickResult = () => {
    if (handlingMove) {
      // if the move to a goal was valid (result is the target goal id)
      if (typeof goalMoveTarget === "string") {
        // remove card from flipped
        dispatch(deckActions.removeCardFromFlipped());
        // add removed card to the corresponding goal
        dispatch(goalActions.addCardToGoal(goalMoveTarget, card));

        // add game move
        dispatch(
          gameBoardActions.addGameMove({
            source: "deckPile",
            target: goalMoveTarget,
            cards: [card]
          })
        );
        setHandlingMove(false);
      } // if the move to a goal was not valid
      else {
        // check if can move to another column (and do the swapping)
        dispatch(columnsActions.checkDoubleClickValid(card));
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
    if (handlingMove) {
      // if the move to a column was valid (result is the target column id) and the card moving field is the same as the columnId
      if (typeof columnMoveTarget === "string") {
        // remove card from flipped
        dispatch(deckActions.removeCardFromFlipped());
        // add removed card to the corresponding column
        dispatch(columnsActions.addCardToColumn(columnMoveTarget, card, false));
        // add game move
        dispatch(
          gameBoardActions.addGameMove({
            source: "deckPile",
            target: columnMoveTarget,
            cards: [card]
          })
        );
      }
    }
  };
  useEffect(handleColumnDoubleClickResult, [columnMoveTarget]);

  return (
    <DraggableCard
      card={card}
      nCards={1}
      onDoubleClick={() => setHandlingMove(true)}
    />
  );
}

export default memo(DeckDoubleClickHandler);
