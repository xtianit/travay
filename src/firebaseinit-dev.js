import firebase from 'firebase';
import 'firebase/firestore';

var config = {
  apiKey: "AIzaSyDDFkHUquiG9yrbHDyiUeCGCCqcXqSdZek",
  authDomain: "travay-dev.firebaseapp.com",
  databaseURL: "https://travay-dev.firebaseio.com",
  projectId: "travay-dev",
  storageBucket: "travay-dev.appspot.com",
  messagingSenderId: "766677685680"
};

let firebaseApp;
let firestore;

try {
  if (!firebase.apps.length) {
    firebaseApp = firebase.initializeApp(config);
    firestore = firebaseApp.firestore();
  } else {
    firebaseApp = firebase.app();
    firestore = firebaseApp.firestore();
  }
} catch (err) {
  console.warn('Firebase already initialised!', err);
}

export default firestore;
export const firebaseDatabase = firebaseApp.database();
