import {
  BoardEmptySpots,
  GameColumnWrapper,
  GameOptions,
  GamePlayInfo,
  GameTopRow
} from "../../Components/BoardFields/BoardFields.items";
import { ExplicitAny, RootReducerState } from "../../../global";
import React, { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDragLayer from "../../Components/CardMoveHandlers/DragHandlers/CustomDragLayer.component";
import DropHandler from "../../Components/CardMoveHandlers/DropHandlers/DropHandler.component";
import GameOverModal from "../../Components/Modals/GameOverModal.component";
import JoyrideSteps from "./JoyrideSteps.component";
import { Prompt } from "react-router";
import ResumeGameModal from "../../Components/Modals/ResumeGameModal.component";
import columnsActions from "../../../redux/columns/columns.actions";
import deckActions from "../../../redux/deck/deck.actions";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";
import goalActions from "../../../redux/goal/goal.actions";
import joyrideActions from "../../../redux/joyride/joyride.actions";
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
    savedGame: User.user.savedGame
  }));

  // ---------------------------------------------------------
  // Create Game

  /**
   * Triggered when the component is mounted
   * Stores the deck and flipped ref at the redux
   * Starts the page joyride
   * And either creates a new random game or resumes a previously saved game
   */
  const mountGameBoard = () => {
    // set this refs at the redux
    dispatch(deckActions.setRefs(deckRef, flippedRef));

    // start joyride
    dispatch(joyrideActions.initJoyride("game", JoyrideSteps()));

    // if nothing was sent through the location state, then create a new game
    if (!location.state) {
      if (savedGame) {
        // if there was a saved game and the user started a new one, should count has a lost
        dispatch(userActions.addGame());
      }
      // create new deck
      dispatch(gameBoardActions.createGame());
    } // if the location state is defined
    else {
      // add game to the user counting
      dispatch(userActions.addGame());
      // set the initial deck
      dispatch(
        deckActions.setInitialDeck(savedGame.deckPile, savedGame.flippedPile)
      );
      // set the initial columns
      dispatch(columnsActions.setInitialColumns(savedGame.columns));
      // set the initial goals
      dispatch(goalActions.setInitialGoals(savedGame.goals));
    }
    // remove saved game from user settings
    dispatch(userActions.clearSavedGame());
  };
  useEffect(mountGameBoard, []);

  /**
   * Triggered when the deck pile changes (and therefore, all the other columns and goals as well)
   * Distributes the decks *created* to the right redux
   */
  const setNewGamePiles = () => {
    // this is only done when a new game is created!
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
      // set the initial goals
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
  useEffect(setNewGamePiles, [deckPile]);

  /**
   * Triggered by the game moves
   * When a *new* game starts, it is only added to the users count when at least a move is done
   */
  const addGameToUser = () => {
    if (gameMoves === 1 && !location.state) {
      dispatch(userActions.addGame());
    }
  };
  useEffect(addGameToUser, [gameMoves]);

  // ---------------------------------------------------------

  return (
    <>
      <Prompt
        when={!gameOver && gameMoves > 0 && !savedGame}
        message="If you leave the game will be a lost"
      />
      <ResumeGameModal />
      <GameOverModal />
      <DropHandler className="joyrideGamePage mainPage">
        {/* current game status display (time and moves) */}
        <GamePlayInfo />
        {/* empty spots */}
        <BoardEmptySpots />
        {/* top row of the game, includes the deck and the 4 goal spots */}
        <GameTopRow />
        {/* bottom row of the game, includes all the 7 columns */}
        <GameColumnWrapper />
        {/* game options buttons */}
        <GameOptions />
        {/* preview of the card being dragged */}
        <CustomDragLayer />
      </DropHandler>
    </>
  );
}

export default memo(GameBoard);
