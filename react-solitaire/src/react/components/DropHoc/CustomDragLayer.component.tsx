/* eslint-disable indent */
import { CardFrame, CardImage } from "../Cards/Cards.items";
import { ExplicitAny, RootReducerState } from "../../../global";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import React from "react";
import { SimplePile } from "../Piles/Piles.items";
import { useDragLayer } from "react-dnd";
import { useSelector } from "react-redux";

/**
 * Custom "layer" for the drag event
 */
function CustomDragLayer() {
  // get necessary properties from the drag layer hook function
  const { itemType, isDragging, initialOffset, currentOffset } = useDragLayer(
    (monitor: ExplicitAny) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging()
    })
  );

  // get the cards that are dragging from the redux (can be from the deck or form the columns)
  const { cardDragging } = useSelector(
    ({ Columns, Deck, Goal }: RootReducerState) => ({
      cardDragging:
        Columns.cardDragging || Deck.cardDragging || Goal.cardDragging || []
    })
  );

  // render cards components from the cards dragging array (flipped)
  const getCards = () => {
    const cardsArray = cardDragging.map((card: CardType) => {
      return (
        <CardFrame
          key={`cardframedraggable_${card.id}`}
          cardContainerClassName="cardContainerColumns"
        >
          <CardImage directory="CardsFaces" image={card.image} />
        </CardFrame>
      );
    });
    return cardsArray;
  };

  // render the item as a column, because more than one card can be dragged
  // eslint-disable-next-line react/no-multi-comp
  const renderItem = () => {
    switch (itemType) {
      case "cardframe":
        return (
          <SimplePile
            pileId="dragging"
            getCards={getCards}
            pileClassName="deckPile"
            insideClassName="columnPile"
          />
        );
      default:
        return null;
    }
  };

  // get the style for the draggable component according to its movement
  const getItemStyles = (
    initialOffset?: string,
    currentOffset?: { x: number; y: number }
  ) => {
    if (!initialOffset || !currentOffset) {
      return {
        display: "none"
      };
    }
    const { x, y } = currentOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return {
      transform,
      WebkitTransform: transform,
      marginTop: "-30px"
    };
  };

  // if there are no cards dragging, simply return null
  if (!isDragging) {
    return null;
  }

  // if not, then return the proper rendered components
  return (
    <div className="dragLayer">
      {/* eslint-disable-next-line react/forbid-dom-props */}
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {renderItem()}
      </div>
    </div>
  );
}

export default CustomDragLayer;
