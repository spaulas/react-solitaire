import { DownCircleFilled, UpCircleFilled } from "@ant-design/icons";
import React, { useState } from "react";
import { Row, Tooltip } from "antd";
import BarDisplay from "../BarDisplay/BarDisplay.component";
import HintButton from "../Buttons/HintButton.component";
import NewGameButton from "../Buttons/NewGameButton.component";
import PauseGameButton from "../Buttons/PauseGameButton.component";
import RedoButton from "../Buttons/RedoButton.component";
import RestartGameButton from "../Buttons/RestartGameButton.component";
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
            <Tooltip title="Hide options">
              <DownCircleFilled
                className="iconButton"
                onClick={() => setShowMore(false)}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Show more options">
              <UpCircleFilled
                className="iconButton"
                onClick={() => setShowMore(true)}
              />
            </Tooltip>
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
