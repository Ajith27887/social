import React, { useState, useEffect } from "react";
import uploadImage from "../ImageUploader/uploadImage";
import "../ImageUploader/ImageUpload.scss";
import { CiImageOn } from "react-icons/ci";
import FetchAllImages from "./FetchAllImages";
import { useAuth } from "../../Context/AuthContext";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const { currentUser, setImageUrl } = useAuth();
  const [isUploaded, setIsUploaded] = useState(false);
  const userId = currentUser ? currentUser.uid : "";
  const userEmail = currentUser ? currentUser.email : "";
  const userName = currentUser ? currentUser.displayName : "";
  console.log("uid", userId);

  useEffect(() => {
    const loadImages = async () => {
      const urls = await FetchAllImages(userId);
      setImageUrl(urls);
      console.log(urls, "url");
    };
    loadImages();
  }, [userId, setImageUrl]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setIsUploaded(false); // Reset the upload state when a new file is selected
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }
    const url = await uploadImage(file, userId, userEmail, userName);
    if (url) {
      setImageUrl((prevUrls) => [...prevUrls, url]);
      setIsUploaded(true); // Set the upload state to true after successful upload
    }
  };

  const findfile = () => {
    document.getElementById("filechange").click();
  };

  return (
    <div className="imageupload p-5 mt-5 flex flex-col items-center">
      <div className="flex flex-col items-center mb-4">
        <CiImageOn
          onClick={findfile}
          style={{ cursor: "pointer", fontSize: "4rem", color: "#4A90E2" }}
        />
        <p className="text-gray-600 mt-2">Click the icon to Post an image</p>
      </div>
      <input
        id="filechange"
        style={{ display: "none" }}
        type="file"
        onChange={handleFileChange}
      />
      <div>
        {file && !isUploaded && (
          <button
            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            onClick={handleUpload}
          >
            Upload
          </button>
        )}
      </div>
      {isUploaded && (
        <p className="text-green-500 mt-3">Image uploaded successfully!</p>
      )}
    </div>
  );
};

export default ImageUploader;
