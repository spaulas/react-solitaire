import { DndProvider } from "react-dnd";
import GameBoard from "./pages/GameBoard/GameBoard.component";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Layout } from "antd";
import React from "react";

const { Content } = Layout;

function BaseApplication() {
  return (
    <Layout>
      <Content>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <DndProvider backend={HTML5Backend as any}>
          <GameBoard />
        </DndProvider>
      </Content>
    </Layout>
  );
}

export default BaseApplication;
