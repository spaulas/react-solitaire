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
import goalActions from "../../../redux/goal/goal.actions";
import { useLocation } from "react-router-dom";
import userActions from "../../../redux/user/user.actions";

function GameBoard() {
  const dispatch = useDispatch();
  const location = useLocation();

  // create refs for the deck and flipped piles
  const deckRef: ExplicitAny = useRef();
  const flippedRef: ExplicitAny = useRef();

  // get all necessary elements from redux
  const {
    gameOver,
    gameMoves,
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
    savedGame
  } = useSelector(({ GameBoard, Goal, User }: RootReducerState) => ({
    gameMoves: GameBoard.gameMoves,
    gameOver: Goal.gameOver,
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
    savedGame: User.savedGame
  }));

  // ---------------------------------------------------------
  // Create Game

  // when the component mounts, create a new random game
  const mountGameBoard = () => {
    // set this refs at the redux
    dispatch(deckActions.setRefs(deckRef, flippedRef));

    // if nothing was sent through the state, then create a new game
    if (!location.state) {
      if (savedGame) {
        // if there was a saved game and the user started a new one, should count has a lost
        dispatch(userActions.addGame());
      }
      // create new deck
      dispatch(gameBoardActions.createGame());
    } else {
      // add game to the user counting
      dispatch(userActions.addGame());
      // set the initial deck
      dispatch(
        deckActions.setInitialDeck(savedGame.deckPile, savedGame.flippedPile)
      );
      // set the initial columns
      dispatch(columnsActions.setInitialColumns(savedGame.columns));
      dispatch(goalActions.setInitialGoals(savedGame.goals));
    }

    dispatch(userActions.clearSavedGame());
  };
  // triggers the call of the mountGameBoard function when the component is mounted
  useEffect(mountGameBoard, []);

  // distribute the decks created to the right redux
  const setCardType = () => {
    if (!location.state) {
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
      dispatch(
        goalActions.setInitialGoals({
          goal1Pile,
          goal2Pile,
          goal3Pile,
          goal4Pile
        })
      );
    }
  };
  // triggers the call of the setCardType function when the deckPile is changed (and therefore, all the other columns as well)
  useEffect(setCardType, [deckPile]);

  const addGameToUser = () => {
    if (gameMoves === 1) {
      dispatch(userActions.addGame());
    }
  };
  useEffect(addGameToUser, [gameMoves]);

  // ---------------------------------------------------------

  return (
    <>
      <Prompt
        when={!gameOver && gameMoves > 0}
        message="If you leave the game will be a lost"
      />
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
