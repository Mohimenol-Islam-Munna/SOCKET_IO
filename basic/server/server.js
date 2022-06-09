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

app.get("/check", (req, res) => {
  res.send("check");
});

io.on("connection", (socket) => {
  console.log("connnected");
});

const PORT = "3005";
httpServer.listen(PORT, () => {
  console.log(`Your Server is runnig at PORT ${PORT}...`);
});
