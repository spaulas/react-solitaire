import { FormattedMessage } from "react-intl";
import { PauseOutlined } from "@ant-design/icons";
import React from "react";
import { Tooltip } from "antd";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";
import { useDispatch } from "react-redux";

function PauseGameButton() {
  const dispatch = useDispatch();

  // get the timeGame fuction
  const timeGame = () => dispatch(gameBoardActions.timeGame());

  return (
    <Tooltip title={<FormattedMessage id="btn.pause" />}>
      <PauseOutlined className="joyridePause iconButton" onClick={timeGame} />
    </Tooltip>
  );
}

export default PauseGameButton;
