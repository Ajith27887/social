import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { supabase } from "../Supabase/Supabase";

const Post = () => {
  const { followUser } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!followUser) {
        console.log("No followUser specified.");
        return;
      }

      const { data: files, error } = await supabase
        .from("images")
        .select("public_url")
        .eq("user_email", followUser);

      if (error) {
        console.error("Error fetching images:", error);
        return;
      }

      if (!files || files.length === 0) {
        console.log("No files found in the bucket.");
        return;
      }

      const imageUrls = files.map((file) => file.public_url);
      setPosts(imageUrls);
      console.log(imageUrls, "imageUrl");
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Posts from {followUser}</h2>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            {post ? (
              <img
                src={post}
                alt={`Post ${index}`}
                style={{ width: "300px", marginTop: "10px", height: "300px" }}
              />
            ) : (
              <p>No image available.</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Post;
