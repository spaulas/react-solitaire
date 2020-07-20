import { Col, Row } from "antd";
import { FormattedMessage } from "react-intl";
import MovesGraph from "../BarGraph/MovesGraph.component";
import Piegraph from "../PieGraph/PieGraph.component";
import React from "react";
import TimeGraph from "../BarGraph/TimeGraph.component";

function DashboardDisplay() {
  return (
    <div className="statisticsDashboardContainer">
      <Row>
        <div className="graphTitle">
          {" "}
          <FormattedMessage id="statistics.winRatio" />
        </div>
        <Piegraph width={250} height={300} />
      </Row>
      <Row className="bottomRow">
        <Col>
          <div className="graphTitle">
            <FormattedMessage id="statistics.movesPerGame" />
          </div>
          <MovesGraph width={500} height={250} />
        </Col>
        <Col>
          <div className="graphTitle">
            <FormattedMessage id="statistics.timePerGame" />
          </div>
          <TimeGraph width={500} height={250} />
        </Col>
      </Row>
    </div>
  );
}

export default DashboardDisplay;
