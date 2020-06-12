/* eslint-disable indent */
import React, { ReactElement, useEffect } from "react";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import columnActions from "../../../redux/columns/columns.actions";
import deckActions from "../../../redux/deck/deck.actions";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
const type = "cardframe";

interface DraggableCardProps {
  card: CardType; // card info
  nCards: number; // number of cards being dragged (this card and all bellow)
  children: ReactElement; // children components
}

/**
 * Component that adds the drag functionality to a card and the cards bellow it
 */
function DraggableCard({ card, nCards, children }: DraggableCardProps) {
  const dispatch = useDispatch();

  // useDrag will be responsible for making an element draggable. It also expose, isDragging method to add any styles while dragging
  const [, drag, preview] = useDrag({
    item: { type, card }, // item denotes the element type, unique identifier (id) and card info
    begin: () => onDrag(card) // call the onDrag function when dragging begins
  });

  // function called when a card starts being dragged
  const onDrag = (card: CardType) => {
    // if it is a card from the deck pile, then call the deck action that saves what is being dragged
    if (card.cardField === "deckPile") {
      dispatch(deckActions.dragFlippedCard());
    } else {
      // if it is a card from the dolumns, then call the column action that saves what is being dragged
      dispatch(columnActions.dragColumnCards(nCards, card.cardField));
    }
  };

  // adds preview to the drag event
  const getPreviewImage = () => {
    preview(getEmptyImage(), { captureDraggingState: true });
  };

  // on component did mount, call the getPreviewImage function
  useEffect(getPreviewImage, []);

  // return the card component with the ref of the drag event
  return children
    ? React.cloneElement(children, {
        ref: drag
      })
    : null;
}

export default DraggableCard;
