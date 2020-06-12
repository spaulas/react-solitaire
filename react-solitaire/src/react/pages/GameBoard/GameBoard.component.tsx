/* eslint-disable no-console */
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
    cardDragging,
    isDeck,
    isGoal,
    sendBack,
    sendBackGoal,
    sendBackDeck
  } = useSelector(({ GameBoard, Columns, Deck, Goal }: RootReducerState) => ({
    deckPile: GameBoard.deckPile,
    column1Pile: GameBoard.column1Pile,
    column2Pile: GameBoard.column2Pile,
    column3Pile: GameBoard.column3Pile,
    column4Pile: GameBoard.column4Pile,
    column5Pile: GameBoard.column5Pile,
    column6Pile: GameBoard.column6Pile,
    column7Pile: GameBoard.column7Pile,
    isDeck: !!Deck.cardDragging,
    isGoal: !!Goal.cardDragging,
    sendBack: Columns.sendBack,
    sendBackGoal: Goal.sendBack,
    sendBackDeck: Deck.sendBack,
    cardDragging: Columns.cardDragging || Deck.cardDragging || Goal.cardDragging
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
    // get page dimension
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    // get column size
    const columnSizes = innerWidth / 7;

    // should drop in one of the goal spots
    if (y < innerHeight / 3.8) {
      if (x > columnSizes * 3) {
        const goalNumber = Math.ceil((x || 1) / columnSizes) - 3;
        return `goal${goalNumber || 1}Pile`;
      }
      // any other result is invalid
      return undefined;
    } else {
      // should drop in a column pile
      const columnNumber = Math.ceil((x || 1) / columnSizes);
      return `column${columnNumber || 1}Pile`;
    }
  };

  // handle the drop of a card
  const onDrop = (card: ExplicitAny, monitor: ExplicitAny) => {
    // get the id of the column the card is going to
    const columnDropedTo = getColumnToDrop(monitor.getClientOffset());

    if (!!columnDropedTo) {
      // if the card came from the deck
      if (isDeck) {
        if (columnDropedTo.indexOf("column") === 0) {
          // call the column action that adds the dragging cards to the column
          dispatch(
            columnsActions.addDraggingCardsToColumn(
              cardDragging,
              columnDropedTo
            )
          );
        } else {
          // call the goal action that adds the dragging cards to the goal
          dispatch(
            goalActions.addDraggingCardsToGoal(cardDragging, columnDropedTo)
          );
        }
        // then reset the values at the deck redux
        dispatch(deckActions.resetCardDragging());
      } else if (isGoal) {
        // if the cards came from the goal piles
        console.log("IS GOAL!");
        // should handle go to column and go to another goal pile
      } else {
        if (columnDropedTo.indexOf("column") === 0) {
          // if it was a column swap, then swap the cards from one column to the other
          dispatch(columnsActions.swapColumns(columnDropedTo));
          // then reset
          dispatch(columnsActions.resetCardDragging());
        } else {
          // call the goal action that adds the dragging cards to the goal
          dispatch(
            goalActions.addDraggingCardsToGoal(cardDragging, columnDropedTo)
          );
        }
      }
    }
  };

  // handle a deck exchange
  const removeDeckCard = () => {
    if (sendBack === false) {
      dispatch(deckActions.removeFlippedCard());
      dispatch(columnsActions.resetCardDragging());
    }
  };
  // when the sendBack card changes, check if it is false
  useEffect(removeDeckCard, [sendBack]);

  // handle a column to goal exchange
  const removeColumnCard = () => {
    if (sendBackGoal === false) {
      if (isDeck) {
        dispatch(deckActions.removeFlippedCard());
      } else {
        dispatch(columnsActions.removeCard());
      }
    }
    dispatch(goalActions.resetCardDragging());
  };
  // when the sendBack card changes, check if it is false
  useEffect(removeColumnCard, [sendBackGoal]);

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
