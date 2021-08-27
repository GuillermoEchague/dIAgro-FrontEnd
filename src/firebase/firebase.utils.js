import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

  // Your web app's Firebase configuration
  const config = {
  apiKey: "AIzaSyCujKiNmBzIR0yvx0i4SgjqohFkeTzqchI",
  authDomain: "fir-app-react-1eeb8.firebaseapp.com",
  projectId: "fir-app-react-1eeb8",
  storageBucket: "fir-app-react-1eeb8.appspot.com",
  messagingSenderId: "760173250676",
  appId: "1:760173250676:web:f038e35d8cacc16837a921"
};

// Initialize Firebase
firebase.initializeApp(config);

export const createUserProfileDocument= async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if(!snapShot.exits) {
    const {displayName, email} = userAuth;
    const createAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
    return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;