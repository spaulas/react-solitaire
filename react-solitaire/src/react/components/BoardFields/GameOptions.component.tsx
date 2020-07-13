import { DownCircleFilled, UpCircleFilled } from "@ant-design/icons";
import React, { useState } from "react";
import { Row, Tooltip } from "antd";
import BarDisplay from "../BarDisplay/BarDisplay.component";
import { FormattedMessage } from "react-intl";
import HintButton from "../Buttons/HintButton.component";
import JoyrideSteps from "./GameOptionsJoyrideSteps.component";
import NewGameButton from "../Buttons/NewGameButton.component";
import PauseGameButton from "../Buttons/PauseGameButton.component";
import RedoButton from "../Buttons/RedoButton.component";
import RestartGameButton from "../Buttons/RestartGameButton.component";
import SaveGameButton from "../Buttons/SaveGameButton.component";
import UndoButton from "../Buttons/UndoButton.component";
import joyrideActions from "../../../redux/joyride/joyride.actions";
import { useDispatch } from "react-redux";

/* Will be the game options - to be developed */
function GameOptions() {
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);
  const handleShowMore = () => {
    setShowMore(true);
    // eslint-disable-next-line no-console
    console.log("STEPS = ", JoyrideSteps());
    dispatch(joyrideActions.initJoyride("gameOptions", JoyrideSteps()));
  };
  return (
    <>
      <Row className="boardMainOptionsRow" align="middle" justify="center">
        <BarDisplay>
          <UndoButton />
          <PauseGameButton />
          {showMore ? (
            <Tooltip title={<FormattedMessage id="btn.hide" />}>
              <DownCircleFilled
                className="iconButton"
                onClick={() => setShowMore(false)}
              />
            </Tooltip>
          ) : (
            <Tooltip title={<FormattedMessage id="btn.showMore" />}>
              <UpCircleFilled
                className="joyrideShowMore iconButton"
                onClick={handleShowMore}
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
