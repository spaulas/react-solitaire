/* eslint-disable react/forbid-dom-props */
/* eslint-disable no-console */
/* eslint-disable indent */
/* eslint-disable react/no-multi-comp */
import CardPreview from "./CardPreview.component";
import React from "react";
import { useDragLayer } from "react-dnd";

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
    item,
    initialOffset,
    currentOffset
  } = useDragLayer((monitor: any) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }));

  function renderItem() {
    switch (itemType) {
      case "cardframe":
        return <CardPreview card={item.card} />;
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
