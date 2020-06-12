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
import CustomDragLayer from "./CustomDragLayer.component";
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

  // get the column the card was dropped to
  const getColumnToDrop = ({ x, y }: ExplicitAny) => {
    const innerWidth = window.innerWidth;

    const columnSizes = innerWidth / 7;
    const columnNumber = Math.ceil((x || 1) / columnSizes);

    return `column${columnNumber || 1}Pile`;
  };

  // handle the drop of a card
  const onDrop = (card: ExplicitAny, monitor: ExplicitAny) => {
    // get the id of the column the card is going to
    const columnDropedTo = getColumnToDrop(monitor.getClientOffset());

    // if it was a deck move
    if (isDeck) {
      // call the column action that adds the dragging cards to the column
      dispatch(
        columnsActions.addDraggingCardsToColumn(cardDragging, columnDropedTo)
      );
      // then reset the values at the deck redux
      dispatch(deckActions.resetCardDragging());
    } else {
      // if it was a column swap, then swap the cards from one column to the other
      dispatch(columnsActions.swapColumns(columnDropedTo));
      // then reset
      dispatch(columnsActions.resetCardDragging());
    }
  };

  // handle a deck exchange
  useEffect(() => {
    if (sendBack === false) {
      deckActions.popFlippedCard();
    }
  }, [sendBack]);

  // create drop reference and associate functions
  const [, drop] = useDrop({
    accept: "cardframe",
    drop: onDrop
  });

  // ---------------------------------------------------------

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
