import React, { useState, useEffect } from "react";
import uploadImage from "../ImageUploader/uploadImage";
import "../ImageUploader/ImageUpload.scss";
import { CiImageOn } from "react-icons/ci";
import FetchAllImages from "./FetchAllImages";
import { useAuth } from "../../Context/AuthContext";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState([]);
  const { currentUser } = useAuth();
  const userId = currentUser ? currentUser.uid : "";
  console.log("uid", userId);

  useEffect(() => {
    const loadImages = async () => {
      const urls = await FetchAllImages(userId);
      setImageUrl(urls);
      console.log(urls, "url");
    };
    loadImages();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }
    const url = await uploadImage(file, userId);
    if (url) {
      setImageUrl((prevUrls) => [...prevUrls, url]);
    }
  };

  const findfile = () => {
    document.getElementById("filechange").click();
  };

  return (
    <div className="imageupload p-5 mt-5">
      <CiImageOn
        onClick={findfile}
        style={{ cursor: "pointer", fontSize: "2rem" }}
      />
      <input
        id="filechange"
        style={{ display: "none" }}
        type="file"
        onChange={handleFileChange}
      />
      <div>
        {file && (
          <button className="mt-3" onClick={handleUpload}>
            Upload
          </button>
        )}
      </div>

      {imageUrl.length > 0 && (
        <div>
          <p>Uploaded Images:</p>
          {imageUrl.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Uploaded ${index}`}
              style={{ width: "300px", marginTop: "10px" }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
