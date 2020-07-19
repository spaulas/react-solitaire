import { ExplicitAny, RootReducerState } from "../../../global";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppIcon from "../../components/Icon/AppIcon.component";
import JoyrideSteps from "./JoyrideSteps.component";
import LoginForm from "../../components/Forms/LoginForm/LoginForm.component";
import MainMenu from "../../components/MainMenu/MainMenu.component";
import { Row } from "antd";
import joyrideActions from "../../../redux/joyride/joyride.actions";
import pagesActions from "../../../redux/pages/pages.actions";
import { useLocation } from "react-router-dom";

function StartingPage() {
  const dispatch = useDispatch();
  const location: ExplicitAny = useLocation();

  const { showAnimation, loggedOut, hasSavedGame } = useSelector(
    ({ Pages, User }: RootReducerState) => ({
      showAnimation: Pages.startPageAnimation,
      loggedOut: User.userRef === false,
      hasSavedGame: User.user.hasSavedGame
    })
  );

  const [showButtonsAnimation, setShowButtonsAnimation] = useState(
    showAnimation
  );
  const [showLoginForm, setShowLoginForm] = useState(false);

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
          "home",
          JoyrideSteps({ loggedOut, hasSavedGame })
        )
      );
    }, 2500);
    // the buttons animation value is the same from show animation
    setShowButtonsAnimation(showAnimation);
  };
  useEffect(mountComponent, []);

  /**
   * Called to switch from the form to the main buttons
   */
  const handleHideForm = () => {
    // when the components change, always animate them
    setShowButtonsAnimation(true);
    // hide the login form
    setShowLoginForm(false);
  };

  // when the location changes, check if it comes with the login param, if so, show the form
  useEffect(() => {
    setShowLoginForm(location.state?.login);
  }, [location]);

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
      {showLoginForm ? (
        /* Login form */
        <LoginForm hideForm={handleHideForm} />
      ) : (
        /* Main buttons */
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
