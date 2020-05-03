/* eslint-disable react/forbid-dom-props */
import React, { ReactNode, forwardRef, memo } from "react";
import { RefAny } from "../../../global";

interface CardFrameProps {
  className?: string;
  offset?: number;
  zIndex?: number;
  children?: ReactNode;
}

function CardFrame(
  { className, offset, children, zIndex }: CardFrameProps,
  ref: RefAny
) {
  return (
    <div ref={ref} className="cardContainer">
      <div className="cardAspectRatio" style={{ zIndex }}>
        <div className={`cardContent ${className}`}>{children}</div>
      </div>
    </div>
  );
}

export default memo(forwardRef(CardFrame));
