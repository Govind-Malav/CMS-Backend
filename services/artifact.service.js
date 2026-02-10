import Artifact from "../models/artifact.js";
export const createArtifactService = async ({
    title,
    content,
    userId
}) => {
    if (!title || !content) {
        throw new Error("title and content are required")
    }
    const artifact = await Artifact.create({
        title,
        content,
        author: userId
    });
    return artifact;
}   
    