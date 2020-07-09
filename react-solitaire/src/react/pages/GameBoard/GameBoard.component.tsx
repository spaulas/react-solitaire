import {
  BoardEmptySpots,
  GameColumnWrapper,
  GameOptions,
  GamePlayInfo,
  GameTopRow
} from "../../components/BoardFields/BoardFields.items";
import { ExplicitAny, RootReducerState } from "../../../global";
import React, { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDragLayer from "../../components/CardMoveHandlers/DragHandlers/CustomDragLayer.component";
import DropHandler from "../../components/CardMoveHandlers/DropHandlers/DropHandler.component";
import GameOverModal from "../../components/Modals/GameOverModal.component";
import { Prompt } from "react-router";
import ResumeGameModal from "../../components/Modals/ResumeGameModal.component";
import columnsActions from "../../../redux/columns/columns.actions";
import deckActions from "../../../redux/deck/deck.actions";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";

function GameBoard() {
  const dispatch = useDispatch();

  // create refs for the deck and flipped piles
  const deckRef: ExplicitAny = useRef();
  const flippedRef: ExplicitAny = useRef();

  // get all necessary elements from redux
  const {
    gameOver,
    gameMoves,
    deckPile,
    column1Pile,
    column2Pile,
    column3Pile,
    column4Pile,
    column5Pile,
    column6Pile,
    column7Pile
  } = useSelector(({ GameBoard, Goal }: RootReducerState) => ({
    gameMoves: GameBoard.gameMoves,
    gameOver: Goal.gameOver,
    deckPile: GameBoard.deckPile,
    column1Pile: GameBoard.column1Pile,
    column2Pile: GameBoard.column2Pile,
    column3Pile: GameBoard.column3Pile,
    column4Pile: GameBoard.column4Pile,
    column5Pile: GameBoard.column5Pile,
    column6Pile: GameBoard.column6Pile,
    column7Pile: GameBoard.column7Pile
  }));

  // ---------------------------------------------------------
  // Create Game

  // when the component mounts, create a new random game
  const mountGameBoard = () => {
    // create new deck
    dispatch(gameBoardActions.createGame());

    // set this refs at the redux
    dispatch(deckActions.setRefs(deckRef, flippedRef));
  };
  // triggers the call of the mountGameBoard function when the component is mounted
  useEffect(mountGameBoard, []);

  // distribute the decks created to the right redux
  const setCardType = () => {
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
  // triggers the call of the setCardType function when the deckPile is changed (and therefore, all the other columns as well)
  useEffect(setCardType, [deckPile]);

  const addGameToUser = () => {
    if (gameMoves === 1) {
      const currentLocal = localStorage.getItem("offlineUser");
      const offlineUser = currentLocal
        ? JSON.parse(currentLocal)
        : { history: [], nGames: 0 };
      // add current statistic to user history
      offlineUser.nGames = (offlineUser?.nGames || 0) + 1;
      localStorage.setItem("offlineUser", JSON.stringify(offlineUser));
    }
  };
  useEffect(addGameToUser, [gameMoves]);

  // ---------------------------------------------------------

  return (
    <>
      <Prompt when={!gameOver} message="If you leave the game will be a lost" />
      <DropHandler className="pageBackground">
        <ResumeGameModal />
        <GameOverModal />
        <GamePlayInfo />
        {/* empty spots */}
        <BoardEmptySpots />
        {/* top row of the game, includes the deck and the 4 goal spots */}
        <GameTopRow />
        {/* bottom row of the game, includes all the 7 columns */}
        <GameColumnWrapper />
        <GameOptions />
        {/* preview of the card being dragged */}
        <CustomDragLayer />
      </DropHandler>
    </>
  );
}

export default memo(GameBoard);
