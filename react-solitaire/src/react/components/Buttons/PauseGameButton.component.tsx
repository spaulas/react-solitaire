import { useDispatch, useSelector } from "react-redux";
import { PauseCircleOutlined } from "@ant-design/icons";
import PausedGameModal from "../Modals/PausedGameModal.component";
import React from "react";
import { RootReducerState } from "../../../global";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";

function PauseGameButton() {
  const dispatch = useDispatch();

  // get the state for the game pause in game board redux
  const { gamePaused } = useSelector(({ GameBoard }: RootReducerState) => ({
    gamePaused: GameBoard.gamePaused
  }));

  // get the timeGame fuction
  const timeGame = () => dispatch(gameBoardActions.timeGame());

  return (
    <>
      <PauseCircleOutlined onClick={timeGame} />
      <PausedGameModal visible={gamePaused} closeModal={timeGame} />
    </>
  );
}

export default PauseGameButton;
