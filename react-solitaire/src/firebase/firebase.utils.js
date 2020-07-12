import "firebase/firestore";
import "firebase/auth";
import firebase from "firebase/app";

const config = {
  apiKey: "AIzaSyAbT2Wbt4lgMQfVDN_BIU1PJMWjIpe4H_s",
  authDomain: "react-solitaire-4deb4.firebaseapp.com",
  databaseURL: "https://react-solitaire-4deb4.firebaseio.com",
  projectId: "react-solitaire-4deb4",
  storageBucket: "react-solitaire-4deb4.appspot.com",
  messagingSenderId: "243441631227",
  appId: "1:243441631227:web:eba2368c003818c321955e"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const getUserInfo = async user => {
  if (!user) {
    return { userRef: null, highscoreRef: null };
  }

  const userRef = firestore.doc(`users/${user.uid}`);
  const userSnapShot = await userRef.get();

  const highscoreRef = firestore.doc("topHighScores/highScores");
  const highscoreSnapShot = await highscoreRef.get();

  if (!userSnapShot.exists && user.email) {
    try {
      await userRef.set({
        email: user.email,
        userName: user.displayName,
        createdAt: new Date(),
        maxMoves: 0,
        maxTime: 0,
        nGames: 0,
        hasSavedGame: false,
        history: [],
        graphs: {
          winsRatio: [],
          time: {},
          moves: {}
        },
        settings: {
          language: "en-Us",
          joyride: {
            main: true,
            scores: true,
            statistics: true,
            login: true,
            game: true
          }
        }
      });
    } catch (error) {
      console.error("Error creating user ", error.message);
    }
  }

  if (!highscoreSnapShot.exists) {
    try {
      await highscoreRef.set({
        highScores: []
      });
    } catch (error) {
      console.error("Error creating highscore ", error.message);
    }
  }

  return { userRef, highscoreRef };
};

export default firebase;
