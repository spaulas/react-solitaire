import { FormattedMessage } from "react-intl";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import { Tooltip } from "antd";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";
import pageActions from "../../../redux/pages/pages.actions";
import { useDispatch } from "react-redux";

/**
 * Option to start a new game, with a confirmation dialog
 */
function NewGameButton() {
  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(gameBoardActions.createGame());
    dispatch(gameBoardActions.showingConfirm(false));
  };

  const handleShowConfirm = () => {
    dispatch(gameBoardActions.showingConfirm(true));
    dispatch(
      pageActions.setConfirmationModal(
        <FormattedMessage id="confirm.gameLostExit" />,
        <FormattedMessage id="confirm.startNew" />,
        handleCancelConfirm,
        handleConfirm,
        "adjustToGameOptions"
      )
    );
  };

  const handleCancelConfirm = () => {
    dispatch(gameBoardActions.showingConfirm(false));
  };

  return (
    <>
      <Tooltip title={<FormattedMessage id="btn.newGame" />}>
        <PlusOutlined
          className="joyrideNew iconButton"
          onClick={handleShowConfirm}
        />
      </Tooltip>
    </>
  );
}
export default NewGameButton;
