const express = require("express");
const router = express.Router();
// const app = express();
// const http = require("http");
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// var io = require("socket.io")(server);

router.get("/", function (req, res, next) {
  res.render("chat", {});
});

// io.on("connection", (socket) => {
//   console.log("a user connected");
// });

// server.listen(8080, () => {
//   console.log(8080);
// });

module.exports = router;
