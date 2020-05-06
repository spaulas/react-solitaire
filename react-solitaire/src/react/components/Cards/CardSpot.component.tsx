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
    isFlipped,
    cardId
  }: {
    cardContainerColumns?: string;
    offset?: number;
    className?: string;
    withColumn?: boolean;
    isFlipped?: boolean;
    cardId: number;
  },
  ref: RefAny
) {
  return withColumn ? (
    <Col span={3} offset={offset}>
      <CardFrame
        ref={ref}
        cardId={cardId}
        cardContainerClassName={cardContainerColumns}
        cardContentClassName={`cardSpot ${className ? className : ""}`}
      />
    </Col>
  ) : (
    <CardFrame
      ref={ref}
      cardId={cardId}
      isFlipped={isFlipped}
      cardContainerClassName={cardContainerColumns}
      cardContentClassName={`cardSpot ${className ? className : ""}`}
    />
  );
}

export default memo(forwardRef(CardSpot));
