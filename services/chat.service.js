import Chat from "../models/chat.js";
import Thread from "../models/thread.js";
export const getChatsByThreadIdService = async (threadId) => {
    const chats = await Chat.find({ thread: threadId })
        .populate("sender", "name email")
        .sort({ createdAt: 1 })
}

export const sendChatService = async ({
    senderId,
    receiverId,
    message
}) => {

    console.log("sender", senderId)
    console.log("receiver", receiverId)
    console.log("message", message)
    const thread = await findOrCreateThreadService(senderId, receiverId);

    const chat = await Chat.create({
        thread: thread._id,
        sender: senderId,
        message
    });
    thread.lastMessage = message;
    thread.lastMessageAt = new Date();
    await thread.save();
    return chat;
}


export const findOrCreateThreadService = async (userId1, userId2) => {
    console.log("userId1", userId1)
    console.log("userId2", userId2)
    const participants = [userId1, userId2].sort();

    
    let threads = await Thread.findOne({
        participants: { $all: participants }
        // $expr: {
        //     $eq: [
        //         { $size: participants }, 2
        //     ]
        // }
    });

    if (!threads) {
        threads = await Thread.create({ participants })
    }
    console.log("thread", threads)
    return threads;
}