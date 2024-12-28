import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import './App.css';
import db from "./firebase";


function App() {
  const [customerName, setCustomerName] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");
  useEffect(() => {
    console.log(customerName,customerPassword,"log");
    
  },[customerName,customerPassword])

  const submit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Add a document to the "customersData" collection
      await addDoc(collection(db, "customersData"), {
        name: customerName,
        password: customerPassword,
      });
  
      // Clear input fields after successful submission
      setCustomerName("");
      setCustomerPassword("");
  
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
};
  return (
      <div className="App">
          <div className="App__form">
              <input
                  type="text"
                  placeholder="Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
              />
              <input
                  type="text"
                  placeholder="Password"
                  value={customerPassword}
                  onChange={(e) => setCustomerPassword(e.target.value)}
              />
              <button onClick={submit}>Submit</button>
          </div>
      </div>
  );

}

export default App;
