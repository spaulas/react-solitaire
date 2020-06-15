import { DndProvider } from "react-dnd";
import { ExplicitAny } from "../global";
import GameBoard from "./pages/GameBoard/GameBoard.component";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Layout } from "antd";
import React from "react";

const { Content } = Layout;

function BaseApplication() {
  return (
    <Layout>
      <Content>
        <DndProvider backend={HTML5Backend as ExplicitAny}>
          <GameBoard />
        </DndProvider>
      </Content>
    </Layout>
  );
}

export default BaseApplication;
