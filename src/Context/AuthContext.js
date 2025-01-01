import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

// import { fetchAllUsers } from "../Components/Suggestion/FetchFriends";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  // fetchAllUsers();
  const [currentUser, setCurrentUser] = useState(),
    [error, setError] = useState(""),
    [success, setSuccess] = useState("");
  const [followUser, setFollowUser] = useState("");

  console.log("Auth instance:", auth);

  async function signUp(email, password, displayName) {
    if (!email || !password) {
      console.error("Email or password is missing");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName });
      console.log("User profile updated:", user);

      // Store user data in Firestore
      await setDoc(doc(db, "customersData", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      });

      return user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      throw error;
    }
  }

  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user, "user");

      // // Store user data in Firestore
      // await setDoc(doc(db, "customersData", user.uid), {
      //   uid: user.uid,
      //   email: user.email,
      //   displayName: user.displayName,
      // });
      return user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage, "errorcode");
      setError("Account doesn't exist");
      throw error;
    }
  }

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        console.log("Current user:", user.email, user.displayName);
      }
    });
  }, []);

  const value = {
    currentUser,
    login,
    error,
    signUp,
    setError,
    setSuccess,
    setFollowUser,
    followUser,
    success,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
