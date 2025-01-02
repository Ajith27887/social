import { supabase } from "../Supabase/Supabase";

interface ImageFile {
  public_url: string;
  created_at: string;
}

async function FetchAllImages(userId: string): Promise<ImageFile[]> {
  const { data: files, error } = await supabase
    .from("images")
    .select("public_url, created_at")
    .eq("user_id", userId);

  console.log(JSON.stringify(files, null, 2));

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

  console.log("Image URLs:", imageUrls);
  return files;
}

export default FetchAllImages;
