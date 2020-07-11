import React, { useEffect } from "react";
import { auth, getUserInfo } from "../../firebase/firebase.utils";
import ApplicationRouter from "./ApplicationRouter";
import { BrowserRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { ExplicitAny } from "../../global";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Layout } from "antd";

const { Content } = Layout;

function BaseApplication() {
  const mountComponent = () => {
    // when the auth changes
    auth.onAuthStateChanged((user: ExplicitAny) => {
      getUserInfo(user);
    });
  };
  useEffect(mountComponent, []);

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
