import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import ConfirmationModal from "../Modals/ConfirmationModal.component";
import { FormattedMessage } from "react-intl";
import { Tooltip } from "antd";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

/**
 * Option to exit current game, with a confirmation dialog
 */
function ExitGameButton() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleShowConfirm = () => {
    dispatch(gameBoardActions.exitGame());
    setShowConfirm(true);
  };

  const handleHideConfirm = () => {
    setShowConfirm(false);
    history.push("/");
  };

  return (
    <>
      <Tooltip title={<FormattedMessage id="btn.exitGame" />}>
        <CloseOutlined
          className="joyrideExit iconButton"
          onClick={handleShowConfirm}
        />
      </Tooltip>
      {showConfirm ? (
        <ConfirmationModal
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleHideConfirm}
          message={<FormattedMessage id="confirm.gameLostExit" />}
          className="adjustToGameOptions"
        />
      ) : null}
    </>
  );
}
export default ExitGameButton;
