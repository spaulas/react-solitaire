/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormattedMessage } from "react-intl";
import React from "react";

interface JoyrideStepsProps {
  loggedOut: boolean;
}

function JoyrideSteps({ loggedOut }: JoyrideStepsProps) {
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
              loggedOut
                ? "joyride.scores.step04_offline"
                : "joyride.scores.step04_online"
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
