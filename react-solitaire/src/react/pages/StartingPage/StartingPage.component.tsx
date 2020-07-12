import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JoyrideSteps from "./JoyrideSteps.component";
import LoginForm from "../../components/LoginForm/LoginForm.component";
import MainMenu from "../../components/MainMenu/MainMenu.component";
import { RootReducerState } from "../../../global";
import { Row } from "antd";
import joyrideActions from "../../../redux/joyride/joyride.actions";
import pagesActions from "../../../redux/pages/pages.actions";

function StartingPage() {
  const dispatch = useDispatch();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const { showAnimation } = useSelector(({ Pages }: RootReducerState) => ({
    showAnimation: Pages.startPageAnimation
  }));
  const [showButtonsAnimation, setShowButtonsAnimation] = useState(
    showAnimation
  );
  const mountComponent = () => {
    // after animation is over, set showAnimation to false
    setTimeout(() => dispatch(pagesActions.setStartPageAnimation(false)), 2500);
    setShowButtonsAnimation(showAnimation);
    dispatch(joyrideActions.initJoyride("main", JoyrideSteps));
  };
  useEffect(mountComponent, []);

  const handleHideForm = () => {
    setShowButtonsAnimation(true);
    setShowLoginForm(false);
  };

  return (
    <div
      className={`joyrideStartingPage startingPage ${
        showAnimation ? "startingPageAnimation" : ""
      }`}
    >
      <Row className="logoRow" align="middle" justify="center">
        <img
          className={`${showAnimation ? "logoAnimated" : "logoImage"}`}
          src={require("../../../images/icon.png")}
          alt=""
        />
      </Row>
      {showLoginForm ? (
        <LoginForm hideForm={handleHideForm} />
      ) : (
        <MainMenu
          showStartAnimation={showAnimation}
          showBackAnimation={showButtonsAnimation}
          showLoginForm={() => setShowLoginForm(true)}
        />
      )}
    </div>
  );
}

export default memo(StartingPage);
