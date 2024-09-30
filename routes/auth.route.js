import express from "express";
import authController from "../controllers/auth.controller.js";
import { catchError } from "../utils/catchError.js";
import { verifyAuth } from "../middleware/auth.js";

const authRoute = express.Router();

authRoute.route("/register").post(catchError(authController.register));
authRoute.route("/login").post(catchError(authController.login));

authRoute.route("/profile").get(verifyAuth, catchError(authController.profile));

export default authRoute;
