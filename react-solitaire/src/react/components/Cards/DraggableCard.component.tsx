/* eslint-disable no-console */
import { DragPreviewImage, useDrag } from "react-dnd";
import React, { ReactElement } from "react";
import { CardType } from "../../../redux/gameBoard/gameBoard.types";

const type = "cardframe";

const DraggableCard = ({
  children,
  card
}: {
  children: ReactElement;
  card: CardType;
}) => {
  // useDrag will be responsible for making an element draggable. It also expose, isDragging method to add any styles while dragging
  const [{ isDragging }, drag, preview] = useDrag({
    // item denotes the element type, unique identifier (id) and the index (position)
    item: { type, card },
    // collect method is like an event listener, it monitors whether the element is dragged and expose that information
    collect: (monitor: any) => {
      // console.log("COLLECT = ", monitor);
      return {
        isDragging: monitor.isDragging()
      };
    }
  });

  return (
    <>
      <DragPreviewImage
        connect={preview}
        src={`../../../images/CardsFaces/${card.image}`}
      />
      {children && React.cloneElement(children, { ref: drag })}
    </>
  );
};

export default DraggableCard;
