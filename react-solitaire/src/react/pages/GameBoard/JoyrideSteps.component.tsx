import { FormattedMessage } from "react-intl";
import React from "react";

function JoyrideSteps() {
  return [
    // Main page step
    {
      content: (
        <h3>
          <FormattedMessage id="joyride.game.step01" />
        </h3>
      ),
      disableBeacon: true,
      spotlightClicks: false,
      target: ".joyrideGamePage",
      placement: "center" as const
    },
    // Deck pile step
    {
      content: (
        <h3>
          <FormattedMessage id="joyride.game.step02" />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideDeck"
    },
    // Columns step
    {
      content: (
        <h3>
          <FormattedMessage id="joyride.game.step03" />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideColumns"
    },
    // Goal pile step
    {
      content: (
        <h3>
          <FormattedMessage id={"joyride.game.step04"} />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideGoals"
    },
    // Draggable and double clickable card step
    {
      content: (
        <h3>
          <FormattedMessage id={"joyride.game.step05"} />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideDoubleClick"
    },
    // Game info step
    {
      content: (
        <h3>
          <FormattedMessage id={"joyride.game.step06"} />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideInfoDisplay"
    },
    // Undo button step
    {
      content: (
        <h3>
          <FormattedMessage id={"joyride.game.step07"} />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideUndo"
    },
    // Pause button step
    {
      content: (
        <h3>
          <FormattedMessage id={"joyride.game.step08"} />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyridePause"
    },
    // Hints button step
    {
      content: (
        <h3>
          <FormattedMessage id={"joyride.game.step09"} />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideHints"
    },
    // Redo button step
    {
      content: (
        <h3>
          <FormattedMessage id={"joyride.game.step10"} />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideRedo"
    },
    // Show more step
    {
      content: (
        <h3>
          <FormattedMessage id={"joyride.game.step11"} />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideShowMore"
    }
  ];
}

export default JoyrideSteps;
