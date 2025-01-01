import React, { useState } from "react";
import uploadImage from "../ImageUploader/uploadImage";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file!");

      return;
    }

    const url = await uploadImage(file);
    console.log("url-not", url);
    if (url) {
      console.log(url, "url");

      setImageUrl(url);
      alert("Image uploaded successfully!");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {imageUrl && (
        <div>
          <p>Image URL:</p>
          <img
            src={imageUrl}
            alt="Uploaded"
            style={{ width: "300px", marginTop: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
