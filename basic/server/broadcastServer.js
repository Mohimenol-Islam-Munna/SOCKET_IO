const http = require("http");
const path = require("path");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {});

// routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "broadcastClient.html"));
});

io.on("connection", (socket) => {
  setTimeout(() => {
    io.sockets.emit("firtBroadcast", "This data is broadcasting for you!");
  }, 6000);

  //   disconnect user
  socket.on("disconnect", () => {
    console.log("user disconnected ::", socket.id);
  });
});

// listen server
const PORT = "3006";
httpServer.listen(PORT, () => {
  console.log(`Your Broadcast server is runnig at PORT ${PORT}...`);
});
