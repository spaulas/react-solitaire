import BarDisplay from "../UIComponents/BarDisplay.component";
import NewGameButton from "../Buttons/NewGameButton.component";
import PauseGameButton from "../Buttons/PauseGameButton.component";
import React from "react";
import RedoButton from "../Buttons/RedoButton.component";
import RestartGameButton from "../Buttons/RestartGameButton.component";
import { Row } from "antd";
import UndoButton from "../Buttons/UndoButton.component";

/* Will be the game options - to be developed */
function GameOptions() {
  return (
    <Row className="boardOptionsRow" align="middle" justify="center">
      <BarDisplay>
        <UndoButton />
        <NewGameButton />
        <PauseGameButton />
        <RestartGameButton />
        <RedoButton />
      </BarDisplay>
    </Row>
  );
}

export default GameOptions;
