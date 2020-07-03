import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCMOloUTC1QdA1Yn_Eey5y2LtT2vqzIkTo",
  authDomain: "ecommerceapptest-915f5.firebaseapp.com",
  databaseURL: "https://ecommerceapptest-915f5.firebaseio.com",
  projectId: "ecommerceapptest-915f5",
  storageBucket: "ecommerceapptest-915f5.appspot.com",
  messagingSenderId: "704343114532",
  appId: "1:704343114532:web:c63371ff0d9efe70e529b1",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
