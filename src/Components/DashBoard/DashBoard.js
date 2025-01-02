import React, { useEffect, useState } from "react";
import { useQuery, gql, ApolloProvider } from "@apollo/client";
import ImageUploader from "../ImageUploader/ImageUploader";
import { Container } from "react-bootstrap";
import client from "../../Components/Server/apolloServer";
import axios from "axios";
import Card from "react-bootstrap/Card";
import "../../Components/DashBoard/DashBoard.scss";

function Photos() {
  const [data, setData] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async function fetchUsers() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    })();

    (async function fetchPosts() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  console.log(data, "dash");
  return (
    <div>
      <ul className="p-3">
        {data.map((user) => (
          <li
            style={{ listStyleType: "none" }}
            className="mt-3 d-flex justify-content-center align-items-center"
            key={user.id}
          >
            <Card
              style={{ width: "50rem" }}
              className="news-cadrs d-flex p-2 justify-content-center align-items-center"
            >
              <Card.Body>
                <div className="d-flex justify-content-between ">
                  <div>
                    <Card.Title>{user.username}</Card.Title>
                    <Card.Text>{user.address.city}</Card.Text>
                  </div>
                  <Card.Text>{user.email}</Card.Text>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center text-center">
                  {posts
                    .filter((post) => post.userId === user.id)
                    .map((post) => (
                      <Card.Text className="w-75" key={post.id}>
                        {post.body}
                      </Card.Text>
                    ))}
                </div>
              </Card.Body>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DashBoard() {
  return (
    <ApolloProvider client={client}>
      <Container className="news-body">
        <ImageUploader />
        <Photos />
      </Container>
    </ApolloProvider>
  );
}

export default DashBoard;
