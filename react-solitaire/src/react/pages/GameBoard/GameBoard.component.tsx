/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BoardEmptySpots,
  GameColumnWrapper,
  GameOptions,
  GamePlayInfo,
  GameTopRow
} from "../../components/BoardFields/BoardFields.items";
import React, { memo, useEffect, useRef } from "react";
import { RefAny, RootReducerState } from "../../../global";
import { useDispatch, useSelector } from "react-redux";
import CustomDragLayer from "../../components/Cards/CustomDragLayer.component";
import columnsActions from "../../../redux/columns/columns.actions";
import deckActions from "../../../redux/deck/deck.actions";
import gameBoardActions from "../../../redux/gameBoard/gameBoard.actions";
import { useDrop } from "react-dnd";

function GameBoard() {
  const dispatch = useDispatch();

  // create refs for the deck and flipped piles
  const deckRef: RefAny = useRef();
  const flippedRef: RefAny = useRef();

  const {
    deckPile,
    column1Pile,
    column2Pile,
    column3Pile,
    column4Pile,
    column5Pile,
    column6Pile,
    column7Pile,
    cardDragging,
    isDeck,
    sendBack
  } = useSelector(({ GameBoard, Columns, Deck }: RootReducerState) => ({
    deckPile: GameBoard.deckPile,
    column1Pile: GameBoard.column1Pile,
    column2Pile: GameBoard.column2Pile,
    column3Pile: GameBoard.column3Pile,
    column4Pile: GameBoard.column4Pile,
    column5Pile: GameBoard.column5Pile,
    column6Pile: GameBoard.column6Pile,
    column7Pile: GameBoard.column7Pile,
    isDeck: !!Deck.cardDragging,
    sendBack: Columns.sendBack,
    cardDragging: Columns.cardDragging || Deck.cardDragging,
    cardDraggingPosition:
      Columns.cardDraggingPosition || Deck.cardDraggingPosition
  }));

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

  const getColumnToDrop = ({ x, y }: any) => {
    const innerWidth = window.innerWidth;

    const columnSizes = innerWidth / 7;
    const columnNumber = Math.ceil((x || 1) / columnSizes);

    return `column${columnNumber || 1}Pile`;
  };

  const onDrop = (card: any, monitor: any) => {
    const columnDropedTo = getColumnToDrop(monitor.getClientOffset());
    const finalColumn = document.getElementById(columnDropedTo);
    finalColumn?.setAttribute(
      "style",
      "transition: transform 0.2s; transform: scale(1);"
    );
    if (isDeck) {
      dispatch(
        columnsActions.addDraggingCardsToColumn(cardDragging, columnDropedTo)
      );
      dispatch(deckActions.resetCardDragging());
    } else {
      dispatch(columnsActions.swapColumns(columnDropedTo));
      dispatch(columnsActions.resetCardDragging());
    }
  };

  const [, drop] = useDrop({
    accept: "cardframe",
    drop: onDrop
  });

  useEffect(() => {
    if (sendBack === false) {
      deckActions.popFlippedCard();
    }
  }, [sendBack]);

  return (
    <div className="gameBoard" ref={drop}>
      <GamePlayInfo />
      <GameOptions />
      {/* empty spots */}
      <BoardEmptySpots />
      {/* top row of the game, includes the deck and the 4 goal spots */}
      <GameTopRow />
      {/* bottom row of the game, includes all the 7 columns */}
      <GameColumnWrapper />
      {/* preview of the card being dragged */}
      <CustomDragLayer />
    </div>
  );
}

export default memo(GameBoard);
