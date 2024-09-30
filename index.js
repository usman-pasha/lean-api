import http from "http";
import { Server } from "socket.io";
import db from "./utils/db.js";
import { app } from "./app.js";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const port = 4000;

// Socket.io Connection
io.on("connection", (socket) => {
  console.log(`New client connected ${socket.id}`);
  
  socket.on("disconnect", () => {
    console.log(`Socket Disconnected ${socket.id}`);
  });
});

server.listen(port, async () => {
  console.log(`App is Running on Port:${port}`);
  await db("mongodb://127.0.0.1:27017/chat");
});
