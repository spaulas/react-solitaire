import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import React from "react";
import { RootReducerState } from "../../../global";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";

function ResumeGameModal() {
  const dispatch = useDispatch();

  // get the state for the game pause in game board redux
  const { gamePaused, gameMoves } = useSelector(
    ({ GameBoard }: RootReducerState) => ({
      gamePaused: GameBoard.gamePaused,
      gameMoves: GameBoard.gameMoves
    })
  );

  // get the timeGame fuction
  const timeGame = () => dispatch(gameBoardActions.timeGame());

  if (gamePaused && gameMoves > 0) {
    return (
      <div className="gameFullDiv">
        <div
          className={`animatedButton divButton resumeGameAnimatedButton`}
          onClick={timeGame}
        >
          <FormattedMessage id="btn.resumeGame" />
        </div>
      </div>
    );
  }

  return null;
}

export default ResumeGameModal;
