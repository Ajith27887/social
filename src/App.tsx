import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import "./App.css";
import Signup from "./Components/Signup";

function App() {
  return (
    <div className="App">
      <Signup />
    </div>
  );
}

export default App;
