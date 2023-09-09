const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const http = require("http");
const session = require("express-session");
const { Server } = require("socket.io");
app.use(express.json());
app.use(cors());
const server = http.createServer(app);
require("dotenv").config();
const mongoUrl = process.env.MONGODB_DATABASE_URL;
let users = 0;

const io = new Server(server, {
  cors: true,
  origins: [""],
});
app.use(
  session({
    secret: "moveo-task",
    resave: false,
    saveUninitialized: true,
  })
);
const PORT = process.env.PORT || 3001;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongoDB Connection error:"));
db.once("open", async () => {
  console.log("Connected to mongoDB");
});

const codeBlocksRouter = require("./routes/CodeBlockRoutes");
app.use("/", codeBlocksRouter);

io.on("connection", (socket) => {
  socket.emit("connected", users);
  users++;

  socket.emit("user-type", users);

  socket.on("join-room", (data) => {
    socket.join(data);
  });

  socket.on("leave-room", (data) => {
    socket.leave(data);
  });
  socket.on("code-change", (data) => {
    socket.to(data.room).emit("code-changed", data.text);
  });

  socket.on("disconnect", () => {
    users--;
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
