/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormattedMessage } from "react-intl";
import React from "react";

function JoyrideSteps() {
  return [
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
    {
      content: (
        <h3>
          <FormattedMessage id="joyride.game.step02" />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideDeck"
    },
    {
      content: (
        <h3>
          <FormattedMessage id="joyride.game.step03" />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideColumns"
    },
    {
      content: (
        <h3>
          <FormattedMessage id={"joyride.game.step04"} />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideGoals"
    },

    {
      content: (
        <h3>
          <FormattedMessage id={"joyride.game.step05"} />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideDoubleClick"
    },
    {
      content: (
        <h3>
          <FormattedMessage id={"joyride.game.step06"} />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideInfoDisplay"
    },
    {
      content: (
        <h3>
          <FormattedMessage id={"joyride.game.step07"} />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideUndo"
    },
    {
      content: (
        <h3>
          <FormattedMessage id={"joyride.game.step08"} />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyridePause"
    },
    {
      content: (
        <h3>
          <FormattedMessage id={"joyride.game.step09"} />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideHints"
    },
    {
      content: (
        <h3>
          <FormattedMessage id={"joyride.game.step10"} />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideRedo"
    },
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
