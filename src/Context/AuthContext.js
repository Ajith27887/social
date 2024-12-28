import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import auth from "../firebase";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthContext({ Children }) {
  const [currentUser, setCurrentUser] = useState();

  function signUp(email, Password) {
    return auth.createUserWithEmailAndPassword(email, Password);
  }

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unSubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
  };

  return <AuthContext.Provider value={value}>{Children}</AuthContext.Provider>;
}

export default AuthContext;
