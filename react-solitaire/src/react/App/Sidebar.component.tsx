/* eslint-disable no-console */
import {
  BarChartOutlined,
  HomeFilled,
  LoginOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  QuestionCircleFilled,
  SettingFilled
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { useIntl } from "react-intl";

const { Sider } = Layout;
const { Item, SubMenu } = Menu;

function Sidebar() {
  const intl = useIntl();
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Sider className="sidebar" trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Item key="1">
          {collapsed ? (
            <HomeFilled />
          ) : (
            <>
              <HomeFilled />
              Home
            </>
          )}
        </Item>
        <Item key="2">
          {collapsed ? (
            <LoginOutlined />
          ) : (
            <>
              <LoginOutlined />
              Login
            </>
          )}
        </Item>
        <SubMenu
          key="3"
          title={
            collapsed ? (
              <HomeFilled />
            ) : (
              <>
                <HomeFilled />
                Scores
              </>
            )
          }
        >
          <Item key="31">
            {collapsed ? (
              <HomeFilled />
            ) : (
              <>
                <HomeFilled />
                User Scores
              </>
            )}
          </Item>
          <Item key="32">
            {collapsed ? (
              <HomeFilled />
            ) : (
              <>
                <HomeFilled />
                Top Scores
              </>
            )}
          </Item>
        </SubMenu>
        <Item key="4" /*  icon={<UploadOutlined />} */>
          {collapsed ? (
            <BarChartOutlined />
          ) : (
            <>
              <BarChartOutlined />
              Statistics
            </>
          )}
        </Item>
        <Item key="5">
          {collapsed ? (
            <SettingFilled />
          ) : (
            <>
              <SettingFilled />
              Configurations
            </>
          )}
        </Item>
        <Item key="6" /*  icon={<UploadOutlined />} */>
          {collapsed ? (
            <LogoutOutlined />
          ) : (
            <>
              <LogoutOutlined />
              Logout
            </>
          )}
        </Item>
        <Item key="7">
          {collapsed ? (
            <QuestionCircleFilled />
          ) : (
            <>
              <QuestionCircleFilled />
              About
            </>
          )}
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
