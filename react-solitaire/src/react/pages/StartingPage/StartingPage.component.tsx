import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuButton from "../../components/Buttons/MenuButton.component";
import { RootReducerState } from "../../../global";
import { Row } from "antd";
import pagesActions from "../../../redux/pages/pages.actions";

function StartingPage() {
  const dispatch = useDispatch();
  const { showAnimation } = useSelector(({ Pages }: RootReducerState) => ({
    showAnimation: Pages.startPageAnimation
  }));
  const removeAnimation = () => {
    // after animation is over, set showAnimation to false
    setTimeout(() => dispatch(pagesActions.setAnimation()), 2500);
  };
  useEffect(removeAnimation, []);
  return (
    <div
      className={`startingPage ${showAnimation ? "startingPageAnimation" : ""}`}
    >
      <Row className="logoRow" align="middle" justify="center">
        <img
          className={`${showAnimation ? "logoAnimated" : "logoImage"}`}
          src={require("../../../images/icon.png")}
          alt=""
        />
      </Row>
      <Row align="middle" justify="center">
        <MenuButton
          location="/game"
          className={`${showAnimation ? "startButtonAnimated" : ""}`}
        >
          <span>Start Game</span>
        </MenuButton>
      </Row>
      <Row className="buttonSpaceRow" align="middle" justify="center">
        <MenuButton
          location="/scores"
          className={`${showAnimation ? "startButtonAnimated" : ""}`}
        >
          <span>Scores</span>
        </MenuButton>
      </Row>
      <Row className="buttonSpaceRow" align="middle" justify="center">
        <MenuButton
          location="/statistics"
          className={`${showAnimation ? "startButtonAnimated" : ""}`}
        >
          <span>Statistics</span>
        </MenuButton>
      </Row>
    </div>
  );
}

export default memo(StartingPage);
