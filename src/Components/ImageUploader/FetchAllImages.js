import { supabase } from "../Supabase/Supabase";

async function FetchAllImages(userId) {
  const bucketName = "social-media-image";

  const { data: files, error } = await supabase
    .from("images")
    .select("public_url")
    .eq("user_id", userId);

  console.log(JSON.stringify(files, null, 2, "files"));

  if (error) {
    console.error("Error listing files:", error);
    return [];
  }

  if (!files || files.length === 0) {
    console.log("No files found in the bucket.");
    return [];
  }

  console.log("Files found:", files);

  // Get the public URLs of all files
  const imageUrls = files.map((file) => file.public_url);

  console.log("Image URLs:", files);
  return imageUrls;
}

export default FetchAllImages;
