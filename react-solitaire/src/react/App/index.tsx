import { ExplicitAny, RootReducerState } from "../../global";
import { Layout, Spin } from "antd";
import React, { useEffect } from "react";
import { auth, getUserInfo } from "../../firebase/firebase.utils";
import { useDispatch, useSelector } from "react-redux";
import ApplicationRouter from "./ApplicationRouter";
import { BrowserRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Joyride from "../components/HocWrappers/Joyride/Joyride.component";
import highscoreActions from "../../redux/highScores/highscores.actions";
import userActions from "../../redux/user/user.actions";

const { Content } = Layout;

function BaseApplication() {
  const dispatch = useDispatch();

  const { storedUserRef } = useSelector(({ User }: RootReducerState) => ({
    storedUserRef: User.userRef
  }));

  const mountComponent = () => {
    // when the auth changes
    auth.onAuthStateChanged(async (userAuth: ExplicitAny) => {
      dispatch(userActions.clearUser());

      const { userRef, highscoreRef }: ExplicitAny = await getUserInfo(
        userAuth
      );

      // if there is online user and highscore
      if (userRef && highscoreRef) {
        userRef?.onSnapshot((snapshot: ExplicitAny) => {
          dispatch(userActions.saveUser(snapshot.data(), userRef));
        });

        highscoreRef?.onSnapshot((snapshot: ExplicitAny) => {
          dispatch(
            highscoreActions.setOnlineHighScores({
              highscoreRef,
              ...snapshot.data()
            })
          );
        });
      }
      // if not, make offline user and highscore
      else {
        dispatch(userActions.getLocalStorage());
        dispatch(highscoreActions.setOfflineHighScores());
      }
    });
  };
  useEffect(mountComponent, []);

  return storedUserRef === undefined ? (
    <Spin spinning />
  ) : (
    <BrowserRouter>
      <Layout>
        <Content>
          <DndProvider backend={HTML5Backend as ExplicitAny}>
            <Joyride />
            <ApplicationRouter />
          </DndProvider>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default BaseApplication;
