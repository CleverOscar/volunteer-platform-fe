// Firebase App (the core Firebase SDK) is always required and must be listed
// first
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId || 'volunteer-platform-87cd0',
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const store = firebase.firestore();

export default firebase;
