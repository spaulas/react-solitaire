import { ExplicitAny, RootReducerState } from "../../global";
import { Layout, Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApplicationRouter from "../Components/Router/ApplicationRouter/ApplicationRouter";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Joyride from "../HocWrappers/Joyride/Joyride.component";
import Sidebar from "../Components/Router/Sidebar/Sidebar.component";
import { auth } from "../../firebase/firebase.utils";
import { setUserRedux } from "../Components/Forms/helper";

const { Content } = Layout;

function BaseApplication() {
  const dispatch = useDispatch();

  const { loggedIn } = useSelector(({ User }: RootReducerState) => ({
    loggedIn: User.loggedIn
  }));

  const mountComponent = () => {
    const user = auth.currentUser;
    // eslint-disable-next-line no-console
    console.log("APP COMPONENT UPDATED!!! user = ", user);
    setUserRedux(user, dispatch);
  };
  useEffect(mountComponent, []);

  return loggedIn === undefined ? (
    <Spin spinning />
  ) : (
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
  );
}

export default BaseApplication;
