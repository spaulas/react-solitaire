import Deck from "./Deck";
import GoalSpotWrapper from "./GoalSpotWrapper";
import React from "react";
import { Row } from "antd";

function GameTopRow() {
  return (
    <Row gutter={6} className="boardDeckRow" align="middle">
      <Deck />
      <GoalSpotWrapper />
    </Row>
  );
}

export default GameTopRow;
