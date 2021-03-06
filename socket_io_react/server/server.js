const http = require("http");
const path = require("path");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {});

app.use(express.static(path.join(__dirname, "..", "client", "build")));

// routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
});

io.on("connection", (socket) => {
  console.log("new user connnected :: ", socket.id);

  // send data to react frontend
  io.sockets.emit("title", "React Real Time Chat Application with Socket.IO");

  setInterval(() => {
    const date = new Date();
    let time = date.getTime();
    io.sockets.emit("time", time);
  }, 2000);

  // disconnect user
  socket.on("disconnect", () => {
    console.log("user disconnected ::", socket.id);
  });
});

// listen server
const PORT = "5000";
httpServer.listen(PORT, () => {
  console.log(`Your Server is runnig at PORT ${PORT}...`);
});
