import React, { useEffect } from "react";
import { auth, getUserInfo } from "../../firebase/firebase.utils";
import ApplicationRouter from "./ApplicationRouter";
import { BrowserRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { ExplicitAny } from "../../global";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Layout } from "antd";
import { useDispatch } from "react-redux";
import userActions from "../../redux/user/user.actions";

const { Content } = Layout;

function BaseApplication() {
  const dispatch = useDispatch();
  const mountComponent = () => {
    // when the auth changes
    auth.onAuthStateChanged(async (userAuth: ExplicitAny) => {
      const userRef: ExplicitAny = await getUserInfo(userAuth);

      // if there is an online user
      if (userRef) {
        userRef?.onSnapshot((snapshot: ExplicitAny) => {
          dispatch(
            userActions.saveUser({
              id: userRef.id,
              ...snapshot.data()
            })
          );
        });
      }
      // if not, make an offline user
      else {
        dispatch(userActions.getLocalStorage());
      }
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
