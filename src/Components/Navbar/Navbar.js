import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, Outlet } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { useAuth } from "../../Context/AuthContext.tsx";
import "./Navbar.scss";

function NavBar() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { currentUser } = useAuth();
  const imageUrl = currentUser && currentUser.photoURL;

  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/Login");
      })
      .catch((error) => {
        setError("Something went wrong");
      });
  };

  const handleNavigation = (path) => {
    if (currentUser) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleNavigation("/Add-post")}
              className="text-white font-bold text-xl"
            >
              MyApp
            </button>
            <button
              onClick={() => handleNavigation("/Add-post")}
              className="text-white hover:text-gray-300"
            >
              Add Post
            </button>

            <button
              onClick={() => handleNavigation("/Suggestion")}
              className="text-white hover:text-gray-300"
            >
              Suggestion
            </button>
            <button
              onClick={() => handleNavigation("/post")}
              className="text-white hover:text-gray-300"
            >
              Friends Post
            </button>
            <button
              onClick={() => handleNavigation("/")}
              className="text-white hover:text-gray-300"
            >
              News Feeds
            </button>
          </div>
          <div className="flex items-center">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Profile"
                className="w-10 h-10 rounded-full mx-3"
              />
            ) : (
              <div className="flex items-center">
                <VscAccount
                  className="w-10 h-10 mx-3"
                  style={{ fontSize: "2rem" }}
                />
                {currentUser && currentUser.displayName}
              </div>
            )}
            <div className="ml-4">
              <div className="bg-white rounded-lg shadow-lg py-2 px-4">
                <button
                  onClick={handleLogOut}
                  className="w-full text-left px-4 py-2 text-red-600"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;
