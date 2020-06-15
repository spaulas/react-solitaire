import ApplicationRouter from "./ApplicationRouter";
import { BrowserRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { ExplicitAny } from "../global";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Layout } from "antd";
import React from "react";

const { Content } = Layout;

function BaseApplication() {
  return (
    <BrowserRouter>
      <Layout>
        <Content>
          <DndProvider backend={HTML5Backend as ExplicitAny}>
            <ApplicationRouter />
          </DndProvider>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default BaseApplication;
