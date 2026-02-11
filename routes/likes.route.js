import express from "express";
import { toggleLike } from "../controllers/likes.controller.js";
const router = express.Router();
router.post("/", toggleLike);
export default router;

