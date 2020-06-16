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
  const { gamePreviousMoves, columnCardUndo } = useSelector(
    ({ GameBoard, Columns }: RootReducerState) => ({
      gamePreviousMoves: GameBoard.gamePreviousMoves,
      columnCardUndo: Columns.cardUndo
    })
  );

  const handleUndo = () => {
    const nMoves = gamePreviousMoves.length;
    // can only undo when there are moves to go back
    if (nMoves > 0) {
      const { source, target, nCards, movementWithFlip } = gamePreviousMoves[
        nMoves - 1
      ];

      console.log("gamePreviousMoves = ", gamePreviousMoves);

      if (source.indexOf("deckPile") === 0) {
        if (target.indexOf("flippedPile") === 0) {
          console.log("GO BACK from DECK pile to FLIPPED pile");
          // call deck function to send back a flipped card to the deck pile
          dispatch(deckActions.unflipDeckPile());
        } else if (target.indexOf("goal") === 0) {
          console.log("GO BACK from DECK pile to GOAL pile");
        } else if (target.indexOf("column") === 0) {
          console.log("GO BACK from DECK pile to COLUMN pile");
          dispatch(columnActions.undoMoveToColumn(target));
          setSourceBack("deckPile");
        }
      } else if (source.indexOf("column") === 0) {
        if (target.indexOf("column") === 0) {
          console.log("GO BACK from COLUMN pile to COLUMN pile");
          dispatch(
            columnActions.undoSwapColumns(
              source,
              target,
              nCards,
              movementWithFlip
            )
          );
        } else if (target.indexOf("goal") === 0) {
          console.log("GO BACK from COLUMN pile to GOAL pile");
        }
      } else if (source.indexOf("goal") === 0) {
        if (target.indexOf("column") === 0) {
          console.log("GO BACK from GOAL pile to COLUMN pile");
          dispatch(columnActions.undoMoveToColumn(target));
          setSourceBack(source);
        } else if (target.indexOf("goal") === 0) {
          console.log("GO BACK from GOAL pile to GOAL pile");
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
      dispatch(goalActions.undoToGoal(columnCardUndo, sourceBack));
    }
  };

  useEffect(resolveUndoFromColumn, [columnCardUndo]);

  return <StepBackwardOutlined onClick={handleUndo} />;
}
export default UndoButton;
