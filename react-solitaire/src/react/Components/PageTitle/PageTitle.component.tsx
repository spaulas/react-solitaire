import React, { ReactNode } from "react";
import BreadCrumb from "../Router/BreadCrumb/BreadCrumb.component";
import { useHistory } from "react-router-dom";

interface PageTitleProps {
  title: ReactNode;
}

function PageTitle({ title }: PageTitleProps) {
  const history = useHistory();
  return (
    <div className="pageTitleContainer">
      <span className="pageTitleSpan">{title}</span>
      <img
        onClick={() => history.push("/")}
        className="logoTitle"
        src={require("../../../images/icon.png")}
        alt=""
      />
      <BreadCrumb />
    </div>
  );
}

export default PageTitle;
