import { createArtifactService } from "../services/artifact.service.js";

export const createArtifact = async (req, res) => {
    try {
        const artifact = await createArtifactService({
            title: req.body.title,
            content: req.body.content,
            userId: req.user.id,
            filepath: req.file.path
        })
        res.status(201).json({
            success: true,
            message: "Artifact created successfully",
            artifact
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const getArtifacts = async (req, res) => {
    try {
        const artifacts = await getArtifactsService(req.user.id);
        res.status(200).json({
            success: true,
            artifacts
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

