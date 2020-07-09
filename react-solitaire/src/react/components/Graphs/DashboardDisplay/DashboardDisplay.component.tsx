import { Col, Row } from "antd";
import BarGraph from "../BarGraph/BarGraph.component";
import Piegraph from "../PieGraph/PieGraph.component";
import React from "react";

function DashboardDisplay() {
  return (
    <div className="statisticsDashboardContainer">
      <Row>
        <div className="graphTitle">Time Per Game</div>
        <Piegraph width={250} height={300} />
      </Row>
      <Row className="bottomRow">
        <Col>
          <div className="graphTitle">Time Per Game</div>
          <BarGraph width={500} height={250} />
        </Col>
        <Col>
          <div className="graphTitle">Time Per Game</div>
          <BarGraph width={500} height={250} />
        </Col>
      </Row>
    </div>
  );
}

export default DashboardDisplay;
