/* eslint-disable react/forbid-dom-props */
import React, { ReactNode, forwardRef, memo } from "react";
import { RefAny } from "../../../global";

interface CardFrameProps {
  className?: string;
  offset?: number;
  zIndex?: number;
  children?: ReactNode;
  isFlipped?: boolean;
}

function CardFrame(
  { className, offset, children, zIndex = 1, isFlipped }: CardFrameProps,
  ref: RefAny
) {
  return (
    <div
      ref={ref}
      className={`cardContainer ${isFlipped ? "cardContainerFlipped" : ""}`}
    >
      <div className="cardAspectRatio" style={{ zIndex }}>
        <div className={`cardContent ${className ? className : ""}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default memo(forwardRef(CardFrame));
