import GameBoard from "./pages/GameBoard/GameBoard.component";
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
