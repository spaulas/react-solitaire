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
  const pathSnippets = location.pathname.split("/").filter((i: string) => i);
  // create breadcrumb items (with reversed order)
  const extraBreadcrumbItems = pathSnippets
    .reverse()
    .map((path: string, index: number) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      return (
        <Item key={url}>
          <Link to={url}>{staticRoutes[url]}</Link>
        </Item>
      );
    });
  const breadcrumbItems = [
    ...extraBreadcrumbItems,
    <Item key="home">
      <Link to="/">
        <HomeFilled />
      </Link>
    </Item>
  ];

  return <Breadcrumb className="breadcrumb">{breadcrumbItems}</Breadcrumb>;
};

export default AppBreadcrumb;
