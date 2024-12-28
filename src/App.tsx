import React from "react";
import "./App.css";
import Signup from "./Components/Signup";
import AuthProvider from "./Context/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Signup />
      </AuthProvider>
    </div>
  );
}

export default App;
