/* eslint-disable react/forbid-dom-props */
import React, { ReactNode, forwardRef, memo } from "react";
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
  return (
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
  );
}

export default memo(forwardRef(CardFrame));
