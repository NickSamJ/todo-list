import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAteIBxonQYYU11XZazw4jmqqA9TPVcusg",
  authDomain: "react-todo-starter.firebaseapp.com",
  databaseURL: "https://react-todo-starter.firebaseio.com",
  projectId: "react-todo-starter",
  storageBucket: "react-todo-starter.appspot.com",
  messagingSenderId: "4227661449",
  appId: "1:4227661449:web:436214a8509f92ed199058"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};



export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

export const logOut = () => {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
  }).catch(function (error) {
    // An error happened.
  })
}

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
