import { CloseOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import React from "react";
import { Tooltip } from "antd";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";
import pageActions from "../../../redux/pages/pages.actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

/**
 * Option to exit current game, with a confirmation dialog
 */
function ExitGameButton() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleHideConfirm = () => {
    dispatch(gameBoardActions.showingConfirm(false));
    history.push("/");
  };

  const handleCancelConfirm = () => {
    dispatch(gameBoardActions.showingConfirm(false));
  };

  const handleShowConfirm = () => {
    dispatch(gameBoardActions.showingConfirm(true));
    dispatch(
      pageActions.setConfirmationModal(
        <FormattedMessage id="confirm.gameLostExit" />,
        <FormattedMessage id="confirm.leaveGame" />,
        handleCancelConfirm,
        handleHideConfirm,
        "adjustToGameOptions"
      )
    );
  };

  return (
    <>
      <Tooltip title={<FormattedMessage id="btn.exitGame" />}>
        <CloseOutlined
          className="joyrideExit iconButton"
          onClick={handleShowConfirm}
        />
      </Tooltip>
    </>
  );
}
export default ExitGameButton;
