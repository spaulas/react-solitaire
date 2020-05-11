import React, { ReactNode, forwardRef, memo } from "react";
import CardFrame from "./CardFrame.component";
import { Col } from "antd";
import { RefAny } from "../../../global";

interface CardSpotProps {
  cardContainerColumns?: string;
  offset?: number;
  className?: string;
  children?: ReactNode;
}

function CardSpot(
  { offset, className, cardContainerColumns, children }: CardSpotProps,
  ref: RefAny
) {
  return (
    <Col span={3} offset={offset}>
      <CardFrame
        ref={ref}
        cardContainerClassName={cardContainerColumns}
        cardContentClassName={`cardSpot ${className ? className : ""}`}
      >
        {children}
      </CardFrame>
    </Col>
  );
}

export default memo(forwardRef(CardSpot));
