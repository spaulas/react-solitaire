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
  onGrab?: (e: any) => void;
  onDrop?: (e: MouseEvent) => void;
  defaultPosition?: { x: number; y: number };
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
    onDrop,
    onGrab,
    defaultPosition
  }: CardFrameProps,
  ref: RefAny
) {
  return (
    <Draggable
      onStart={onGrab}
      defaultPosition={defaultPosition}
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
