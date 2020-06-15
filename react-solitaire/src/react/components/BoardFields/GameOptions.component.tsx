import NewGameButton from "../Options/NewGameButton.component";
import React from "react";
import { Row } from "antd";

/* Will be the game options - to be developed */
function GameOptions() {
  return (
    <Row className="boardOptionsRow" align="middle" justify="center">
      <NewGameButton />
    </Row>
  );
}

export default GameOptions;
