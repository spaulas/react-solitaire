import MenuButton from "../../components/Buttons/MenuButton.component";
import React from "react";
import { Row } from "antd";

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
        <MenuButton location="/game" className="startButton">
          <span>Start Game</span>
        </MenuButton>
      </Row>
      <Row className="buttonSpaceRow" align="middle" justify="center">
        <MenuButton location="/scores" className="startButton">
          <span>Scores</span>
        </MenuButton>
      </Row>
      <Row className="buttonSpaceRow" align="middle" justify="center">
        <MenuButton location="/statistics" className="startButton">
          <span>Statistics</span>
        </MenuButton>
      </Row>
    </div>
  );
}

export default StartingPage;
