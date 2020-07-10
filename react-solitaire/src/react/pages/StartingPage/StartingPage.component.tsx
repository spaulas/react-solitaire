import { ExplicitAny, RootReducerState } from "../../../global";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../../components/LoginForm/LoginForm.component";
import MainMenu from "../../components/MainMenu/MainMenu.component";
import { Row } from "antd";
import { auth } from "../../../firebase/firebase.utils";
import pagesActions from "../../../redux/pages/pages.actions";

function StartingPage() {
  const dispatch = useDispatch();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [onlineUser, setOnlineUser] = useState<ExplicitAny>();
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

    auth.onAuthStateChanged((user: ExplicitAny) => {
      setOnlineUser(user);
      // eslint-disable-next-line no-console
      console.log("user =- ", user);
    });
  };
  useEffect(mountComponent, []);

  const handleHideForm = () => {
    setShowButtonsAnimation(true);
    setShowLoginForm(false);
  };

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
