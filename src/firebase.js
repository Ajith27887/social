    // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8bNkHMcg8AAO7bB4Lt2FN9g12JxUlXyA",
  authDomain: "social-media-cf71a.firebaseapp.com",
  projectId: "social-media-cf71a",
  storageBucket: "social-media-cf71a.firebasestorage.app",
  messagingSenderId: "793971473414",
  appId: "1:793971473414:web:6ecbf749e514a7416a9787",
  measurementId: "G-RDBKWLX48B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


export default db;