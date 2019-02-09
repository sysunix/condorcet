import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/auth";

const config = {
  apiKey: "AIzaSyBl7KGWaRY0B-BQ7WhUwSnmFHj3f3OYF0U",
  authDomain: "condorcet-4167c.firebaseapp.com",
  databaseURL: "https://condorcet-4167c.firebaseio.com",
  projectId: "condorcet-4167c",
  storageBucket: "condorcet-4167c.appspot.com",
  messagingSenderId: "400396103060"
};

firebase.initializeApp(config);

// Db
export const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

// Auth
export const auth = firebase.auth();

export default firebase;
