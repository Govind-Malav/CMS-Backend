import {toggleLikeService, getLikeCountService} from "../services/likes.service.js";   

export const toggleLike = async (req, res) => {
    try {
       const result = await toggleLikeService({
           artifactId: req.params.artifactId,
           userId: req.user.id
       }); 
       res.status(200).json({
           success: true,
           message: "Like toggled successfully",
           result
       }); 
       
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

