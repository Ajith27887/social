import React from "react";
import "./App.css";
import Signup from "./Components/Signup";
import AuthProvider from "./Context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashBoard from "./Components/DashBoard";
import Login from "./Components/Login";
import { Navbar } from "react-bootstrap";
import NewsFeed from "./Components/NewsFeed";
import PostPage from "./Components/PostPage";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route path="/news-feed" element={<NewsFeed />} />
              <Route path="/post" element={<PostPage />} />
            </Route>
            <Route path="/" element={<DashBoard />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
