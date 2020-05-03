import React, { ReactNode, forwardRef, memo } from "react";
import { RefAny } from "../../../global";

interface CardFrameProps {
  className?: string;
  offset?: number;
  children?: ReactNode;
}

function CardFrame(
  { className, offset, children }: CardFrameProps,
  ref: RefAny
) {
  return (
    <div ref={ref} className="cardContainer">
      <div className="cardAspectRatio">
        <div className={`cardContent ${className}`}>{children}</div>
      </div>
    </div>
  );
}

export default memo(forwardRef(CardFrame));
