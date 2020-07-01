/* eslint-disable indent */
import { ExplicitAny, RootReducerState } from "../../../../global";
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardFrame from "../../Cards/CardFrame.component";
import CardImage from "../../Cards/CardImage.component";
import { CardType } from "../../../../redux/gameBoard/gameBoard.types";
import columnsActions from "../../../../redux/columns/columns.actions";
import deckActions from "../../../../redux/deck/deck.actions";
import { getEmptyImage } from "react-dnd-html5-backend";
import goalActions from "../../../../redux/goal/goal.actions";
import { useDrag } from "react-dnd";
const type = "cardframe";

interface DraggableCardProps {
  card: CardType; // card info
  nCards: number; // number of cards being dragged (this card and all bellow)
  onDoubleClick?: () => void; // function called when card is double clicked
  index?: number;
}

/**
 * Component that adds the drag functionality to a card and the cards bellow it
 */
function DraggableCard({
  card,
  nCards,
  onDoubleClick,
  index = 0
}: DraggableCardProps) {
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
    switch (card.cardField) {
      case "deckPile":
        dispatch(deckActions.dragFlippedCard());
        break;
      case "goal1Pile":
      case "goal2Pile":
      case "goal3Pile":
      case "goal4Pile":
        // if it is a card from the columns, then call the column action that saves what is being dragged
        dispatch(goalActions.dragGoalCards(card.cardField));
        break;
      default:
        // if it is a card from the columns, then call the column action that saves what is being dragged
        dispatch(columnsActions.dragColumnCards(card.cardField, nCards));
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
      onDoubleClick={onDoubleClick}
      cardContainerClassName={`${index > 0 ? "cardContainerColumns" : ""}`}
      zIndex={999}
    >
      <CardImage
        additionalClassName={hideCard ? "cardIsDragging" : ""}
        directory="CardsFaces"
        image={card.image}
      />
    </CardFrame>
  );
}

export default memo(DraggableCard);
