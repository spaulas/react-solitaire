import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { RootReducerState } from "../../../global";
import { StepBackwardOutlined } from "@ant-design/icons";
import columnsActions from "../../../redux/columns/columns.actions";
import deckActions from "../../../redux/deck/deck.actions";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";
import goalActions from "../../../redux/goal/goal.actions";

/**
 * Option to undo a game move
 */
function UndoButton() {
  const dispatch = useDispatch();

  // get gameMoves from redux
  const { gamePreviousMoves } = useSelector(
    ({ GameBoard }: RootReducerState) => ({
      gamePreviousMoves: GameBoard.gamePreviousMoves
    })
  );

  const handleUndo = () => {
    const nMoves = gamePreviousMoves.length;
    // can only undo when there are moves to go back
    if (nMoves > 0) {
      const { source, target, cards, movementWithFlip } = gamePreviousMoves[
        nMoves - 1
      ];

      // undo moves that were from the deck pile to another pile
      // basically, send the card back from that pile to the deck pile
      if (source === "deckPile") {
        if (target === "flippedPile") {
          // flipped -> deck
          // call deck function to send back a flipped card to the deck pile
          dispatch(deckActions.undoFlipDeckPile());
        } else if (target.includes("goal")) {
          // goal pile -> deck
          // call goal function to remove card from the respective goal pile
          dispatch(goalActions.removeCardFromGoal(target));
          // then add it to the flipped pile
          dispatch(deckActions.addCardToFlipped(cards[0]));
        } else if (target.includes("column")) {
          // column pile -> deck
          // call column function to remove card from the respective column pile
          dispatch(
            columnsActions.removeNCardsFromColumn(
              target,
              cards.length,
              movementWithFlip
            )
          );
          // then add it to the flipped pile
          dispatch(deckActions.addCardToFlipped(cards[0]));
        }
        // -------------------------------------------------------------------------------
        // undo moves that were from a column pile to another pile
        // basically, send the card back from that pile to the corresponding column pile
      } else if (source.includes("column")) {
        if (target.includes("column")) {
          // column pile -> column pile
          // call column function to remove card from one card pile to another directly
          dispatch(
            columnsActions.undoSwapColumns(
              source,
              target,
              cards.length,
              movementWithFlip
            )
          );
        } else if (target.includes("goal")) {
          // goal pile -> column pile
          // call goal function to remove card from the respective goal pile
          dispatch(goalActions.removeCardFromGoal(target));
          dispatch(
            columnsActions.addCardToColumn(
              source,
              cards[0],
              Boolean(movementWithFlip)
            )
          );
        }
      }
      // -------------------------------------------------------------------------------
      else if (source.indexOf("goal") === 0) {
        if (target.indexOf("column") === 0) {
          // column pile -> goal pile
          // call goal function to remove card from the repective column pile
          dispatch(
            columnsActions.removeNCardsFromColumn(target, 1, movementWithFlip)
          );
          // add removed card to the corresponding goal
          dispatch(goalActions.addCardToGoal(source, cards[0]));
        } else if (target.indexOf("goal") === 0) {
          // goal pile -> goal pile
          // call goal function to remove card from one goal pile to another directly
          dispatch(goalActions.undoSwapGoals(source, target));
        }
      } else {
        // undo a deck flipped
        // flipped pile -> deck pile
        dispatch(deckActions.undoResetDeck());
      }

      // remove the movement from the moves array
      dispatch(gameBoardActions.removeGameMove());
    }
  };

  return <StepBackwardOutlined className="iconButton" onClick={handleUndo} />;
}
export default UndoButton;
