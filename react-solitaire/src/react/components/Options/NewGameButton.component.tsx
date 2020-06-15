import { Button, Popconfirm } from "antd";
import React from "react";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";
import { useDispatch } from "react-redux";

/**
 * Option to start a new game, with a confirmation dialog
 */
function NewGameButton() {
  const dispatch = useDispatch();
  return (
    <Popconfirm
      placement="top"
      title="This game will be considered a lost. Are you sure you want to start a new game?"
      onConfirm={() => dispatch(gameBoardActions.createGame())}
      okText="Yes"
      cancelText="No"
    >
      <Button className="optionsButton">New Game</Button>
    </Popconfirm>
  );
}
export default NewGameButton;
