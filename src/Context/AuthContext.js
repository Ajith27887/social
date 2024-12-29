import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(),
    [error, setError] = useState(""),
    navigate = useNavigate();
  console.log("Auth instance:", auth);

  function signUp(email, password) {
    if (!email || !password) {
      console.error("Email or password is missing");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user, "user");
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // throw new Error(errorMessage);
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
        // throw new Error(errorMessage); // Pass the error up the chain
        setError("Account doesn't Exists");
      });
  }

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  const value = {
    currentUser,
    login,
    error,
    signUp,
    setError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
