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
import Sidebar from "./Sidebar.component";
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
          const {
            createdAt,
            graphs,
            hasSavedGame,
            history,
            maxMoves,
            maxTime,
            nGames,
            settings,
            userName
          } = snapshot.data();
          dispatch(
            userActions.saveUser(
              {
                createdAt,
                graphs,
                hasSavedGame,
                history,
                maxMoves,
                maxTime,
                nGames,
                settings,
                userName
              },
              userRef
            )
          );
        });

        highscoreRef?.onSnapshot((snapshot: ExplicitAny) => {
          const { hasNewHighScore, highScores } = snapshot.data();
          dispatch(
            highscoreActions.setOnlineHighScores(
              {
                hasNewHighScore,
                highScores
              },
              highscoreRef
            )
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
