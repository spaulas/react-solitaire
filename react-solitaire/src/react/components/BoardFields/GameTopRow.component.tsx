import React, { memo } from "react";
import Deck from "./Deck.component";
import GoalSpotWrapper from "./GoalSpotWrapper.component";
import { Row } from "antd";

function GameTopRow() {
  return (
    <Row gutter={6} className="boardDeckRow" align="middle">
      <Deck />
      <GoalSpotWrapper />
    </Row>
  );
}

export default memo(GameTopRow);