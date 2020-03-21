import { Col } from "antd";
import React from "react";

function CardSpot({ offset }: { offset?: number }) {
  return (
    <Col span={3} offset={offset}>
      <div className="cardSpotContainer">
        <div className="cardSpotAspectRatio">
          <div className="cardSpotContent" />
        </div>
      </div>
    </Col>
  );
}

export default CardSpot;
