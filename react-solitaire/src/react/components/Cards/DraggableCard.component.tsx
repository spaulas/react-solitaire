/* eslint-disable no-console */
import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDragLayer } from "react-dnd";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import { RootReducerState } from "../../../global";
import columnActions from "../../../redux/columns/columns.actions";
import deckActions from "../../../redux/deck/deck.actions";
import { getEmptyImage } from "react-dnd-html5-backend";
const type = "cardframe";

const DraggableCard = ({
  children,
  card
}: {
  children: ReactElement;
  card: CardType;
}) => {
  const dispatch = useDispatch();

  const { cardDragging, cardDraggingPosition, isDeck, sendBack } = useSelector(
    ({ Columns, Deck }: RootReducerState) => ({
      isDeck: !!Deck.cardDragging,
      sendBack: Columns.sendBack,
      cardDragging: Columns.cardDragging || Deck.cardDragging,
      cardDraggingPosition:
        Columns.cardDraggingPosition || Deck.cardDraggingPosition
    })
  );

  const onDrag = (card: CardType) => {
    console.log("it has stardted ! internameMonitor item ", card);
    // @todo for now is only one card at a time!!!!
    // @todo is only possible for the first column yet!!!
    // will "save" the cards that are being dragged
    dispatch(columnActions.dragColumnCards(1, "column1Pile"));
  };

  const getColumnToDrop = ({ x, view }: MouseEvent) => {
    const innerWidth = view?.innerWidth || 1080;

    const columnSizes = innerWidth / 7;
    const columnNumber = Math.ceil((x || 1) / columnSizes);

    return `column${columnNumber || 1}Pile`;
  };

  const onDrop = (e: any) => {
    console.log("-- DRAGGING IS OVER", e);
    const columnDropedTo = "column2Pile"; // getColumnToDrop(e);
    const finalColumn = document.getElementById(columnDropedTo);
    finalColumn?.setAttribute(
      "style",
      "transition: transform 0.2s; transform: scale(1);"
    );
    // setColumnScaled("");
    if (isDeck) {
      dispatch(
        columnActions.addDraggingCardsToColumn(cardDragging, columnDropedTo)
      );
    } else {
      dispatch(columnActions.swapColumns(columnDropedTo, 1));
      dispatch(columnActions.resetCardDragging());
    }
  };

  // useDrag will be responsible for making an element draggable. It also expose, isDragging method to add any styles while dragging
  const [{ isDragging }, drag, preview] = useDrag({
    // item denotes the element type, unique identifier (id) and the index (position)
    item: { type, card },
    begin: () => onDrag(card),
    end: onDrop,
    // collect method is like an event listener, it monitors whether the element is dragged and expose that information
    collect: (monitor: any) => {
      // console.log("COLLECT = ", monitor);
      return {
        isDragging: monitor.isDragging()
      };
    }
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return children ? React.cloneElement(children, { ref: drag }) : null;
};

export default DraggableCard;
