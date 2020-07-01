import React, { ReactNode, forwardRef, memo } from "react";
import { ExplicitAny } from "../../../global";

interface CardFrameProps {
  onDoubleClick?: () => void; // function called when card is double clicked
  cardContainerClassName?: string; // additional classname for the container
  cardContentClassName?: string; // additional classname for the content
  zIndex?: number; // z-index to be applied
  children?: ReactNode; // children
}

/**
 * Component that renders the cards with a proper size, adjusting to the screen size
 */
function CardFrame(
  {
    onDoubleClick,
    cardContainerClassName = "",
    cardContentClassName = "",
    zIndex = 1,
    children
  }: CardFrameProps,
  ref: ExplicitAny
) {
  return (
    <div
      ref={ref}
      className={`cardContainer ${cardContainerClassName}`}
      onDoubleClick={() => onDoubleClick !== undefined && onDoubleClick()}
    >
      {/* eslint-disable-next-line react/forbid-dom-props */}
      <div className="cardAspectRatio" style={{ zIndex }}>
        <div className={`cardContent ${cardContentClassName}`}>{children}</div>
      </div>
    </div>
  );
}

export default memo(forwardRef(CardFrame));
