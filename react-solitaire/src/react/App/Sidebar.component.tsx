/* eslint-disable no-console */
import {
  BarChartOutlined,
  HomeFilled,
  LoginOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  PlusOutlined,
  SettingFilled
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const { Sider } = Layout;
const { Item, SubMenu } = Menu;

function Sidebar() {
  const history = useHistory();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Sider className="sidebar" trigger={null} collapsible collapsed={collapsed}>
      <div
        className={`logo ${location.pathname === "/" ? "logoSelected" : ""}`}
      >
        <img
          onClick={() => history.push("/")}
          className="logoTitle"
          src={require("../../images/icon.png")}
          alt=""
        />
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Item
          onClick={() => history.push("/login")}
          key="2"
          title={<FormattedMessage id="sidebar.login" />}
        >
          <LoginOutlined />
          {!collapsed && <FormattedMessage id="sidebar.login" />}
        </Item>
        <SubMenu
          key="3"
          title={
            <>
              <OrderedListOutlined />
              {!collapsed && <FormattedMessage id="sidebar.scores" />}
            </>
          }
        >
          <Item key="31" onClick={() => history.push("/scores/userHighScores")}>
            <FormattedMessage id="sidebar.userHighScores" />
          </Item>
          <Item
            onClick={() => history.push("/scores/top10HighScores")}
            key="32"
          >
            <FormattedMessage id="sidebar.top10HighScores" />
          </Item>
        </SubMenu>
        <Item
          onClick={() => history.push("/statistics")}
          key="4"
          title={<FormattedMessage id="sidebar.statistics" />}
        >
          <BarChartOutlined />
          {!collapsed && <FormattedMessage id="sidebar.statistics" />}
        </Item>
        <Item
          onClick={() => history.push("/configurations")}
          key="5"
          title={<FormattedMessage id="sidebar.configurations" />}
        >
          <SettingFilled />
          {!collapsed && <FormattedMessage id="sidebar.configurations" />}
        </Item>
        <Item
          onClick={() => history.push("/logout")}
          key="6"
          title={<FormattedMessage id="btn.logout" />}
        >
          <LogoutOutlined />
          {!collapsed && <FormattedMessage id="btn.logout" />}
        </Item>
        <Item
          onClick={() => history.push("/about")}
          key="7"
          title={<FormattedMessage id="sidebar.about" />}
        >
          <PlusOutlined />
          {!collapsed && <FormattedMessage id="sidebar.about" />}
        </Item>
      </Menu>
      <span className="sidebarToggleSpan">
        {collapsed ? (
          <MenuUnfoldOutlined
            className="sidebarToggleIcon"
            onClick={() => setCollapsed(false)}
          />
        ) : (
          <MenuFoldOutlined
            className="sidebarToggleIcon"
            onClick={() => setCollapsed(true)}
          />
        )}
      </span>
    </Sider>
  );
}

export default Sidebar;
