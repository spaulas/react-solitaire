/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerState } from "../../../global";
import { StepBackwardOutlined } from "@ant-design/icons";
import columnActions from "../../../redux/columns/columns.actions";
import deckActions from "../../../redux/deck/deck.actions";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";
import goalActions from "../../../redux/goal/goal.actions";

/**
 * Option to undo a game move
 */
function UndoButton() {
  const dispatch = useDispatch();

  const [sourceBack, setSourceBack] = useState("");

  // get gameMoves from redux
  const { gamePreviousMoves, columnCardUndo, goalCardUndo } = useSelector(
    ({ GameBoard, Columns, Goal }: RootReducerState) => ({
      gamePreviousMoves: GameBoard.gamePreviousMoves,
      columnCardUndo: Columns.cardUndo,
      goalCardUndo: Goal.cardUndo
    })
  );

  const handleUndo = () => {
    const nMoves = gamePreviousMoves.length;
    // can only undo when there are moves to go back
    if (nMoves > 0) {
      const { source, target, nCards, movementWithFlip } = gamePreviousMoves[
        nMoves - 1
      ];

      // undo moves that were from the deck pile to another pile
      // basically, send the card back from that pile to the deck pile
      if (source === "deckPile") {
        if (target === "flippedPile") {
          // flipped -> deck
          // call deck function to send back a flipped card to the deck pile
          dispatch(deckActions.unflipDeckPile());
        } else if (target.includes("goal")) {
          // goal pile -> deck
          // call goal function to remove card from the goal and send it to its redux cardUndo state
          dispatch(goalActions.setUndoGoalCards(target));
        } else if (target.includes("column")) {
          // column pile -> deck
          // call column function to remove card from the goal and send it to its redux cardUndo state
          dispatch(columnActions.setUndoColumnCards(target));
        }
        // set the source of the original movement to be the deck pile
        setSourceBack("deckPile");
        // -------------------------------------------------------------------------------
        // undo moves that were from a column pile to another pile
        // basically, send the card back from that pile to the corresponding column pile
      } else if (source.includes("column")) {
        if (target.includes("column")) {
          // column pile -> column pile
          // call column function to remove card from one card pile to another directly
          dispatch(
            columnActions.undoSwapColumns(
              source,
              target,
              nCards,
              movementWithFlip
            )
          );
        } else if (target.includes("goal")) {
          // goal pile -> column pile
          // call goal function to remove card from the goal and send it to its redux cardUndo state
          dispatch(goalActions.setUndoGoalCards(target));
          setSourceBack(source);
        }
      } else if (source.indexOf("goal") === 0) {
        if (target.indexOf("column") === 0) {
          // column pile -> goal pile
          // call goal function to remove card from the column and send it to its redux cardUndo state
          dispatch(columnActions.setUndoColumnCards(target));
          setSourceBack(source);
        } else if (target.indexOf("goal") === 0) {
          // goal pile -> goal pile
          // call column function to remove card from one goal pile to another directly
          dispatch(goalActions.unswapGoals(source, target));
        }
      } else {
        console.log("GO BACK from FLIPPED pile to DECK pile");
      }

      // remove the movement from the moves array
      dispatch(gameBoardActions.removeGameMove());
    }
  };

  const resolveUndoFromColumn = () => {
    if (sourceBack.indexOf("deckPile") === 0) {
      dispatch(deckActions.undoToFlipped(columnCardUndo));
    } else if (sourceBack.indexOf("goal") === 0) {
      dispatch(goalActions.sendUndoCardToGoal(columnCardUndo, sourceBack));
    }
  };

  useEffect(resolveUndoFromColumn, [columnCardUndo]);

  const resolveUndoFromGoal = () => {
    if (sourceBack === "deckPile") {
      dispatch(deckActions.undoToFlipped(goalCardUndo));
    }
    if (sourceBack.includes("column")) {
      dispatch(columnActions.sendUndoCardToColumn(goalCardUndo, sourceBack));
    }
  };

  useEffect(resolveUndoFromGoal, [goalCardUndo]);

  return <StepBackwardOutlined onClick={handleUndo} />;
}
export default UndoButton;
