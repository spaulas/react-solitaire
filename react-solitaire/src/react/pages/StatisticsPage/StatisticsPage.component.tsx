import { AppstoreFilled, BorderOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import CarouselDisplay from "../../components/Graphs/CarouselDisplay/CarouselDisplay.component";
import DashboardDisplay from "../../components/Graphs/DashboardDisplay/DashboardDisplay.component";
import { FormattedMessage } from "react-intl";
import PageTitle from "../../components/PageTitle/PageTitle.component";

function StatisticsPage() {
  const [carouselDisplay, setCarouselDisplay] = useState<boolean>(true);

  return (
    <div className="pageBackground statisticsPage">
      <PageTitle title={<FormattedMessage id="sidebar.statistics" />} />
      {carouselDisplay ? (
        <>
          <CarouselDisplay />
          <AppstoreFilled
            className="toggleButton"
            onClick={() => setCarouselDisplay(false)}
          />
        </>
      ) : (
        <>
          <DashboardDisplay />
          <BorderOutlined
            className="toggleButton"
            onClick={() => setCarouselDisplay(true)}
          />
        </>
      )}
    </div>
  );
}

export default StatisticsPage;
