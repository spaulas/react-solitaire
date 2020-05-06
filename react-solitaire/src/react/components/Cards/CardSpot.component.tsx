import React, { forwardRef, memo } from "react";
import CardFrame from "./CardFrame.component";
import { Col } from "antd";
import { RefAny } from "../../../global";

function CardSpot(
  {
    offset,
    className,
    cardContainerColumns,
    withColumn = true,
    isFlipped
  }: {
    cardContainerColumns?: string;
    offset?: number;
    className?: string;
    withColumn?: boolean;
    isFlipped?: boolean;
  },
  ref: RefAny
) {
  return withColumn ? (
    <Col span={3} offset={offset}>
      <CardFrame
        ref={ref}
        cardContainerClassName={cardContainerColumns}
        cardContentClassName={`cardSpot ${className ? className : ""}`}
      />
    </Col>
  ) : (
    <CardFrame
      ref={ref}
      isFlipped={isFlipped}
      cardContainerClassName={cardContainerColumns}
      cardContentClassName={`cardSpot ${className ? className : ""}`}
    />
  );
}

export default memo(forwardRef(CardSpot));
