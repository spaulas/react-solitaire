import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../Modals/ConfirmationModal.component";
import { FormattedMessage } from "react-intl";
import { RootReducerState } from "../../../global";
import { SaveFilled } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useHistory } from "react-router-dom";
import userActions from "../../../redux/user/user.actions";

function SaveGameButton() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  // get piles from redux
  const { deckPile, flippedPile, columns, goals } = useSelector(
    ({ Deck, Columns, Goal }: RootReducerState) => ({
      deckPile: Deck.deckPile,
      flippedPile: Deck.flippedPile,
      columns: Columns.columns,
      goals: Goal.goals
    })
  );

  const saveGame = () => {
    dispatch(userActions.saveGame({ deckPile, flippedPile, columns, goals }));
    history.push("/");
  };

  return (
    <>
      <Tooltip title={<FormattedMessage id="btn.saveGame" />}>
        <SaveFilled
          className="iconButton"
          onClick={() => setShowConfirm(true)}
        />
      </Tooltip>
      {showConfirm ? (
        <ConfirmationModal
          onCancel={() => setShowConfirm(false)}
          onConfirm={saveGame}
          message={<FormattedMessage id="confirm.saveGame" />}
          className="adjustToGameOptions"
        />
      ) : null}
    </>
  );
}

export default SaveGameButton;
