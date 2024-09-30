import express from "express";
import cors from "cors";
import * as responser from "./utils/responser.js";
import { routes } from "./routes/index.js";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/api", async (req, res) => {
  try {
    const data = {
      id: 1,
    };
    return responser.send(200, "GET Method is working fine", req, res, data);
  } catch (error) {
    return responser.send(404, error.message, req, res);
  }
});

routes(app);

export { app };
