/* eslint-disable react/forbid-dom-props */
import React, { ReactNode, forwardRef, memo, useState } from "react";
import Draggable from "react-draggable";
import { RefAny } from "../../../global";

interface CardFrameProps {
  cardContainerClassName?: string;
  cardContentClassName?: string;
  offset?: number;
  zIndex?: number;
  children?: ReactNode;
  isFlipped?: boolean;
}

function CardFrame(
  {
    cardContainerClassName,
    cardContentClassName,
    offset,
    children,
    zIndex = 1,
    isFlipped
  }: CardFrameProps,
  ref: RefAny
) {
  const [grabbing, setGrabbing] = useState(false);
  const onGrab = () => {
    setGrabbing(true);
  };
  const onDrop = () => {
    setGrabbing(false);
  };
  return (
    <Draggable onStart={onGrab} onStop={onDrop}>
      <div
        ref={ref}
        className={`cardContainer ${isFlipped ? "cardContainerFlipped" : ""} ${
          cardContainerClassName ? cardContainerClassName : ""
        }`}
      >
        <div className="cardAspectRatio" style={{ zIndex }}>
          <div
            className={`cardContent ${
              cardContentClassName ? cardContentClassName : ""
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </Draggable>
  );
}

export default memo(forwardRef(CardFrame));
