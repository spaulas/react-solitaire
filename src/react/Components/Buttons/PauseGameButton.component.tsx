import { FormattedMessage } from "react-intl";
import { PauseOutlined } from "@ant-design/icons";
import React from "react";
import { Tooltip } from "antd";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";
import pageActions from "../../../redux/pages/pages.actions";
import { useDispatch } from "react-redux";

function PauseGameButton() {
  const dispatch = useDispatch();

  const handleShowConfirm = () => {
    dispatch(gameBoardActions.showingConfirm(true));
    dispatch(
      pageActions.setConfirmationModal(
        "",
        "",
        undefined,
        handleConfirm,
        "adjustToGameOptions",
        "btn.resumeGame"
      )
    );
    dispatch(gameBoardActions.timeGame());
  };

  const handleConfirm = () => {
    dispatch(gameBoardActions.timeGame());
    dispatch(gameBoardActions.showingConfirm(false));
  };

  return (
    <Tooltip title={<FormattedMessage id="btn.pause" />}>
      <PauseOutlined
        className="joyridePause iconButton"
        onClick={handleShowConfirm}
      />
    </Tooltip>
  );
}

export default PauseGameButton;
