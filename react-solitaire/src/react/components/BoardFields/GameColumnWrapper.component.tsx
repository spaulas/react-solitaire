import ColumnPile from "../Piles/ColumnPile.component";
import React from "react";
import { Row } from "antd";

function GameColumnWrapper() {
  return (
    <Row gutter={6} className="gameColumnsRow" align="middle">
      <ColumnPile offset={2} />
      <ColumnPile />
      <ColumnPile />
      <ColumnPile />
      <ColumnPile />
      <ColumnPile />
      <ColumnPile />
    </Row>
  );
}

export default GameColumnWrapper;
