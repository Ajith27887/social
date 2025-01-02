import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "../../firebase";
import { SlUserFollow } from "react-icons/sl";
import { Badge, Button, Container } from "react-bootstrap";
import "../Suggestion/Suggestion.scss";
import { useAuth } from "../../Context/AuthContext.tsx";
import { RiUserUnfollowFill } from "react-icons/ri";

function Suggestion() {
  const { currentUser, setFollowUser, followUser } = useAuth();
  const [users, setUsers] = useState([]);
  const userEmail = currentUser && currentUser.email;
  const [status, setStatus] = useState({});

  useEffect(() => {
    const loadUsers = async () => {
      const usersList = await fetchAllUsers();
      const filteredUsers = usersList.filter(
        (data) => data.email !== userEmail
      );
      setUsers(filteredUsers);
      console.log("all", filteredUsers);
    };
    loadUsers();
  }, [currentUser]);

  const follow = (email) => {
    setFollowUser(email);
    setStatus((prevStatus) => ({
      ...prevStatus,
      [email]: !prevStatus[email],
    }));
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-semibold mb-5">Suggestions</h2>
      <div className="bg-white rounded-lg shadow-lg p-5">
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-green-500 text-white rounded-full p-3">
                  {user.name || user.displayName}
                </div>
              </div>
              <button
                onClick={() => follow(user.email)}
                className={`px-4 py-2 rounded ${
                  status[user.email]
                    ? "bg-red-500 text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                {status[user.email] ? <RiUserUnfollowFill /> : <SlUserFollow />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Suggestion;
