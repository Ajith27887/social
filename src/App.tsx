import React from "react";
import "./App.css";
import Signup from "./Components/Login/Signup";
import AuthProvider from "./Context/AuthContext.tsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashBoard from "./Components/DashBoard/DashBoard";
import Login from "./Components/Login/Login.tsx";
import PostPage from "./Components/Post/Post";
import { useLocation } from "react-router-dom";
import NavBar from "./Components/Navbar/Navbar";
import Suggestion from "./Components/Suggestion/Suggestion";
import AddPost from "./Components/AddPost/AddPost.tsx";

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
        <Route path="/Add-post" element={<AddPost />} />
        <Route path="/post" element={<PostPage />}></Route>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Suggestion" element={<Suggestion />} />
        <Route path="/Add-post" element={<AddPost />} />
      </Routes>
    </div>
  );
}

export default App;
