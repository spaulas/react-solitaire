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

export default firebase;
