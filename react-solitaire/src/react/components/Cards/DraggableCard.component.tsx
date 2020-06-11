/* eslint-disable react/forbid-dom-props */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { ReactElement, useEffect } from "react";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import columnActions from "../../../redux/columns/columns.actions";
import deckActions from "../../../redux/deck/deck.actions";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
const type = "cardframe";

const DraggableCard = ({
  children,
  card,
  nCards
}: {
  children: ReactElement;
  card: CardType;
  nCards: number;
}) => {
  const dispatch = useDispatch();

  const onDrag = (card: CardType) => {
    if (card.cardField === "deckPile") {
      dispatch(deckActions.dragFlippedCard());
    } else {
      // will "save" the cards that are being dragged
      dispatch(columnActions.dragColumnCards(nCards, card.cardField));
    }
  };

  // useDrag will be responsible for making an element draggable. It also expose, isDragging method to add any styles while dragging
  const [, /* 
    {
       isDragging 
    } */ drag, preview] = useDrag({
    // item denotes the element type, unique identifier (id) and the index (position)
    item: { type, card },
    begin: () => onDrag(card),
    // collect method is like an event listener, it monitors whether the element is dragged and expose that information
    collect: (monitor: any) => {
      return {
        isDragging: monitor.isDragging()
      };
    }
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* const getStyles = (isDragging: boolean) => {
    return {
      // IE fallback: hide the real node using CSS when dragging
      // because IE will ignore our custom "empty image" drag preview.
      opacity: isDragging ? 0.5 : 1
    };
  }; */

  return children
    ? React.cloneElement(children, {
        ref: drag
      })
    : null;
};

export default DraggableCard;
