import { Col, Row } from "antd";
import { FormattedMessage } from "react-intl";
import PageTitle from "../../Components/PageTitle/PageTitle.component";
import React from "react";

function AboutPage() {
  return (
    <div className="mainPage aboutPage">
      <PageTitle title={<FormattedMessage id="sidebar.about" />} />
      <Row align="middle" className="aboutRow">
        {/* Developer picture */}
        <Col xs={24} sm={24} md={12}>
          <div className="imageHere">
            <img
              className="developerImg"
              src={require("../../../images/developer.jpg")}
              alt=""
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12}>
          {/* Made by */}
          <Row className="rowInfo">
            <Col xs={24} sm={24} md={8} className="title">
              <FormattedMessage id="about.madeBy" />
            </Col>
            <Col xs={24} sm={24} md={16}>
              <a href="https://www.linkedin.com/in/spaulas/?locale=en_US" target="_black">
                Paula Santos
              </a>
            </Col>
          </Row>
          {/* Languages used */}
          <Row className="rowInfo">
            <Col xs={24} sm={24} md={8} className="title">
              <FormattedMessage id="about.usedLanguages" />
            </Col>
            <Col xs={24} sm={24} md={16}>
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
          {/* Github link */}
          <Row className="rowInfo">
            <Col xs={24} sm={24} md={8} className="title">
              <span>Github:</span>
            </Col>
            <Col xs={24} sm={24} md={16}>
              <a
                href="https://github.com/spaulas/solitaireGame"
                target="_black"
              >
                spaulas/solitaireGame
              </a>
            </Col>
          </Row>
          {/* Goals for this project */}
          <Row className="rowInfo">
            <Col xs={24} sm={24} md={8} className="title">
              <FormattedMessage id="about.goals" />
            </Col>
            <Col xs={24} sm={24} md={16}>
              <FormattedMessage id="about.goalsDetails" />
            </Col>
          </Row>
          {/* Special thanks */}
          <Row className="specialThanks" justify="end">
            <FormattedMessage id="about.specialThanks1" />
            &nbsp;
            <a
              href="https://www.linkedin.com/in/andreamorimsimoes/?locale=en_US"
              target="__blank"
            >
              André Amorim
            </a>
            <FormattedMessage id="about.specialThanks2" />
          </Row>
        </Col>
      </Row>
    </div>
  );
}
export default AboutPage;
