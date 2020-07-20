/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormattedMessage } from "react-intl";
import React from "react";

function JoyrideSteps() {
  return [
    {
      content: (
        <h3>
          <FormattedMessage id="joyride.statistics.step01" />
        </h3>
      ),
      disableBeacon: true,
      spotlightClicks: false,
      target: ".joyrideStatisticsPage",
      placement: "center" as const
    },
    {
      content: (
        <h3>
          <FormattedMessage id="joyride.statistics.step02" />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideStatisticsCarousel",
      placement: "bottom-end"
    },
    {
      content: (
        <h3>
          <FormattedMessage id="joyride.statistics.step03" />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideStatisticsCarousel",
      placement: "bottom-end"
    },
    {
      content: (
        <h3>
          <FormattedMessage id="joyride.statistics.step04" />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideStatisticsCarousel",
      placement: "bottom-end"
    },
    {
      content: (
        <h3>
          <FormattedMessage id="joyride.statistics.step05" />
        </h3>
      ),
      disableBeacon: true,
      target: ".joyrideDashboardDisplay"
    }
  ];
}

export default JoyrideSteps;
