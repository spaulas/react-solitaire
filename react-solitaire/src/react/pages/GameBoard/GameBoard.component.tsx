/* eslint-disable no-console */
import {
  BoardEmptySpots,
  GameColumnWrapper,
  GameOptions,
  GamePlayInfo,
  GameTopRow
} from "../../components/BoardFields/BoardFields.items";
import { CardType, GameMove } from "../../../redux/gameBoard/gameBoard.types";
import { ExplicitAny, RootReducerState } from "../../../global";
import React, { memo, useEffect, useRef, useState } from "react";
import { finishMoveToColumn, finishMoveToGoal, onDrop } from "./dropHelper";
import { useDispatch, useSelector } from "react-redux";
import CustomDragLayer from "./CustomDragLayer.component";
import GameOverModal from "../../components/Modals/GameOverModal.component";
import columnsActions from "../../../redux/columns/columns.actions";
import deckActions from "../../../redux/deck/deck.actions";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";
import goalActions from "../../../redux/goal/goal.actions";
import { useDrop } from "react-dnd";

function GameBoard() {
  const dispatch = useDispatch();

  // create refs for the deck and flipped piles
  const deckRef: ExplicitAny = useRef();
  const flippedRef: ExplicitAny = useRef();

  // get all necessary elements from redux
  const {
    deckPile,
    column1Pile,
    column2Pile,
    column3Pile,
    column4Pile,
    column5Pile,
    column6Pile,
    column7Pile,
    sendBackColumn,
    sendBackGoal,
    move
  } = useSelector(({ GameBoard, Columns, Deck, Goal }: RootReducerState) => {
    const source =
      Columns.cardDraggingCol || Goal.cardDraggingGoal || "deckPile";
    const card = Columns.cardDragging || Deck.cardDragging || Goal.cardDragging;
    const movementWithFlip = Columns.movementWithFlip;

    return {
      deckPile: GameBoard.deckPile,
      column1Pile: GameBoard.column1Pile,
      column2Pile: GameBoard.column2Pile,
      column3Pile: GameBoard.column3Pile,
      column4Pile: GameBoard.column4Pile,
      column5Pile: GameBoard.column5Pile,
      column6Pile: GameBoard.column6Pile,
      column7Pile: GameBoard.column7Pile,
      sendBackColumn: Columns.sendBack,
      sendBackGoal: Goal.sendBack,
      move: { source, card, movementWithFlip }
    };
  });

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

  // ---------------------------------------------------------
  // Handle Drop

  // save the column where the cards were dropped to
  const [columnDropedTo, setColumnDroppedTo] = useState<string>("");
  // get all the necessary actions for the drop of the dragging cards
  const actions = {
    addGameMove: (move: GameMove) =>
      // add game move to history
      dispatch(gameBoardActions.addGameMove(move)),
    // add the cards dragging to a field
    addDraggingCardsToGoal: (field: string, cards: Array<CardType>) =>
      dispatch(goalActions.addDraggingCardsToGoal(field, cards)),
    addDraggingCardsToColumn: (field: string, cards: Array<CardType>) =>
      dispatch(columnsActions.addDraggingCardsToColumn(field, cards)),
    // swap cards from fields from the same type
    swapGoals: (field: string) => dispatch(goalActions.swapGoals(field)),
    swapColumns: (field: string) => dispatch(columnsActions.swapColumns(field)),
    // remove cards that were being dragged from their source
    removeCardFromFlipped: () => dispatch(deckActions.removeCardFromFlipped()),
    removeCardFromGoal: () => dispatch(goalActions.removeCardFromGoal()),
    removeDraggedCardsFromColumn: () =>
      dispatch(columnsActions.removeDraggedCardsFromColumn()),
    // reset dragging states
    resetDeck: () => dispatch(deckActions.resetCardDragging()),
    resetGoal: () => dispatch(goalActions.resetCardDragging()),
    resetColumn: () => dispatch(columnsActions.resetCardDragging())
  };

  /**
   * When the sendBackColumn changes, it means that a move to a column has finished
      - if it is true, then the move should not happen (do nothing)
      - if it is false, then the move should happen:
        - send the cardsDragging to the corresponding target (goal or column);
        - remove the card from the column it came from
  */
  const handleMoveToColumn = () => {
    const finalCard = move.card ? move.card[0] : move.card;
    const finalMove = { ...move, card: finalCard, target: columnDropedTo };
    finishMoveToColumn(actions, finalMove, sendBackColumn);
  };
  useEffect(handleMoveToColumn, [sendBackColumn]);

  /**
   * When the sendBackGoal changes, it means that a move from a goal has finished
      - if it is true, then the move should not happen (do nothing)
      - if it is false, then the move should happen:
        - send the cardsDragging to the corresponding target (goal or column);
        - remove the card from the goal it came from
  */
  const handleRemoveColumnCard = () => {
    const finalCard = move.card ? move.card[0] : move.card;
    const finalMove = { ...move, card: finalCard, target: columnDropedTo };
    finishMoveToGoal(actions, finalMove, sendBackGoal);
  };
  useEffect(handleRemoveColumnCard, [sendBackGoal]);

  // create drop reference and associate functions
  const [, drop] = useDrop({
    accept: "cardframe",
    drop: (card, monitor) =>
      onDrop(monitor, setColumnDroppedTo, move.card, actions)
  });

  // ---------------------------------------------------------

  return (
    <div className="gameBoard" ref={drop}>
      <GameOverModal />
      <GamePlayInfo />
      {/* empty spots */}
      <BoardEmptySpots />
      {/* top row of the game, includes the deck and the 4 goal spots */}
      <GameTopRow />
      {/* bottom row of the game, includes all the 7 columns */}
      <GameColumnWrapper />
      {/* preview of the card being dragged */}
      <CustomDragLayer />
      <GameOptions />
    </div>
  );
}

export default memo(GameBoard);
