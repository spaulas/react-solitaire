import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../Modals/ConfirmationModal.component";
import { FormattedMessage } from "react-intl";
import { RedoOutlined } from "@ant-design/icons";
import { RootReducerState } from "../../../global";
import { Tooltip } from "antd";
import columnsActions from "../../../redux/columns/columns.actions";
import deckActions from "../../../redux/deck/deck.actions";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";
import goalActions from "../../../redux/goal/goal.actions";

/**
 * Option to start a new game, with a confirmation dialog
 */
function RestartGameButton() {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

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
    goal4Pile
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
    goal4Pile: GameBoard.goal4Pile
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

    setShowConfirm(false);
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
      <Tooltip title={<FormattedMessage id="btn.restart" />}>
        <RedoOutlined
          className="joyrideRestart iconButton"
          onClick={handleShowConfirm}
        />
      </Tooltip>
      {showConfirm ? (
        <ConfirmationModal
          onCancel={handleCancelConfirm}
          onConfirm={restartGame}
          message={<FormattedMessage id="confirm.gameLost" />}
          className="adjustToGameOptions"
        />
      ) : null}
    </>
  );
}
export default RestartGameButton;
