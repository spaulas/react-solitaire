import { FormattedMessage } from "react-intl";
import React from "react";

export default [
  {
    content: (
      <h3>
        <FormattedMessage id="joyride.main.step01" />
      </h3>
    ),
    disableBeacon: true,
    spotlightClicks: false,
    target: ".joyrideStartingPage",
    placement: "center" as const
  },
  {
    content: (
      <h3>
        <FormattedMessage id="joyride.main.step02" />
      </h3>
    ),
    disableBeacon: true,
    target: ".joyrideLoginButton"
  },
  {
    content: (
      <h3>
        <FormattedMessage id="joyride.main.step03" />
      </h3>
    ),
    disableBeacon: true,
    target: ".joyrideStartGameButton"
  },
  {
    content: (
      <h3>
        <FormattedMessage id="joyride.main.step04" />
      </h3>
    ),
    disableBeacon: true,
    target: ".joyrideScoresButton"
  },
  {
    content: (
      <h3>
        <FormattedMessage id="joyride.main.step05" />
      </h3>
    ),
    disableBeacon: true,
    target: ".joyrideStatisticsButton"
  }
];
