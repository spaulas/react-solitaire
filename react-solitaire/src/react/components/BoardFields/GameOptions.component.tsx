import BarDisplay from "../UIComponents/BarDisplay.component";
import HintButton from "../Buttons/HintButton.component";
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
        <RestartGameButton />
        <NewGameButton />
        <PauseGameButton />
        <HintButton />
        <RedoButton />
      </BarDisplay>
    </Row>
  );
}

export default GameOptions;
