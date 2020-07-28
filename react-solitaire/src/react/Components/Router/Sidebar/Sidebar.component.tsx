import {
  BarChartOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  PlusOutlined,
  SettingFilled
} from "@ant-design/icons";
import { FormattedMessage, useIntl } from "react-intl";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { RootReducerState } from "../../../../global";
import { useSelector } from "react-redux";

const { Sider } = Layout;
const { Item } = Menu;

function Sidebar() {
  const history = useHistory();
  const location = useLocation();
  const intl = useIntl();
  const [collapsed, setCollapsed] = useState(true);

  const { loggedIn } = useSelector(({ User }: RootReducerState) => ({
    loggedIn: User.loggedIn
  }));

  return location.pathname !== "/game" ? (
    <Sider className="sidebar" trigger={null} collapsible collapsed={collapsed}>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Item
          className="logo"
          onClick={() => history.push("/")}
          key="1"
          title={intl.formatMessage({ id: "sidebar.main" })}
        >
          <div>
            <img
              className="logoTitle"
              src={require("../../../../images/icon.png")}
              alt=""
            />
          </div>
        </Item>
        {!loggedIn && (
          <Item
            onClick={() => history.push("/login")}
            key="2"
            title={intl.formatMessage({ id: "sidebar.login" })}
          >
            <LoginOutlined />
            {!collapsed && <FormattedMessage id="sidebar.login" />}
          </Item>
        )}
        <Item
          onClick={() => history.push("/scores")}
          key="3"
          title={intl.formatMessage({ id: "sidebar.scores" })}
        >
          <OrderedListOutlined />
          {!collapsed && <FormattedMessage id="sidebar.scores" />}
        </Item>
        <Item
          onClick={() => history.push("/statistics")}
          key="4"
          title={intl.formatMessage({ id: "sidebar.statistics" })}
        >
          <BarChartOutlined />
          {!collapsed && <FormattedMessage id="sidebar.statistics" />}
        </Item>
        <Item
          onClick={() => history.push("/configurations")}
          key="5"
          title={intl.formatMessage({ id: "sidebar.configurations" })}
        >
          <SettingFilled />
          {!collapsed && <FormattedMessage id="sidebar.configurations" />}
        </Item>
        <Item
          onClick={() => history.push("/about")}
          key="7"
          title={intl.formatMessage({ id: "sidebar.about" })}
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
  ) : null;
}

export default Sidebar;
