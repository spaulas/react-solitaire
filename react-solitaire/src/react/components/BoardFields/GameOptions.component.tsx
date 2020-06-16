import BarDisplay from "../UIComponents/BarDisplay.component";
import NewGameButton from "../Buttons/NewGameButton.component";
import PauseGameButton from "../Buttons/PauseGameButton.component";
import React from "react";
import RestartGameButton from "../Buttons/RestartGameButton.component";
import { Row } from "antd";

/* Will be the game options - to be developed */
function GameOptions() {
  return (
    <Row className="boardOptionsRow" align="middle" justify="center">
      <BarDisplay>
        <NewGameButton />
        <PauseGameButton />
        <RestartGameButton />
      </BarDisplay>
    </Row>
  );
}

export default GameOptions;
