/* eslint-disable react/forbid-component-props */
import {
  GameColumnWrapper,
  GameOptions,
  GamePlayInfo,
  GameTopRow
} from "../../components/BoardFields/BoardFields.items";
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import DraggableCard from "../../components/BoardFields/DraggableCard.component";
import { RootReducerState } from "../../../global";
import columnsActions from "../../../redux/columns/columns.actions";
import deckActions from "../../../redux/deck/deck.actions";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";

function GameBoard() {
  const dispatch = useDispatch();

  const {
    deckPile,
    column1Pile,
    column2Pile,
    column3Pile,
    column4Pile,
    column5Pile,
    column6Pile,
    column7Pile
  } = useSelector(({ GameBoard }: RootReducerState) => ({
    deckPile: GameBoard.deckPile,
    column1Pile: GameBoard.column1Pile,
    column2Pile: GameBoard.column2Pile,
    column3Pile: GameBoard.column3Pile,
    column4Pile: GameBoard.column4Pile,
    column5Pile: GameBoard.column5Pile,
    column6Pile: GameBoard.column6Pile,
    column7Pile: GameBoard.column7Pile
  }));

  // when the component mounts, create a new random game
  const mountGameBoard = () => {
    // create new deck
    dispatch(gameBoardActions.createDeck());
  };
  useEffect(mountGameBoard, []);

  // distribute the decks created to the right redux
  const setCardsPile = () => {
    // set the initial deck
    dispatch(deckActions.setInitialDeck(deckPile));
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
  };
  useEffect(setCardsPile, [deckPile]);

  return (
    <div className="gameBoard">
      <Button
        style={{ zIndex: 9999999999999 }}
        onClick={() => dispatch(deckActions.resetDeck())}
      >
        RESET DECK
      </Button>
      <GamePlayInfo />
      <GameOptions />
      <DraggableCard />
      <GameTopRow />
      <GameColumnWrapper />
    </div>
  );
}

export default memo(GameBoard);
