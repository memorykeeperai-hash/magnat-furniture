import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Uploads a file (File object) directly to Cloudinary using a Node.js stream.
 * 
 * @param file The file object from Request/FormData
 * @param folder Optional destination folder in Cloudinary
 * @returns The secure URL of the uploaded image
 */
export async function uploadToCloudinary(file: File, folder: string = "magnat-furniture"): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload stream error:", error);
          reject(error);
        } else if (result?.secure_url) {
          resolve(result.secure_url);
        } else {
          reject(new Error("Cloudinary upload failed: secure_url was not returned."));
        }
      }
    ).end(buffer);
  });
}

export default cloudinary;
