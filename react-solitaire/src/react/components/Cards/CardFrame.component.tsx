/* eslint-disable no-console */
/* eslint-disable react/forbid-dom-props */
import React, { ReactNode, forwardRef, memo } from "react";
import Draggable from "react-draggable";
import { RefAny } from "../../../global";

interface CardFrameProps {
  cardContainerClassName?: string;
  cardContentClassName?: string;
  offset?: number;
  zIndex?: number;
  children?: ReactNode;
  isFlipped?: boolean;
  cardId: number;
  onDrop?: (e: MouseEvent) => void;
}

function CardFrame(
  {
    cardContainerClassName,
    cardContentClassName,
    offset,
    children,
    zIndex = 1,
    isFlipped,
    cardId,
    onDrop
  }: CardFrameProps,
  ref: RefAny
) {
  const onGrab = (e: any) => {
    console.log("ON GRAB = ", e);
  };
  return (
    <Draggable
      onStart={onGrab}
      onStop={(e: any) => (onDrop ? onDrop(e) : console.log("dropping"))}
    >
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
