import React from "react";
import { Row } from "antd";
import Timer from "../DataDisplay/Timer.component";

/* Will display the game info - to be developed */
function GamePlayInfo() {
  return (
    <Row className="boardInfoRow" align="middle" justify="center">
      <Timer />
    </Row>
  );
}

export default GamePlayInfo;
