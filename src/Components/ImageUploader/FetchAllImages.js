import { supabase } from "../Supabase/Supabase";

async function FetchAllImages() {
  const bucketName = "social-media-image";

  const { data: files, error } = await supabase.storage
    .from(bucketName)
    .list("");

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
  const imageUrls = files.map((file) => {
    const { publicUrl } = supabase.storage
      .from(bucketName)
      .getPublicUrl(file.name);
    console.log("Public URL for file:", file.name, publicUrl);
    return publicUrl;
  });

  console.log("Image URLs:", imageUrls);
  return imageUrls;
}

export default FetchAllImages;
