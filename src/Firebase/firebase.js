import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDi5flNMddcTwDvPHGO4VILNUJ02RiLjd0",
  authDomain: "watchit-cbe87.firebaseapp.com",
  databaseURL: "https://watchit-cbe87.firebaseio.com",
  projectId: "watchit-cbe87",
  storageBucket: "",
  messagingSenderId: "618753430688",
};
const firebaseApp = firebase.initializeApp(config);

// Initialize the Firestore database
const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
export default firebaseApp;
