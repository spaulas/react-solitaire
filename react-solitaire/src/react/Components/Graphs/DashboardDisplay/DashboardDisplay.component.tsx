import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import MovesGraph from "../BarGraph/MovesGraph.component";
import Piegraph from "../PieGraph/PieGraph.component";
import TimeGraph from "../BarGraph/TimeGraph.component";

function DashboardDisplay() {
  const [isMobile, setIsMobile] = useState(false);

  const checkMobile = () => {
    if (!isMobile && window.innerWidth < 767) {
      setIsMobile(true);
    }
    if (isMobile && window.innerWidth >= 767) {
      setIsMobile(false);
    }
  };
  useEffect(checkMobile, []);

  return (
    <div className="statisticsDashboardContainer">
      <Row>
        <div className="graphTitle">
          <FormattedMessage id="statistics.winRatio" />
        </div>
        <Piegraph
          width={isMobile ? 200 : 250}
          height={isMobile ? 240 : 300}
          iconSize={isMobile ? 20 : 50}
          className="dashboardPieChart"
        />
      </Row>
      <Row className="bottomRow">
        <Col xs={24} sm={24} md={12}>
          <div className="graphTitle">
            <FormattedMessage id="statistics.movesPerGame" />
          </div>
          <MovesGraph
            width={isMobile ? 200 : 500}
            height={isMobile ? 100 : 250}
            className="dashboardBarChart"
          />
        </Col>
        <Col xs={24} sm={24} md={12} className="secondCol">
          <div className="graphTitle">
            <FormattedMessage id="statistics.timePerGame" />
          </div>
          <TimeGraph
            width={isMobile ? 200 : 500}
            height={isMobile ? 100 : 250}
            className="dashboardBarChart"
          />
        </Col>
      </Row>
    </div>
  );
}

export default DashboardDisplay;
