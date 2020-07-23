import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppIcon from "../../Components/Icon/AppIcon.component";
import JoyrideSteps from "./JoyrideSteps.component";
import MainMenu from "../../Components/MainMenu/MainMenu.component";
import { RootReducerState } from "../../../global";
import { Row } from "antd";
import joyrideActions from "../../../redux/joyride/joyride.actions";
import pagesActions from "../../../redux/pages/pages.actions";

function StartingPage() {
  const dispatch = useDispatch();

  const { showAnimation, loggedIn, hasSavedGame } = useSelector(
    ({ Pages, User }: RootReducerState) => ({
      showAnimation: Pages.startPageAnimation,
      loggedIn: User.loggedIn,
      hasSavedGame: User.user.hasSavedGame
    })
  );

  const [showButtonsAnimation, setShowButtonsAnimation] = useState(
    showAnimation
  );

  /**
   * Function called when the component is mounted
   * The animation state starts with the value from the redux, if it comes true, then after the animation is over, set it to false
   */
  const mountComponent = () => {
    // after animation is over, set showAnimation to false
    setTimeout(() => {
      // set animation redux state to false, so it won't repeat everytime
      dispatch(pagesActions.setStartPageAnimation(false));
      // start the joyride
      dispatch(
        joyrideActions.initJoyride(
          "main",
          JoyrideSteps({ loggedIn, hasSavedGame })
        )
      );
    }, 2500);
    // the buttons animation value is the same from show animation
    setShowButtonsAnimation(showAnimation);
  };
  useEffect(mountComponent, []);

  return (
    <div
      className={`joyrideStartingPage mainPage startingPage ${
        showAnimation ? "startingPageAnimation" : ""
      }`}
    >
      {/* Icon Row */}
      <Row className="logoRow" align="middle" justify="center">
        <AppIcon
          className={`${showAnimation ? "logoAnimated" : "logoImage"}`}
        />
      </Row>
      <MainMenu
        showStartAnimation={showAnimation}
        showBackAnimation={showButtonsAnimation}
      />
    </div>
  );
}

export default memo(StartingPage);
