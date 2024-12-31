import React from "react";
import Navbar from "./Navbar";
import NewsFeed from "./NewsFeed";
import ImageUploader from "./ImageUploader";

function DashBoard() {
  return (
    <div>
      <Navbar />
      <NewsFeed />
      <ImageUploader />
    </div>
  );
}

export default DashBoard;
