import mongoose from "mongoose";
const schema = mongoose.Schema;
import { Message } from "./message.model.js";
import { User } from "./user.model.js";

const conversationSchema = new schema(
  {
    participantIds: [{ type: schema.Types.ObjectId, ref: "user" }],
    messageId: [{ type: schema.Types.ObjectId, ref: "message", default: [] }],
  },
  { timestamps: true }
);

// Adding an index to speed up lookups on participantIds
conversationSchema.index({ participantIds: 1 });

export const Conversation = mongoose.model("conversation", conversationSchema);
