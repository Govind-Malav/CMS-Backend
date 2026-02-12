import Artifact from "../models/artifact.js";
import { v2 as cloudinary } from "cloudinary";
export const createArtifactService = async ({
  title,
  content,
  userId,
  filepath
}) => {
  if (!title || !content) {
    throw new Error("Title and content are required");
  }

 let mediaUrl = null;
  if (filepath) {
    const uploadResult = await cloudinary.uploader.upload(filepath, {
      folder: "artifacts"
    });
    mediaUrl = uploadResult.secure_url;
    fs.unlinkSync(filepath);
  }
  console.log("Media URL:", mediaUrl);
  
  const artifact = await Artifact.create({
    title,
    content,
    author: userId,
    media: mediaUrl || null
  });

  return artifact;
};

export const getArtifactsService = async ({ userId, role }) => {
  if (role === "ADMIN") {
    
    return await Artifact.find().populate("author", "name email role");
  }

  
  return await Artifact.find({ author: userId });
};
console.log("")

