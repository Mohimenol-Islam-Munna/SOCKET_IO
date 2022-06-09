const http = require("http");
const path = require("path");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {});

// routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

io.on("connection", (socket) => {
  console.log("new user connnected :: ", socket.id);

  //  ---------------- build in events -----------------
  //   setTimeout(() => {
  //     socket.send("WOW! First message from server to client side");
  //   }, 6000);

  //   setInterval(() => {
  //     let date = new Date();
  //     let time = date.getTime();
  //     socket.send(time);
  //   }, 1000);
  //  -------------- end build in events ---------------


  //  ---------------- custom events -------------------
  setTimeout(() => {
    socket.emit(
      "title",
      "WOW! First message from server to client side with custom event"
    );
  }, 6000);

  setInterval(() => {
    let date = new Date();
    let time = date.getTime();
    socket.emit("time", time);
  }, 1000);
  //  --------------- end custom events ----------------

  //   disconnect user
  socket.on("disconnect", () => {
    console.log("user disconnected ::", socket.id);
  });
});

// listen server
const PORT = "3005";
httpServer.listen(PORT, () => {
  console.log(`Your Server is runnig at PORT ${PORT}...`);
});
