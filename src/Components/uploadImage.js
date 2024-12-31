import { supabase } from "./Supabase";

const uploadImage = async (file) => {
  const fileName = `${Date.now()}-${file.name}`; // Generate a unique filename
  const bucketName = "social-media-image";
  const { data, error } = await supabase.storage
    .from(bucketName) // Replace with your storage bucket name
    .upload(fileName, file, {
      contentType: "image/jpeg",
    });

  console.log(supabase.storage.url, "data");

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }

  // Get the public URL of the uploaded file
  const { publicUrl, error: urlError } = supabase.storage
    .from(bucketName)
    .getPublicUrl(fileName);

  if (urlError) {
    console.error("Error getting public URL:", urlError);
    return null;
  }

  return publicUrl;
};

export default uploadImage;
