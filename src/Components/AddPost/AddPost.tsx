import React from "react";
import { useAuth } from "../../Context/AuthContext.tsx";
import ImageUploader from "../ImageUploader/ImageUploader.js";
import { Badge } from "react-bootstrap";

const AddPost = () => {
  const { imageUrl, currentUser } = useAuth() as unknown as {
    imageUrl: { public_url: string; created_at?: string }[];
    currentUser: { displayName: string };
  };

  return (
    <div className="container mx-auto p-5">
      <ImageUploader />
      {imageUrl && imageUrl.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {imageUrl.map((file, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                className="w-full h-64 object-cover"
                src={file.public_url}
                alt={`Uploaded ${index}`}
              />
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <Badge>{currentUser?.displayName}</Badge>
                </div>
                <p className="text-gray-500 text-sm">
                  Uploaded at:{" "}
                  {file.created_at
                    ? new Date(file.created_at).toLocaleString()
                    : "N/A"}
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
      )}
    </div>
  );
};

export default AddPost;
