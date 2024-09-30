import mongoose from "mongoose";
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    status: { type: String, enum: ["online", "offline"], default: "offline" },
  },
  { timestamps: true }
);

export const User = mongoose.model("user", userSchema);
