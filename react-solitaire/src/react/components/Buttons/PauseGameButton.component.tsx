import { PauseOutlined } from "@ant-design/icons";
import React from "react";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";
import { useDispatch } from "react-redux";

function PauseGameButton() {
  const dispatch = useDispatch();

  // get the timeGame fuction
  const timeGame = () => dispatch(gameBoardActions.timeGame());

  return <PauseOutlined className="iconButton" onClick={timeGame} />;
}

export default PauseGameButton;
