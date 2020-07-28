import React, { useState } from "react";
import ConfirmationModal from "../Modals/ConfirmationModal.component";
import { FormattedMessage } from "react-intl";
import { PlusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";
import { useDispatch } from "react-redux";

/**
 * Option to start a new game, with a confirmation dialog
 */
function NewGameButton() {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {
    setShowConfirm(false);
    dispatch(gameBoardActions.createGame());
  };

  const handleShowConfirm = () => {
    setShowConfirm(true);
    dispatch(gameBoardActions.showingConfirm(true));
  };

  const handleCancelConfirm = () => {
    setShowConfirm(false);
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
      {showConfirm ? (
        <ConfirmationModal
          onCancel={handleCancelConfirm}
          onConfirm={handleConfirm}
          message={<FormattedMessage id="confirm.gameLost" />}
          className="adjustToGameOptions"
        />
      ) : null}
    </>
  );
}
export default NewGameButton;
