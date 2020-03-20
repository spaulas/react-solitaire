import CardSpot from "../Cards/CardSpot";
import React from "react";
import { Row } from "antd";

function GameBoard() {
  return (
    <div className="gameBoard">
      <Row className="boardInfoRow" align="middle"></Row>
      <Row className="boardDeckRow" align="middle">
        <CardSpot offset={2} />
        <CardSpot />
        <CardSpot offset={3} />
        <CardSpot />
        <CardSpot />
        <CardSpot />
      </Row>
      <Row gutter={6} className="gameColumnsRow" align="middle">
        <CardSpot offset={2} />
        <CardSpot />
        <CardSpot />
        <CardSpot />
        <CardSpot />
        <CardSpot />
        <CardSpot />
      </Row>
      <Row className="boardOptionsRow" align="middle"></Row>
    </div>
  );
}

export default GameBoard;
