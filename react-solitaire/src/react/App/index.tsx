import { ExplicitAny, RootReducerState } from "../../global";
import { Layout, Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApplicationRouter from "../Components/Router/ApplicationRouter/ApplicationRouter";
import { BrowserRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Joyride from "../HocWrappers/Joyride/Joyride.component";
import Sidebar from "../Components/Router/Sidebar/Sidebar.component";
import { auth } from "../../firebase/firebase.utils";
import { setUserRedux } from "../Components/Forms/helper";

const { Content } = Layout;

function BaseApplication() {
  const dispatch = useDispatch();

  const { storedUserRef } = useSelector(({ User }: RootReducerState) => ({
    storedUserRef: User.userRef
  }));

  const mountComponent = () => {
    const user = auth.currentUser;
    setUserRedux(user, dispatch);
  };
  useEffect(mountComponent, []);

  return storedUserRef === undefined ? (
    <Spin spinning />
  ) : (
    <BrowserRouter>
      <Layout className="mainLayout">
        <Sidebar />
        <Layout className="appLayout">
          <Content className="appContent">
            <DndProvider backend={HTML5Backend as ExplicitAny}>
              <Joyride />
              <ApplicationRouter />
            </DndProvider>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default BaseApplication;
