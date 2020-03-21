import GameBoard from "./Pages/GameBoard";
import { Layout } from "antd";
import React from "react";

const { Content } = Layout;

function BaseApplication() {
  return (
    <Layout>
      <Content>
        <GameBoard />
      </Content>
    </Layout>
  );
}

export default BaseApplication;
