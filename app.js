const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log(`Connected id: ${socket.id}`);
  io.emit("connect id", socket.id);

  socket.on("disconnect", () => {
    console.log("Disconnected id: ", socket.id);
    io.emit("disconnected id", socket.id);
  });

  socket.on("chat message", (msg) => {
    console.log(`Message: "${msg}" from ${socket.id}`);
    io.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
