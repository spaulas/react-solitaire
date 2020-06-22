/* eslint-disable no-console */
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { RootReducerState } from "../../../global";
import { StepForwardOutlined } from "@ant-design/icons";
import columnActions from "../../../redux/columns/columns.actions";
import deckActions from "../../../redux/deck/deck.actions";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";
import goalActions from "../../../redux/goal/goal.actions";

/**
 * Option to undo a game move
 */
function RedoButton() {
  const dispatch = useDispatch();

  // get gameMoves from redux
  const { gameNextMoves } = useSelector(({ GameBoard }: RootReducerState) => ({
    gameNextMoves: GameBoard.gameNextMoves
  }));

  const handleRedo = () => {
    const nMoves = gameNextMoves.length;
    // can only undo when there are moves to go back
    if (nMoves > 0) {
      const { source, target, cards, movementWithFlip } = gameNextMoves[
        nMoves - 1
      ];

      // if the movement to be done has the deck pile has source
      if (source === "deckPile") {
        if (target === "flippedPile") {
          // deckPile -> flippedPile
          dispatch(deckActions.flipDeckPile());
        } else if (target.includes("column")) {
          // deckPile -> column pile
          // remove card from flipped pile
          dispatch(deckActions.removeFlippedCard());
          // add removed card to the corresponding column
          dispatch(columnActions.sendUndoCardToColumn(cards[0], target, false));
        } else if (target.includes("goal")) {
          // deckPile -> goal pile
          // remove card from flipped pile
          dispatch(deckActions.removeFlippedCard());
          // add removed card to the corresponding goal
          dispatch(goalActions.sendUndoCardToGoal(cards[0], target));
        }
      } // -------------------------------------------------------------------------------
      // undo moves that were from a column pile to another pile
      // basically, send the card back from that pile to the corresponding column pile
      else if (source.includes("column")) {
        if (target.includes("column")) {
          // column pile -> column pile
          dispatch(
            columnActions.undoSwapColumns(
              target,
              source,
              cards.length,
              movementWithFlip
            )
          );
        } else if (target.includes("goal")) {
          // column pile -> goal pile
          dispatch(
            columnActions.removeNCards(source, cards.length, movementWithFlip)
          );
          // add removed card to the corresponding goal
          dispatch(goalActions.sendUndoCardToGoal(cards[0], target));
        }
      }
      // -------------------------------------------------------------------------------
      else if (source.indexOf("goal") === 0) {
        if (target.indexOf("column") === 0) {
          // goal pile -> column pile
          dispatch(goalActions.removeGoalCard(source));
          dispatch(
            columnActions.sendUndoCardToColumn(
              cards[0],
              target,
              Boolean(movementWithFlip)
            )
          );
        } else if (target.indexOf("goal") === 0) {
          // goal pile -> goal pile
          dispatch(goalActions.unswapGoals(target, source));
        }
      } else {
        // undo a deck flipped
        // flipped pile -> deck pile
        dispatch(deckActions.resetDeck());
      }
      dispatch(gameBoardActions.reAddGameMove());
    }
  };
  return <StepForwardOutlined onClick={handleRedo} />;
}
export default RedoButton;
