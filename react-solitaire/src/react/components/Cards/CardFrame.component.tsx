/* eslint-disable react/forbid-dom-props */
import React, { ReactNode, forwardRef, memo } from "react";
import Draggable from "react-draggable";
import { RefAny } from "../../../global";

interface CardFrameProps {
  cardContainerClassName?: string;
  cardContentClassName?: string;
  offset?: number;
  zIndex?: number;
  isFlipped?: boolean;
  cardId?: number;
  onGrab?: (e: RefAny) => void;
  onDrop?: (e: MouseEvent) => void;
  defaultPosition?: { x: number; y: number };
  children?: ReactNode;
}

function CardFrame(
  {
    cardContainerClassName,
    cardContentClassName,
    /* offset, */
    children,
    zIndex = 1,
    isFlipped,
    /* cardId, */
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
      // eslint-disable-next-line no-console
      onStop={(e: RefAny) => (onDrop ? onDrop(e) : console.log("dropping"))}
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
