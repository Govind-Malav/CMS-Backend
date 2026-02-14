import { sendChatService } from "../services/chat.service.js";

export const registerSocketHandlers = (io) => {

  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("user-online", (userId) => {

      onlineUsers.set(userId, socket.id);

      console.log("Online Users:", onlineUsers);
    });

    socket.on("send-message", async (data) => {

      try {
        const { senderId, receiverId, message } = data;

        if (!senderId || !receiverId || !message) {
          return;
        }

        

        // const chat = await sendChatService({
        //   senderId,
        //   receiverId,
        //   message
        // });

        const receiverSocketId = onlineUsers.get(receiverId);

        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive-message", data);
        }

        socket.emit("message-sent", data);

      } catch (error) {
        console.log("Socket error:", error.message);
      }

    });
    socket.on("disconnect", () => {

      for (let [userId, sockId] of onlineUsers.entries()) {
        if (sockId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }

      console.log("User disconnected:", socket.id);
    });

  });
};