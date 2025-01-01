// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

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
  measurementId: "G-RDBKWLX48B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const fetchAllUsers = async () => {
  try {
    // Reference the 'users' collection
    const usersCollection = collection(db, "customersData");

    // Fetch all documents in the collection
    const querySnapshot = await getDocs(usersCollection);

    // Map the documents to extract user data
    const usersList = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Document ID (optional, in case you need it)
      ...doc.data(), // Spread the data fields (name, email, etc.)
    }));

    console.log(usersList); // Logs all users
    return usersList;
  } catch (error) {
    console.error("Error fetching users: ", error);
    return [];
  }
};

export { db, auth, provider };
