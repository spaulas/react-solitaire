import BreadCrumb from "../BreadCrumb/BreadCrumb.component";
import React from "react";
import { useHistory } from "react-router-dom";

interface PageTitleProps {
  title: string;
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
