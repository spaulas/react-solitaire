import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import React from "react";
import { RootReducerState } from "../../../global";
import { SaveFilled } from "@ant-design/icons";
import { Tooltip } from "antd";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";
import pageActions from "../../../redux/pages/pages.actions";
import { useHistory } from "react-router-dom";
import userActions from "../../../redux/user/user.actions";

function SaveGameButton() {
  const history = useHistory();
  const dispatch = useDispatch();
  // get piles from redux
  const {
    deckPile,
    flippedPile,
    columns,
    goals,
    gameTime,
    gameMoves,
    nHints
  } = useSelector(({ Deck, Columns, Goal, GameBoard }: RootReducerState) => ({
    deckPile: Deck.deckPile,
    flippedPile: Deck.flippedPile,
    columns: Columns.columns,
    goals: Goal.goals,
    gameTime: GameBoard.gameTime,
    gameMoves: GameBoard.gameMoves,
    nHints: GameBoard.nHints
  }));

  const showConfimationModal = () => {
    dispatch(gameBoardActions.showingConfirm(true));
    dispatch(
      pageActions.setConfirmationModal(
        <FormattedMessage id="confirm.saveGame1" />,
        <FormattedMessage id="confirm.saveGame2" />,
        handleCancelConfirm,
        saveGame,
        "adjustToGameOptions"
      )
    );
  };

  const saveGame = () => {
    dispatch(
      userActions.saveGame({
        deckPile,
        flippedPile,
        columns,
        goals,
        gameTime,
        gameMoves,
        nHints
      })
    );
    dispatch(gameBoardActions.showingConfirm(false));
    history.push("/");
  };

  const handleCancelConfirm = () => {
    dispatch(gameBoardActions.showingConfirm(false));
  };

  return (
    <>
      <Tooltip title={<FormattedMessage id="btn.saveGame" />}>
        <SaveFilled
          className="joyrideSave iconButton"
          onClick={showConfimationModal}
        />
      </Tooltip>
    </>
  );
}

export default SaveGameButton;
