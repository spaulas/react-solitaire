import React, { ReactNode, forwardRef, memo } from "react";
import { RefAny } from "../../../global";

interface CardFrameProps {
  cardContainerClassName?: string; // additional classname for the container
  cardContentClassName?: string; // additional classname for the content
  zIndex?: number; // z-index to be applied
  isFlipped?: boolean; // true if card is flipped
  children?: ReactNode; // children
}

/**
 * Component that renders the cards with a proper size, adjusting to the screen size
 */
function CardFrame(
  {
    cardContainerClassName = "",
    cardContentClassName = "",
    zIndex = 1,
    isFlipped,
    children
  }: CardFrameProps,
  ref: RefAny
) {
  return (
    <div
      ref={ref}
      className={`cardContainer ${
        isFlipped ? "cardContainerFlipped" : ""
      } ${cardContainerClassName}`}
    >
      {/* eslint-disable-next-line react/forbid-dom-props */}
      <div className="cardAspectRatio" style={{ zIndex }}>
        <div className={`cardContent ${cardContentClassName}`}>{children}</div>
      </div>
    </div>
  );
}

export default memo(forwardRef(CardFrame));
