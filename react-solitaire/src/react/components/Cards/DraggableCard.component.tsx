import { ExplicitAny, RootReducerState } from "../../../global";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardFrame from "./CardFrame.component";
import CardImage from "./CardImage.component";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import columnActions from "../../../redux/columns/columns.actions";
import deckActions from "../../../redux/deck/deck.actions";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useDrag } from "react-dnd";
const type = "cardframe";

interface DraggableCardProps {
  card: CardType; // card info
  nCards: number; // number of cards being dragged (this card and all bellow)
  index?: number;
}

/**
 * Component that adds the drag functionality to a card and the cards bellow it
 */
function DraggableCard({ card, nCards, index = 0 }: DraggableCardProps) {
  const dispatch = useDispatch();

  // get the cards that are dragging from the redux (can be from the deck or form the columns)
  const { cardDragging } = useSelector(
    ({ Columns, Deck, Goal }: RootReducerState) => ({
      cardDragging:
        Columns.cardDragging || Deck.cardDragging || Goal.cardDragging || []
    })
  );

  // useDrag will be responsible for making an element draggable. It also expose, isDragging method to add any styles while dragging
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type, card }, // item denotes the element type, unique identifier (id) and card info
    begin: () => onDrag(card), // call the onDrag function when dragging begins
    collect: (monitor: ExplicitAny) => ({
      isDragging: monitor.isDragging()
    })
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

  // a card should be hidden, if it is dragging or if it is inside the cardDragging array
  const hideCard =
    isDragging ||
    (card.cardField.indexOf("column") === 0 && cardDragging.includes(card));

  // return the card component with the ref of the drag event
  return (
    <CardFrame
      ref={drag}
      cardContainerClassName={`${index > 0 ? "cardContainerColumns" : ""}`}
      zIndex={999}
      isFlipped
    >
      <CardImage
        additionalClassName={hideCard ? "cardIsDragging" : ""}
        directory="CardsFaces"
        image={card.image}
      />
    </CardFrame>
  );
}

export default DraggableCard;
