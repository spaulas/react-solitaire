import {
  GameColumnWrapper,
  GameOptions,
  GamePlayInfo,
  GameTopRow
} from "../../components/BoardFields/BoardFields.items";
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducerState } from "../../../global";
import deckActions from "../../../redux/deck/deck.actions";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";

function GameBoard() {
  const dispatch = useDispatch();

  const { deckPile } = useSelector(({ GameBoard }: RootReducerState) => ({
    deckPile: GameBoard.deckPile
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
  };
  useEffect(setCardsPile, [deckPile]);

  return (
    <div className="gameBoard">
      <GamePlayInfo />
      <GameTopRow />
      <GameColumnWrapper />
      <GameOptions />
    </div>
  );
}

export default memo(GameBoard);
