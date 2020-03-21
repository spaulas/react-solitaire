import Deck from "./Deck";
import GoalSpotWrapper from "./GoalSpotWrapper";
import React from "react";
import { Row } from "antd";

function GamePlayInfo() {
  return (
    <Row className="boardDeckRow" align="middle">
      <Deck />
      <GoalSpotWrapper />
    </Row>
  );
}

export default GamePlayInfo;
