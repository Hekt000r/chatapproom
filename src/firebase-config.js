// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLBst29HBNX44ejtra9Og4lkne6ebqYrY",
  authDomain: "chatapp-room.firebaseapp.com",
  projectId: "chatapp-room",
  storageBucket: "chatapp-room.appspot.com",
  messagingSenderId: "358312345021",
  appId: "1:358312345021:web:8a40b07e4979ff46bee6d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);