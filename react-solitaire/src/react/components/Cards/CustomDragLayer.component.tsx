/* eslint-disable react/forbid-dom-props */
/* eslint-disable indent */
/* eslint-disable react/no-multi-comp */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardType } from "../../../redux/gameBoard/gameBoard.types";
import { Col } from "antd";
import React from "react";
import { RootReducerState } from "../../../global";
import { useDragLayer } from "react-dnd";
import { useSelector } from "react-redux";

const layerStyles = {
  position: "fixed" as const,
  pointerEvents: "none" as const,
  zIndex: 100,
  left: 0,
  top: 0,
  width: "100%" as const,
  height: "100%" as const
};

function getItemStyles(
  initialOffset?: string,
  currentOffset?: { x: number; y: number }
) {
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
}

const CustomDragLayer = () => {
  const {
    itemType,
    isDragging,
    // item,
    initialOffset,
    currentOffset
  } = useDragLayer((monitor: any) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }));

  const { cardDragging } = useSelector(
    ({ Columns, Deck }: RootReducerState) => ({
      cardDragging: Columns.cardDragging || Deck.cardDragging || []
    })
  );

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

  function renderItem() {
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
  }
  if (!isDragging) {
    return null;
  }
  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {renderItem()}
      </div>
    </div>
  );
};

export default CustomDragLayer;
