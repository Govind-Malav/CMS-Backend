import dotenv from "dotenv";
import http from "http";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import { Server } from "socket.io";
import { registerSocketHandlers } from "./sockets/socket.js";

const PORT = process.env.PORT || 3000;

connectDB();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true
  }
})

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

registerSocketHandlers(io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});