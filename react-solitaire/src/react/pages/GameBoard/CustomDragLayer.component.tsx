/* eslint-disable indent */
import { RefAny, RootReducerState } from "../../../global";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import { Col } from "antd";
import React from "react";
import { useDragLayer } from "react-dnd";
import { useSelector } from "react-redux";

/**
 * Custom "layer" for the drag event
 */
const CustomDragLayer = () => {
  // get necessary properties from the drag layer hook function
  const { itemType, isDragging, initialOffset, currentOffset } = useDragLayer(
    (monitor: RefAny) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging()
    })
  );

  // get the cards that are dragging from the redux (can be from the deck or form the columns)
  const { cardDragging } = useSelector(
    ({ Columns, Deck }: RootReducerState) => ({
      cardDragging: Columns.cardDragging || Deck.cardDragging || []
    })
  );

  // render cards components from the cards dragging array (flipped)
  const getCards = () => {
    const cardsArray = cardDragging.map((card: CardType) => {
      return (
        <div
          key={`cardframedraggable_${card.id}`}
          className="cardContainer cardContainerColumns"
        >
          <div className="cardAspectRatio">
            <div className="cardContent">
              <div className="cardDefault">
                <img
                  className="cardImage"
                  src={require(`../../../images/CardsFaces/${card.image}`)}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
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
          <Col span={3} className="deckPile">
            <div className="columnPile">
              <div className="cardPileContainer">{getCards()}</div>
            </div>
          </Col>
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
      WebkitTransform: transform
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
};

export default CustomDragLayer;
