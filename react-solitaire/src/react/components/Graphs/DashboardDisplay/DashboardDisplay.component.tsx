import { Col, Row } from "antd";
import MovesGraph from "../BarGraph/MovesGraph.component";
import Piegraph from "../PieGraph/PieGraph.component";
import React from "react";
import TimeGraph from "../BarGraph/TimeGraph.component";

function DashboardDisplay() {
  return (
    <div className="statisticsDashboardContainer">
      <Row>
        <div className="graphTitle">Time Per Game</div>
        <Piegraph width={250} height={300} />
      </Row>
      <Row className="bottomRow">
        <Col>
          <div className="graphTitle">Moves Per Game</div>
          <MovesGraph width={500} height={250} />
        </Col>
        <Col>
          <div className="graphTitle">Time Per Game</div>
          <TimeGraph width={500} height={250} />
        </Col>
      </Row>
    </div>
  );
}

export default DashboardDisplay;
