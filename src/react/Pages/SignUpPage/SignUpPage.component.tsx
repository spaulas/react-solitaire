import React, { memo } from "react";
import AppIcon from "../../Components/Icon/AppIcon.component";
import { RootReducerState } from "../../../global";
import { Row } from "antd";
import SignUpForm from "../../Components/Forms/SignUpForm/SignUpForm.component";
import { useSelector } from "react-redux";

function SignUpPage() {
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
      <SignUpForm />
    </div>
  );
}

export default memo(SignUpPage);
