import React, { useEffect } from "react";
import { auth, getUserInfo } from "../../firebase/firebase.utils";
import ApplicationRouter from "./ApplicationRouter";
import { BrowserRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { ExplicitAny } from "../../global";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Layout } from "antd";
import highscoreActions from "../../redux/highScores/highscores.actions";
import { useDispatch } from "react-redux";
import userActions from "../../redux/user/user.actions";

const { Content } = Layout;

function BaseApplication() {
  const dispatch = useDispatch();
  const mountComponent = () => {
    // when the auth changes
    auth.onAuthStateChanged(async (userAuth: ExplicitAny) => {
      const { userRef, highscoreRef }: ExplicitAny = await getUserInfo(
        userAuth
      );

      // eslint-disable-next-line no-console
      console.log("HISH S ORE REF = ", highscoreRef);

      // if there is online user and highscore
      if (userRef && highscoreRef) {
        userRef?.onSnapshot((snapshot: ExplicitAny) => {
          dispatch(
            userActions.saveUser({
              userRef,
              id: userRef.id,
              ...snapshot.data()
            })
          );
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
