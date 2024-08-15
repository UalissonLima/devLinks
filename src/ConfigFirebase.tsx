// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA16QK6BG3zNRLDs9P1IDIrK7MM2u4OuZo",
  authDomain: "linketree-c8d71.firebaseapp.com",
  projectId: "linketree-c8d71",
  storageBucket: "linketree-c8d71.appspot.com",
  messagingSenderId: "507061485099",
  appId: "1:507061485099:web:121ad6a220756db793f46e",
  measurementId: "G-ZL2ESL62J4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
