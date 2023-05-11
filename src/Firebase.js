// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import {getAuth} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMpBvLNVIqjNs9skOf9Ulc96PKG2cs_ys",
  authDomain: "tvmaze-3774f.firebaseapp.com",
  projectId: "tvmaze-3774f",
  storageBucket: "tvmaze-3774f.appspot.com",
  messagingSenderId: "71604745838",
  appId: "1:71604745838:web:175a1756c4f3940103587f",
  measurementId: "G-L8VE7KQFRS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db=getFirestore(app);
export const auth=getAuth();
