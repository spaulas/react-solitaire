import GameColumn from "./GameColumn";
import React from "react";
import { Row } from "antd";

function GameColumnWrapper() {
  return (
    <Row gutter={6} className="gameColumnsRow" align="middle">
      <GameColumn offset={2} />
      <GameColumn />
      <GameColumn />
      <GameColumn />
      <GameColumn />
      <GameColumn />
      <GameColumn />
    </Row>
  );
}

export default GameColumnWrapper;
