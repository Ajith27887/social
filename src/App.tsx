import React from "react";
import "./App.css";
import Signup from "./Components/Login/Signup";
import AuthProvider from "./Context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashBoard from "./Components/DashBoard/DashBoard";
import Login from "./Components/Login/Login";
import PostPage from "./Components/Post/Post";
import { useLocation } from "react-router-dom";
import NavBar from "./Components/Navbar/Navbar";

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/Login" && location.pathname !== "/Signup" && (
        <NavBar />
      )}
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/post" element={<PostPage />}></Route>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
