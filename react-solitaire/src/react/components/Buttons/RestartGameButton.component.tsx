import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../Modals/ConfirmationModal.component";
import { RedoOutlined } from "@ant-design/icons";
import { RootReducerState } from "../../../global";
import { Tooltip } from "antd";
import columnsActions from "../../../redux/columns/columns.actions";
import deckActions from "../../../redux/deck/deck.actions";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";

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
    column7Pile
  } = useSelector(({ GameBoard }: RootReducerState) => ({
    deckPile: GameBoard.deckPile,
    flippedPile: GameBoard.flippedPile,
    column1Pile: GameBoard.column1Pile,
    column2Pile: GameBoard.column2Pile,
    column3Pile: GameBoard.column3Pile,
    column4Pile: GameBoard.column4Pile,
    column5Pile: GameBoard.column5Pile,
    column6Pile: GameBoard.column6Pile,
    column7Pile: GameBoard.column7Pile
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
    // toggle the timer flag
    dispatch(gameBoardActions.toggleGameFlag());

    setShowConfirm(false);
  };

  return (
    <>
      <Tooltip title="Restart game">
        <RedoOutlined
          className="iconButton"
          onClick={() => setShowConfirm(true)}
        />
      </Tooltip>
      {showConfirm ? (
        <ConfirmationModal
          onCancel={() => setShowConfirm(false)}
          onConfirm={restartGame}
          message="This game will be considered a lost. Are you sure you want to restart the game?"
          className="adjustToGameOptions"
        />
      ) : null}
    </>
  );
}
export default RestartGameButton;
