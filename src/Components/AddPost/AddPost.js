import React from "react";
import ImageUploader from "../ImageUploader/ImageUploader";
import { useAuth } from "../../Context/AuthContext";
import { Badge } from "react-bootstrap";

function AddPost() {
  const { imageUrl, currentUser } = useAuth();

  return (
    <div className="container mx-auto ">
      {" "}
      <ImageUploader />
      {imageUrl.length > 0 && (
        <div className="flex flex-col justify-center items-center">
          {imageUrl.map((url, index) => (
            <div key={index} className="relative max-w-sm ">
              <img
                className="w-full shadow-lg object-cover rounded"
                key={index}
                src={url}
                alt={`Uploaded ${index}`}
                style={{ width: "300px", marginTop: "10px", height: "300px" }}
              />
              <div className=" absolute top-0 left-0 m-2">
                <Badge>
                  {(currentUser && currentUser.user) || currentUser.displayName}
                </Badge>
              </div>
            </div>
            // <div className="max-w-sm w-full rounded overflow-hidden ">
            //   <img
            //     className="w-full shadow-lg object-cover rounded"
            //     key={index}
            //     src={url}
            //     alt={`Uploaded ${index}`}
            //     style={{ width: "300px", marginTop: "10px", height: "300px" }}
            //   />
            //   <div className="px-6 py-4">
            //     <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            //     <p className="text-gray-700 text-base">
            //       Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            //       Voluptatibus quia, nulla! Maiores et perferendis eaque,
            //       exercitationem praesentium nihil.
            //     </p>
            //   </div>
            //   {/* <div class="px-6 pt-4 pb-2">
            //     <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            //       #photography
            //     </span>
            //     <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            //       #travel
            //     </span>
            //     <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            //       #winter
            //     </span>
            //   </div> */}
            // </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AddPost;
