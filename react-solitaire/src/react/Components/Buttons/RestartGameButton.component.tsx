import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import React from "react";
import { RedoOutlined } from "@ant-design/icons";
import { RootReducerState } from "../../../global";
import { Tooltip } from "antd";
import columnsActions from "../../../redux/columns/columns.actions";
import deckActions from "../../../redux/deck/deck.actions";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";
import goalActions from "../../../redux/goal/goal.actions";
import pageActions from "../../../redux/pages/pages.actions";

/**
 * Option to start a new game, with a confirmation dialog
 */
function RestartGameButton() {
  const dispatch = useDispatch();
  const {
    deckPile,
    flippedPile,
    column1Pile,
    column2Pile,
    column3Pile,
    column4Pile,
    column5Pile,
    column6Pile,
    column7Pile,
    goal1Pile,
    goal2Pile,
    goal3Pile,
    goal4Pile,
    gameMoves
  } = useSelector(({ GameBoard }: RootReducerState) => ({
    deckPile: GameBoard.deckPile,
    flippedPile: GameBoard.flippedPile,
    column1Pile: GameBoard.column1Pile,
    column2Pile: GameBoard.column2Pile,
    column3Pile: GameBoard.column3Pile,
    column4Pile: GameBoard.column4Pile,
    column5Pile: GameBoard.column5Pile,
    column6Pile: GameBoard.column6Pile,
    column7Pile: GameBoard.column7Pile,
    goal1Pile: GameBoard.goal1Pile,
    goal2Pile: GameBoard.goal2Pile,
    goal3Pile: GameBoard.goal3Pile,
    goal4Pile: GameBoard.goal4Pile,
    gameMoves: GameBoard.gameMoves
  }));

  // distribute the decks created to the right redux
  const restartGame = () => {
    // set the initial deck
    dispatch(deckActions.setInitialDeck(deckPile, flippedPile));
    // set the initial columns
    dispatch(
      columnsActions.setInitialColumns({
        column1Pile,
        column2Pile,
        column3Pile,
        column4Pile,
        column5Pile,
        column6Pile,
        column7Pile
      })
    );
    // set the initial deck
    dispatch(
      goalActions.setInitialGoals({
        goal1Pile,
        goal2Pile,
        goal3Pile,
        goal4Pile
      })
    );
    // toggle the timer flag
    dispatch(gameBoardActions.toggleGameFlag());

    dispatch(gameBoardActions.showingConfirm(false));
  };

  const handleShowConfirm = () => {
    if (gameMoves > 0) {
      dispatch(gameBoardActions.showingConfirm(true));
      dispatch(
        pageActions.setConfirmationModal(
          <FormattedMessage id="confirm.gameLostExit" />,
          <FormattedMessage id="confirm.restart" />,
          handleCancelConfirm,
          restartGame,
          "adjustToGameOptions"
        )
      );
    }
  };

  const handleCancelConfirm = () => {
    dispatch(gameBoardActions.showingConfirm(false));
  };

  return (
    <>
      <Tooltip title={<FormattedMessage id="btn.restart" />}>
        <RedoOutlined
          className={`joyrideRestart iconButton ${
            gameMoves === 0 ? "iconButtonDisabled" : ""
          }`}
          onClick={handleShowConfirm}
        />
      </Tooltip>
    </>
  );
}
export default RestartGameButton;
