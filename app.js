import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import artifactRoutes from "./routes/artifact.route.js";
import likesRoutes from "./routes/likes.route.js";
import cookieParser from "cookie-parser";
import commentRoutes from "./routes/comment.route.js";
import fs from "fs";
import webhookRoutes from "./webhook/webhooks.js";

const app = express();

/* Middlewares */
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan("dev"));
app.use(cookieParser());



app.use(cookieParser());
/* Test Route */
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "CMS Backend is running"
    });
});

app.use("/webhook", webhookRoutes);
app.use("/auth", authRoutes);
app.use("/artifacts", artifactRoutes);
app.use("/likes", likesRoutes);
app.use("/comments", commentRoutes);
export default app;




// app.use(cors({
//   origin: ["https://cms-admin.vercel.app"],
//   credentials: true
// }));