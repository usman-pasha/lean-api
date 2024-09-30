import authRoute from "./auth.route.js";
import messageRoute from "./message.route.js";

export const routes = (app) => {
  app.use("/auth", authRoute);
  app.use("/message", messageRoute);
};
