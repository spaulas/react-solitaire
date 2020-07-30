import { FormattedMessage } from "react-intl";
import MenuButton from "../../Components/Buttons/MenuButton.component";
import React from "react";
import { WarningFilled } from "@ant-design/icons";

function ErrorPage() {
  return (
    <div className="mainPage errorPage">
      <WarningFilled className="warningIcon" />
      <span className="title">
        <FormattedMessage id="error.title" />
      </span>
      <span className="subtitle">
        <FormattedMessage id="error.subtitle" />
      </span>
      <MenuButton location="/">
        <div className="menuButton">
          <FormattedMessage id="error.goHome" />
        </div>
      </MenuButton>
    </div>
  );
}
export default ErrorPage;
