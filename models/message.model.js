import mongoose from "mongoose";
const schema = mongoose.Schema;

const messageSchema = new schema(
  {
    senderId: { type: schema.Types.ObjectId, ref: "user", required: true },
    receiverId: { type: schema.Types.ObjectId, ref: "user", required: true },
    message: { type: String, required: true, maxlength: 1000 },
  },
  { timestamps: true }
);

// Adding an index to improve performance for sender/receiver lookups
messageSchema.index({ senderId: 1, receiverId: 1 });

export const Message = mongoose.model("message", messageSchema);
