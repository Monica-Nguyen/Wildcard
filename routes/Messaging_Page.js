//used this for reference: https://sabe.io/tutorials/how-to-build-real-time-chat-app-node-express-socket-io
const express = require('express')
const { Server } = require("socket.io");
const http = require('http');
var app = express();
const server = http.createServer(app);
const io = new Server(server);
// const app = require("express");
var router = express.Router();

// function createServer = require('http');
// const http = require("http").createServer(router);
// const options = { /* ... */ };
// const io = require("socket.io")(http, options);

router.get("/", (req, res) => {
    res.sendFile(__dirname + "/ChatBox.html");
});

io.on("connection", async (socket) => {
    socket.on('hello', (msg) => {
        console.log(msg)
        io.sockets.emit("hello", "hello from server")
    });
    socket.on("user_join", function(data) {
        this.username = data;
        socket.broadcast.emit("user_join", data);
    });

    socket.on("chat_message", function(data) {
        data.username = this.username;
        socket.broadcast.emit("chat_message", data);
    });

    socket.on("disconnect", function(data) {
        socket.broadcast.emit("user_leave", this.username);
    });
});
// server.listen(5000, () => {
//     console.log("Server started on port 5000")
// })
// server.listen(port);
module.exports = router;