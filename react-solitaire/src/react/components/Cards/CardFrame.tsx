import React, { ReactNode, forwardRef, memo } from "react";
import { Col } from "antd";
import { RefAny } from "../../../global";

interface CardFrameProps {
  offset?: number;
  className?: string;
  children?: ReactNode;
}

function CardFrame(
  { offset, className, children }: CardFrameProps,
  ref: RefAny
) {
  return (
    <Col span={3} offset={offset}>
      <div ref={ref} className="cardContainer">
        <div className="cardAspectRatio">
          <div className={`cardContent ${className}`}>{children}</div>
        </div>
      </div>
    </Col>
  );
}

export default memo(forwardRef(CardFrame));
