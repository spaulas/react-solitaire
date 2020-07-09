import { DownCircleFilled, UpCircleFilled } from "@ant-design/icons";
import React, { useState } from "react";
import BarDisplay from "../BarDisplay/BarDisplay.component";
import HintButton from "../Buttons/HintButton.component";
import NewGameButton from "../Buttons/NewGameButton.component";
import PauseGameButton from "../Buttons/PauseGameButton.component";
import RedoButton from "../Buttons/RedoButton.component";
import RestartGameButton from "../Buttons/RestartGameButton.component";
import { Row } from "antd";
import SaveGameButton from "../Buttons/SaveGameButton.component";
import UndoButton from "../Buttons/UndoButton.component";

/* Will be the game options - to be developed */
function GameOptions() {
  const [showMore, setShowMore] = useState(false);
  return (
    <>
      <Row className="boardMainOptionsRow" align="middle" justify="center">
        <BarDisplay>
          <UndoButton />
          <PauseGameButton />
          {showMore ? (
            <DownCircleFilled
              className="iconButton"
              onClick={() => setShowMore(false)}
            />
          ) : (
            <UpCircleFilled
              className="iconButton"
              onClick={() => setShowMore(true)}
            />
          )}
          <HintButton />
          <RedoButton />
        </BarDisplay>
      </Row>

      {showMore ? (
        <Row className="boardMenuOptionsRow" align="middle" justify="center">
          <BarDisplay>
            <RestartGameButton />
            <NewGameButton />
            <SaveGameButton />
          </BarDisplay>
        </Row>
      ) : null}
    </>
  );
}

export default GameOptions;
