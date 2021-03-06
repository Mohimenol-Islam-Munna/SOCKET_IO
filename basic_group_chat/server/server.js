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

// listen server
const PORT = "3010";
httpServer.listen(PORT, () => {
  console.log(`Your Server is runnig at PORT ${PORT}...`);
});
