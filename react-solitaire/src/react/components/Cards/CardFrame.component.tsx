/* eslint-disable no-console */
/* eslint-disable react/forbid-dom-props */
import React, { ReactNode, forwardRef, memo, useState } from "react";
import Draggable from "react-draggable";
import { RefAny } from "../../../global";
import { getColumnToDrop } from "./Cards.utils";

interface CardFrameProps {
  cardContainerClassName?: string;
  cardContentClassName?: string;
  offset?: number;
  zIndex?: number;
  children?: ReactNode;
  isFlipped?: boolean;
  cardId: number;
}

function CardFrame(
  {
    cardContainerClassName,
    cardContentClassName,
    offset,
    children,
    zIndex = 1,
    isFlipped,
    cardId
  }: CardFrameProps,
  ref: RefAny
) {
  const [grabbing, setGrabbing] = useState(false);
  const onGrab = (e: any) => {
    console.log("ON GRAB = ", e);
    setGrabbing(true);
  };
  const onDrop = (e: any) => {
    console.log("ON DROP = ", e);
    setGrabbing(false);
    getColumnToDrop(cardId, e);
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
