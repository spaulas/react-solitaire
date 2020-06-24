/* eslint-disable no-console */
import {
  BoardEmptySpots,
  GameColumnWrapper,
  GameOptions,
  GamePlayInfo,
  GameTopRow
} from "../../components/BoardFields/BoardFields.items";
import { ExplicitAny, RootReducerState } from "../../../global";
import React, { memo, useEffect, useRef, useState } from "react";
import { onDrop, removeColumnCard, removeDeckCard } from "./helper";
import { useDispatch, useSelector } from "react-redux";
import CustomDragLayer from "./CustomDragLayer.component";
import GameOverModal from "../../components/Modals/GameOverModal.component";
import columnsActions from "../../../redux/columns/columns.actions";
import deckActions from "../../../redux/deck/deck.actions";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";
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
    cardsDragging,
    sendBack,
    sendBackGoal,
    columnSource,
    movementWithFlip,
    goalSource
  } = useSelector(({ GameBoard, Columns, Deck, Goal }: RootReducerState) => ({
    deckPile: GameBoard.deckPile,
    column1Pile: GameBoard.column1Pile,
    column2Pile: GameBoard.column2Pile,
    column3Pile: GameBoard.column3Pile,
    column4Pile: GameBoard.column4Pile,
    column5Pile: GameBoard.column5Pile,
    column6Pile: GameBoard.column6Pile,
    column7Pile: GameBoard.column7Pile,
    sendBack: Columns.sendBack,
    sendBackGoal: Goal.sendBack,
    cardsDragging:
      Columns.cardDragging || Deck.cardDragging || Goal.cardDragging,
    columnSource: Columns.cardDraggingCol,
    movementWithFlip: Columns.movementWithFlip,
    goalSource: Goal.cardDraggingGoal
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

  // ---------------------------------------------------------
  // Handle Drop

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [columnDropedTo, setColumnDroppedTo] = useState<string>("");

  // when the sendBack card changes, check if it is false
  useEffect(
    () =>
      removeDeckCard(
        cardsDragging,
        columnDropedTo,
        columnSource,
        movementWithFlip,
        goalSource,
        dispatch,
        sendBack
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sendBack]
  );

  // when the sendBack card changes, check if it is false
  useEffect(
    () =>
      removeColumnCard(
        cardsDragging,
        columnDropedTo,
        goalSource,
        columnSource,
        movementWithFlip,
        dispatch,
        sendBack
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sendBackGoal]
  );

  // create drop reference and associate functions
  const [, drop] = useDrop({
    accept: "cardframe",
    drop: (card, monitor) =>
      onDrop(monitor, setColumnDroppedTo, cardsDragging, dispatch)
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
