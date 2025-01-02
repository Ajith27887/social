import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
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
        .select("public_url, created_at,user_name")
        .eq("user_email", followUser);

      if (error) {
        console.error("Error fetching images:", error);
        return;
      }

      if (!files || files.length === 0) {
        console.log("No files found in the bucket.");
        return;
      }

      setPosts(files);
      console.log(files, "files");
    };

    fetchPosts();
  }, [followUser]);

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-semibold mb-5">Posts from {followUser}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              className="w-full h-64 object-cover"
              src={post.public_url}
              alt={`Post ${index}`}
            />
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <p>{post.user_name}</p> {/* Display user name badge */}
              </div>
              <p className="text-gray-700">
                Uploaded at: {new Date(post.created_at).toLocaleString()}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                  Like
                </button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300">
                  Comment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
