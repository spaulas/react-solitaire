/* eslint-disable react/forbid-dom-props */
import React, { ReactNode, forwardRef, memo } from "react";
import { ExplicitAny } from "../../../global";

interface CardFrameProps {
  onDoubleClick?: () => void; // function called when card is double clicked
  cardContainerClassName?: string; // additional classname for the container
  cardContentClassName?: string; // additional classname for the content
  children?: ReactNode; // children
  shake?: boolean;
  increase?: boolean;
}

/**
 * Component that renders the cards with a proper size, adjusting to the screen size
 */
function CardFrame(
  {
    onDoubleClick,
    cardContainerClassName = "",
    cardContentClassName = "",
    shake,
    increase,
    children
  }: CardFrameProps,
  ref: ExplicitAny
) {
  return (
    <div
      ref={ref}
      className={`cardContainer ${cardContainerClassName} ${
        shake ? "shakeAnimation" : ""
      } ${increase ? "increaseAnimation" : ""}`}
      onDoubleClick={() => onDoubleClick !== undefined && onDoubleClick()}
    >
      {/* eslint-disable-next-line react/forbid-dom-props */}
      <div className="cardAspectRatio">
        <div className={`cardContent ${cardContentClassName}`}>{children}</div>
      </div>
    </div>
  );
}

export default memo(forwardRef(CardFrame));
