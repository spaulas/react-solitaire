/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormattedMessage } from "react-intl";
import React from "react";

interface JoyrideStepsProps {
  loggedIn: boolean;
}

function JoyrideSteps({ loggedIn }: JoyrideStepsProps) {
  return [
    {
      content: (
        <h3>
          <FormattedMessage id="joyride.scores.step01" />
        </h3>
      ),
      disableBeacon: true,
      spotlightClicks: false,
      target: ".joyrideScoresPage",
      placement: "center" as const
    },
    {
      content: (
        <h3>
          <FormattedMessage id="joyride.scores.step02" />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideScoresUser"
    },
    {
      content: (
        <h3>
          <FormattedMessage id="joyride.scores.step03" />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideScoresExpand"
    },
    {
      content: (
        <h3>
          <FormattedMessage
            id={
              loggedIn
                ? "joyride.scores.step04_online"
                : "joyride.scores.step04_offline"
            }
          />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideScoresTop"
    }
  ];
}

export default JoyrideSteps;
