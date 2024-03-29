
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQABpSao1uYT9oZjeH-vkHIHgFCUktioQ",
  authDomain: "khang-a.firebaseapp.com",
  databaseURL: "https://khang-a-default-rtdb.firebaseio.com",
  projectId: "khang-a",
  storageBucket: "khang-a.appspot.com",
  messagingSenderId: "1046435121095",
  appId: "1:1046435121095:web:e2d1a5b68a9d02081b3be2",
  measurementId: "G-4M9MEV6T4R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();