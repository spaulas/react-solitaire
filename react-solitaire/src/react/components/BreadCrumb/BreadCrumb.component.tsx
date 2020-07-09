import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import { HomeFilled } from "@ant-design/icons";
import React from "react";
import staticRoutes from "./staticRoutes";

const { Item } = Breadcrumb;

const AppBreadcrumb = () => {
  // get current location
  const location = useLocation();
  // separate location at each "/"
  const pathSnippets: Array<string> = location.pathname
    .split("/")
    .filter((i: string) => i);

  // if the current location is only to "/scores", add the userHighScores to the breadcrumb
  if (pathSnippets.length === 1 && pathSnippets[0] === "scores") {
    pathSnippets.push("userHighScores");
  }
  // create breadcrumb items (with reversed order)
  const extraBreadcrumbItems = pathSnippets.map(
    (path: string, index: number) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      return (
        <Item key={url}>
          <Link to={url}>{staticRoutes[url]}</Link>
        </Item>
      );
    }
  );
  const breadcrumbItems = [
    ...extraBreadcrumbItems.reverse(),
    <Item key="home">
      <Link to="/">
        <HomeFilled />
      </Link>
    </Item>
  ];

  return <Breadcrumb className="breadcrumb">{breadcrumbItems}</Breadcrumb>;
};

export default AppBreadcrumb;
