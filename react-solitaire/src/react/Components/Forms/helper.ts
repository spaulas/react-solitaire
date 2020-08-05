/* eslint-disable no-console */
import { auth, getUserInfo } from "../../../firebase/firebase.utils";
import { ExplicitAny } from "../../../global";
import { IntlShape } from "react-intl";
import highscoreActions from "../../../redux/highScores/highscores.actions";
import userActions from "../../../redux/user/user.actions";

export const checkUserName = (
  rule: object,
  value: string,
  callback: (message?: string) => void,
  intl: IntlShape
) => {
  callback();
};

export const validateEmail = (email: ExplicitAny) => {
  const regex = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (typeof email === "object") {
    const result = email.find((e: string) => !regex.test(e));
    return result ? true : false;
  }

  return !regex.test(email);
};

export const checkEmail = (
  rule: object,
  value: string,
  callback: (message?: string) => void,
  intl: IntlShape
) => {
  if (value && validateEmail(value)) {
    callback(intl.formatMessage({ id: "form.error.email" }));
  } else {
    callback();
  }
};

export function validatePwd(pwd: string) {
  // should have at least: 1 special character, 1 uppercase, 1 lowercase, 1 digit and min of 5
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-._]).{5,}$/;
  return !regex.test(pwd);
}

export const checkPassword = (
  rule: object,
  value: string,
  callback: (message?: string) => void,
  intl: IntlShape
) => {
  if (value && validatePwd(value)) {
    callback(intl.formatMessage({ id: "form.error.password" }));
  } else {
    callback();
  }
};

export const checkConfirmPassword = (
  rule: object,
  value: string,
  callback: (message?: string) => void,
  initialValue: string,
  intl: IntlShape
) => {
  if (value && value !== initialValue) {
    callback(intl.formatMessage({ id: "form.error.confirmPassword" }));
  } else {
    callback();
  }
};

export const setUserRedux = async (
  user: ExplicitAny,
  dispatch: ExplicitAny,
  loggedIn = false,
  userName?: string,
  language?: string
) => {
  if (loggedIn) {
    auth.onAuthStateChanged(async oldUser => {
      if (oldUser) {
        const { userRef, highscoreRef }: ExplicitAny = await getUserInfo(
          oldUser
        );
        dispatch(userActions.resetUserRef(userRef));
        dispatch(highscoreActions.resetHighscoresRef(highscoreRef));
      }
    });
  } else {
    const { userRef, highscoreRef }: ExplicitAny = await getUserInfo(user, {
      userName,
      language
    });

    if (userRef && highscoreRef) {
      userRef?.onSnapshot((snapshot: ExplicitAny) => {
        const {
          createdAt,
          graphs,
          hasSavedGame,
          savedGame,
          history,
          maxMoves,
          maxTime,
          nGames,
          settings,
          userName,
          email
        } = snapshot.data();
        dispatch(
          userActions.saveUser(
            {
              createdAt,
              graphs,
              hasSavedGame,
              savedGame,
              history,
              maxMoves,
              maxTime,
              nGames,
              settings,
              userName,
              email
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
  }
};
