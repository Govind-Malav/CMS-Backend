import express from 'express';
import {createArtifact} from '../controllers/artifact.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
// import {authorizeRoles} from '../middlewares/role.middleware.js';
const router = express.Router();
router.post('/',authMiddleware,createArtifact);
// router.get('/',authMiddleware,authorizeRoles("ADMIN"),getArtifacts);
export default router;