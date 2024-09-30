import { Message } from "../models/message.model.js";
import { Conversation } from "../models/conversation.model.js";

// send message
export const sendMessage = async (body) => {
  try {
    console.log(`Send Message Service Started`);

    // Find existing conversation
    let conversation = await Conversation.findOne({
      participantIds: { $all: [body.userId, body.receiverId] },
    });

    // If no conversation, create one
    if (!conversation) {
      conversation = await Conversation.create({
        participantIds: [body.userId, body.receiverId],
      });
    }

    // Create the new message
    const newMessage = await Message.create({
      senderId: body.userId,
      receiverId: body.receiverId,
      message: body.message,
    });

    if (newMessage) {
      // Ensure conversation.messageIds is an array, then push the message ID
      conversation.messageId = conversation.messageId || [];
      conversation.messageId.push(newMessage._id);
      await conversation.save();
    }

    return newMessage;
  } catch (error) {
    console.error(`Error in sendMessage service: `, error);
    throw error; // rethrow the error to be handled by caller if necessary
  }
};

// get all messages

export const getMessage = async (loggedInUser, receiverId) => {
  const conversation = await Conversation.findOne({
    participantIds: { $all: [loggedInUser, receiverId] },
  })
  .populate("messageId");
  // .populate([{ path: "messageId", select: ["_id", "message"] }]);
  if (!conversation) {
    return [];
  }
  const messages = conversation.messageId;
  return messages;
};
