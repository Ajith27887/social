import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "../../firebase";
import { SlUserFollow } from "react-icons/sl";
import { Badge, Button, Container } from "react-bootstrap";
import "../Suggestion/Suggestion.scss";
import { useAuth } from "../../Context/AuthContext";

function Suggestion() {
  const { cureentUser, setFollowUser, followUser } = useAuth();
  const [users, setUsers] = useState([]);
  const userEmail = cureentUser && cureentUser.email;

  useEffect(() => {
    const loadUsers = async () => {
      const usersList = await fetchAllUsers();
      setUsers(usersList);
    };
    loadUsers();
    console.log("all", users);
  }, [userEmail]);

  const follow = () => {
    alert(followUser);
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
                  onClick={() => follow(setFollowUser(user.email))}
                  className="mx-2"
                >
                  <SlUserFollow />
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
