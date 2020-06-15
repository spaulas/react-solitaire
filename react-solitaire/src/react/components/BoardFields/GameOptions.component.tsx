import NewGameButton from "../Options/NewGameButton.component";
import React from "react";
import RestartGameButton from "../Options/RestartGameButton.component";
import { Row } from "antd";

/* Will be the game options - to be developed */
function GameOptions() {
  return (
    <Row className="boardOptionsRow" align="middle" justify="center">
      <NewGameButton />
      <RestartGameButton />
    </Row>
  );
}

export default GameOptions;
