import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "../../firebase";
import { SlUserFollow } from "react-icons/sl";
import { Badge, Button, Container } from "react-bootstrap";
import "../Suggestion/Suggestion.scss";
import { useAuth } from "../../Context/AuthContext";
import { RiUserUnfollowFill } from "react-icons/ri";

function Suggestion() {
  const { currentUser, setFollowUser, followUser } = useAuth();
  const [users, setUsers] = useState([]);
  const userEmail = currentUser && currentUser.email;
  const [Status, setStatus] = useState(false);

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

  const follow = (email, status) => {
    setFollowUser(email);
    setStatus(status);
  };

  return (
    <div>
      <h2>Suggestions</h2>
      <Container>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className=" mt-3"
              style={{ listStyleType: "none" }}
            >
              <div className="users-list">
                <Badge className="p-3 w-25" bg="success">
                  {user.name || user.displayName}
                </Badge>
                <Button
                  bg="success"
                  onClick={() => follow(user.email, "true")}
                  className="mx-2"
                >
                  {Status ? <RiUserUnfollowFill /> : <SlUserFollow />}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

export default Suggestion;
