/* eslint-disable no-console */
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { RootReducerState } from "../../../global";
import { StepBackwardOutlined } from "@ant-design/icons";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";

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
    console.log("gamePreviousMoves = ", gamePreviousMoves);
    // can only undo when there are moves to go back
    if (nMoves > 0) {
      const { source, target, nCards } = gamePreviousMoves[nMoves - 1];

      if (source.indexOf("deckPile") === 0) {
        if (target.indexOf("flippedPile") === 0) {
          console.log("GO BACK from DECK pile to FLIPPED pile");
        } else if (target.indexOf("goal") === 0) {
          console.log("GO BACK from DECK pile to GOAL pile");
        } else if (target.indexOf("column") === 0) {
          console.log("GO BACK from DECK pile to COLUMN pile");
        }
      } else if (source.indexOf("column") === 0) {
        if (target.indexOf("column") === 0) {
          console.log("GO BACK from COLUMN pile to COLUMN pile");
        } else if (target.indexOf("goal") === 0) {
          console.log("GO BACK from COLUMN pile to GOAL pile");
        }
      } else if (source.indexOf("goal") === 0) {
        if (target.indexOf("column") === 0) {
          console.log("GO BACK from GOAL pile to COLUMN pile");
        } else if (target.indexOf("goal") === 0) {
          console.log("GO BACK from GOAL pile to GOAL pile");
        }
      } else {
        console.log("GO BACK from FLIPPED pile to DECK pile");
      }
    }
  };

  return <StepBackwardOutlined onClick={handleUndo} />;
}
export default UndoButton;
