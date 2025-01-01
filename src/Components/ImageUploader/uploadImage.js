import { supabase } from "../Supabase/Supabase";

const uploadImage = async (file, userId, userEmail) => {
  const fileName = `${Date.now()}-${file.name}`; // Generate a unique filename
  const bucketName = "social-media-image";

  // Upload the file to the specified bucket
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, file, {
      contentType: file.type,
    });

  console.log(data, "fileName");

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }

  // Get the public URL of the uploaded file
  const { data: publicURLData, error: urlError } = supabase.storage
    .from(bucketName)
    .getPublicUrl(fileName);

  if (urlError) {
    console.error("Error getting public URL:", urlError);
    return null;
  }
  console.log(fileName, "pub");

  const publicURL = publicURLData.publicUrl;

  // Insert the image data into the images table
  const { data: insertData, error: insertError } = await supabase
    .from("images")
    .insert([
      {
        user_email: userEmail,
        user_id: userId,
        file_name: fileName,
        public_url: publicURL,
      },
    ]);

  if (insertError) {
    console.error("Error inserting image data:", insertError);
    return null;
  }

  return publicURL;
};

export default uploadImage;
