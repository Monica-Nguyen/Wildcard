const express = require("express");
const router = express.Router();
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
var io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

server.listen(8080, () => {
  console.log(8080);
});

router.get("/", function (req, res, next) {
  res.render("chat", {});
});

module.exports = router;
