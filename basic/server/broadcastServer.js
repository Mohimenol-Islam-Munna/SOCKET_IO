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

// default  connection for all
io.on("connection", (socket) => {
  // create room
  socket.join("firstRoom");

  let roomSize = io.sockets.adapter.rooms.get("firstRoom").size;

  io.sockets
    .in("firstRoom")
    .emit(
      "room1",
      `This is first room for our application. room size : ${roomSize}`
    );

  setTimeout(() => {
    io.sockets.emit("firtBroadcast", "This data is broadcasting for you!");
  }, 6000);

  // disconnect user
  socket.on("disconnect", () => {
    console.log("user disconnected ::", socket.id);
  });
});

// Namespace :: player
let playerNamespace = io.of("/player");
playerNamespace.on("connection", (socket) => {
  playerNamespace.emit("player", "Data for player namespace");
});

// Namespace :: cusotmer
let customerNamespace = io.of("/customer");
customerNamespace.on("connection", (socket) => {
  customerNamespace.emit("customer", "data for customer namespace");
});

// listen server
const PORT = "3006";
httpServer.listen(PORT, () => {
  console.log(`Your Broadcast server is runnig at PORT ${PORT}...`);
});
