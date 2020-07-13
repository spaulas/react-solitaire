import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import React from "react";
import { RootReducerState } from "../../../global";
import { StepForwardOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import columnsActions from "../../../redux/columns/columns.actions";
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
          dispatch(deckActions.startRedoAnimation());
          setTimeout(() => {
            // deckPile -> flippedPile
            // call deck function to send back a flipped card to the deck pile
            dispatch(deckActions.flipDeckPile());
          }, 600);
        } else if (target.includes("column")) {
          // deckPile -> column pile
          // remove card from flipped pile
          dispatch(deckActions.removeCardFromFlipped());
          // add removed card to the corresponding column
          dispatch(columnsActions.addCardToColumn(target, cards[0], false));
        } else if (target.includes("goal")) {
          // deckPile -> goal pile
          // remove card from flipped pile
          dispatch(deckActions.removeCardFromFlipped());
          // add removed card to the corresponding goal
          dispatch(goalActions.addCardToGoal(target, cards[0]));
        }
      } // -------------------------------------------------------------------------------
      // undo moves that were from a column pile to another pile
      // basically, send the card back from that pile to the corresponding column pile
      else if (source.includes("column")) {
        if (target.includes("column")) {
          // column pile -> column pile
          dispatch(
            columnsActions.undoSwapColumns(
              target,
              source,
              cards.length,
              movementWithFlip,
              true
            )
          );
        } else if (target.includes("goal")) {
          // column pile -> goal pile
          dispatch(
            columnsActions.removeNCardsFromColumn(
              source,
              cards.length,
              movementWithFlip
            )
          );
          // add removed card to the corresponding goal
          dispatch(goalActions.addCardToGoal(target, cards[0]));
        }
      }
      // -------------------------------------------------------------------------------
      else if (source.indexOf("goal") === 0) {
        if (target.indexOf("column") === 0) {
          // goal pile -> column pile
          dispatch(goalActions.removeCardFromGoal(source));
          dispatch(
            columnsActions.addCardToColumn(
              target,
              cards[0],
              Boolean(movementWithFlip)
            )
          );
        } else if (target.indexOf("goal") === 0) {
          // goal pile -> goal pile
          dispatch(goalActions.undoSwapGoals(target, source));
        }
      } else {
        // undo a deck flipped
        // flipped pile -> deck pile
        dispatch(deckActions.resetDeck());
      }
      dispatch(gameBoardActions.reAddGameMove());
    }
  };
  return (
    <Tooltip title={<FormattedMessage id="btn.redo" />}>
      <StepForwardOutlined
        className="joyrideRedo iconButton"
        onClick={handleRedo}
      />
    </Tooltip>
  );
}
export default RedoButton;
