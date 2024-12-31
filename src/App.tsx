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
import ProtectedRoute from "./Components/ProtectedRoute.tsx";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <DashBoard />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/news-feed"
              element={
                // <ProtectedRoute>
                <>
                  <Navbar />
                  <NewsFeed />
                </>
                // </ProtectedRoute>
              }
            />
            <Route
              path="/post"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <PostPage />
                  </>
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
