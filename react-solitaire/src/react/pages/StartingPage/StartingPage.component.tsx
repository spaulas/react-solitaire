import React from "react";
import { Row } from "antd";
import StartButton from "../../components/Buttons/StartButton.component";

function StartingPage() {
  return (
    <div className="startingPage">
      <Row className="logoRow" align="middle" justify="center">
        <img
          className="logoAnimated"
          src={require("../../../images/icon.png")}
          alt=""
        />
      </Row>
      <Row align="middle" justify="center">
        <StartButton className="startButton" />
      </Row>
    </div>
  );
}

export default StartingPage;
