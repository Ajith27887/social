import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
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
  const [currentUser, setCurrentUser] = useState(),
    [error, setError] = useState(""),
    [success, setSuccess] = useState("");
  console.log("Auth instance:", auth);

  function signUp(email, password, displayName) {
    if (!email || !password) {
      console.error("Email or password is missing");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        return updateProfile(user, { displayName }).then(() => {
          console.log("User profile updated:", user);
          return user;
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        throw error;
      });
  }

  function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user, "user");
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage, "errorcode");
        setError("Account doesn't Exists");
        throw error;
      });
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
    success,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
