import { Col, Row } from "antd";
import { FormattedMessage } from "react-intl";
import PageTitle from "../../components/PageTitle/PageTitle.component";
import React from "react";

function AboutPage() {
  return (
    <div className="mainPage aboutPage">
      <PageTitle title={<FormattedMessage id="sidebar.about" />} />
      <Row align="middle" className="aboutRow">
        <Col span={12}>
          <div className="imageHere">
            <img
              className="developerImg"
              src={require("../../../images/developer.jpg")}
              alt=""
            />
          </div>
        </Col>
        <Col span={12}>
          <Row className="rowInfo">
            <Col span={8} className="title">
              <FormattedMessage id="about.madeBy" />
            </Col>
            <Col span={16}>
              <span>Paula Santos</span>
            </Col>
          </Row>
          <Row className="rowInfo">
            <Col span={8} className="title">
              <FormattedMessage id="about.usedLanguages" />
            </Col>
            <Col span={16}>
              <ul>
                <li>React</li>
                <li>Redux</li>
                <li>Typescript</li>
                <li>
                  Jest <FormattedMessage id="about.inProgress" />
                </li>
                <li>
                  Cypress <FormattedMessage id="about.inProgress" />
                </li>
              </ul>
            </Col>
          </Row>
          <Row className="rowInfo">
            <Col span={8} className="title">
              <span>Github:</span>
            </Col>
            <Col span={16}>
              <a
                href="https://github.com/spaulas/solitaireGame"
                target="_black"
              >
                spaulas/solitaireGame
              </a>
            </Col>
          </Row>
          <Row className="rowInfo">
            <Col span={8} className="title">
              <FormattedMessage id="about.goals" />
            </Col>
            <Col span={16}>
              <FormattedMessage id="about.goalsDetails" />
            </Col>
          </Row>
          <Row className="specialThanks" justify="end">
            <FormattedMessage id="about.specialThanks" />
          </Row>
        </Col>
      </Row>
    </div>
  );
}
export default AboutPage;
