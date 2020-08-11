import React, { memo } from "react";
import { FormattedMessage } from "react-intl";
import MenuButton from "../../Components/Buttons/MenuButton.component";
import { WarningFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

function ErrorPage() {
  const location = useLocation();
  console.log("ERROR PAGE!!!! ", location);

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
export default memo(ErrorPage);
