import express from "express";
import messageController from "../controllers/message.controller.js";
import { catchError } from "../utils/catchError.js";
import { verifyAuth } from "../middleware/auth.js";

const messageRoute = express.Router();

messageRoute
  .route("/send")
  .post(verifyAuth, catchError(messageController.sendMessage));

messageRoute
  .route("/chat/:chatId")
  .get(verifyAuth, catchError(messageController.getMessage));

export default messageRoute;
