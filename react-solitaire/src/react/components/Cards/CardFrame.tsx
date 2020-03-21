import React, { PropsWithChildren } from "react";
import { Col } from "antd";

interface CardFrameProps {
  offset?: number;
  className?: string;
}

function CardFrame({
  offset,
  className,
  children
}: PropsWithChildren<CardFrameProps>) {
  return (
    <Col span={3} offset={offset}>
      <div className="cardContainer">
        <div className="cardAspectRatio">
          <div className={`cardContent ${className}`}>{children}</div>
        </div>
      </div>
    </Col>
  );
}

export default CardFrame;
