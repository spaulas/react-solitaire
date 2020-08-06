import React, { memo } from "react";
import AppIcon from "../../Components/Icon/AppIcon.component";
import LoginForm from "../../Components/Forms/LoginForm/LoginForm.component";
import { RootReducerState } from "../../../global";
import { Row } from "antd";
import { useSelector } from "react-redux";

function LoginPage() {
  const { showAnimation } = useSelector(({ Pages }: RootReducerState) => ({
    showAnimation: Pages.startPageAnimation
  }));

  return (
    <div
      className={`joyrideStartingPage mainPage startingPage ${
        showAnimation ? "startingPageAnimation" : ""
      }`}
    >
      {/* Icon Row */}
      <Row className="logoRow" align="middle" justify="center">
        <AppIcon className="logoImage" />
      </Row>
      <LoginForm />
    </div>
  );
}

export default memo(LoginPage);
