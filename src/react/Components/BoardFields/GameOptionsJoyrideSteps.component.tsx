/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormattedMessage } from "react-intl";
import React from "react";

function JoyrideSteps() {
  return [
    {
      content: (
        <h3>
          <FormattedMessage id={"joyride.game.step12"} />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideRestart"
    },
    {
      content: (
        <h3>
          <FormattedMessage id={"joyride.game.step13"} />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideNew"
    },
    {
      content: (
        <h3>
          <FormattedMessage id={"joyride.game.step14"} />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideExit"
    },
    {
      content: (
        <h3>
          <FormattedMessage id={"joyride.game.step15"} />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideSave"
    }
  ];
}

export default JoyrideSteps;
