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
    <Container className="news-body">
      <div className="mt-5">
        <ul className="p-3 space-y-4">
          {data.map((user) => (
            <li key={user.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{user.username}</h2>
                  <p className="text-gray-600">{user.address.city}</p>
                </div>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <div className="space-y-2">
                {posts
                  .filter((post) => post.userId === user.id)
                  .map((post) => (
                    <p className="text-gray-700" key={post.id}>
                      {post.body}
                    </p>
                  ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

function DashBoard() {
  return (
    <ApolloProvider client={client}>
      <Container className="news-body">
        <Photos />
      </Container>
    </ApolloProvider>
  );
}

export default DashBoard;
